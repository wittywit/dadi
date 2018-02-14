


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('topbar nav-down').addClass('topbar nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('topbar nav-up').addClass('topbar nav-down');
        }
    }
    
    lastScrollTop = st;
}


//Page Scroller
$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});


//Responsive Navigation

$('.toggle-nav').click(function() {
  if ($('body').hasClass('show-nav')) {
      $('body').removeClass('show-nav').addClass('hide-nav');

      setTimeout(function() {
          $('body').removeClass('hide-nav');
      }, 500);

      } else {
          $('body').removeClass('hide-nav').addClass('show-nav');
      }

      return false;
    });



//iSwiper
var swiper = new Swiper('.swiper-testimonial', {
	spaceBetween: 30,
	spaceBetween: 30,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    loop: true
});
var swiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	spaceBetween: 30,
	loop: true
});



////////////////////////////////////////////////////////

///// LOAD MORE

////////////////////////////////////////////////////////

	$('.ff-load-more').on('click', function(){ 
		
		var loader = $('#load-more'),
		    btn = $(this),
		    post_type = btn.attr('data-post-type'),
		    count = parseInt(btn.attr('data-count')),
		    offset = parseInt(btn.attr('data-offset')),
		    token = $('[data-token]').data('token'),
		    newOffset = '';
		
		var	my_data = {
		    action: 'load_more',
		    nonce: token,
		    post_type: post_type,
		    count: count,
		    offset: offset
		};
		
		loader.addClass('active');
		btn.prop('disabled', true);
		
		$.post(ajax_url, my_data, function (response) {
		
		    if (response != 'none') {
		
		        $('#return').append(response);
		        loader.removeClass('active');
		        btn.prop('disabled', false);
		
		        // update offset
		        newOffset = offset + count;
		        btn.attr('data-offset', newOffset);
		    }
		    else {
		
		        loader.remove();
		    }
		});
			
	});


});