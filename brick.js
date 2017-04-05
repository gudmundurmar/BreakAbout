// =========================
// ANOTHER BRICK IN THE WALL
// =========================

// A generic contructor which accepts an arbitrary descriptor object
function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will serve as
// shared defaults, in the absence of an instance-specific overrides.


Brick.prototype.halfWidth = 5;
Brick.prototype.halfHeight = 10;


Brick.prototype.render = function (ctx) {


    // (cx, cy) is the centre; must offset it for drawing
    // Want to leave small spaceing between bricks
    var spaceing = 1;
    
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2-spaceing,
                 this.halfHeight * 2-spaceing);
};

Brick.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var brickEdge = this.cy;
    // Check X coords
    if ((nextY - r < brickEdge && prevY - r >= brickEdge) ||
        (nextY + r > brickEdge && prevY + r <= brickEdge)) {
        // Check Y coords
        if (nextX + r >= this.cx - this.halfWidth    &&
            nextX - r <= this.cx + this.halfWidth   ) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};


