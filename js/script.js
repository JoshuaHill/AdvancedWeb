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
    document.getElementById('about-subsection').innerHTML = "<div id=\"accordion\">" +
    "<h3>Was ist Muse:Viz?</h3>" +
    "<div>" +
    "<p>" +
    "Muse:Viz ist eine Webapplikation, die es dem Nutzer ermöglicht Visualisierungen für seine Musik zu erstellen. " +
    "</p>" +
    "</div>" +
    "<h3>Warum Muse:Viz?</h3>" +
    "<div>" +
    "<p>" +
    "Muse:Viz wurde im Rahmen der Veranstaltung Advanced Web Programming an der Hochschule der Medien erstellt und soll ein Beispiel für moderne" +
        " Webprogrammierung mit einem Schwerpunkt auf Visualisierung darstellen." +
    "</p>" +
    "</div>" +
    "<h3>Verwendete Libraries</h3>" +
    "<div>" +
    "<ul>" +
        "<li class=\"lib-list\">" +
        "<a href=\"http://bulma.io\">" +
        "<article class=\"media\">" +
        "<figure class=\"media-left\">" +
        "<p class=\"image is-64x64\">" +
        "<img src=\"../images/logos/bulma-logo-small.png\">" +
        "</p>" +
        "</figure>" +
        "<div class=\"media-content\">" +
        "<div class=\"content\">" +
        "<p>" +
        "<strong>Bulma</strong>" +
        "<br>" +
        "Bulma is an open source CSS framework based on Flexbox and built with Sass. It's 100% responsive, fully modular, and available for free." +
    "</p>" +
    "</div>" +
    "</div>" +
    "</article>" +
    "</a>" +
    "</li>" +
    "<li class=\"lib-list\">" +
    "<a href=\"https://jquery.com/\">" +
    "<article class=\"media\">" +
    "<figure class=\"media-left\">" +
    "<p class=\"image is-64x64\">" +
    "<img src=\"../images/logos/jquery-logo-small.png\">" +
    "</p>" +
    "</figure>" +
    "<div class=\"media-content\">" +
    "<div class=\"content\">" +
    "<p>" +
    "<strong>jQuery</strong>" +
    "<br>" +
    "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers." +
    "</p>" +
    "</div>" +
    "</div>" +
    "</article>" +
    "</a>" +
    "</li>" +
    "<li class=\"lib-list\">" +
    "<a href=\"https://jqueryui.com/\">" +
    "<article class=\"media\">" +
    "<figure class=\"media-left\">" +
    "<p class=\"image is-64x64\">" +
    "<img src=\"../images/logos/jqueryui-logo-small.png\">" +
    "</p>" +
    "</figure>" +
    "<div class=\"media-content\">" +
    "<div class=\"content\">" +
    "<p>" +
    "<strong>jQuery UI</strong>" +
    "<br>" +
    "jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library." +
    "</p>" +
    "</div>" +
    "</div>" +
    "</article>" +
    "</a>" +
    "</li>" +
    "<li class=\"lib-list\">" +
    "<a href=\"https://d3js.org/\">" +
    "<article class=\"media\">" +
    "<figure class=\"media-left\">" +
    "<p class=\"image is-64x64\">" +
    "<img src=\"../images/logos/d3-logo-small.png\">" +
    "</p>" +
    "</figure>" +
    "<div class=\"media-content\">" +
    "<div class=\"content\">" +
    "<p>" +
    "<strong>D3.js</strong>" +
    "<br>" +
    "D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS." +
    "</p>" +
    "</div>" +
    "</div>" +
    "</article>" +
    "</a>" +
    "</li>" +
    "<li class=\"lib-list\">" +
    "<a href=\"https://howlerjs.com/\">" +
    "<article class=\"media\">" +
    "<figure class=\"media-left\">" +
    "<p class=\"image is-64x64\">" +
    "<img src=\"../images/logos/howler-logo-small.png\">" +
    "</p>" +
    "</figure>" +
    "<div class=\"media-content\">" +
    "<div class=\"content\">" +
    "<p>" +
    "<strong>Howler.js</strong>" +
    "<br>" +
    "howler.js is an audio library for the modern web. It defaults to Web Audio API and falls back to HTML5 Audio. This makes working with audio in JavaScript easy and reliable across all platforms." +
    "</p>" +
    "</div>" +
    "</div>" +
    "</article>" +
    "</a>" +
    "</li>";
    "</ul>" +
    "</div>" +
    "</div>";

    // load accordion
    $( "#accordion" ).accordion({
        heightStyle: "content"
    });


});

$('#about-imprint').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-info').setAttribute("class", "");
    document.getElementById('about-privacy').setAttribute("class", "");
    this.setAttribute("class", "is-active");

    // Load HTML for subsection
    document.getElementById('about-subsection').innerHTML =
    "<h1 class=\"title\">Impressum</h1> <h2 class=\"subtitle about-subtitle\">Angaben gem&auml;&szlig; &sect; 5 TMG:</h2> <p>Max Mustermann<br /> Musterstra&szlig;e 111<br /> Geb&auml;ude 44<br /> 90210 Musterstadt </p> <h2 class=\"subtitle about-subtitle\">Kontakt:</h2> <table> <tr><td>Telefon:</td><td>+49 (0) 123 44 55 66</td></tr> <tr><td>Telefax:</td><td>+49 (0) 123 44 55 99</td></tr> <tr><td>E-Mail:</td> <td>mustermann@musterfirma.de</td> </tr></table> <h2 class=\"subtitle about-subtitle\">Haftung f&uuml;r Inhalte</h2> <p>Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.</p> <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p> <h2 class=\"subtitle about-subtitle\">Haftung f&uuml;r Links</h2> <p>Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p> <p>Eine permanente" +
    "inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p> <h2 class=\"subtitle about-subtitle\">Urheberrecht</h2> <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.</p> <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p><p>&nbsp;</p> <p>Quelle: <a href=\"https://www.e-recht24.de\">https://www.e-recht24.de</a></p>";
});

