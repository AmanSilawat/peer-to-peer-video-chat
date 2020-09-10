const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
	debug: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
	res.render('index');
});

io.on('connection', socket => {
	socket.on('join-room', (room_id, user_id) => {
		socket.join(room_id);
		socket.to(room_id).broadcast.emit('user-connected', user_id);

		socket.on('message', message => {
			io.to(room_id).emit('create-message', message);
		});

		socket.on('disconnect', () => {
			socket.to(room_id).broadcast.emit('user-disconnected', user_id);
		});
	});
});
server.listen(process.env.PORT || 3030);
