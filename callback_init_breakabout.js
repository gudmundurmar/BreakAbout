
 var callback_breakabout = $.Callbacks();
 callback_breakabout.add(g_callback_canvas);
 callback_breakabout.add(g_callback_paddles);
 callback_breakabout.add(g_callback_portals);
 callback_breakabout.add(g_callback_wall);
 callback_breakabout.add(g_callback_balls);
 callback_breakabout.add(g_callback_bomb);

function g_callback_canvas(){
	var g_canvas = document.getElementById("myCanvas");
	var g_ctx = g_canvas.getContext("2d");
	g_ctx.font = "bold 40px Arial";
	var g_keys = [];
}


function g_callback_paddles(){
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
}

// portals
function g_callback_portals(){
	var g_portal = new Portal({
	    cx : 370,
	    cy : 200,
	    velX: -1,
	    velY: 0,
	    boundaryleft : 0,
	    boundaryright : 400
	});

	var g_portal2 = new Portal ({
	    cx : 370,
	    cy : 10,
	    velX: -1,
	    velY: 0,
	    boundaryleft : 0,
	    boundaryright : 400,
	    halfWidth: 30
	});
}

function g_callback_wall(){
	var checkWall  = new Wall();
    checkWall.makeWall(10, 6, 80);
}

function g_scoring() {
	var g_gamescore = {
    Score : 0,
    Highscore : localhighscore(),
    Lives : 1
	}
}

//balls
function g_callback_balls() {
	var g_ball = new Ball({
	    cx: 10,
	    cy: 200,
	    radius: 10,

	    xVel: 3,
	    yVel: 3
	});

	var g_ball2 = new Ball({
	    cx: g_canvas.width-10,
	    cy: 150,
	    radius: 10,

	    xVel: -3,
	    yVel: 3
	});
}

//bomb
function g_callback_bomb() {
	var g_bomb = new Bomb({
	    cx: 200,
	    cy: 15,
	    radius: 15,
	    boundaryright:g_canvas.width-15,
	    boundaryleft: 15,
	    counter:160,
	    xVel: 0,
	    yVel: 5,
	    yAcc: 0

	});
}

function g_callback_shots() {
	var g_shots  = new Shots({
		SHOOT: KEY_W,
		SHOOT2: KEY_I
	});

}
