// =============
// SCORING STUFF
// =============
var g_gamescore = {
    Score : 0,
    Highscore : localhighscore(),
    Lives : 1
}

function localhighscore() {
    if(localStorage.getItem("highscore")) {
        return localStorage.getItem("highscore");
    }
    else {
        localStorage.setItem('highscore', 0);
        return 0;
    }
}

g_gamescore.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.font = "bold 30px Sans";
    ctx.fillText( g_gamescore.Score, g_canvas.width/2-50, 30);
    //
    ctx.fillText( g_gamescore.Highscore, g_canvas.width-70, 30);
    ctx.fillText( g_gamescore.Lives + " lives", g_canvas.width/2+50, g_canvas.height);
    ctx.font = "bold 20px Sans";
    ctx.fillText( "Highscore", g_canvas.width/2+30, 30);
    ctx.fillText( "Current Score", 20, 30);
    ctx.fillText( "Bomb Count", g_canvas.height, 30);
};

g_gamescore.lives = function() {
	g_gamescore.Lives -= 1;
}
g_gamescore.score = function() {
    g_gamescore.Score += 1;
    if(g_gamescore.Score > g_gamescore.Highscore){
    	g_gamescore.Highscore = g_gamescore.Score;
        localStorage.setItem('highscore', g_gamescore.Score);	
    }
}

g_gamescore.gover = function(ctx) {
    ctx.globalAlpha = 1; 
    ctx.save();
    ctx.font = "bold 40px Sans";

    var gradient = ctx.createRadialGradient(5, 0.3, 0.0, 5, 0.01, 450);
    gradient.addColorStop(0,"yellow");
    gradient.addColorStop(0.2,"black");
    gradient.addColorStop(0.4, "#FEE00D");
    gradient.addColorStop(0.93, "orange");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;

    ctx.fillText("BreakABout", 30, 100);
    ctx.font = "bold 60px Sans";
    ctx.fillText( g_gamescore.Score, g_canvas.width-100, 200);
    ctx.fillText( g_gamescore.Highscore, g_canvas.width-100, 300);
    ctx.font = "bold 30px Sans";
    ctx.fillText("HIGHSCORE ", 30, 290);
    ctx.fillText("SCORE " , 30, 190);
    ctx.fillText("Press R to Restart " , 150, 390);
    ctx.font = "bold 20px Sans";
    ctx.fillText("Program and music by " , 20, 320);
    ctx.fillText("Gudmundur Mar Gunnarsson " , 70, 340);
    ctx.restore();
}

g_gamescore.winner = function(ctx) {
    
    ctx.globalAlpha = 1; 
    ctx.save();
    ctx.font = "bold 40px Sans";

    var gradient = ctx.createRadialGradient(5, 0.3, 0.0, 5, 0.01, 450);
    gradient.addColorStop(0,"yellow");
    gradient.addColorStop(0.2,"black");
    gradient.addColorStop(0.4, "#FEE00D");
    gradient.addColorStop(0.93, "orange");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;

    ctx.fillText("BreakABout", 30, 100);
    ctx.font = "bold 60px Sans";
    
    ctx.fillText( g_gamescore.Highscore, g_canvas.width-100, 300);
    ctx.font = "bold 30px Sans";

    ctx.fillText("ULTIMATE HIGHSCORE " , 30, 230);
    
    if(localStorage.getItem('highscorers') !== null) {
        var no_of_highscorers = parseInt(localStorage.getItem('highscorers'))+1;
        localStorage.setItem('highscorers', no_of_highscorers);
        ctx.fillText("A true champion has " , 30, 130);
        ctx.fillText("competed here "+no_of_highscorers + " times" , 60, 160);
    }
    else {
        ctx.fillText("You are the first one here! " , 30, 130);
        ctx.fillText("You have reached the " , 30, 190);
        localStorage.setItem("highscorers", 1);
    }
    

    ctx.fillText("Press R to Restart " , 150, 390);
    ctx.font = "bold 20px Sans";
    ctx.fillText("Program and music by " , 20, 320);
    ctx.fillText("Gudmundur Mar Gunnarsson " , 70, 340);
    ctx.restore();
}

g_gamescore.restart = function() {
    this.Score = 0;
    this.Lives = 1;
}
