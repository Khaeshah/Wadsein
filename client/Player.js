function Player (pos,id,y) {
	this.pos = pos;
	this.id = id;
	this.y = y-75;
}


var ship = new Image ();
ship.src = "img/player.png";

var shipLEFT = new Image();
shipLEFT.src = "img/playerLeft.png";

var shipRIGHT = new Image();
shipRIGHT.src = "img/playerRight.png";

Player.prototype = {
	w: 99,
	h: 75,
	x: 190,
	imgNormal: ship,
	imgLeft: shipLEFT,
	imgRight: shipRIGHT,
	score: 0
}

Player.prototype.render = function(ctx) {
	// Jugador a l'esquerra
	if (this.pos === -1) {
		ctx.drawImage(this.imgLeft,0, canvas.height-this.h, this.w, this.h);
		this.x = 0;
	}
	// Jugador a la dreta
	else if (this.pos === 1) {
		ctx.drawImage(this.imgRight, canvas.width/2-this.w, canvas.height-this.h,this.w,this.h);
		this.x = canvas.width/2-this.w;
	}
	// Jugador a la meitat
	else {
		ctx.drawImage(this.imgNormal, canvas.width/4-this.w/2, canvas.height-this.h, this.w, this.h);
		this.x = canvas.width/4-this.w/2;
	}		
}
Player.prototype.updateWithPlayerData = function (data) {
	if (data === undefined) return;
	if (data.id !== undefined) this.id = data.id;
	if (data.pos !== undefined) this.pos = data.pos;
}

Player.prototype.setPos = function (pos) {
	this.pos = pos;
}