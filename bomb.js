// ==========
// BOMB STUFF
// ==========

//The bomb is dropped from the top portal
//It has a red color and may not touch the paddle

function Bomb(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bomb.prototype.reset = function () {
    this.cx = (Math.random()*(g_canvas.width-this.radius*2))+this.radius;
    this.cy = this.radius;
    this.xVel = 0;
    this.yVel = 0;
    this.yAcc = 0;
    this.counter = 160;
};

Bomb.prototype.render = function (ctx) {
	ctx.save();

    //lets make the bomb more red as it gets closer to exploding
    var red = 200-Math.floor(200*(this.counter/160));
    ctx.fillStyle = "rgb("+red + ",0,0)";
	
    fillCircle(ctx, this.cx, this.cy, this.radius);
    ctx.restore();
};
var g_gravity = 0.005;

Bomb.prototype.update = function (dt) {
    //when counter is 0 the bomb is dropped
    if(this.counter === 0) {
        //original velocity
        var oldVelY = this.yVel;

        this.yAcc += g_gravity;
        // v = u + at
    	this.yVel += this.yAcc * dt;

        // v_ave = (u + v) / 2
        var aveVelY = (oldVelY + this.yVel) / 2;

        // s = s + v_ave * t
        var nextY = this.cy + aveVelY * dt;

        var prevY = this.cy;
    	
    	if(nextY > g_canvas.height) {
    		return this.reset();
    	}

        if(g_paddle1.collidesWith(this.cx, prevY, this.cx, nextY, this.radius)
            || g_paddle2.collidesWith(this.cx, prevY, this.cx, nextY, this.radius)) {
            return lost();
        }

        this.cy += aveVelY * dt; 
    }
    else {
        //moves slowly up before it's dropped
        this.cy = this.radius *(this.counter/160);
        --this.counter;
    }
};

Bomb.prototype.collidesWithShot = function ( x, prevY, 
                                         nextY, 
                                          r) {
    var center = this.cy;
    // Check X coords
    if ((nextY - r < center && prevY - r >= center) ||
        (nextY + r > center && prevY + r <= center)) {
        // Check Y coords
        if (x + r >= this.cx - this.radius    &&
            x - r <= this.cx + this.radius   ) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};
