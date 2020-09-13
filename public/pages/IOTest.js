import utils from "./../services/utils.js";

let IOTest = {
    before_render: async () => {
        utils.handle_css(["common", "IOTest"]);
    },
    render: async () => {
        return `
		<img src="./visuals/backspace-black.svg" style="border: solid 1px #ccc; position: fixed; top: 0; left: 0; padding: 10px; margin: 10px; background: #eee; z-index: 9999;" id="goBack">
		<div id="local-media" style="width: 10rem;height: 10rem;border: solid 1px #ccc;position: absolute;background-color: #454343;right: 8px;top: 10px;">
			<video autoplay="true" id="videoElement">
		</div>
		<canvas></canvas>`;
    },
    after_render: async () => {
        document.body.classList = [];
        get_video();
        get_audio();
    },
};

async function get_video() {
    await navigator.mediaDevices
        .getUserMedia({
            video: true,
        })
        .then((stream) => {
			alert("camera is working.");
			let video = document.querySelector('#videoElement');
			video.srcObject = stream;
        })
        .catch(() => {
            alert("camera is not working.");
        });
}
async function get_audio() {
    await navigator.mediaDevices
        .getUserMedia({
            audio: true,
        })
        .then((stream) => {
			alert("Mic is working.");
        })
        .catch(() => {
            alert("Mic is not working.");
        });
}

export default IOTest;
