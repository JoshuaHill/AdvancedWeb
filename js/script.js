/**
 * Created by joshuahill on 29.04.2017.
 */

/*******************************************************************************
 *
 * Global Variables
 *
 *******************************************************************************/
// gallery pictures
var galerie = [
    "../images/gallery/hello1.png",
    "../images/gallery/hello2.png",
    "../images/gallery/hello3.png",
    "../images/gallery/hello4.png"
];

// audio files
var audioFiles = [
    {
        "name":"chill",
        "path":"../audio/chill.mp3",
        "duration": 107
    },
    {
        "name":"classy",
        "path":"../audio/classy.mp3",
        "duration": 127
    },
    {
        "name":"upbeat",
        "path":"../audio/upbeat.mp3",
        "duration": 192
    }
];

// sound
var sound = null;


// Color Themes
// variable format and usage based on https://stackoverflow.com/a/26514362
var darkCssTheme = $("<link>", {
    "rel" : "stylesheet",
    "type" : "text/css",
    "href" : "../css/themes/dark-theme.css",
    "id" : "dark-theme-tag"
})[0];

// Browser info
var browserLanguage = navigator.language;

// Variable für kontext-sensitives Formular
var formContext = "mail";

// Language
var language;

// gallery playback control
var galPlayback = false;
var galleryImageTimeout;
var playBackTimeout;

// Visualization creation controls
var visPages = [
    "home/createmusic.html",
    "home/createvisual.html",
    "home/createbackground.html",
    "home/createtext.html",
    "home/createcolor.html",
    "home/createfinished.html"
];
var visPointer = 0;

// visual json
var visual = {
    "music": {
        "title":"",
        "duration":""
    },
    "visualization":"",
    "background": {
        "type": {
            "name": "",
            "text": ""
        },
        "color_one": "",
        "color_two": "",
        "direction": {
            "name":"",
            "text":""
        }
    },
    "text": {
        "title":"",
        "duration": "",
        "custom_text":"",
        "color":"",
        "position":""
    },
    "color": {
        "color_one":"",
        "color_two":""
    }

};



var visualizations = [
    {
        name: "none",
        name_long: "none",
        description: "Keine Animation."
    },
    {
        name: "logo",
        name_long: "Spinning Logo",
        description: "Ein sich drehendes Muse:Viz Logo."
    },
    {
        name: "bars",
        name_long: "Equalizer Bars",
        description: "Klassische Equalizer Darstellung."
    },
    {
        name: "waves",
        name_long: "Soundwaves",
        description: "Ton in Wellenform dargestellt."
    },
    {
        name: "bubbles",
        name_long: "Bubbles",
        description: "Bläschen, die ihre Größe zur Musik ändern."
    }
];

var volume = 1;
var soundData = null;
var analyser = null;
var svg = null;
var svgText = null;

// svg animation
var svgScrollAni = "<animate attributeName=\"x\" begin=\"0s\" from=\"100%\" to=\"-10%\" dur=\"15s\" repeatCount=\"indefinite\" />";


/*******************************************************************************
 *
 * Audio
 *
 *******************************************************************************/

/**
 * Get sound from audio file
 *
 * @param volume (e.g. 0.5), audioSource
 * @returns sound
 */
function getSound(volume, audioSource) {

     sound = new Howl({
         src: [audioSource],
         volume: volume,
         onplay: function () {
            // update player controls
            document.getElementById('time-right').innerHTML = convertTime(sound.duration());
            document.getElementById('play-pause').setAttribute("class", "fa fa-pause");

             // enable clickhandlers
             loadMusicTblClickhandlders();

            // update initial svg
            if(visPointer == 0 && visual.visualization == "") {
                document.getElementById("text-scroll").setAttribute("class", "");
                document.getElementById('loading').setAttribute("class", "is-hidden");
                document.getElementById('paused').setAttribute("class", "is-hidden");
            } else {
                // updateBarVisualization();
            }

            // update progress bar
            requestAnimationFrame(updateProgress);
         },
         onload: function () {

         },
         onpause: function () {
            // update player controls
            document.getElementById('play-pause').setAttribute("class", "fa fa-play");
            // update initial svg
             if(visPointer == 0 && visual.visualization == "") {
                 document.getElementById('paused').setAttribute("class", "");
             }

         },
         onstop: function () {
            // update player controls
            document.getElementById('play-pause').setAttribute("class", "fa fa-play");
         },
         onend: function () {
             // update player controls
             document.getElementById('play-pause').setAttribute("class", "fa fa-play");
         }
     });
}

/**
 * getAudioData() returns a dataArray containing
 * frequency data of a sound
 *
 * @returns {Uint8Array}
 */
function getAudioData() {
    // create Analyser node
    analyser = Howler.ctx.createAnalyser();
    // connect Analyser to Master Gain
    Howler.masterGain.connect(analyser);
    analyser.connect(Howler.ctx.destination);

    // set Fast Fourier Transform Size of Analyser
    analyser.fftSize = 2048;
    // set bufferLength to frequency bin count
    // var bufferLength = analyser.frequencyBinCount;
    var bufferLength = 100;
    // create DataArray
    frequencyData = new Uint8Array(bufferLength);

}


/*******************************************************************************
 *
 * Modals
 *
 *******************************************************************************/

function loadModalClickhandlers() {
    // close modal btn oben rechts im browser
    $('.modal-close').on('click', function () {
        document.getElementsByClassName('modal')[0].setAttribute("class", "modal");
    });

    // close modal button oben rechts am popup
    $('.delete').on('click', function () {
        document.getElementsByClassName('modal')[0].setAttribute("class", "modal");
    });

    // OK button
    $('#modal-ok-btn').on('click', function () {
        document.getElementsByClassName('modal')[0].setAttribute("class", "modal");
    });

}




/*******************************************************************************
 *
 * Settings-Page
 *
 *******************************************************************************/

$('#settings-display').on('click', function (event) {
    // set correct menu item to active
    document.getElementById('settings-language').setAttribute("class", "");
    this.setAttribute("class", "is-active");

   // var ck = document.cookie;
   // console.log(ck);

    $('#settings-content').load("settings/display.html", function() {
        loadSettingClickhandlers();
    });

});



$('#settings-language').on('click', function(event) {
    // set correct menu item to active
    document.getElementById('settings-display').setAttribute("class", "");
    this.setAttribute("class", "is-active");
    loadSettingsLangContent();



});

function loadSettingsLangContent() {
    $('#settings-content').load("settings/language.html", function() {
        // document.getElementById('detected-lang').innerHTML = browserLanguage;
        loadLocale();
        /*
         * Select Language
         */
        if(language.localeCompare("en") == 0) {
            document.getElementById("lang-sel").selectedIndex = 1;
        } else {
            document.getElementById("lang-sel").selectedIndex = 0;
        }
        $("select").change(function () {
            var value = "";
            $("select option:selected").each(function() {
                value = $(this).text();
                if(value.localeCompare("German") == 0) {
                    language = "de";
                    setCookie("lang", "de", 365);
                    loadLocale();
                } else {
                    language = "en";
                    setCookie("lang", "en", 365);
                    loadLocale();
                }
            });
        });
    });
}


