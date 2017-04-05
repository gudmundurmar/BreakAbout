function Shots(descr) {
	for (var property in descr) {
        this[property] = descr[property];
    }
}

Shots.prototype.ammo = [];

Shots.prototype.reset = function() {
	g_shots  = new Shots({
	SHOOT: KEY_W,
	SHOOT2: KEY_I
});
}

Shots.prototype.addShot = function(shooter) {
	//the board won't allow more than 10 shots
	if(this.ammo.length >10 ) return;

	//identify the shooter
	if(shooter === 1) {
		var x = g_paddle1.cx;
		var y = g_paddle1.cy;
		var w = g_paddle1.halfWidth;
	}
	else {
		var x = g_paddle2.cx;
		var y = g_paddle2.cy;
		var w = g_paddle2.halfWidth;
	}

	var shotinthedark = new Shot({
		cx : x,
		cy : y,
		yVel : -5,
		height : 20,
		width : 4
	});
	this.ammo.push(shotinthedark);
	
	
	var shotinthedark = new Shot({
		cx : x-w/4,
		cy : y,
		yVel : -5,
		height : 20,
		width : 4
	});
	this.ammo.push(shotinthedark);
	
	var shotinthedark = new Shot({
		cx : x+w/4,
		cy : y,
		yVel : -5,
		height : 20,
		width : 4
	});
	this.ammo.push(shotinthedark);
}

Shots.prototype.render = function(ctx) {
	for(var i = 0; i < this.ammo.length; i++) {
		ctx.fillRect(this.ammo[i].cx, this.ammo[i].cy-this.ammo[i].width/2,  this.ammo[i].width,this.ammo[i].height);	
	}
}

Shots.prototype.update = function(dt) {
	if(eatKey(this.SHOOT)) {
		this.addShot(1);
	}
	if(eatKey(this.SHOOT2)) {
		this.addShot(2);
	}
	for(var i = 0; i < this.ammo.length; i++) {
		var prevY = this.ammo[i].cy;
		var nextY = this.ammo[i].cy + this.ammo[i].yVel * dt;
		if(g_bomb.collidesWithShot(this.ammo[i].cx, prevY, nextY, this.ammo[i].height/2)) {
			g_bomb.reset();
		}
		//check whether the shot has gone off the field and 
		//delete it if so.
		if(nextY < 0) {
			this.ammo.splice(i,1);
			--i;
		}
		else {
			this.ammo[i].cy += this.ammo[i].yVel*dt;	
		}
	}
}

function Shot(descr) {
	for (var property in descr) {
        this[property] = descr[property];
    }
}


var g_shots  = new Shots({
	SHOOT: KEY_W,
	SHOOT2: KEY_I
});