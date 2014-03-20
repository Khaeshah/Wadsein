function Cube (posx,speed) {
	this.posx = posx;	
	this.speed = speed;
}

var cube = new Image ();
cube.src = "img/box.png";

Cube.prototype = {
	posy: -100,
	h: 160,
	w: 128,
	x: undefined,
	imgCube: cube

}

Cube.prototype.render = function (ctx) {
	if(this !== undefined) {
		this.posy += this.speed;
		//Caixa a l'esquerra
		if (this.posx === -1) {
			ctx.drawImage(this.imgCube,this.posx,this.posy,this.w+40, this.h);
			this.x = 0;
		}
		//Caixa a mitja pantalla
		else if (this.posx === 0) {
			ctx.drawImage(this.imgCube,canvas.width/4-this.w+40, this.posy,this.w+40,this.h);
			this.x = canvas.width/4-this.w/2;
		}
		//Caixa a la dreta
		else {
			ctx.drawImage(this.imgCube,canvas.width/2-this.w-40,this.posy,this.w+40,this.h);
			this.x = canvas.width/2-this.w;
		}
		socket.emit('cubeUpdate',this);
	}
}

Cube.prototype.updateWithCubeData = function (data) {

	if (data === undefined) return;
	if (data.y !== undefined) this.y = data.y;

}

Cube.prototype.hitTest = function (obj) {

  return (this.x+this.w > obj.x && this.x < obj.x+obj.w &&
        this.posy+this.h > obj.y && this.posy+(2/3)*this.h < obj.y+obj.h);
}

Cube.prototype.moarHard = function () {
	this.speed += 5;
}