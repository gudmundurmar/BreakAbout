// ========
// MAINLOOP
// ========
/*
function mainIter() {
    if (!requestedQuit()) {
        gatherInputs();
        updateSimulation();
        renderSimulation(g_ctx);
    } else {
        window.clearInterval(intervalID);
    }
}


// ..and this is how we set it all up, by requesting a recurring periodic
// "timer event" which we can use as a kind of "heartbeat" for our game.
//
var intervalID = window.setInterval(mainIter, 16.666);

//window.focus();*/


function mainInit() {
    g_main.init();
}



// =============
// PRELOAD STUFF
// =============


/*function preloadStuff_thenCall(completionCallback) {
    //messing around and made it myself...No copyright infringement
    g_song = new Audio();
    
    g_song.onload = function () { 
        g_song.play();
        completionCallback();
    };
    
    g_song.src = "BeatS_mix.wav";
    //g_shipImage.src = "https://notendur.hi.is/~pk/308G/images/ship.png";
}*/




// ========
// MAINLOOP
// ========

// The mainloop is one big object with a fairly small public interface
// (e.g. init, iter, gameOver), and a bunch of private internal helper methods.
//
// The "private" members are identified as such purely by the naming convention
// of having them begin with a leading underscore. A more robust form of privacy,
// with genuine name-hiding *is* possible in JavaScript (via closures), but I 
// haven't adopted it here.
//
var g_main = {
    
    // "Frame Time" is a (potentially high-precision) frame-clock for animations
    _frameTime_ms : null,
    _frameTimeDelta_ms : null

};

// Perform one iteration of the mainloop
g_main.iter = function (frameTime) {
    
    // Use the given frameTime to update all of our game-clocks
    this._updateClocks(frameTime);
    
    // Perform the iteration core to do all the "real" work
    this._iterCore(this._frameTimeDelta_ms);
    
    // Request the next iteration if needed
    if (!this._isGameOver) this._requestNextIteration();
};

g_main._updateClocks = function (frameTime) {
    
    // First-time initialisation
    if (this._frameTime_ms === null) this._frameTime_ms = frameTime;
    
    // Track frameTime and its delta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
};


var lose = false;
var win = false;
var waiting = false;

g_main._iterCore = function (dt) {
    //if song has been muted
    if(eatKey(KEY_MUTE)) theme();

    if(eatKey(TOGGLE_CLEAR)) toggleClear();

    // Handle RESTART
    if(requestedRestart()) {
        restart();
        waiting = false;
        return;
    }
    //Handle if lost
    else if(lose) {
    	
        if(SlowClear(g_ctx)) {
            g_gamescore.gover(g_ctx);
            lose = false;
            waiting = true;
        	return;	
    	}
    	
    }
    else if(win) {
        if(SlowClear(g_ctx)) {
            g_gamescore.winner(g_ctx);
            win = false;
            waiting = true;
            return; 
        }
    }
    //Waiting to restart
    else if(waiting) {
        return;
    }
    //Handle Quit
    else if (requestedQuit()) {
        this.gameOver();

        return;
    }
    else {
    
	    gatherInputs();
	    update(dt);
	    
	}

    renderSimulation(g_ctx);
};

g_main._isGameOver = false;

g_main.gameOver = function () {
    this._isGameOver = true;
    console.log("Quitting...");
};


// Annoying shim for Firefox and Safari
window.requestAnimationFrame = 
    window.requestAnimationFrame ||        // Chrome
    window.mozRequestAnimationFrame ||     // Firefox
    window.webkitRequestAnimationFrame;    // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
    g_main.iter(frameTime);
}

g_main._requestNextIteration = function () {
    window.requestAnimationFrame(mainIterFrame);
};

g_main.init = function () {
    
    // Grabbing focus is good, but it sometimes screws up jsfiddle,
    // so it's a risky option during "development"
    //
    window.focus(true);
    //plays our theme song
    theme();
    this._requestNextIteration();
};


mainInit();
//preloadStuff_thenCall(mainInit);