function loadSettingClickhandlers() {
    /**
     * Schrift
     */
    $('#font-settings').on('click', function() {
        /*
         * Side Nav
         */
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

        /*
         * Content
         */
        $('#display-content').load("settings/display/fonts.html", function () {

        });

    });


    /**
     * Schrift Child 1
     * Schriftart
     */
    $('#font-type').on('click', function (event) {
        // prevent parent event from firing
        event.stopImmediatePropagation();

        /*
         * Side Nav
         */
        // remove is-hidden modifier from child
        document.getElementById("font-type-list").setAttribute("class", "menu-sub-list");
        // set clicked Element to active
        this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

        /*
         * Content
         */
        $('#display-content').load("settings/display/fonts/fonttype.html", function () {

        });
    });

        /**
         * Schriftart Child 1
         * Serif
         */
        $('#font-type-serif').on('click', function (event) {
            // prevent parent event from firing
            event.stopImmediatePropagation();

            /*
             * Side Nav
             */
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

            /*
             * Content
             */
            $('#display-content').load("settings/display/fonts/fonttype/serif.html", function () {

            });
        });

            /**
             * Serif Child 1
             * Palatino Linotype
             */
            $('#serif-palatino').on('click', function (event) {
                // prevent parent event from firing
                event.stopImmediatePropagation();

                /*
                 * Side Nav
                 */
                // remove active from sibling
                document.getElementById("serif-times").getElementsByTagName('a')[0].setAttribute("class", "");
                // set clicked Element to active
                this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

                /*
                 * Content
                 */
                $('#display-content').load("settings/display/fonts/fonttype/serif/serif-palatino.html", function () {
                    $('#settings-btn').on('click', function () {
                        document.getElementsByTagName("body")[0].setAttribute("class", "palatino");
                        setCookie("fontstyle", "palatino", 365);
                    });
                });
            });

            /**
             * Serif Child 2
             * Times New Roman
             */
            $('#serif-times').on('click', function (event) {
                // prevent parent event from firing
                event.stopImmediatePropagation();

                /*
                 * Side Nav
                 */
                // remove active from sibling
                document.getElementById("serif-palatino").getElementsByTagName('a')[0].setAttribute("class", "");
                // set clicked Element to active
                this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

                /*
                 * Content
                 */
                $('#display-content').load("settings/display/fonts/fonttype/serif/serif-times.html", function () {
                    $('#settings-btn').on('click', function () {
                        document.getElementsByTagName("body")[0].setAttribute("class", "times-new-roman");
                        setCookie("fontstyle", "times-new-roman", 365);
                    });
                });
            });


        /**
         * Schriftart Child 2
         * Sans-Serif
         */
        $('#font-type-sans').on('click', function (event) {
            // prevent parent event from firing
            event.stopImmediatePropagation();

            /*
             * Side Nav
             */
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

            /*
             * Content
             */
            $('#display-content').load("settings/display/fonts/fonttype/sans.html", function () {

            });
        });

            /**
             * Sans Child 1
             * Helvetica Neue
             */
            $('#sans-helvetica').on('click', function (event) {
                // prevent parent event from firing
                event.stopImmediatePropagation();

                /*
                 * Side Nav
                 */
                // remove active from sibling
                document.getElementById("sans-lucida").getElementsByTagName('a')[0].setAttribute("class", "");
                document.getElementById("sans-standard").getElementsByTagName('a')[0].setAttribute("class", "");
                // set clicked Element to active
                this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

                /*
                 * Content
                 */
                $('#display-content').load("settings/display/fonts/fonttype/sans/sans-helvetica.html", function () {
                    $('#settings-btn').on('click', function () {
                        document.getElementsByTagName("body")[0].setAttribute("class", "helvetica-neue");
                        setCookie("fontstyle", "helvetica-neue", 365);
                    });
                });
            });


            /**
             * Sans Child 2
             * Lucida Sans Unicode
             */
            $('#sans-lucida').on('click', function (event) {
                // prevent parent event from firing
                event.stopImmediatePropagation();

                /*
                 * Side Nav
                 */
                // remove active from sibling
                document.getElementById("sans-helvetica").getElementsByTagName('a')[0].setAttribute("class", "");
                document.getElementById("sans-standard").getElementsByTagName('a')[0].setAttribute("class", "");
                // set clicked Element to active
                this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

                /*
                 * Content
                 */
                $('#display-content').load("settings/display/fonts/fonttype/sans/sans-lucida.html", function () {
                    $('#settings-btn').on('click', function () {
                        document.getElementsByTagName("body")[0].setAttribute("class", "lucida-sans");
                        setCookie("fontstyle", "lucida-sans", 365);
                    });
                });
            });

            /**
             * Sans Child 3
             * Standard Sans
             */
            $('#sans-standard').on('click', function (event) {
                // prevent parent event from firing
                event.stopImmediatePropagation();

                /*
                 * Side Nav
                 */
                // remove active from siblings
                document.getElementById("sans-helvetica").getElementsByTagName('a')[0].setAttribute("class", "");
                document.getElementById("sans-lucida").getElementsByTagName('a')[0].setAttribute("class", "");
                // set clicked Element to active
                this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

                /*
                 * Content
                 */
                $('#display-content').load("settings/display/fonts/fonttype/sans/sans-standard.html", function () {
                    $('#settings-btn').on('click', function () {
                        document.getElementsByTagName("body")[0].removeAttribute("class");
                        setCookie("fontstyle", "", 365);
                    });
                });
            });


        /**
         * Schriftart Child 3
         * Monospace
         */
        $('#font-type-monospace').on('click', function (event) {
            // prevent parent event from firing
            event.stopImmediatePropagation();

            /*
             * Side Nav
             */
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

            /*
             * Content
             */
            $('#display-content').load("settings/display/fonts/fonttype/mono.html", function () {

            });
        });

            /**
             * Monospace Child 1
             * Courier New
             */
            $('#mono-courier').on('click', function (event) {
                // prevent parent event from firing
                event.stopImmediatePropagation();

                /*
                 * Side Nav
                 */
                // remove active from sibling
                document.getElementById("mono-lucida").getElementsByTagName('a')[0].setAttribute("class", "");
                // set clicked Element to active
                this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

                /*
                 * Content
                 */
                $('#display-content').load("settings/display/fonts/fonttype/mono/mono-courier.html", function () {
                    $('#settings-btn').on('click', function () {
                        document.getElementsByTagName("body")[0].setAttribute("class", "courier-new");
                        setCookie("fontstyle", "courier-new", 365);
                    });
                });
            });
    
            /**
             * Monospace Child 2
             * Lucida Consoloe
             */
            $('#mono-lucida').on('click', function (event) {
                // prevent parent event from firing
                event.stopImmediatePropagation();

                /*
                 * Side Nav
                 */
                // remove active from sibling
                document.getElementById("mono-courier").getElementsByTagName('a')[0].setAttribute("class", "");
                // set clicked Element to active
                this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

                /*
                 * Content
                 */
                $('#display-content').load("settings/display/fonts/fonttype/mono/mono-lucida.html", function () {
                    $('#settings-btn').on('click', function () {
                        document.getElementsByTagName("body")[0].setAttribute("class", "lucida-console");
                        setCookie("fontstyle", "lucida-console", 365);
                    });
                });
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

        $('#display-content').load("settings/display/themes.html", function () {

        });
    });

        /**
         * Farbschema Child 1
         * Dunkel
         */
        $('#dark-theme').on('click', function (event) {
            // prevent parent event from firing
            event.stopImmediatePropagation();

            /*
             * Side Nav
             */
            // remove active from sibling
            document.getElementById("bright-theme").getElementsByTagName('a')[0].setAttribute("class", "");
            // set clicked Element to active
            this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

            /*
             * Content
             */
            $('#display-content').load("settings/display/themes/dark.html", function () {
                $('#settings-btn').on('click', function () {
                    document.getElementsByTagName("head")[0].appendChild(darkCssTheme);
                    setCookie("theme", "dark", 365);
                });
            });
        });

    /**
     * Farbschema Child 1
     * Hell
     */
    $('#bright-theme').on('click', function (event) {
        // prevent parent event from firing
        event.stopImmediatePropagation();

        /*
         * Side Nav
         */
        // remove active from sibling
        document.getElementById("dark-theme").getElementsByTagName('a')[0].setAttribute("class", "");
        // set clicked Element to active
        this.getElementsByTagName('a')[0].setAttribute("class", "is-active");

        /*
         * Content
         */
        $('#display-content').load("settings/display/themes/bright.html", function () {
            $('#settings-btn').on('click', function () {
                var tag = document.getElementById("dark-theme-tag");
                if(tag != null);
                tag.parentNode.removeChild(tag);
                setCookie("theme", "", 365);
            });
        });
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
    loadImprint();
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

function loadImprint() {
    // Set correct menu item to active
    document.getElementById('about-info').setAttribute("class", "");
    document.getElementById('about-privacy').setAttribute("class", "");
    document.getElementById('about-imprint').setAttribute("class", "is-active");

    // Load HTML for subsection
    $('#about-subsection').load("about/imprint.html", function () {

    });
}



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
        "täglich 10:00 - 16:00 <br><br><span id=\"open-close\"></span>";

    // show open or closed message according to time
    if(time.getHours() >= 10 && time.getHours() <=16) {
        document.getElementById("open-close").innerHTML = "<h1 class=\"subtitle\" id=\"open\">WE ARE OPEN!</h1>";
    } else {
        document.getElementById("open-close").innerHTML = "<h1 class=\"subtitle\" id=\"closed\">SORRY WE ARE CLOSED!</h1>";
    }
});

$("select").change(function () {
    var value = "";
    $("select option:selected").each(function() {
       value = $(this).text();
       if(value.localeCompare("Mail") == 0) {
           document.getElementById("phone-field").setAttribute("class", "field is-hidden");
           document.getElementById("email-field").setAttribute("class", "field");
           formContext = "mail";
       } else {
           document.getElementById("phone-field").setAttribute("class", "field");
           document.getElementById("email-field").setAttribute("class", "field is-hidden");
           formContext = "phone";
       }
    });
});

/**
 * validateForm() checks wether entered E-Mail, phone etc.
 * make sense.
 *
 * @returns {boolean}
 */
function validateForm() {

    if(formContext.localeCompare("mail") == 0) {
        var email = document.forms["contactForm"]["formEmail"].value;
        var emailStatus = emailCheck(email);

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
    } else {
        var phone = document.forms["contactForm"]["formPhone"].value;
        var phoneStatus = phoneCheck(phone);

        if(phoneStatus != "ok") {
            document.getElementById("error-phone").innerHTML = phoneStatus;
            document.getElementById("warning-phone").setAttribute("class", "");
            document.querySelector("#warning-phone > span > i").setAttribute("class", "fa fa-warning");
            document.getElementById("input-phone").setAttribute("class", "input is-danger");
        } else {
            document.getElementById("error-phone").innerHTML = "";
            document.getElementById("warning-phone").setAttribute("class", "");
            document.querySelector("#warning-phone > span > i").setAttribute("class", "fa fa-check");
            document.getElementById("input-phone").setAttribute("class", "input is-success");
        }
    }

    var name = document.forms["contactForm"]["formName"].value;
    var subject = document.forms["contactForm"]["formSubject"].value;
    var message = document.forms["contactForm"]["formMessage"].value;

    var nameStatus = nameCheck(name);
    var subjectStatus = subjectCheck(subject);
    var messageStatus = messageCheck(message);

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

    if((phoneStatus == "ok" || emailStatus == "ok") && nameStatus == "ok" && subjectStatus == "ok" && messageStatus == "ok") {
        // TODO submit form / start nodescript
    } else {
        return false;
    }
    
}

/**
 * phoneCheck(phone) checks phone input for validity
 *
 * @param phone
 * @returns {*}
 */
function phoneCheck(phone) {
    var statusMsg;

    // Erlaubte Eingaben:
        // numbers only: 0711555666
        // starting with plus: +49711555666
        // dashes: 0711-555-666
        // slash after prefix: 0711/555666
        // spaces: 0711 555 666
    if(phone.match(/(([0-9])|\+)([0-9]+)([0-9]|\-|\/| )+/g) && phone.length > 3) {
        statusMsg = "ok";
    } else {
        statusMsg = "Ungültige Telefon Nummer";
    }

    return statusMsg;
}

/**
 * emailCheck(email) checks email input for validity
 *
 * @param email
 * @returns {*}
 */
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

/**
 * nameCheck(name) checks name input for validity
 *
 * @param name
 * @returns {*}
 */
function nameCheck(name) {
    var statusMsg;

    // name must not be empty or "name"
    if(name == "" || name == "name") {
        statusMsg = "Please enter your name.";
    // name must be at least 3 characters
    } else if(name.length < 3) {
        statusMsg = "Name must be at least three characters!";
    } else {
        statusMsg = "ok";
    }

    return statusMsg;
};

/**
 * subjectCheck(subject) checks subject input for validity
 *
 * @param subject
 * @returns {*}
 */
function subjectCheck(subject) {
    var statusMsg;

    // subject must not be empty
    if(subject == "") {
        statusMsg = "Subject is empty!";
    // subject must be longer than 3 characters
    } else if(subject.length < 3) {
        statusMsg = "Subject must be at least three characters!";
    } else {
        statusMsg = "ok";
    }

    return statusMsg;
};

/**
 * messageCheck(message) checks message input for validity
 *
 * @param message
 * @returns {*}
 */
function messageCheck(message) {
    var statusMsg;

    // message must not be empty
    if(message == "") {
        statusMsg = "Message is empty!";
    // message must be at least 3 characters
    } else if(message.length < 3) {
        statusMsg = "Message must be at least three characters!";
    } else {
        statusMsg = "ok";
    }

    return statusMsg;
}


/*******************************************************************************
 *
 * Home-Page
 *
 *******************************************************************************/

/**
 * Music / Visualization Controls
 */

$('#playBtn').click(function () {
    // sound.stop();
    // sound.play();

    // draw();
    // getData();
    // source.start(0);

});

$('#stopBtn').click(function () {
    // sound.stop();
    // source.stop();
});

/**
 * Function to load up the content for the home screen
 */
function loadHome() {

    if(document.getElementById('svg-container').innerHTML == "" && visual.visualization == "") {
     loadSvg("../images/logo-static.svg", "svg-container");
    }

    $('#create-controls').load(visPages[visPointer], function () {

        // create table for music or visualization
        if(visPointer == 0 || visPointer == 1) {
            createTable();
            
            $(".delete").on("click", function () {
                $('#no-song-warning').fadeOut(1000, "swing", function () {
                    this.setAttribute("class", "notification is-danger create-notification is-hidden");
                    this.removeAttribute("style");
                });
            });
        }

        // initialize drag&drop
        if(visPointer == 0) {
            initDragDrop();
        }

        // loadclickhandler for background
        if(visPointer == 2) {
            loadBackgroundSetup();
        }

        // load clickhandler for text
        if(visPointer == 3) {
            loadTextClickhandlers();
        }

        // Clickhandler for forward button
        $('#create-forward').on('click', function () {
            if((visPointer == 0 && visual.music.title == "") || (visPointer == 1 && visual.visualization == "")) {
                document.getElementById("no-song-warning").setAttribute("class", "notification is-danger create-notification");
            } else {
                visPointer++;
                loadHome();
            }
            
        });

        // Clickhandler for back button
        $('#create-back').on('click', function () {
            visPointer--;
            loadHome();
        });

        // Clickhandler for breadcrumbs
        $('#bc-music').on('click', function () {
            visPointer = 0;
            loadHome();
        });
        $('#bc-visual').on('click', function () {
            if(visPointer == 0 && visual.music.title == "") {
                document.getElementById("no-song-warning").setAttribute("class", "notification is-danger create-notification");
            } else {
                visPointer = 1;
                loadHome();
            }
        });
        $('#bc-background').on('click', function () {
            if((visPointer == 0 && visual.music.title == "") || (visPointer == 1 && visual.visualization == "")) {
                document.getElementById("no-song-warning").setAttribute("class", "notification is-danger create-notification");
            } else {
                visPointer = 2;
                loadHome();
            }
        });
        $('#bc-text').on('click', function () {
            if((visPointer == 0 && visual.music.title == "") || (visPointer == 1 && visual.visualization == "")) {
                document.getElementById("no-song-warning").setAttribute("class", "notification is-danger create-notification");
            } else {
                visPointer = 3;
                loadHome();
            }
        });
        $('#bc-color').on('click', function () {
            if((visPointer == 0 && visual.music.title == "") || (visPointer == 1 && visual.visualization == "")) {
                document.getElementById("no-song-warning").setAttribute("class", "notification is-danger create-notification");
            } else {
                visPointer = 4;
                loadHome();
            }
        });
        $('#bc-done').on('click', function () {
            if((visPointer == 0 && visual.music.title == "") || (visPointer == 1 && visual.visualization == "")) {
                document.getElementById("no-song-warning").setAttribute("class", "notification is-danger create-notification");
            } else {
                visPointer = 5;
                loadHome();
            }
        });
    });

    // Slider for volume
    $("#slider-vertical").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: volume*100,
        slide: function( event, ui ) {
            volume = (ui.value/100);
            Howler.volume(volume);
            document.getElementById('volume').innerHTML = ui.value + "%";
        }
    });
}


