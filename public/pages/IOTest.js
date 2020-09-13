import utils from './../services/utils.js';

let IOTest = {
    before_render: async () => {
        utils.handle_css(['common', 'IOTest']);
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

const WIDTH = 1500;
const HEIGHT = 1500;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let analyzer;
let bufferLength;

async function get_video() {
    await navigator.mediaDevices
        .getUserMedia({
            video: true,
        })
        .then((stream) => {
            alert('camera is working.');
            let video = document.querySelector('#videoElement');
            video.srcObject = stream;
        })
        .catch(() => {
            alert('camera is not working.');
        });
}
async function get_audio() {
    const stream = await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            analyzer = audioCtx.createAnalyser();
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyzer);
            analyzer.fftSize = 2 ** 8;
            bufferLength = analyzer.frequencyBinCount;
            const timeData = new Uint8Array(bufferLength);
            const frequencyData = new Uint8Array(bufferLength);
            drawTimeData(timeData);
            drawFrequency(frequencyData);
            alert('Microphone is working properly.');
        })
        .catch((err) => {
            console.log(err);
            alert(
                "Couldn't get access to microphone. Please manually give access."
            );
        });
}

function drawTimeData(timeData) {
    analyzer.getByteTimeDomainData(timeData);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffc600';
    ctx.beginPath();
    const sliceWidth = WIDTH / bufferLength;
    let x = 0;
    timeData.forEach((data, i) => {
        const v = data / 128;
        const y = (v * HEIGHT) / 2;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
    });
    ctx.stroke();
    requestAnimationFrame(() => drawTimeData(timeData));
}
function drawFrequency(frequencyData) {
    analyzer.getByteFrequencyData(frequencyData);
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;
    frequencyData.forEach((amount) => {
        // 0 to 255
        const percent = amount / 255;
        const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
        const barHeight = HEIGHT * percent * 0.5;
        const [r, g, b] = hslToRgb(h, s, l);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 2;
    });
    requestAnimationFrame(() => drawFrequency(frequencyData));
}
function hslToRgb(h, s, l) {
    let r;
    let g;
    let b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export default IOTest;
// Audio Context
// Audio Context Create Analyzer
// Create media stream source
