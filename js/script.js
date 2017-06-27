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

// Options for User Settings
    // Font Sizes
const FONT_SIZE = {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    BIG: 'large',
    HUGE: 'huge'
};
    // Font Styles
const FONT_FAMILY = {
    PALATINO: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
    TIMES: "\"Times New Roman\", Times, serif",
    HELVETICA: "\"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif",
    LUCIDA: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
    COURIER: "\"Courier New\", Courier, monospace",
    CONSOLE: "\"Lucida Console\", Monaco, monospace"
};
    // Color Themes
const COLOR_THEME = {
    DARK: 'dark',
    BRIGHT: 'bright',
    INTENSE: 'intense',
    SOFT: 'soft',
    DEFAULT: 'default'
};

// Browser info
var browserAppCodeName = navigator.appCodeName;
var browserAppName = navigator.userAgent;
var browserAppVersion = navigator.appName;
var browserCookieEnabled = navigator.cookieEnabled;
var browserGeolocation = navigator.geolocation;
var browserLanguage = navigator.language;
var browserOnLine = navigator.onLine;
var browserPlatform = navigator.platform;
var browserProduct = navigator.product;
var browserUserAgent = navigator.userAgent;

// Geolocation
var userLatitude;
var userLongitude;


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
 * Settings-Page
 *
 *******************************************************************************/

$('#settings-display').on('click', function (event) {
    // set correct menu item to active
    document.getElementById('settings-language').setAttribute("class", "");
    this.setAttribute("class", "is-active");

    var ck = document.cookie;
    console.log(ck);

    $('#settings-content').load("settings/display.html", function() {
        loadSettingClickhandlers();
    });

});



$('#settings-language').on('click', function(event) {
    // set correct menu item to active
    document.getElementById('settings-display').setAttribute("class", "");
    this.setAttribute("class", "is-active");

    // Basic Cookie setup based on https://stackoverflow.com/questions/8733025/setting-persistent-cookies-with-javascript#8733385
    // Build the expiration date string:
    var expiration_date = new Date();
    var cookie_string = '';
    expiration_date.setFullYear(expiration_date.getFullYear() + 1);
    // Build the set-cookie string:
    cookie_string = "test_cookies=true; path=/; expires=" + expiration_date.toUTCString();
    // Create or update the cookie:
    document.cookie = cookie_string;
    
    $('#settings-content').load("settings/language.html", function() {
        document.getElementById('detected-lang').innerHTML = browserLanguage;
    });
});


