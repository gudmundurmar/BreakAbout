
// ==============
// THE GREAT WALL
// ==============
function Wall(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    var bricklength = 30;
    var brickheight = 10;
}

Wall.prototype.Bricks = [];

Wall.prototype.addBrick = function (x, y, hh, hw) {
    var brick = new Brick({
        cx:x,
        cy:y,
        boundaryright: g_canvas.width, 
        boundaryleft: 0,
        halfHeight: hh,
        halfWidth: hw,
        color: "black"
    });

    this.Bricks.push(brick);
}

Wall.prototype.rebuild = function() {
    this.Bricks = [];
    this.makeWall(10,6,80);
}

Wall.prototype.makeWall = function(columns, rows, height) {
    //nag
    var starting_height = 40;

    var w = g_canvas.width;
    var h = height+starting_height;
    //brick rows
    var br_row = w/columns;
    var br_col = height/rows;

    //starting width
    var posw = br_row/2;
    var posh = starting_height + br_col/2;


    while(posh < h)
    {
        while(posw < w) {
            this.addBrick(posw, posh, br_col/2, br_row/2);
            posw += br_row;
        }
        posh += br_col;
        posw = br_row/2;
    }
}

function color(col) {
    switch(col) {
        case(0):return "purple";
        case(1):return "red";
        case(2):return "blue";
        case(3):return "yellow";
        case(4):return "black";
        default:return "orange";
    }
}


Wall.prototype.update = function(dt) {
    if (eatKey(KEY_DISCO)) colorson();
    //the winning screen is called
    if(this.Bricks.length === 0) wins();
    
    for (var j = 0; j < this.Bricks.length; j++) {
        if(g_colorson) {
            this.Bricks[j].color = color(Math.floor((Math.random()*6)));
        }
    };
    
}

Wall.prototype.render = function(ctx) {
    ctx.save();
    for (var i = 0; i < this.Bricks.length; i++) {
        g_ctx.fillStyle = this.Bricks[i].color;
        this.Bricks[i].render(ctx);
    };
    ctx.restore();
}


var checkWall  = new Wall();
checkWall.makeWall(10, 6, 80);


