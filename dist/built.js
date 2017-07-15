
$(function() {
  var components = [];
  var componentsData = [];
  var componentsLoaded = 0;
  if ($('.component').length > 0) {
    for (var i=0; i < $('.component').length; i++) {
      var el = $('.component').eq(i);
      components[i] = el;
      getData(i,el)
    }
  } else {
    runScript()
  }

  function getData(i,el) {
    $.get('/components/' + el.data('component') + '.html').done(function(data) {
      if (el.data()) {
        data = data.replace('{{twitter}}',el.data('twitter'))
        data = data.replace('{{fb}}',el.data('fb'))
        data = data.replace('{{bg}}',el.data('bg'))
        data = data.replace('{{vidID}}',el.data('vidid'))
        data = data.replace('{{person}}',el.data('person'))
        data = data.replace('{{first-last}}',el.data('first-last'))
        data = data.replace('{{twitter-user}}',el.data('twitter-user'))
      }
      componentsData[i] = data;
      componentsLoaded++;
      if (componentsLoaded === $('.component').length) {
        populateComponents()
      }
    }).fail(function(error){'Tell @dannpetty he should’ve found a better dev.'});
  }
  function populateComponents() {
    for (var i = components.length - 1; i >= 0; i--) {
      components[i].replaceWith(componentsData[i]);
    }
    runScript()
  }
})
;var _winW = window.innerWidth; // width of the window
var _winH = window.innerHeight;

var scrollTop = 0; // keeps track of scroll position
var isTouchDevice;
var mobileSafari;

var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent );

if( ios ) {

    if ( !standalone && safari ) {

        mobileSafari = true;

    } else if ( standalone && !safari ) {

        // STANDALONE

    } else if ( !standalone && !safari ) {

        // UIWEBVIEW

    };

}

// Subscribe email to both mailchimp & slack
// Endpoints are hosted on narrowdesign.com and
//   will need https to have secure payment page
var Membership = function(email, callback) {
  $.ajax({
    type: "POST",
    url: '//www.narrowdesign.com/scripts/mailchimp.php',
    data: {email: email},
    success: function(data) {
      if (data && data.title === "Member Exists") {
        ga('send', 'event', 'mailchimp', 'already exists', window.location);
        $('.mc-field-group input[name="EMAIL"]').val('ALREADY SIGNED UP. 🤔 CHECK EMAIL?')
      } else if (data && data.status === 400) {
        ga('send', 'event', 'mailchimp', 'error', window.location + ':400');
        $('.mc-field-group input[name="EMAIL"]').val('ERROR 🤔')
      } else if (data && data.status !== 400) {
        ga('send', 'event', 'mailchimp', 'BAM!', window.location);
        $('.mc-field-group input[name="EMAIL"]').val('BAM. CHECK YOUR EMAIL!')
      }
      $('.mc-field-group input[name="EMAIL"]').addClass('bam');
      setTimeout(function(){
        $('.mc-field-group input[name="EMAIL"]').val('')
        $('.mc-field-group input[name="EMAIL"]').removeClass('bam');
      },5000)
    },
    error: function(data) {
      console.log('error')
      ga('send', 'event', 'mailchimp', 'error', window.location);
      //if (data && data.status !== 400)
      $('.mc-field-group input[name="EMAIL"]').val('ERROR 🤔')
      if (data && data.title === "Member Exists") {
        $('.mc-field-group input[name="EMAIL"]').val('ALREADY SIGNED UP. 🤔 CHECK EMAIL?')
      }
      $('.mc-field-group input[name="EMAIL"]').addClass('bam');
      setTimeout(function(){
        $('.mc-field-group input[name="EMAIL"]').val('')
        $('.mc-field-group input[name="EMAIL"]').removeClass('bam');
      },5000)
    },
    dataType: 'json'
  });
  $.ajax({
    type: "POST",
    url: '//www.narrowdesign.com/scripts/slack.php',
    data: {email: email},
    success: function(data) {
      ga('send', 'event', 'slack', 'success', window.location);
      //if (data && data.ok === true)
      if (callback)
        callback(email)
    },
    error: function(data) {
      ga('send', 'event', 'slack', 'error', window.location);
      //if (data && data.ok === true)
      if (callback)
        callback(email)
    },
    dataType: 'json'
  });
}


// reused from documentary.js for consistency
Membership.validateEmail = function(val) {
  var valid = val.indexOf('@') != -1 && val.lastIndexOf('.') > val.indexOf('@') + 1 && val.substr(val.lastIndexOf('.') + 1).length > 1;
  return valid;
}

// check if specific email is subscribed, or if any subscription is there at all
Membership.check = function(email) {
  if (email)
    return localStorage['mailchimp-subscription'] == email &&
           localStorage['slack-invitation'] == email;
  else
    return localStorage['mailchimp-subscription'] &&
           localStorage['slack-invitation'];
}