function initDragDrop() {
    var dropzone = document.getElementById("dropzone");
    dropzone.addEventListener('dragover', handleDragOver, false);
    dropzone.addEventListener('drop', selectFile, false);
}

function selectFile(e) {
    e.stopPropagation();
    e.preventDefault();

    var selectedFile = e.dataTransfer.files[0];
    console.log("Name: " + selectedFile.name);
    console.log("Type: " + selectedFile.type);
    console.log("Size: " + selectedFile.size);
    console.log(selectedFile.length);

    checkFileValidity(selectedFile);
    
}

function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
}

function checkFileValidity(file) {

    var typeValid;
    var sizeValid;

    if(file.type == "audio/mp3" || file.type == "audio/ogg") {
        // file type is valid
        typeValid = true;
    } else {
        // invalid file type
        typeValid = false;
    }

    if(file.size <= 5242880) {
        // file size is valid
        sizeValid = true;
    } else {
        // invalid file size
        sizeValid = false;
    }

    // if file is valid
    if(typeValid && sizeValid) {

        var reader = new FileReader();
        reader.onload = function (event) {

            if(sound != null) {
                sound.stop();
            }

            getSound(1, event.target.result);
            sound.play();

            //audioFiles[3].path = event.target.result;
            //audioFiles[3].name = file.name;
            var newSound =
            {
                "name":file.name.replace(/[^a-zA-Z0-9- ]/g, ""),
                "path":event.target.result,
                "duration": 0
            };
            if(audioFiles.length <= 3) {
                audioFiles.push(newSound);
            } else {
                audioFiles[3] = newSound;
            }

            document.getElementById("table-body").innerHTML = "";
            createTable();

        };
        reader.readAsDataURL(file);



    }
}


