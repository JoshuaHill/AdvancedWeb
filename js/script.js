/**
 * Created by joshuahill on 29.04.2017.
 */




var sound = new Howl({
    volume: 0.5,
    src: ['../audio/chill.mp3']
});


var analyser = Howler.ctx.createAnalyser();
Howler.masterGain.connect(analyser);
analyser.connect(Howler.ctx.destination);

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);



$('#playBtn').click(function () {
    sound.play();



    console.log("PRE DRAW");

    draw();
});

$('#stopBtn').click(function () {
    sound.stop();
});

function draw() {
    console.log("DRAW");
    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {
        console.log("YES");
        var canvasContext = canvas.getContext("2d");

        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        canvasContext.fillStyle = 'rgb(255, 255, 255)';
        canvasContext.fillRect(0, 0, 400, 300);
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = 'rgb(3, 209, 178)';
        canvasContext.beginPath();
        var sliceWidth = 400 * 1.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * 300 / 2;

            if(i===0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasContext.lineTo(canvasContext.width, canvasContext.height/2);
        canvasContext.stroke();

    }

};



