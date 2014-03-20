function Cube () {

}

Cube.prototype = {
	posy: 0
}

Cube.prototype.updateWithCubeData = function (data) {

	if (data === undefined) return;
	if (data.posy !== undefined) this.posy = data.posy;

}

module.exports = Cube;