/**
 * loadBackgroundSetup() handles setting up
 * background 
 */
function loadBackgroundSetup() {

    // if background type was previously set load appropriate elements
    if(visual.background.type.name == "gradient") {
        document.getElementById('color2').setAttribute("class", "colorpicker");
        document.getElementById('gradient-direction').setAttribute("class", "field");
        document.getElementById('gradient-direction-info').setAttribute("class", "");
        document.getElementById('gradient-color-info').setAttribute("class", "");

        var selectType = document.getElementById('type').getElementsByTagName("option");
        for(let i = 0; i < selectType.length; i++) {
            if(selectType[i].text == visual.background.type.text) {
                selectType[i].setAttribute("selected", "selected");
            } else {
                if(selectType[i].hasAttribute("selected")) {
                    selectType[i].removeAttribute("selected");
                }

            }
        }
    }

    // if background direction was previously set load appropriate elements
    if(visual.background.direction.name != "") {
        var selectDirection = document.getElementById('direction').getElementsByTagName("option");
        for(let i = 0; i < selectDirection.length; i++) {
            if(selectDirection[i].text == visual.background.direction.text) {
                selectDirection[i].setAttribute("selected", "selected");
            } else {
                if(selectDirection[i].hasAttribute("selected")) {
                    selectDirection[i].removeAttribute("selected");
                }
            }
        }
    }
    
    if(visual.background.color_one != "") {
        document.getElementById("color1").setAttribute("value", visual.background.color_one);
    }
    
    if(visual.background.color_two != "") {
        document.getElementById("color2").setAttribute("value", visual.background.color_two);
    }

    // Select Type
    $("#type").on("change", function () {
            var val = $(this).val();
            if(val.localeCompare("Einfarbig") == 0) {
                // set background type to unicolored
                visual.background.type.name = "unicolored";
                visual.background.type.text = "Einfarbig";
                // remove gradient
                $('svg').css("background", "none");
                // hide gradient elements
                document.getElementById('color2').setAttribute("class", "colorpicker is-hidden");
                document.getElementById('gradient-direction').setAttribute("class", "field is-hidden");
                document.getElementById('gradient-direction-info').setAttribute("class", "is-hidden");
                document.getElementById('gradient-color-info').setAttribute("class", "is-hidden");
            } else {
                // set background type to gradient
                visual.background.type.name = "gradient";
                visual.background.type.text = "Farbverlauf";
                // show gradient elements
                document.getElementById('color2').setAttribute("class", "colorpicker");
                document.getElementById('gradient-direction').setAttribute("class", "field");
                document.getElementById('gradient-direction-info').setAttribute("class", "");
                document.getElementById('gradient-color-info').setAttribute("class", "");

            }
    });

    // Select color1
    $('#color1').on('click', function () {
        var color_one = $(this).val();
        visual.background.color_one = color_one;
        setSvgBackground();
        /*
        if(visual.background.type.name != "gradient") {
            // set background-color
            $('svg').css("background-color", color_one);
        } else {
            createGradient();
        }
        */
    });
    $('#color1').on('change', function () {
        var color_one = $(this).val();
        visual.background.color_one = color_one;
        setSvgBackground();
        /*
        if(visual.background.type.name != "gradient") {
            // set background-color
            $('svg').css("background-color", color_one);
        } else {
            createGradient();
        }
        */
    });

    // Select direction of gradient
    $("#direction").on("change", function () {
        var val = $(this).val();

        if(val.localeCompare("Von Links") == 0) {
            visual.background.direction.name = "right";
        } else if (val.localeCompare("Von Rechts") == 0) {
            visual.background.direction.name = "left";
        } else if (val.localeCompare("Von Oben") == 0) {
            visual.background.direction.name = "bottom";
        } else if (val.localeCompare("Von Unten") == 0) {
            visual.background.direction.name = "top";
        }

        visual.background.direction.text = val;

        createGradient();
    });

    // select color2
    $('#color2').on('click', function () {
        var color_two = $(this).val();
        visual.background.color_two = color_two;
        createGradient();
    });
    $('#color2').on('change', function () {
        var color_two = $(this).val();
        visual.background.color_two = color_two;
        createGradient();
    });


}

