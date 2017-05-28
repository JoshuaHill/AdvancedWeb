/**
 * Created by joshuahill on 29.04.2017.
 */

/***
 * Globale Variablen
 */
// Bilder für Galerie
var galerie = [
    "../images/gallery/placeholder1.png",
    "../images/gallery/placeholder2.png",
    "../images/gallery/placeholder3.png"
];



/**
 *
 * Howl TEST
 *
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



/*******************************************************************************
 *
 * Event-Handler
 *
 *******************************************************************************/

/**
 * Music / Visualization Controls
 */
$('#playBtn').click(function () {
    sound.play();



    console.log("PRE DRAW");

    draw();
});

$('#stopBtn').click(function () {
    sound.stop();
});

/**
 * Gallery Controls
 */
// zeigt das erste Bild der Galerie an
$('#btn-gal-first').click(function () {
    document.getElementById('gal-img-counter').innerHTML = 1;
    document.getElementById('gal-image').setAttribute('src', '../images/gallery/placeholder1.png');
});

// startet die automatische Wiedergabe der Slideshow
$('#btn-gal-play').click(function () {
    var ctr;
    var currentImage = document.getElementById('gal-image').getAttribute('src');
    for(let i = 0; i < galerie.length - 1; i++) {
        if(galerie[i].localeCompare(currentImage) == 0) {
            ctr = i;
        }
    }
    console.log(ctr);
    galleryPlayback(ctr);
});

// zeigt das nächste Bild der Galerie an
$('#btn-gal-forward').click(function () {
    var currentImage = document.getElementById('gal-image').getAttribute('src');
    for(let i = 0; i < galerie.length - 1; i++) {
        if(galerie[i].localeCompare(currentImage) == 0) {
            // document.getElementById('gal-img-counter').innerHTML = i+2;
            // document.getElementById('gal-image').setAttribute('src', galerie[i+1]);
            setGalleryImage(i+2, i+1);
        }
    }
});

// zeigt das vorhergehende Bild an
$('#btn-gal-rewind').click(function () {
    var currentImage = document.getElementById('gal-image').getAttribute('src');
    for(let i = galerie.length-1; i > 0; i--) {
        if(galerie[i].localeCompare(currentImage) == 0) {
            // document.getElementById('gal-img-counter').innerHTML = i;
            // document.getElementById('gal-image').setAttribute('src', galerie[i-1]);
            setGalleryImage(i, i-1);
        }
    }
});

// pausiert die Wiedergabe der Diashow
$('#btn-gal-pause').click(function () {

});

function galleryPlayback(ctr) {

    if(ctr < galerie.length) {
        setTimeout(setGalleryImage(ctr+2, ctr+1), 3000);
        setTimeout(galleryPlayback(ctr+1), 3000);
    }

}
//
function setGalleryImage(counter, image) {
    document.getElementById('gal-img-counter').innerHTML = counter;
    document.getElementById('gal-image').setAttribute('src', galerie[image]);
}


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



