// ============
// PADDLE STUFF
// ============

function Paddle(descr) {
    for (var property in descr) {
       this[property] = descr[property];
    }
}

Paddle.prototype = new Brick();
Paddle.prototype.constructor = Paddle;

Paddle.prototype.updateVel = function(vel) {        

        var nextY = this.cy + this.yVel * dt;
        
}

Paddle.prototype.update = function (dt) {

    if (g_keys[this.GO_UP]) {
        this.cy -= 5 * dt;
        if(this.cy - this.halfHeight < 100) {
            this.cy = 100+this.halfHeight;
        }
    } else if (g_keys[this.GO_DOWN]) {
        this.cy += 5 * dt;
        if(this.cy + this.halfHeight > g_canvas.width -100) {
            this.cy = g_canvas.width - this.halfHeight - 100;
        }
    } else if (g_keys[this.GO_LEFT]) {
        this.cx -= 5 * dt;
        if(this.cx-this.halfWidth < this.boundaryleft) {
            this.cx = this.boundaryleft+this.halfWidth;
        }
    } else if (g_keys[this.GO_RIGHT]) {
        this.cx += 5 * dt;
        if(this.cx+this.halfWidth >this.boundaryright) {
            this.cx = this.boundaryright-this.halfWidth;
        }
    }
};

Paddle.prototype.halfWidth = 50;
Paddle.prototype.halfHeight = 10;