// triggered when MC form is submitted,
// overrides default action so browser does not navigate away
Membership.onSubmit = function(event) {
  ga('send', 'event', 'membership', 'submit', window.location);
  var email = $('input[name="EMAIL"]', this);
  if (Membership.validateEmail(email.val())) {
    email.removeClass('is-error');
    Membership(email.val(), function() {
      $(document.body).addClass('is-subscribed')
      Membership.onSuccess(email.val(), true);
    })
  } else {
    email.addClass('is-error')
    ga('send', 'event', 'membership', 'invalid email', window.location);
  }
  return false;
}

Membership.initialize = function() {
  // add css class when this browser has subscribed before
  // var email = Membership.check();
  // if (email) {
  //   // $(document.body).addClass('is-subscribed')
  //   // Membership.onSuccess(email);
  // }

  // there are multiple forms on the page
  $('form[id="mc-embedded-subscribe-form"]').each(function() {

    // listen for form submission
    $(this).submit(Membership.onSubmit);
  })
}


function runScript() {
  $(function() {

    var WIN = $(window);
    var DOC = $(document);
    var BODY = $("body");
    var initialized = false;

    var RATIO; // scrolling image strip
    var LAST_RIGHT; // right edge of the last image
    var NAME_TOP;

    resizeHandler(); // Calculate sizes right away
    setTimeout(function(){
      if ($('.js-name').offset()) {
        NAME_TOP = $('.js-name').offset().top;
      }
    },1000)

  // EVENTS
  /////////

    // UTIL EVENTS
    WIN.on('resize',resizeHandler);

    WIN.on('touchstart',function(){
      isTouchDevice = true;
    })
    WIN.on('wheel',scrollHandler);
    WIN.on('scroll',scrollHandler);
    WIN.on('touchmove',scrollHandler);

    WIN.on('mousemove',mousemoveHandler);

    $('.js-back-up-top ').on('click',function(){
      BODY.scrollTop(0);
    })

    $('.popup').click(function(event) {
      ga('send', 'event', 'social popup', 'click', this.href);
      var width  = 575,
          height = 400,
          left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          url    = this.href,
          opts   = 'status=1' +
                   ',width='  + width  +
                   ',height=' + height +
                   ',top='    + top    +
                   ',left='   + left;

      window.open(url, 'twitter', opts);

      return false;
    });

    // triggered when new membership is detected, e.g. to hide forms
    Membership.onSuccess = function(email, isNew) {
      // if (isNew) {
      //   hideSignupModal();
      // } else {

      // }

      // $('nav.js-nav--community > div:last-child').html(email);
      // $('nav.js-nav--community > div:last-child').addClass('is-subscribed')

      // // change "follow along"
      // var followAlong = $('.js-link--signup');
      // if (followAlong) {
      //   followAlong.text('thanks for following along')
      //   followAlong.removeClass('js-link--signup')
      //   followAlong.removeClass('white')
      // }
    }

    // initialize email forms
    Membership.initialize();

    $('.js-link--signup').on('mouseover',showSignupModal);
    $('.js-link--signup').on('click',showSignupModal);
    $('.js-modal__bg').on('mouseover',hideSignupModal);
    $('.js-modal__bg').on('click',hideSignupModal);


  // FUNCTIONS
  ////////////


    function scrollHandler(e) {
      var oldScrollTop = scrollTop;
      scrollTop = WIN.scrollTop();
      var moved = scrollTop - oldScrollTop;
      if (scrollTop > Math.max(50,NAME_TOP-100) && !BODY.hasClass('is-scrolled')) {
        BODY.addClass('is-scrolled')
      } else if (scrollTop < Math.max(50,NAME_TOP-100) && BODY.hasClass('is-scrolled')) {
        BODY.removeClass('is-scrolled')
      }
      if (scrollTop > 200 && (moved < -20 && !BODY.hasClass('is-scrolling-up') && scrollTop < DOC.height() - _winH - 40)) {
        BODY.addClass('is-scrolling-up')
      } else if (moved > 0 && BODY.hasClass('is-scrolling-up')) {
        BODY.removeClass('is-scrolling-up')
      }

      if ($('.js-info').offset() && scrollTop > $('.js-info').offset().top) {
        if (!$('.js-nav--fixed').hasClass('is-person')){
          $('.js-nav--fixed').addClass('is-person');
        }
      } else if ($('.js-info').offset()) {
        $('.js-nav--fixed').removeClass('is-person');
      }

      $('.js-video__bg-fill').css({
        opacity: Math.max(0,1-scrollTop/_winH)
      })

      if (scrollTop > _winH) {
        BODY.addClass('is-small-video');
      } else {
        BODY.removeClass('is-small-video');
  /*      $('.js-video__cover').css({
          transform: 'translate3d(0,' + scrollTop/3 + 'px,0)'
        })*/
        $('.js-bg--home').css({
          transform: 'translate3d(0,' + scrollTop/2 + 'px,0)'
        })
        $('.js-video__wrapper').css({
          transform: 'translate3d(0,' + -scrollTop/2 + 'px,0)',
          transitionDuration: 0
        })
      }

      // // PHOTO STRIP (HELENA)
      // var strip = $('.js-photo-strip-images')
      // if (_winW > 960) {
      //   if ($('.js-photo-strip-images').offset()) {
      //     var lastImage = $('img', strip).eq($('img', strip).length-1);
      //     if (!RATIO && lastImage.offset()) {
      //       LAST_RIGHT = lastImage.offset().left + lastImage.width();
      //       RATIO = (_winH - strip.height())/(LAST_RIGHT - _winW);
      //     }
      //     strip.css({
      //       transform: 'translate3d(' + Math.max(-(LAST_RIGHT - _winW),Math.min(0,(scrollTop - strip.offset().top + _winH - strip.height())/-RATIO)) + 'px,0,0)'
      //     })
      //   }
      // }else{
      //   strip.css({
      //     transform: 'none'
      //   })
      // }

      // SHOW SIGNUP ON MOBILE
      if (scrollTop >= $('footer').offset().top + $('footer').height() - _winH) {
        $('.js-nav--community').addClass('is-in')
      } else {
        $('.js-nav--community').removeClass('is-in')
      }
    }

    function showSignupModal (e){
      $('body').addClass('is-signup-modal');
      var left = $(this).offset().left + $(this).width()/2 - $('.js-modal--signup').outerWidth()/2;
      if (_winW < 960) {
        left = (_winW/2 - $('.js-modal--signup').outerWidth()/2)/2
      }
      $('.js-modal--signup').css({
        left: left,
        top: Math.max(0,$(this).offset().top - $('.js-modal--signup').outerHeight() - 10 - scrollTop)
      })
    }
    function hideSignupModal (e){
      $('body').removeClass('is-signup-modal');
      $('.js-modal--signup').css({
        left: '100%'
      })
    }

    function mousemoveHandler(e) {
      // if (BODY.hasClass('is-images')) {
      //   $('.imageNav').each(function () {
      //    this.style.setProperty( 'top', e.pageY - scrollTop, 'important' );
      //   })
      // }
    }

    function resizeHandler () { // Set the size of images and preload them
      var oldWinW = _winW;
      _winW = window.innerWidth;
      _winH = window.innerHeight;
      BODY.removeClass('is-webview')
      $('.js-webview').text('s')
      var video = $('.js-video__loop');
      $('.h-footer').css({
        height: _winH - $('.js-nav--fixed').outerHeight()
      })
      if ($('.js-name').offset()) {
        NAME_TOP = $('.js-name').offset().top;
      }
      if (!initialized) {
        if (_winW > 960) {
          setVideoSrc(video.data('vid'))
        } else {
          if (mobileSafari) {
            setVideoSrc(video.data('vidmobile'))
          } else {
            BODY.addClass('is-webview')
            $('.js-webview').text('wv')
          }
        }
      }
      if (_winW > 960) {
        $('.mc-field-group input[name="EMAIL"]').attr('placeholder','ENTER EMAIL')
        if (oldWinW <= 960) {
          setVideoSrc(video.data('vid'))
        }
      } else {
        $('.mc-field-group input[name="EMAIL"]').attr('placeholder','ENTER EMAIL TO JOIN THE COMMUNITY')
        if (oldWinW > 960) {
          if (mobileSafari) {
            setVideoSrc(video.data('vidmobile'))
          } else {
            BODY.addClass('is-webview')
            $('.js-webview').text('wv')
          }
        }
      }
      initialized = true;
    }

    function setVideoSrc(src) {
      $('.js-video__loop source').remove()
      var video = $('.js-video__loop').append('<source src="'+ src + '">')
      if (video[0]) {
        video[0].load()
        $('.js-video__loop').on('ended', function () {
          this.load();
          this.play();
        });
      }
    }

    var nameHTML = $('.js-name').text();
    nameHTML = nameHTML.replace(/./g, "<span>$&</span>").replace('<span> </span>','<br>');
    nameHTML = nameHTML.replace('<span> </span>','<br>');
    $('.js-name span').html(nameHTML);
    $('.js-name span > span').each(function(i){
      $(this).css({
        '-webkit-transition-delay': Math.random()*.3 + 's'
      });
    });

    var nextNameHTML = $('.js-next-name').text();
    nextNameHTML = nextNameHTML.replace(/./g, "<span>$&</span>").replace('<span> </span>',' ');
    $('.js-next-name span').html(nextNameHTML);
    $('.js-next-name span > span').each(function(i){
      $(this).css({
        '-webkit-transition-delay': Math.random()*.3 + 's'
      });
    });

    // ANIMATION STUFF
    setTimeout(function(){
      if (window.location.hash.indexOf('#playing') !== -1) {
        setTimeout(function(){
          BODY.addClass('is-in');
        },600)
      } else {
        BODY.addClass('is-in');
      }
    },300)


    setInview($('.js-watch-next'));
    /*setInview($('blockquote'));*/

    function setInview (el) {
      setTimeout(function(){
        if (el.offset()) {
          var inview = new Waypoint.Inview({
            element: el,
            enter: function(direction) {
              if (!el.hasClass('is-in')) {
                el.addClass('is-in');
              }
            },
            exited: function(direction) {
              el.removeClass('is-in')
            },
          })
        }
      },300)
    }

  })

}