/**
 * Function to set background of SVG
 */
function setSvgBackground() {

    if(visual.background.type != "gradient") {
        $('svg').css("background-color", visual.background.color_one);
    } else {
        createGradient();
    }
}


/**
 * function to create gradient and add set it as background
 */
function createGradient() {
    if(visual.background.type.name == "gradient" && visual.background.color_one != ""
        && visual.background.color_two != "" && visual.background.direction.name != "") {

        console.log("CREATING GRADIENT");
        /*
         var cssSafari = "-webkit-linear-gradient(left, " + visual.background.color_one + ", " + visual.background.color_two
         + ");";;


         var cssOpera = "-o-linear-gradient(right, " + visual.background.color_one + ", " + visual.background.color_two
         + ");";;

         var cssFirefox = "-moz-linear-gradient(right, " + visual.background.color_one + ", " + visual.background.color_two
         + ");";; ;
         */

        var cssStd = "linear-gradient(to " + visual.background.direction.name + ", "  + visual.background.color_one + ", " + visual.background.color_two
            + ")";

        $('svg').css("background", cssStd);

    } else {
        return;
    }
}

/**
 * Function to create a table with all mp3 files or visualizations
 */
function createTable() {

    var tableData;

    if(visPointer == 0) {
        tableData = audioFiles;
    } else {
        tableData = visualizations;
    }
    for(let i = 0; i < tableData.length; i++) {
        // create new tr element
        var tr = document.createElement('tr');
        // create new td element
        var td = document.createElement('td');

        // get file name
        if(tableData == audioFiles) {
            var name = tableData[i].name;
        } else {
            var name = tableData[i].name_long;
        }
        // create text node from file name
        var text = document.createTextNode(name);
        // add text node to td
        td.appendChild(text);
        // add td to tr
        tr.appendChild(td);

        if(visPointer == 0) {
            // get file duration string
            var duration = convertTime(tableData[i].duration);
            // clear td
            td = document.createElement('td');
            // update text
            text = document.createTextNode(duration);
            // add text node to td
            td.appendChild(text);
            // add td to tr
            tr.appendChild(td);
        }


        // add id to tr
        var id = tableData[i].name.replace(/[ ]/g, "");
        tr.setAttribute("id", id);

        // add tr to tablebody
        document.getElementById("table-body").appendChild(tr);
    }

    if(visPointer == 0) {
        loadMusicTblClickhandlders();
    } else {
        loadVisTblClickhandlers();
    }

}


/**
 * function to load clickhandlers for Visualizations table
 */
function loadVisTblClickhandlers() {

    // if there was a visual selected before, show in table
    if(visual.visualization != "") {
        document.getElementById(visual.visualization).setAttribute("class", "is-selected");
    }

    for(let i = 0; i < visualizations.length; i++) {
        $('#' + visualizations[i].name).on('click', function () {
            if(visual.visualization != visualizations[i].name) {
                // remove active from old row
                if(visual.visualization != "") {
                    document.getElementById(visual.visualization).setAttribute("class", "");
                }
                // set new row to active
                document.getElementById(visualizations[i].name).setAttribute("class", "is-selected");
                // load visualization
                console.log("loadVis: " + visualizations[i].name);

                document.getElementById("svg-container").innerHTML = "";
                loadD3Visualization(visualizations[i].name);
            }


            visual.visualization = visualizations[i].name;

        });
    }
}


/**
 * function to load clickhandlers for music table
 */
function loadMusicTblClickhandlders() {

    // if there was a track selected before, show in table
    if(visual.music.title != "" && visual.music.title != null) {
        document.getElementById(visual.music.title).setAttribute("class", "is-selected");
    }

    for(let i = 0; i < audioFiles.length; i++) {
        var id = audioFiles[i].name.replace(/[ ]/g, "");
        $('#' + id).on('click', function () {
            // disable clickhandlers
            disableMusicTblClickhandlers();
            // fade out warning
            $('#no-song-warning').fadeOut(1000);
            // if sound is loaded
            if(sound != null) {
                console.log("SOUND LOADED");
                // stop sound
                sound.stop();
                // if last clicked soundfile doesn't equal currently clicked soundfile
                if(visual.music.title != audioFiles[i].name) {
                    // if visualization hasn't been chosen yet
                    if(visual.visualization == "") {
                        // display current track name and duration of track
                        document.getElementById('text-scroll').innerHTML = svgScrollAni + audioFiles[i].name + " [" + convertTime(audioFiles[i].duration) + "]";
                        // show loading message
                        document.getElementById('loading').setAttribute("class", "");
                        // remove active from old row
                    }
                    if(visual.music.title != "" && visual.music.title != null) {
                        document.getElementById(visual.music.title.replace(/[ ]/g, "")).setAttribute("class", "");
                    }
                    // set new row to active
                    document.getElementById(audioFiles[i].name.replace(/[ ]/g, "")).setAttribute("class", "is-selected");
                    // play new sound
                    getSound(1, audioFiles[i].path);
                    sound.play();
                } else {
                    sound.stop();
                    loadMusicTblClickhandlders();
                }
            // if no sound is loaded
            } else {
                console.log("SOUND -N O T- LOADED");
                // if visualization hasn't been chosen yet
                if(visual.visualization == "") {
                    // display current track name and duration of track
                    document.getElementById('text-scroll').innerHTML = svgScrollAni + audioFiles[i].name + " [" + convertTime(audioFiles[i].duration) + "]";
                    // show loading message
                    document.getElementById('loading').setAttribute("class", "");
                }
                // remove all actives
                for(let j = 0; j < audioFiles.length; j++) {
                    document.getElementById(audioFiles[j].name.replace(/[ ]/g, "")).setAttribute("class", "");
                }
                // set new row to active
                document.getElementById(audioFiles[i].name.replace(/[ ]/g, "")).setAttribute("class", "is-selected");
                // play new sound
                getSound(1, audioFiles[i].path);
                sound.play();
            }

            // if the same track was clicked twice clear lastClick
            if(visual.music.title == audioFiles[i].name) {
                // visual.music.title = '';
            } else {
                visual.music.title = audioFiles[i].name;
                visual.music.duration = audioFiles[i].duration;
            }

        });
    }
}

