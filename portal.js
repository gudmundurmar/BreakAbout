// ============
// PORTAL STUFF
// ============

function Portal(descr) {
    for (var property in descr) {
       this[property] = descr[property];
    }
}

Portal.prototype = new Paddle();
Portal.prototype.constructor = Portal;

Portal.prototype.update = function(dt) {
    var nextX = this.cx + this.velX * dt;
    if(nextX-this.halfWidth < this.boundaryleft) {
            this.cx = this.boundaryleft+this.halfWidth;
            this.velX *= -1;
        }

    else if(nextX+this.halfWidth >this.boundaryright) {
            this.cx = this.boundaryright-this.halfWidth;
            this.velX *= -1;
        }
    this.cx += this.velX * dt;
}

Portal.prototype.halfWidth = 15;
Portal.prototype.halfHeight = 4;

