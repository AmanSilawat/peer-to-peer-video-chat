const socket = io('/');

const video_grid = document.getElementById('video-grid');
const local_video_element = document.createElement('video');
local_video_element.muted = true;

let peer = new Peer(undefined, {
	path: '/peerjs',
	host: '/',
	port: '3030',
});
const peers = {};

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

		socket.on('user-connected', user_id => {
			connect_to_new_user(user_id, stream);
		});

		socket.on('create-message', message => {
			document
				.querySelector('ul.messages')
				.insertAdjacentHTML('beforeend', `<li class='message'><b>user</b><br />${message}</li>`);
			document.querySelector('li.message:last-child').scrollIntoView();
		});

		socket.on('user-disconnected', user_id => {
			if (peers[user_id]) peers[user_id].close();
		});
	});

peer.on('open', id => {
	socket.emit('join-room', ROOM_ID, id);
});

const connect_to_new_user = (user_id, stream) => {
	const call = peer.call(user_id, stream);
	const video = document.createElement('video');
	call.on('stream', remote_video_stream => {
		add_video_stream(video, remote_video_stream);
	});

	call.on('close', () => {
		video.remove();
    });
    
    peers[user_id] = call;
};

const add_video_stream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	});

	video_grid.append(video);
};

const audio_on_off = () => {
	const enabled = local_video_stream.getAudioTracks()[0].enabled;

	if (enabled) {
		local_video_stream.getAudioTracks()[0].enabled = false;
		mic_unmute();
	} else {
		local_video_stream.getAudioTracks()[0].enabled = true;
		mic_mute();
	}
};

const video_on_off = () => {
	const enabled = local_video_stream.getVideoTracks()[0].enabled;

	if (enabled) {
		local_video_stream.getVideoTracks()[0].enabled = false;
		video_on();
	} else {
		local_video_stream.getVideoTracks()[0].enabled = true;
		video_off();
	}
};

const mic_mute = () => {
	document.querySelector('.mute-button').innerHTML = `<i class="fas fa-microphone"></i><span>Mute</span>`;
};

const mic_unmute = () => {
	document.querySelector(
		'.mute-button'
	).innerHTML = `<i class="unmute fas fa-microphone-slash"></i><span>Unmute</span>`;
};

const video_on = () => {
	document.querySelector('.video-button').innerHTML = `<i class="fas fa-video"></i><span>Stop Video</span>`;
};

const video_off = () => {
	document.querySelector('.video-button').innerHTML = `<i class="stop fas fa-video-slash"></i><span>Play Video</span>`;
};

document.getElementById('chat-message').addEventListener('keydown', function (e, v) {
	if (e.which == 13 && e.target.value.trim() != '') {
		socket.emit('message', e.target.value);
		e.target.value = '';
	}
});