function disableMusicTblClickhandlers() {
    for(let i = 0; i < audioFiles.length; i++) {
        var id = audioFiles[i].name.replace(/[ ]/g, "");
        $('#' + id).unbind();
    }
}
/**
 * function to load clickhandlers for Text Subpage of
 * create Visualizations part
 */
function loadTextClickhandlers() {

    if(visual.text.color != "" && visual.text.color != null) {
        document.getElementById("color").setAttribute("value", visual.text.color);
    }

    if(visual.text.title != "" && visual.text.title != null) {
        document.getElementById("check-title").checked = true;
    }

    if(visual.text.duration != "" && visual.text.duration != null) {
        document.getElementById("check-duration").checked = true;
    }

    if(visual.text.custom_text != "" && visual.text.custom_text != null) {
        document.getElementById("check-text").checked = true;
        document.getElementById("text-input-field").setAttribute("class", "field");
        document.getElementById("text-input-description").setAttribute("class", "");
        document.getElementById("text-input").setAttribute("value", visual.text.custom_text);
    }

    $("#color").on("click", function () {
       var color = $(this).val();
        visual.text.color = color;

        updateSvgText();
    });

    $("#color").on("change", function () {
        var color = $(this).val();
        visual.text.color = color;

        updateSvgText();
    });

    $("#check-title").on("change", function () {
        if($(this).is(":checked")) {
            visual.text.title = visual.music.title;
        } else {
            visual.text.title = "";
        }
        updateSvgText();
    });

    $("#check-duration").on("change", function () {
        if($(this).is(":checked")) {
            visual.text.duration = visual.music.duration;
        } else {
            visual.text.duration = "";
        }
        updateSvgText();
    });

    $("#check-text").on("change", function () {
       if($(this).is(":checked")) {
           document.getElementById("text-input-field").setAttribute("class", "field");
           document.getElementById("text-input-description").setAttribute("class", "");

           $("#text-input").on("input", function () {
               var text = $(this).val();
               visual.text.custom_text = text;
               //console.log(text);
               updateSvgText();
           });
       } else {
           document.getElementById("text-input-field").setAttribute("class", "field is-hidden");
           document.getElementById("text-input-description").setAttribute("class", "is-hidden");
           visual.text.custom_text = "";
           updateSvgText();
       }
    });

}




/**
 * Clickhandler for play/pause button
 */
$('#play-pause').on('click', function () {
    if(sound != null) {
        if(sound.playing()) {
            sound.pause();
        }  else {
            sound.play();
        }
    }
});

/**
 * Clickhandler for repeat button
 */
$("#play-stop").on("click", function () {
   if(sound != null) {
       sound.stop();
   }
});


/**
 * function which gets the current track position and updates
 * the progress bar accordingly
 */
function updateProgress() {
    var trackPos;
    var progressPos;

    trackPos = sound.seek() || 0;
    progressPos = (((trackPos / sound.duration()) * 100) || 0);

    document.getElementById('progressbar-two').style.width = progressPos + '%';
    document.getElementById('time-left').innerHTML = convertTime(trackPos);

    if(sound.playing() == true) {
        requestAnimationFrame(updateProgress);
    }
}

/**
 * function to load external svg to dom
 *
 * @param svg
 * @param div
 */
function loadSvg(svg, div) {
    xhr = new XMLHttpRequest();
    xhr.open("GET",svg,false);

    xhr.overrideMimeType("image/svg+xml");
    xhr.send("");
    document.getElementById(div)
        .appendChild(xhr.responseXML.documentElement);
    
}

/**
 * Helper function to convert time in seconds
 * into min:second format string
 *
 * @param time
 * @returns {string}
 */
function convertTime(time) {
    var minutes = parseInt(time/60) || 0;
    var seconds = Math.floor((time%60)) || 0;
    if(seconds.toString().length < 2) {
        seconds = "0" + seconds.toString();
    }
    var timeString = minutes + ":" + seconds;

    return timeString;
}



/*******************************************************************************
 *
 * Index-Page
 *
 *******************************************************************************/

/**
 * Gallery Controls
 */
// zeigt das erste Bild der Galerie an
$('#btn-gal-first').click(function () {
    stopGalleryPlayback();

    document.getElementById('gal-img-counter').innerHTML = 1;
    document.getElementById('gal-image').setAttribute('src', '../images/gallery/hello1.png');
});

// startet die automatische Wiedergabe der Slideshow
$('#btn-gal-play').on('click', function () {
    galPlayback = true;
    $(this).addClass('selected');
    var ctr;
    var currentImage = document.getElementById('gal-image').getAttribute('src');


    for(let i = 0; i < galerie.length - 1; i++) {
        if(galerie[i].localeCompare(currentImage) == 0 && galPlayback == true) {
            ctr = i;
        }
    }

    setTimeout(function () {

    }, 3000);

    if(galPlayback == true) {
        galleryPlayback(ctr);
    }

});

// zeigt das nächste Bild der Galerie an
$('#btn-gal-forward').click(function () {
    stopGalleryPlayback();

    var currentImage = document.getElementById('gal-image').getAttribute('src');
    for(let i = 0; i < galerie.length - 1; i++) {
        if(galerie[i].localeCompare(currentImage) == 0) {
            setGalleryImage(i+2, i+1);
        }
    }
});

// zeigt das vorhergehende Bild an
$('#btn-gal-rewind').click(function () {
    stopGalleryPlayback();

    var currentImage = document.getElementById('gal-image').getAttribute('src');
    for(let i = galerie.length-1; i > 0; i--) {
        if(galerie[i].localeCompare(currentImage) == 0) {
            setGalleryImage(i, i-1);
        }
    }
});

// pausiert die Wiedergabe der Diashow
$('#btn-gal-pause').click(function () {
    stopGalleryPlayback();
});

