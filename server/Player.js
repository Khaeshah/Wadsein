function Player (pos,id) {
	this.pos = pos;
	this.id = id;
}
Player.prototype.updateWithPlayerData = function (data) {

	if (data === undefined) return;
	if (data.id !== undefined) this.id = data.id;
	if (data.pos !== undefined) this.pos = data.pos;
	console.log("HE RESTAT 1");
}

Player.prototype.moveLeft = function () {
	this.pos = -1;
}
module.exports = Player;