function loadSettingClickhandlers() {
    /**
     * Schrift
     */
    $('#font-settings').on('click', function() {
        // remove active from sibling and it's children
        var themeLinks = document.getElementById("color-themes").getElementsByTagName('a');
        for(let i = 0; i < themeLinks.length; i++) {
            themeLinks[i].setAttribute("class", "");
        }
        // hide siblings children
        var themeLists = document.getElementById("color-themes").getElementsByTagName('ul');
        for(let i = 0; i < themeLists.length; i++) {
            themeLists[i].setAttribute("class", "menu-sub-list is-hidden");
        }
        // remove is-hidden modifier from child
        document.getElementById("font-styles-list").setAttribute("class", "menu-sub-list");
        // set clicked Element to active
        this.getElementsByTagName('a')[0].setAttribute("class", "is-active");
    });

    /**
     * Schrift Child 1
     * Schriftgröße
     */
    $('#font-size').on('click', function () {
        // remove active from sibling and it's children
        var fontStyleLinks = document.getElementById("font-type").getElementsByTagName('a');
        for(let i = 0; i < fontStyleLinks.length; i++) {
            fontStyleLinks[i].setAttribute("class", "");
        }
        // hide siblings children
        document.getElementById("font-type-list").setAttribute("class", "menu-sub-list is-hidden");
        // remove is-hidden modifier from child
        document.getElementById("font-size-list").setAttribute("class", "menu-sub-list");
        // set clicked Element to active
        this.getElementsByTagName('a')[0].setAttribute("class", "is-active");
    });

    /**
     * Schrift Child 2
     * Schriftart
     */
    $('#font-type').on('click', function () {
        // remove active from sibling and it's children
        var fontSizeLinks = document.getElementById("font-size").getElementsByTagName('a');
        for(let i = 0; i < fontSizeLinks.length; i++) {
            fontSizeLinks[i].setAttribute("class", "");
        }
        // hide siblings children
        document.getElementById("font-size-list").setAttribute("class", "menu-sub-list is-hidden");
        // remove is-hidden modifier from child
        document.getElementById("font-type-list").setAttribute("class", "menu-sub-list");
        // set clicked Element to active
        this.getElementsByTagName('a')[0].setAttribute("class", "is-active");
    });

        /**
         * Schriftart Child 1
         * Serif
         */
        $('#font-type-serif').on('click', function () {
           // remove active from siblings and their children
            var sansSerifLinks = document.getElementById("font-type-sans").getElementsByTagName('a');
            for(let i = 0; i < sansSerifLinks.length; i++) {
                sansSerifLinks[i].setAttribute("class", "");
            }
            var monoLinks = document.getElementById("font-type-monospace").getElementsByTagName('a');
            for(let i = 0; i < monoLinks.length; i++) {
                monoLinks[i].setAttribute("class", "");
            }
            // hide siblings children
            document.getElementById("sans-list").setAttribute("class", "menu-sub-list is-hidden");
            document.getElementById("mono-list").setAttribute("class", "menu-sub-list is-hidden");
            // remove is hidden modifier from own children
            document.getElementById("serif-list").setAttribute("class", "menu-sub-list");
            // set clicked Element to active
            this.getElementsByTagName('a')[0].setAttribute("class", "is-active");
        });


        /**
         * Schriftart Child 2
         * Sans-Serif
         */
        $('#font-type-sans').on('click', function () {
            // remove active from siblings and their children
            var serifLinks = document.getElementById("font-type-serif").getElementsByTagName('a');
            for(let i = 0; i < serifLinks.length; i++) {
                serifLinks[i].setAttribute("class", "");
            }
            var monoLinks = document.getElementById("font-type-monospace").getElementsByTagName('a');
            for(let i = 0; i < monoLinks.length; i++) {
                monoLinks[i].setAttribute("class", "");
            }
            // hide siblings children
            document.getElementById("serif-list").setAttribute("class", "menu-sub-list is-hidden");
            document.getElementById("mono-list").setAttribute("class", "menu-sub-list is-hidden");
            // remove is hidden modifier from own children
            document.getElementById("sans-list").setAttribute("class", "menu-sub-list");
            // set clicked Element to active
            this.getElementsByTagName('a')[0].setAttribute("class", "is-active");
        });

        /**
         * Schriftart Child 3
         * Monospace
         */
        $('#font-type-monospace').on('click', function () {
            // remove active from siblings and their children
            var sansSerifLinks = document.getElementById("font-type-sans").getElementsByTagName('a');
            for(let i = 0; i < sansSerifLinks.length; i++) {
                sansSerifLinks[i].setAttribute("class", "");
            }
            var serifLinks = document.getElementById("font-type-serif").getElementsByTagName('a');
            for(let i = 0; i < serifLinks.length; i++) {
                serifLinks[i].setAttribute("class", "");
            }
            // hide siblings children
            document.getElementById("sans-list").setAttribute("class", "menu-sub-list is-hidden");
            document.getElementById("serif-list").setAttribute("class", "menu-sub-list is-hidden");
            // remove is hidden modifier from own children
            document.getElementById("mono-list").setAttribute("class", "menu-sub-list");
            // set clicked Element to active
            this.getElementsByTagName('a')[0].setAttribute("class", "is-active");
        });


    /**
     * Farbschemas
     */
    $('#color-themes').on('click', function() {
        // remove active from sibling and it's children
        var fontLinks = document.getElementById("font-settings").getElementsByTagName('a');
        for(let i = 0; i < fontLinks.length; i++) {
            fontLinks[i].setAttribute("class", "");
        }
        // hide siblings children
        var fontLists = document.getElementById("font-settings").getElementsByTagName('ul');
        for(let i = 0; i < fontLists.length; i++) {
            fontLists[i].setAttribute("class", "menu-sub-list is-hidden");
        }
        // remove is-hidden modifier from child
        document.getElementById("color-themes-list").setAttribute("class", "menu-sub-list");
        // set clicked Element to active
        this.getElementsByTagName('a')[0].setAttribute("class", "is-active");
    });
}


