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
 * About-Page
 *
 *******************************************************************************/
$('#about-info').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-imprint').setAttribute("class", "");
    document.getElementById('about-privacy').setAttribute("class", "");
    this.setAttribute("class", "is-active");
    // Load HTML for subsection
    document.getElementById('about-subsection').innerHTML = "";

});
$('#about-imprint').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-info').setAttribute("class", "");
    document.getElementById('about-privacy').setAttribute("class", "");
    this.setAttribute("class", "is-active");
    // Load HTML for subsection
    document.getElementById('about-subsection').innerHTML =
    "<h1>Impressum</h1> <h2>Angaben gem&auml;&szlig; &sect; 5 TMG:</h2> <p>Max Mustermann<br /> Musterstra&szlig;e 111<br /> Geb&auml;ude 44<br /> 90210 Musterstadt </p> <h2>Kontakt:</h2> <table> <tr><td>Telefon:</td><td>+49 (0) 123 44 55 66</td></tr> <tr><td>Telefax:</td><td>+49 (0) 123 44 55 99</td></tr> <tr><td>E-Mail:</td> <td>mustermann@musterfirma.de</td> </tr></table> <h2>Haftung f&uuml;r Inhalte</h2> <p>Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.</p> <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p> <h2>Haftung f&uuml;r Links</h2> <p>Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p> <p>Eine permanente" +
    "inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p> <h2>Urheberrecht</h2> <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.</p> <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p><p>&nbsp;</p> <p>Quelle: <a href=\"https://www.e-recht24.de\">https://www.e-recht24.de</a></p>";
});
$('#about-privacy').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-info').setAttribute("class", "");
    document.getElementById('about-imprint').setAttribute("class", "");
    this.setAttribute("class", "is-active");
    // Load HTML for subsection
    document.getElementById('about-subsection').innerHTML =
    "<h1>Datenschutzerkl&auml;rung</h1> <h2>Datenschutz</h2> <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p> <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten m&ouml;glich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit m&ouml;glich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdr&uuml;ckliche Zustimmung nicht an Dritte weitergegeben.</p> <p>Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet" +
    "(z.B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.</p><p>&nbsp;</p> <h2> Cookies</h2> <p>Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.</p> <p>Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gel&ouml;scht. Andere Cookies bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie diese l&ouml;schen. Diese Cookies erm&ouml;glichen es uns, Ihren Browser beim n&auml;chsten Besuch wiederzuerkennen.</p> <p>Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie &uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschlie&szlig;en sowie das automatische L&ouml;schen der Cookies beim Schlie&szlig;en des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.</p><p>&nbsp;</p> <h2>Server-Log- Files</h2> <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log Files, die Ihr Browser automatisch an uns &uuml;bermittelt. Dies sind:</p> <ul> <li> Browsertyp und Browserversion</li> <li>verwendetes Betriebssystem</li> <li>Referrer URL</li> <li> Hostname des zugreifenden Rechners</li> <li>Uhrzeit der Serveranfrage</li> </ul> <p><br />Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachtr&auml;glich zu pr&uuml;fen, wenn uns konkrete Anhaltspunkte f&uuml;r eine rechtswidrige Nutzung bekannt werden.</p> <p>&nbsp;</p> <h2>Kontaktformular</h2> <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p><p>&nbsp;</p> <p>Quelle: <a href=\"https://www.e-recht24.de\">eRecht24</a></p>";
});
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
    setTimeout(function () {
        console.log("Hallo");
    }, 3000);
   galleryPlayback(ctr);
});

// zeigt das nächste Bild der Galerie an
$('#btn-gal-forward').click(function () {
    var currentImage = document.getElementById('gal-image').getAttribute('src');
    for(let i = 0; i < galerie.length - 1; i++) {
        if(galerie[i].localeCompare(currentImage) == 0) {
            setGalleryImage(i+2, i+1);
        }
    }
});

// zeigt das vorhergehende Bild an
$('#btn-gal-rewind').click(function () {
    var currentImage = document.getElementById('gal-image').getAttribute('src');
    for(let i = galerie.length-1; i > 0; i--) {
        if(galerie[i].localeCompare(currentImage) == 0) {
            setGalleryImage(i, i-1);
        }
    }
});

// pausiert die Wiedergabe der Diashow
$('#btn-gal-pause').click(function () {

});

function galleryPlayback(ctr) {

    if(ctr+1 < galerie.length) {
        setTimeout(function(){setGalleryImage(ctr+2, ctr+1);}, 3000);
        setTimeout(function(){galleryPlayback(ctr+1);}, 3500);
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

/**
 *
 * INIT
 *
 **/

// Load on Startup
$(document).ready(function() {
    // DO SOMETHING
});