function galleryPlayback(ctr) {

    if(ctr+1 < galerie.length && galPlayback == true) {
        galleryImageTimeout = setTimeout(function(){setGalleryImage(ctr+2, ctr+1);}, 3000);
        playBackTimeout = setTimeout(function(){galleryPlayback(ctr+1);}, 3500);
    } else {
        $('#btn-gal-play').removeClass('selected');
        return;
    }

}
//
function setGalleryImage(counter, image) {
    document.getElementById('gal-img-counter').innerHTML = counter;
    document.getElementById('gal-image').setAttribute('src', galerie[image]);
}

function stopGalleryPlayback() {
    galPlayback = false;
    clearTimeout(galleryImageTimeout);
    clearTimeout(playBackTimeout);
    $('#btn-gal-play').removeClass('selected');
}





/*******************************************************************************
 *
 * Basic Cookie Functions
 * based on https://www.w3schools.com/js/js_cookies.asp
 *
 *******************************************************************************/

// function to create new cookies or update existing ones
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// function to get the value of a specific cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function to check if a cookie is set
function checkCookie(cname) {
    var cVal = getCookie(cname);
    if (cVal != "") {
        console.log("Cookie '" + cname + "' is set with value '" + cVal + "'.");
    } else {
        console.log("Cookie '" + cname + "' not set.");
    }
    return cVal;
}



/*******************************************************************************
 *
 * Localization
 *
 *******************************************************************************/

/**
 * loadLocale() utilizes i18next Framework to load locale for currently set language.
 * The currently set language is defined in global variable 'language'.
 * If not explicitly changed by user it's German when using German
 * browser settings or English for all other browser language settings.
 */
function loadLocale() {

    i18next
        // i18nextXHRBackend is needed to load localizations from file system
        .use(i18nextXHRBackend)
        .init({
            lng: language,
            backend: {
                // load locale for current language from external json file
                loadPath: '../locales/{{lng}}/{{ns}}.json'
            }
        }, function(err, t) {
            jqueryI18next.init(i18next, $);
            $('.title').localize();
            $('.subtitle').localize();
            $('.nav-menu').localize();
            $('.tabs').localize();
            $('.column').localize();
            $('.footer').localize();
        });
}


/*******************************************************************************
 *
 * D3 Visualizations
 *
 *******************************************************************************/

/**
 * This function is called to determine and load the visualization, that was
 * chosen by the user.
 *
 * @param visualization
 */
function loadD3Visualization(visualization) {

    switch(visualization) {
        case "none":
            initVisualization(1, 0);
            loadEmptyVisualization();
            break;
        case "logo":
            loadSvg("../images/0001-0200.svg", "svg-container");
            break;
        case "bars":
            initVisualization(50, 0);
            loadBarVisualization();
            break;
        case "waves":
            loadWaveVisualization();
            break;
        case "bubbles":
            initVisualization(25, 0);
            loadBubblesVisualization();
            break;
    }

}

/**
 * This function needs to be loaded for all visualizations.
 * It creates an analyser node and connects it to the master gain.
 *
 * @param bufferLength
 * @param fftSize
 */
function initVisualization(bufferLength, fftSize) {

    // create Analyser node if not already existing
    if(analyser == null) {
        analyser = Howler.ctx.createAnalyser();
    }


    // connect Analyser to Master Gain
    Howler.masterGain.connect(analyser);
    analyser.connect(Howler.ctx.destination);

    if(fftSize == 0 || fftSize == null) {
        fftSize = 2048;
    }

    if(bufferLength == 0 || bufferLength == null) {
        bufferLength = analyser.frequencyBinCount;
    }

    // set Fast Fourier Transform Size of Analyser
    analyser.fftSize = fftSize;
    // update DataArray
    soundData = new Uint8Array(bufferLength);
}

function loadEmptyVisualization() {

    // update svg
    svg = d3.select('#svg-container')
        // add svg element to DOM
        .append('svg')
        // match height and width to parent dimensions
        .attr('height', 495)
        .attr('width', 660);

    svgText = svg.selectAll("text")
        .data(soundData)
        .enter();


    setSvgText();

}


/**
 * function to load Bar Visualization
 */
function loadBarVisualization() {

    // update svg
    svg = d3.select('#svg-container')
        // add svg element to DOM
        .append('svg')
        // match height and width to parent dimensions
        .attr('height', 495)
        .attr('width', 660);

    // select virtual rects
    svg.selectAll('rect')
        // add soundData
        .data(soundData)
        // data join
        .enter()
        // add rect
        .append('rect')
        // for every data point set x value
        .attr('x', function (d, i) {
            return i * (660 / soundData.length);
        })
        // set width of bars
        .attr('width', 660 / soundData.length - 1);

    svgText = svg.selectAll("text")
        .data(soundData)
        .enter();


    setSvgText();

    // start barchart visualization loop
    runBarVisualization();
}

/**
 * function to continuously loop barchart animation
 */
function runBarVisualization() {

    // requestAnimationFrame will make sure loop doesn't run too fast
    requestAnimationFrame(runBarVisualization);

    analyser.getByteFrequencyData(soundData);

    svg.selectAll('rect')
        .data(soundData)
        // update height of bars
        .attr('y', function(d) {
            return 495 - d;
        })
        .attr('height', function(d) {
            return d;
        })
        // fill with color (if only a static color is used this can
        // be moved to loadBarVisualization method for better performance)
        .attr('fill', "#00D1B2");
}

/**
 * function to load Wave Visualization
 */
function loadWaveVisualization() {

    // update svg
    svg = d3.select("#svg-container")
        .append("svg")
        .attr("height", 495)
        .attr("width", 660);

    // select virtual paths

}

/**
 * function to continuously loop wave visualization
 */
function runWaveVisualization() {
    
}

/**
 * function to load Bubble Visualization
 */
function loadBubblesVisualization() {

    // update svg
    svg = d3.select("#svg-container")
        .append("svg")
        .attr("height", 495)
        .attr("width", 660);

    // select virtual circles
    svg.selectAll("circle")
        .data(soundData)
        .enter()
        .append("circle")
        .attr("cx", function (d, i) {
            // Center
            // return Math.floor(660/2);
            // random pos
            // return Math.floor(Math.random()*660+1);
            return (i * (660 / soundData.length)) + 15;
        })
        .attr("cy", function () {
            // Center
            return Math.floor(495/2);
            // random pos
            // return Math.floor(Math.random()*495+1);
        })
        .attr("r", 20);

    svgText = svg.selectAll("text")
        .data(soundData)
        .enter();


    setSvgText();

    runBubblesVisualization();
}

/**
 * function to continuously loop barchart animation
 */
function runBubblesVisualization() {

    // requestAnimationFrame will make sure loop doesn't run too fast
    requestAnimationFrame(runBubblesVisualization);

    analyser.getByteFrequencyData(soundData);
    //analyser.getByteTimeDomainData(soundData);

    svg.selectAll("circle")
        .data(soundData)
        .attr("r", function (d) {
            return d/15;
        })
        .attr("fill", function (d) {
            /*
            var red = 0;
            var green = d;
            var blue = d/2;

            return ("rgb(" + red + "," + green + ", " + blue +")");
        */
            return "#00D1B2";
        });



}