/*******************************************************************************
 *
 * About-Page
 *
 *******************************************************************************/

// clickhandler for informations about website subsection
$('#about-info').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-imprint').setAttribute("class", "");
    document.getElementById('about-privacy').setAttribute("class", "");
    this.setAttribute("class", "is-active");
    // Load HTML for subsection
    $('#about-subsection').load("about/accordion.html", function () {
        // load accordion
        $( "#accordion" ).accordion({
            // TODO was sieht besser aus content oder auto?
            heightStyle: "content"
            // heightStyle: "auto"
        });
    });
});

// clickhandler for Imprint subsection
$('#about-imprint').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-info').setAttribute("class", "");
    document.getElementById('about-privacy').setAttribute("class", "");
    this.setAttribute("class", "is-active");

    // Load HTML for subsection
    $('#about-subsection').load("about/imprint.html", function () {

    });

});

// clickhandler for privacy subsection
$('#about-privacy').on('click', function(event) {
    // Set correct menu item to active
    document.getElementById('about-info').setAttribute("class", "");
    document.getElementById('about-imprint').setAttribute("class", "");
    this.setAttribute("class", "is-active");

    // Load HTML for subsection
    document.getElementById('about-subsection').innerHTML =
    $('#about-subsection').load("about/privacy.html", function () {

    });
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
    $('#contact-subsection').load("contact/mail.html", function() {

    });


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


function validateForm() {

    var email = document.forms["contactForm"]["formEmail"].value;
    var name = document.forms["contactForm"]["formName"].value;
    var subject = document.forms["contactForm"]["formSubject"].value;
    var message = document.forms["contactForm"]["formMessage"].value;

    var emailStatus = emailCheck(email);
    var nameStatus = nameCheck(name);
    var subjectStatus = subjectCheck(subject);
    var messageStatus = messageCheck(message);

    console.log("IN");

    if(emailStatus != "ok") {
        document.getElementById("error-email").innerHTML = emailStatus;
        document.getElementById("warning-email").setAttribute("class", "");
        document.querySelector("#warning-email > span > i").setAttribute("class", "fa fa-warning");
        document.getElementById("input-email").setAttribute("class", "input is-danger");
    } else {
        document.getElementById("error-email").innerHTML = "";
        document.getElementById("warning-email").setAttribute("class", "");
        document.querySelector("#warning-email > span > i").setAttribute("class", "fa fa-check");
        document.getElementById("input-email").setAttribute("class", "input is-success");
    }

    if(nameStatus != "ok") {
        document.getElementById("error-name").innerHTML = nameStatus;
        document.getElementById("warning-name").setAttribute("class", "");
        document.querySelector("#warning-name > span > i").setAttribute("class", "fa fa-warning");
        document.getElementById("input-name").setAttribute("class", "input is-danger");
    } else {
        document.getElementById("error-name").innerHTML = "";
        document.getElementById("warning-name").setAttribute("class", "");
        document.querySelector("#warning-name > span > i").setAttribute("class", "fa fa-check");
        document.getElementById("input-name").setAttribute("class", "input is-success");
    }

    if(subjectStatus != "ok") {
        document.getElementById("error-subject").innerHTML = subjectStatus;
        document.getElementById("warning-subject").setAttribute("class", "");
        document.querySelector("#warning-subject > span > i").setAttribute("class", "fa fa-warning");
        document.getElementById("input-subject").setAttribute("class", "input is-danger");
    } else {
        document.getElementById("error-subject").innerHTML = "";
        document.getElementById("warning-subject").setAttribute("class", "");
        document.querySelector("#warning-subject > span > i").setAttribute("class", "fa fa-check");
        document.getElementById("input-subject").setAttribute("class", "input is-success");
    }

    if(messageStatus != "ok") {
        document.getElementById("error-message").innerHTML = messageStatus;
        document.getElementById("warning-message").setAttribute("class", "");
        document.querySelector("#warning-message > span > i").setAttribute("class", "fa fa-warning");
        document.getElementById("input-message").setAttribute("class", "textarea is-danger");
    } else {
        document.getElementById("error-message").innerHTML = "";
        document.getElementById("warning-message").setAttribute("class", "");
        document.querySelector("#warning-message > span > i").setAttribute("class", "fa fa-check");
        document.getElementById("input-message").setAttribute("class", "textarea is-success");
    }

    if(emailStatus == "ok" && nameStatus == "ok" && subjectStatus == "ok" && messageStatus == "ok") {
        // TODO submit form / start nodescript
    } else {
        return false;
    }
    
}

function emailCheck(email) {
    var statusMsg;

    // regular expression from: http://emailregex.com/
    if(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        statusMsg = "ok";
    } else {
        statusMsg = "Invalid email!";
    }

    return statusMsg;
};

function nameCheck(name) {
    var statusMsg;

    if(name == "" || name == "name") {
        statusMsg = "Please enter your name.";
    } else if(name.length < 3) {
        statusMsg = "Name must be at least three characters!";
    } else {
        statusMsg = "ok";
    }

    return statusMsg;
};

function subjectCheck(subject) {
    var statusMsg;

    if(subject == "") {
        statusMsg = "Subject is empty!";
    } else if(subject.length < 3) {
        statusMsg = "Subject must be at least three characters!";
    } else {
        statusMsg = "ok";
    }

    return statusMsg;
};

function messageCheck(message) {
    var statusMsg;

    if(message == "") {
        statusMsg = "Message is empty!";
    } else if(message.length < 3) {
        statusMsg = "Message must be at least three characters!";
    } else {
        statusMsg = "ok";
    }

    return statusMsg;
}




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


/******************************************************
 * CODE FOR GOOGLE MAPS
 * based on:
 * https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
 ******************************************************/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: userLatitude, lng: userLongitude}
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow);

}

function geocodeLatLng(geocoder, map, infowindow) {
    var latlng = {lat: userLatitude, lng: userLongitude};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[1].formatted_address);
                infowindow.open(map, marker);
                document.getElementById('detected-location').innerHTML = results[1].formatted_address;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

/**
 *
 * INIT
 *
 **/

// Load on Startup
$(document).ready(function() {
    // Check Cookies
    // Load Settings
    console.log("AppCodeName: " + browserAppCodeName);
    console.log("AppName: " + browserAppName);
    console.log("AppVersion: " + browserAppVersion);
    console.log("CookieEnabled: " + browserCookieEnabled);
    console.log("Geolocation: " + browserGeolocation);
    console.log("Language: " + browserLanguage);
    console.log("OnLine: " + browserOnLine);
    console.log("Platform: " + browserPlatform);
    console.log("Product: " + browserProduct);
    console.log("UserAgent: " + browserUserAgent);

    browserGeolocation.getCurrentPosition(function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;

        // TODO auf produktivsystem evtl anpassen
        if(window.location.href == "http://localhost:3000/settings.html") {
            loadSettingClickhandlers();
        }

    });
});



