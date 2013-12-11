$(window).load(function() { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('.wrapper').delay(350).fadeIn('fast', function() {
  	
  	$('.snowfall').snowfall({
  		image :"assets/img/snowflake.png", 
  		minSize: 10, 
  		maxSize:32,
  		flakeCount: 20,
  		maxSpeed: 2
  	});
  	
  	// initiate music
  	soundManager.setup({
  	  url: 'assets/swf/',
  	  onready: function() {
  	    var mySound = soundManager.createSound({
  	      id: 'aSound',
  	      url: 'assets/mp3/opt2.mp3'
  	    });
  	    mySound.play();
  	  },
  	  ontimeout: function() {
  	    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
  	  }
  	});
	  	
    $(".balls img").each(function(index) {
      var r = Math.floor((Math.random()*300)+1);
      $(this).delay(r).animate({top:-108},{duration:1000, easing: 'easeOutBounce'});    	
    });
    $(".greeting").delay(600).fadeIn();
	});
	
});

$(document).ready(function() {

	
	$(".fa").click(function() {
    
    if ($(this).hasClass("fa-volume-up")) {  		
  		soundManager.pause('aSound');
      $(this).removeClass("fa-volume-up").addClass("fa-volume-off");
    } else {
  		soundManager.resume('aSound');
      $(this).removeClass("fa-volume-off").addClass("fa-volume-up");        
      
    }
		
	});
	//colorbox
	$(".clicktags a").colorbox({
		inline:true, 
		opacity: 0,
		transition: "none"
		
	});

});