/**
 * This function changes the text displayed in animation
 */
function updateSvgText() {

    // Logo Visualization (non D3)
    if(visual.visualization == "logo") {

        var color;
        if(visual.text.color != "") {
            color = visual.text.color;
        } else {
            color = "red";
        }
        
        if(visual.text.title != "") {
            document.getElementById("svg-title").innerHTML = visual.text.title;
            document.getElementById("svg-title").setAttribute("fill", color);
            document.getElementById("svg-title").setAttribute("class", "");
        } else {
            document.getElementById("svg-title").setAttribute("class", "is-hidden");
        }

        if(visual.text.duration != "") {
            document.getElementById("svg-duration").innerHTML = convertTime(visual.text.duration);
            document.getElementById("svg-duration").setAttribute("fill", color);
            document.getElementById("svg-duration").setAttribute("class", "");
        } else {
            document.getElementById("svg-duration").setAttribute("class", "is-hidden");
        }

        if(visual.text.custom_text != "") {
            var textCenter;

            if(visual.text.custom_text.length <= 13) {
                textCenter = getSvgTextCenter(visual.text.custom_text) + 100;
            } else if(visual.text.custom_text.length > 54) {
                textCenter = getSvgTextCenter(visual.text.custom_text) - 50;
            } else if(visual.text.custom_text.length < 27) {
                textCenter = getSvgTextCenter(visual.text.custom_text) + 75;
            } else if(visual.text.custom_text.length < 40){
                textCenter = getSvgTextCenter(visual.text.custom_text) + 50;
            } else if(visual.text.custom_text.length < 51) {
                textCenter = getSvgTextCenter(visual.text.custom_text) + 25;
            } else {
                textCenter = getSvgTextCenter(visual.text.custom_text);
            }


            document.getElementById("svg-custom").innerHTML = visual.text.custom_text;
            document.getElementById("svg-custom").setAttribute("fill", color);
            document.getElementById("svg-custom").setAttribute("font-size", getSvgTextSize(visual.text.custom_text) + 10);
            document.getElementById("svg-custom").setAttribute("x", textCenter);
            document.getElementById("svg-custom").setAttribute("class", "");
        } else {
            document.getElementById("svg-custom").setAttribute("class", "is-hidden");
        }

    // D3 Visualization
    } else {
        // clear svg
        document.getElementById("svg-container").innerHTML = "";

        loadD3Visualization(visual.visualization);
        setSvgBackground();

    }
}


/**
 * function to get appropriate text size depending on text length
 *
 * @param text
 * @returns {*}
 */
function getSvgTextSize(text) {

    var size;

    // maximum size
    if(text.length <= 13) {
        size = 80;
    // minimum size
    } else if(text.length > 54) {
        size = 12;
    } else {
        size = Math.floor(1040 / text.length);
    }

    return size;
}


/**
 * function to get the center point for aligning text in animation
 *
 * @param text
 * @returns {*}
 */
function getSvgTextCenter(text) {

    var center;

    // maximum size
    if(text.length <= 13) {
        center = 330 - (Math.floor(330 / 13) * text.length);
        // minimum size
    } else if(text.length > 54) {
        center = 330 - ((330 / 90) * text.length);
    } else {
        center = (330 - ((330 / text.length) * text.length)) + 330 / text.length;
    }

    return center;
}

/**
 * function to add svg to animation
 */
function setSvgText() {

    var color;

    if(visual.text.color != "" && visual.text.color != null) {
        color = visual.text.color;
    } else {
        color = "red";
    }

    if(visual.text.title != "" && visual.text.title != null) {

        svgText
            .append("text")
            .attr("x", 5)
            .attr("y", 20)
            .attr("font-family", "Lucida Console, Monaco, monospace")
            .attr("font-size", 20)
            .attr("fill", color)
            .text(visual.text.title);

    }

    if(visual.text.duration != "" && visual.text.duration != null) {

        svgText
            .append("text")
            .attr("x", 600)
            .attr("y", 20)
            .attr("font-family", "Lucida Console, Monaco, monospace")
            .attr("font-size", 20)
            .attr("fill", color)
            .text(convertTime(visual.text.duration));

    }


    if(visual.text.custom_text != "" && visual.text.custom_text != null) {

        svgText
            .append("text")
            .attr("x", getSvgTextCenter(visual.text.custom_text))
            .attr("y", 200)
            .attr("font-family", "Lucida Console, Monaco, monospace")
            .attr("font-size", getSvgTextSize(visual.text.custom_text))
            .attr("fill", color)
            .text(visual.text.custom_text);
    }
}


/*******************************************************************************
 *
 * INIT
 *
 *******************************************************************************/

// Load on Startup
// TODO alle localhost locations auf produktivsystem evtl anpassen
$(document).ready(function() {
    // Check if Cookies are disabled
    if(navigator.cookieEnabled == false) {
        // if location is index or home show warning modal
        if(window.location.href == "http://localhost:3000/index.html" || window.location.href == "http://localhost:3000/home.html") {
            var modalDiv = document.createElement("div");
            $(document.body.appendChild(modalDiv)).load("modals/cookies-disabled-start.html", function() {
                loadModalClickhandlers();
            });
        // if location is settings show danger modal
        } else if(window.location.href == "http://localhost:3000/settings.html") {
            var modalDiv = document.createElement("div");
            $(document.body.appendChild(modalDiv)).load("modals/cookies-disabled-settings.html", function() {
                loadModalClickhandlers();
            });
        }
    // if cookies are enabled check if cookies are set
    } else {
        var fontStyle = checkCookie("fontstyle");
        var theme = checkCookie("theme");
        var languageCookie = checkCookie("lang");

        if(fontStyle != "" && fontStyle != null) {
            document.getElementsByTagName("body")[0].setAttribute("class", fontStyle);
        }
        if(theme != "" && theme != null) {
            // weil es nur ein nicht-std theme gibt bedeutet gesetzter cookie immer dark theme
            document.getElementsByTagName("head")[0].appendChild(darkCssTheme);
        }
        // if language cookie is set use set language
        if(languageCookie != "" && languageCookie != null) {
            language = languageCookie;
        // else use browser language
        } else {
            // for german browsers (including de, de-ch, de-at etc.) use german
            if(browserLanguage.startsWith("de")) {
                language = "de";
            // else default to english for non german browsers
            } else {
                language = "en";
            }

        }
    }

    if(window.location.href == "http://localhost:3000/index.html") {
        document.getElementById("gal-img-length").innerHTML = galerie.length.toString();
    }

    /**
     * Home Page startup
     */
    if(window.location.href == "http://localhost:3000/home.html") {
        loadHome();
    }

    /**
     * Settings Page startup
     */
    if(window.location.href == "http://localhost:3000/settings.html") {
        loadSettingClickhandlers();
    }

    /**
     * About Page startup
     */
    if(window.location.href == "http://localhost:3000/about.html") {
        loadImprint();
    }


    // load localization
    loadLocale();

    // make website visible
    var waitEle = document.getElementsByClassName("wait");
    for(let i = 0; i < waitEle.length; i++) {
        waitEle[i].style.visibility = "visible";
    }

});