$('#about-privacy').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-info').setAttribute("class", "");
    document.getElementById('about-imprint').setAttribute("class", "");
    this.setAttribute("class", "is-active");

    // Load HTML for subsection
    document.getElementById('about-subsection').innerHTML =
    "<h1 class=\"title\">Datenschutzerkl&auml;rung</h1> <h2 class=\"subtitle about-subtitle\">Datenschutz</h2> <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p> <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten m&ouml;glich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit m&ouml;glich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdr&uuml;ckliche Zustimmung nicht an Dritte weitergegeben.</p> <p>Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet" +
    "(z.B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.</p><p>&nbsp;</p> <h2 class=\"subtitle about-subtitle\"> Cookies</h2> <p>Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.</p> <p>Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gel&ouml;scht. Andere Cookies bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie diese l&ouml;schen. Diese Cookies erm&ouml;glichen es uns, Ihren Browser beim n&auml;chsten Besuch wiederzuerkennen.</p> <p>Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie &uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschlie&szlig;en sowie das automatische L&ouml;schen der Cookies beim Schlie&szlig;en des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.</p><p>&nbsp;</p> <h2 class=\"subtitle about-subtitle\">Server-Log- Files</h2> <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log Files, die Ihr Browser automatisch an uns &uuml;bermittelt. Dies sind:</p> <ul> <li> Browsertyp und Browserversion</li> <li>verwendetes Betriebssystem</li> <li>Referrer URL</li> <li> Hostname des zugreifenden Rechners</li> <li>Uhrzeit der Serveranfrage</li> </ul> <p><br />Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachtr&auml;glich zu pr&uuml;fen, wenn uns konkrete Anhaltspunkte f&uuml;r eine rechtswidrige Nutzung bekannt werden.</p> <p>&nbsp;</p> <h2 class=\"subtitle about-subtitle\">Kontaktformular</h2> <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p><p>&nbsp;</p> <p>Quelle: <a href=\"https://www.e-recht24.de\">eRecht24</a></p>";
});



/*******************************************************************************
 *
 * Contact-Page
 *
 *******************************************************************************/
$('#contact-mail').on('click', function (event) {
    // set menu item to active
    document.getElementById('contact-phone').setAttribute("class", "");
    document.getElementById('contact-mail').setAttribute("class", "is-active");

    // load HTML for subsection
    document.getElementById('contact-subsection').innerHTML =
        "<div class=\"field\">" +
        "<label class=\"label\">Name</label>" +
        "<p class=\"control\">" +
        "<input class=\"input\" type=\"text\" placeholder=\"Text input\">" +
        "</p>" +
        "</div>" +
        "<div class=\"field\">" +
        "<label class=\"label\">Username</label>" +
        "<p class=\"control has-icons-left has-icons-right\">" +
        "<input class=\"input is-success\" type=\"text\" placeholder=\"Text input\" value=\"bulma\">" +
        "<span class=\"icon is-small is-left\">" +
        "<i class=\"fa fa-user\"></i>" +
        "</span>" +
        "<span class=\"icon is-small is-right\">" +
        "<i class=\"fa fa-check\"></i>" +
        "</span>" +
        "</p>" +
        "<p class=\"help is-success\">This username is available</p>" +
        "</div>" +
        "<div class=\"field\">" +
        "<label class=\"label\">Email</label>" +
        "<p class=\"control has-icons-left has-icons-right\">" +
        "<input class=\"input is-danger\" type=\"text\" placeholder=\"Email input\" value=\"hello@\">" +
        "<span class=\"icon is-small is-left\">" +
        "<i class=\"fa fa-envelope\"></i>" +
        "</span>" +
        "<span class=\"icon is-small is-right\">" +
        "<i class=\"fa fa-warning\"></i>" +
        "</span>" +
        "</p>" +
        "<p class=\"help is-danger\">This email is invalid</p>" +
        "</div>" +

        "<div class=\"field\">" +
        "<label class=\"label\">Message</label>" +
        "<p class=\"control\">" +
        "<textarea class=\"textarea\" placeholder=\"Textarea\"></textarea>" +
        "</p>" +
        "</div>";


});

$('#contact-phone').on('click', function (event) {
    // set menu item to active
    document.getElementById('contact-mail').setAttribute("class", "");
    document.getElementById('contact-phone').setAttribute("class", "is-active");

    // get time
    var time = new Date;

    // load HTML for subsection
    document.getElementById('contact-subsection').innerHTML = "" +
        "Telefon: 0711/123-456-789 <br>" +
        "Von Montag bis Freitag 10:00 - 16:00 <br><br><span id=\"open-close\"></span>";

    // show open or closed message according to time
    if(time.getHours() >= 10 && time.getHours() <=16) {
        document.getElementById("open-close").innerHTML = "<h1 class=\"subtitle\" id=\"open\">WE ARE OPEN!</h1>";
    } else {
        document.getElementById("open-close").innerHTML = "<h1 class=\"subtitle\" id=\"closed\">SORRY WE ARE CLOSED!</h1>";
    }
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



