// ==========
// BALL STUFF
// ==========

// BALL STUFF
function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Ball.prototype.update = function (dt) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * dt;
    var nextY = prevY + this.yVel * dt;

    // Bounce off the paddles
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius)
        ||g_paddle2.collidesWith(prevX, prevY, nextX, nextY, this.radius))
    {
        this.yVel *= -1;
    }

    //This grants the ball "access" to the portals
    if(g_portal.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
        this.cx = g_portal2.cx;
        this.cy = g_portal2.cy;
        this.yVel *= -1;
    }
    if(g_portal2.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
        this.cx = g_portal.cx;
        this.cy = g_portal.cy;
        this.yVel *= -1;
    }

    //deletes bricks from the wall if they're hit
    for (var i = 0; i < checkWall.Bricks.length; i++) {
        if(checkWall.Bricks[i].collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
            this.yVel *= -1;
            checkWall.Bricks.splice(i,1);
            g_gamescore.score();
        }
    };
        
    // Bounce off top 
    if (nextY < this.radius ) {               
        this.yVel *= -1;
    }

    //Bounce off left and right edges respectively
    if (nextX < this.radius ||
        nextX > g_canvas.width - this.radius) {
        this.xVel *= -1;
    }
    

    if(nextY > g_canvas.height-this.radius) {
        if(g_gamescore.Lives < 1) {
            return lost();
        }
        g_gamescore.lives();
        //the ball pops up randomly on each side
        if(Math.floor(Math.random()*2)<1) this.reset();
        else this.reset2();
    }

    this.cx += this.xVel;
    this.cy += this.yVel;
};


Ball.prototype.reset = function () {
    this.cx = 10;
    this.cy = 150;
    this.xVel = 3;
    this.yVel = 3;
};

//spawning other side
Ball.prototype.reset2 = function () {
    this.cx = g_canvas.width-10;
    this.cy = 150;
    this.xVel = -3;
    this.yVel = 3;
};


Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
};