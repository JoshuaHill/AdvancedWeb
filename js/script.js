/**
 * Created by joshuahill on 29.04.2017.
 */

var sound = new Howl({
    src: ['../audio/chill.mp3']
});

$('#playBtn').click(function () {
    sound.play();
});

$('#stopBtn').click(function () {
    sound.stop();
});



