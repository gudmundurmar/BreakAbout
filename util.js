// "BreakABout"
//  by: Gudmundur Mar Gunnarsson
/*

* Make the ball bounce off the left and right 
  edges of the playfield, instead of "resetting".
  
* Add a scoring system! When the ball hits the
  left edge, the right paddle earns a point, and
  vice versa. Display each paddle's score, in
  "bold 40px Arial", at the top of the playfield 

* Prevent the paddles from moving out of the
  playfield, by having them "collide" with it.
  
* Let the user also move the paddles horizontally
  i.e. left and right within 100 pixels of the edges,
  using the 'A' and 'D' keys for the left paddle,
  and   the 'J' and 'L' keys for the right paddle
  
* Add a second ball, with half the velocity 
  of the first one.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
g_ctx.font = "bold 40px Arial";


/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =================
// KEYBOARD HANDLING
// =================

var g_keys = [];

function handleKeydown(evt) {
    g_keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
}

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    g_keys[keyCode] = false;
    return isDown;
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);



// =====
// UTILS
// =====



function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


function restart() {

    checkWall.rebuild();
    g_gamescore.restart();
    g_bomb.reset();
    g_ball.reset();
    g_ball2.reset2();
    g_shots.ammo = [];

}

function lost() {
    lose = true;
    g_ctx.globalAlpha = 1;

}

function wins() {
    win = true;
    g_ctx.globalAlpha = 1;

}

function SlowClear(ctx) {
  if(ctx.globalAlpha > 0.01) {
    ctx.globalAlpha -= 0.01;
    if(!tclear) clearCanvas(ctx);
  }
  else {
    ctx.globalAlpha = 0;
    return true;
  }
  return  false;
}


// Togglable Pause Mode
//
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP  = 'O'.charCodeAt(0);

var g_isUpdatePaused = false;

function Pause_game() {
    g_isUpdatePaused = true;  
}

function Play_game() {
    g_isUpdatePaused = false;
}

function shouldSkipUpdate() {
    if (eatKey(KEY_PAUSE)) {
        g_isUpdatePaused = !g_isUpdatePaused;
    }
    return g_isUpdatePaused && !eatKey(KEY_STEP);    
}

// Simple voluntary quit mechanism
//
var KEY_QUIT = 'Q'.charCodeAt(0);
function requestedQuit() {
    return g_keys[KEY_QUIT];
}

var g_restart = false;
var KEY_RESTART = 'R'.charCodeAt(0);
function requestedRestart() {
    return eatKey(KEY_RESTART);
}

var tclear = false;
var TOGGLE_CLEAR = 'C'.charCodeAt(0);
function toggleClear() {
    tclear = !tclear;
}


var g_colorson = false;

var KEY_DISCO = 'S'.charCodeAt(0);
function colorson() {
    return g_colorson = !g_colorson;
}

// =====================
// GENERIC UPDATE LOGIC
// =====================

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
//
var g_prevUpdateDt = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
//
var g_prevUpdateDu = null;

// Track odds and evens for diagnostic / illustrative purposes
//
var g_isUpdateOdd = false;


function update(dt) {
    
    // Get out if skipping (e.g. due to pause-mode)
    //
    if (shouldSkipUpdate()) return;

    // Remember this for later
    //
    var original_dt = dt;
    
    // Warn about very large dt values -- they may lead to error
    //
    if (dt > 200) {
        console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVAL;
    }
    
    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    //
    var du = (dt / NOMINAL_UPDATE_INTERVAL);
    
    updateSimulation(du);
    
    g_prevUpdateDt = original_dt;
    g_prevUpdateDu = du;
    
    g_isUpdateOdd = !g_isUpdateOdd;
}



