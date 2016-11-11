
//for analytics I think)
var courseID = "4025";
var prototypeVersion = 'PBL Smokescreen V1';

//CSS & HTML
var css = "https://reinvention.flvs.net/pbl/styles.css"; // link to css file
//minify html from pbl.html
var plappActiveHTML = '<div id="pbl-wrapper"> <div id="pblPrompt"> <p>You want in on some project-based learning?</p><button id="pbl-yes">Yes</button><button id="pbl-no">No</button> </div><div id="pblResponse"> <p>Response</p><button id="pbl-ok">OK</button> </div></div>';


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
	var viewed=getCookie("viewed");
    if (viewed=="true") {
        return true;
    } else {
       return false;
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