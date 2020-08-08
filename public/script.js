const socket = io('/');

const video_grid = document.getElementById('video-grid');
const local_video_element = document.createElement('video');
local_video_element.muted = true;

let peer = new Peer(undefined, {
	path: '/peerjs',
	host: '/',
	port: '3030',
});
let local_video_stream;
navigator.mediaDevices
	.getUserMedia({
		audio: true,
		video: true,
	})
	.then(stream => {
		local_video_stream = stream;
        add_video_stream(local_video_element, stream);

        peer.on('call', call => {
            call.answer(stream);
            const video = document.createElement('video');
            call.on('stream', remote_video_stream => {
                add_video_stream(video, remote_video_stream);
            });
        });
        
        socket.on('user-connected', (user_id) => {
            connect_to_new_user(user_id, stream);
        });
	});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

const connect_to_new_user = (user_id, stream) => {
    const call = peer.call(user_id, stream);
    const video = document.createElement('video');
    call.on('stream', remote_video_stream => {
        add_video_stream(video, remote_video_stream);
    });
};

const add_video_stream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	});

	video_grid.append(video);
};