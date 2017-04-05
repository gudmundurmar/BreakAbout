// ========
// MUSIC
// ========


var g_song = new Audio("3B_cut.wav");

function theme() {
	g_mute = !g_mute;
    if(!g_mute) { 
    	g_song.play();
    	g_song.loop = true;
    }
    else {
	    g_song.pause();
	}
}

function theme_play() {
	g_song.play();
}

function theme_mute() {
	g_song.pause();
}

var g_mute = true;
var KEY_MUTE = 'M'.charCodeAt(0);
	