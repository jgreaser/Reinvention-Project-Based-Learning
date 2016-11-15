
//for analytics I think)
var courseID = "4025";
var prototypeVersion = 'PBL Smokescreen V1';

var isTesting = true;

//CSS & HTML
var css = "styles.css"
//"https://reinvention.flvs.net/pbl/styles.css"; // link to css file
//minify html from pbl.html
var plappActiveHTML = '<div id="pbl-wrapper"> <div id="pblPrompt"> <h1>Hey there!</h1> <h4>We have something that we think you might be interested in.</h4> <h3>Two Paths Ahead</h3> <p>You could keep going through these lesson pages, front to back, and then doing the assessment at the end.</p><h4>OR</h4> <p>You can choose to go a different way. We will give you the assessment information first and then use the lesson pages as resources.</p></br> <h3>Which Would You Like To Do?</h3> <ul> <li>Choosing the normal lesson will close this and let you continue on your way.</li><li>Choosing the different way will give you more details.</li></ul> </br> <button id="pbl-no">The Normal Lesson</button><div class="divider"/><button id="pbl-yes">The Different Lesson</button> </div><div id="pblResponse"> <h1>Awesome!</h1> <p>Thanks for being willing to try something different.</p><h3>Getting Started</h3> <p>Go ahead and put your first name and FLVS email in the form below and we will contact your teacher for you. They will give you the details on what you will need to do.</p><form id="ajax-contact" method="post" action="mailer.php"> Your first name:<br><input id="PBLusername" type="text" name="username"><br>Your FLVS email:<br><input id="PBLemail" type="email" name="email"><br><div id="form-messages"></div><p>We want you to keep moving so while you are waiting to hear back from your teacher, we have some tasks to get started on. You will want to write these down.</p><h3>Starting Tasks</h3> <ul> <li>Stuff from teachers</li><li>another thing from teachers</li></ul> </br> <button id="pblButton">SUBMIT NAME AND CLOSE THIS SCREEN</button> </form> </div></div>';


//viewed checks for a cookie, to only give students the prototype once
var viewed = getViewed();

//load css
loadjscssfile(css, "css");

$(document).ready(function(){

	if (viewed == false){

	setCookie("viewed", true, 365);

	//add the html to the body
    $('body').append(plappActiveHTML);
    
    //hide the second screen on load
	$('#pblResponse').hide();


    var form = $('#ajax-contact');


    console.log(form);

    // Get the messages div.
    var formMessages = $('#form-messages');

// Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        var formData = $(form).serialize();
        console.log($('#PBLusername').val() + " " + $('#PBLemail').val());


        $('#pblButton').hide();
        $(formMessages).text("Working on it...this takes about 20 seconds.");
        
        $(formMessages).addClass('working');


        $.get( "https://reinvention.flvs.net/pbl/mailer.php", { name: $('#PBLusername').val(), email: $('#PBLemail').val() } ).done(function(  ) {
            window.alert( "Done! Your teacher will be in contact soon." );

            $('#pbl-wrapper').hide();

        }).fail(function() {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            
             $(formMessages).text('Something broke! Your message could not be sent. Email your teacher to do this work.');
            
        });;
});
	//handle a "yes" click
	$('#pbl-yes').click(function(){
		console.log("yes"); 
		 ga('send', 'event', 'Smokescreen Button', "select",  "Yes", 1);

		$('#pblPrompt').hide();
		$('#pblResponse').show();
		});

	//handle a "no" click
	$('#pbl-no').click(function(){
		console.log("no"); 
		ga('send', 'event', 'Smokescreen Button', "select",  "No", 0);

        $('#pbl-wrapper').hide();
		});

	//handle the final "close" click
	$('#pbl-ok').click(function(){
		console.log("ok"); 
		ga('send', 'event', 'Smokescreen Navigation', "select",  "Close");

		$('#pbl-wrapper').hide();
		});

	}
	else {console.log("previously viewed");}
}); // end document ready



function getViewed(){

    if (isTesting == true){
        return false;
    }
    else{

    	var viewed=getCookie("viewed");
        if (viewed=="true") {
            return true;
        } else {
           return false;
            }
    }

}



//=============================================================================
// MAIL SCRIPT
//=============================================================================
//ajax call to get mail scripot



//=============================================================================
// UTILITY
//=============================================================================
//cookie functions from http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//gets cookie by name
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

// Loads JS and CSS to page
function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype == "css") {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined");
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

//=============================================================================
// GOOGLE ANALYTICS
//=============================================================================

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-56647529-5', 'flvs.net');
ga('send', 'pageview');
ga('send', 'event', 'App Files', 'Loaded', prototypeVersion);