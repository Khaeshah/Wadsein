
var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Player = require('./Player');

var players = {};
var cubes = {};

io.sockets.on('connection', function (socket) {

	// Envía la llista dels players actuals al nou jugador
	for (var playerId in players) {
		socket.emit('playerUpdate', players[playerId]);
	}

	// Crea el nou player i l'envia a tothom
	var player = new Player(0,socket.id);
	players[socket.id] = player;
	io.sockets.emit('playerUpdate',player);

	socket.on('playerUpdate', function (playerData) {
		var player = players[socket.id];
		if (player !== undefined) player.updateWithPlayerData(playerData);
		socket.broadcast.emit('playerUpdate', player);
	});

	socket.on('cubeUpdate', function (cubeData) {
		var cube = cubes[socket.id];
		if (cube !== undefined) cube.updateWithCubeData(cubeData);
		socket.broadcast.emit('cubeUpdate', cube);
	});
	
	socket.on('moveA', function (playerData) {
		var player = players[socket.id];
		player.pos = -1;
		io.sockets.emit('playerUpdate', player);
	});

	socket.on('moveD', function (player) {
		var player = players[socket.id];
		player.pos = 1;
		io.sockets.emit('playerUpdate', player);
	});

	socket.on('posInicial', function(player) {
		var player = players[socket.id];
		player.pos = 0;
		io.sockets.emit('playerUpdate', player);
	});

	socket.on('disconnect', function () {
		console.log(socket.id + " has disconnected from the server!");
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);
	});

});