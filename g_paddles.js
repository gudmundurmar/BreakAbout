// PADDLE 1

var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_A = 'A'.charCodeAt(0);

var g_paddle1 = new Paddle({
    cx : 30,
    cy : g_canvas.height-30,
    boundaryleft: 0,
    boundaryright: g_canvas.width,
    
    GO_LEFT : KEY_A,
    GO_RIGHT : KEY_D
});

//PADDLE 2
var KEY_I = 'I'.charCodeAt(0);
var KEY_K = 'K'.charCodeAt(0);
var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);

var g_paddle2 = new Paddle({
    cx : g_canvas.width-30,
    cy : g_canvas.height-30,
    boundaryleft: 0,
    boundaryright: g_canvas.width,
    
    GO_LEFT : KEY_J,
    GO_RIGHT : KEY_L
});



