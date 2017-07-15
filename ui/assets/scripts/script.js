var _winW = window.innerWidth; // width of the window
var _winH = window.innerHeight;
var onLine, scrollX, scrollY, gyroscopeX, gyroscopeY, oldScrollX=0, oldScrollY=0, scrollXTotal=0, scrollYTotal=0, scrollXVelocity=0, scrollYVelocity=0, scrollXPercent, scrollYPercent, touchEnabled, oldTouchX, oldTouchY, touchX, touchY, touchMoveTotal=0, mouseX, mouseY, oldMouseX=0, oldMouseY=0, mouseXVelocity, mouseYVelocity, mouseXTotal=0, mouseYTotal=0, mouseXPercent, mouseYPercent, mouseXSpeed, mouseYSpeed, cookies, language, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, keyTotal=0, keyCache='', keyCurrent, mouseEnterTotal, mouseLeaveTotal, mouseDragTime, mouseUpEvents=0, mouseDownEvents=0, mouseDownTime, clicks=0, currentDate, startDate, currentTime, startTime, totalTime, activeTime, inactiveTime, plugins, device, OS, OSVersion, browser, browserVersion;

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
    WIN.on('wheel',scrollHandler);
    WIN.on('scroll',scrollHandler);
    WIN.on('mousemove',mousemoveHandler);
    WIN.on('keydown', keydownHandler);
    WIN.on('keyup', keyupHandler);
    WIN.on('mousedown', function(){mouseDownEvents++});
    WIN.on('mouseup', function(){mouseUpEvents++});
    WIN.on('touchstart', touchStartHandler);
    WIN.on('touchmove', touchMoveHandler);
    // WIN.on('touchend', touchEndHandler);
    WIN.on('click', function(){clicks++});
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation',function(e){
        gyroscopeX = e.beta;
        gyroscopeY = e.gamma;
      })
    }else{
      window.addEventListener("devicemotion",function(e){
        gyroscopeX = event.acceleration.x * 2;
        gyroscopeY = event.acceleration.y * 2
      });
    }

    // FUNCTIONS
    ////////////
    (function init() {

      if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
          browser = 'Opera';
      }
      else if(navigator.userAgent.indexOf("Chrome") != -1 )
      {
          browser = 'Chrome';
      }
      else if(navigator.userAgent.indexOf("Safari") != -1)
      {
          browser = 'Safari';
      }
      else if(navigator.userAgent.indexOf("Firefox") != -1 )
      {
           browser = 'Firefox';
      }
      else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
      {
        browser = 'IE';
      }
      else
      {
         browser = 'unknown';
      }

      OS = navigator.platform
      plugins = navigator.plugins.length;
      cookies = navigator.cookiesEnables?"enabled":"disabled";
      language = navigator.language;
      device = navigator.platform
      OSVersion = navigator.platform
      browser = browser
      browserVersion = navigator.platform
      startDate = new Date();
      startTime = startDate.toTimeString();

      $('.output-cookies').text(cookies);
      $('.output-language').text(language);
      $('.output-device').text(device);
      $('.output-OS').text(OS);
      $('.output-OSVersion').text(OSVersion);
      $('.output-browser').text(browser);
      $('.output-browserVersion').text(browserVersion);

      render()
    })()
    function render() {
      onLine = navigator.onLine?"online":"offline";
      currentDate = new Date();
      currentTime = (new Date()).toTimeString()
      totalTime = currentDate-startDate + 'ms';

      $('.output-mouseX').text(mouseX)
      $('.output-mouseY').text(mouseY)
      $('.output-mouseXPercent').text(mouseXPercent)
      $('.output-mouseYPercent').text(mouseYPercent)
      $('.output-scrollY').text(scrollY)
      $('.output-scrollX').text(scrollX);
      $('.output-scrollXTotal').text(scrollXTotal);
      $('.output-scrollYTotal').text(scrollYTotal);
      $('.output-scrollXVelocity').text(scrollXVelocity);
      $('.output-scrollYVelocity').text(scrollYVelocity);
      $('.output-scrollXPercent').text(scrollXPercent);
      $('.output-scrollYPercent').text(scrollYPercent);
      $('.output-touchEnabled').text(touchEnabled);
      $('.output-touchX').text(touchX);
      $('.output-touchY').text(touchY);
      $('.output-touchMoveTotal').text(touchMoveTotal);
      $('.output-mouseX').text(mouseX);
      $('.output-mouseY').text(mouseY);
      $('.output-mouseXVelocity').text(mouseXVelocity);
      $('.output-mouseYVelocity').text(mouseYVelocity);
      $('.output-mouseXTotal').text(mouseXTotal);
      $('.output-mouseYTotal').text(mouseYTotal);
      $('.output-mouseXVelocity').text(mouseXVelocity);
      $('.output-mouseYVelocity').text(mouseYVelocity);
      $('.output-keyTotal').text(keyTotal);
      $('.output-keyCache').text(keyCache);
      $('.output-keyCurrent').text(keyCurrent);
      $('.output-mouseEnterTotal').text(mouseEnterTotal);
      $('.output-mouseLeaveTotal').text(mouseLeaveTotal);
      $('.output-mouseDragTime').text(mouseDragTime);
      $('.output-mouseUpEvents').text(mouseUpEvents);
      $('.output-mouseDownEvents').text(mouseDownEvents);
      $('.output-mouseDownTime').text(mouseDownTime);
      $('.output-clicks').text(clicks);
      $('.output-startTime').text(startTime);
      $('.output-currentDate').text(currentDate.toDateString());
      $('.output-currentTime').text(currentTime);
      $('.output-totalTime').text(totalTime);
      $('.output-activeTime').text(activeTime);
      $('.output-inactiveTime').text(inactiveTime);
      $('.output-onLine').text(onLine)

      requestAnimationFrame(render)
    }
    function scrollHandler(e) {
      scrollX = WIN.scrollLeft();
      scrollY = WIN.scrollTop();
      scrollXPercent = (scrollX/_winW).toFixed(3);;
      scrollYPercent = (scrollY/BODY.innerHeight()).toFixed(3);
      if (oldScrollX) {
        scrollXVelocity = scrollX - oldScrollX;
      } else if (oldScrollX == scrollX) {
        scrollXVelocity = 0;
      }
      if (oldScrollY) {
        scrollYVelocity = scrollY - oldScrollY;
      } else if (oldScrollY == scrollY) {
        scrollYVelocity = 0;
      }
      scrollXTotal += Math.abs(scrollXVelocity);
      scrollYTotal += Math.abs(scrollYVelocity);
      oldScrollX = scrollX;
      oldScrollY = scrollY;
      var moved = scrollY - oldScrollY;
      if (scrollY > Math.max(50,NAME_TOP-250) && !BODY.hasClass('is-scrolled')) {
        BODY.addClass('is-scrolled')
      } else if (scrollY < Math.max(50,NAME_TOP-250) && BODY.hasClass('is-scrolled')) {
        BODY.removeClass('is-scrolled')
      }
      if (scrollY > 200 && (moved < -20 && !BODY.hasClass('is-scrolling-up') && scrollY < DOC.height() - _winH - 40)) {
        BODY.addClass('is-scrolling-up')
      } else if (moved > 0 && BODY.hasClass('is-scrolling-up')) {
        BODY.removeClass('is-scrolling-up')
      }
      $('.header').css({
        transform: 'translate3d(0,' + scrollY/4 + 'px,0)'
      })
    }

    function touchStartHandler(e) {
      touchEnabled = "true";
      touchX = e.originalEvent.touches[0].clientX;
      touchY = e.originalEvent.touches[0].clientY;
    }
    function touchMoveHandler(e) {
      touchX = e.originalEvent.touches[0].clientX;
      touchY = e.originalEvent.touches[0].clientY;
      if (!oldTouchX) {
        oldTouchX = touchX;
        oldTouchY = touchY;
      }
      touchMoveTotal += Math.abs(touchX - oldTouchX) + Math.abs(touchY - oldTouchY);

      oldTouchX = touchX;
      oldTouchY = touchY;
    }
    function deviceMotionHandler(e) {
        gyroscopeX = event.acceleration.x * 2
    }

    function keydownHandler(e) {
      keyTotal++;
      keyCurrent = String.fromCharCode(e.which);
      keyCache = (keyCurrent + keyCache);
      keyCache = keyCache.substr(0,3)
    }
    function keyupHandler(e) {

    }

    function mousemoveHandler(e) {
      mouseX = e.pageX;
      mouseY = e.pageY - scrollY;
      mouseXVelocity = mouseX - oldMouseX;
      mouseYVelocity = mouseY - oldMouseY;
      mouseXTotal += Math.abs(mouseXVelocity)
      mouseYTotal += Math.abs(mouseYVelocity)
      oldMouseX = mouseX;
      oldMouseY = mouseY;
      mouseXPercent = (e.pageX / _winW).toFixed(3);
      mouseYPercent = (e.pageY / _winH).toFixed(3);
    }


    function resizeHandler () { // Set the size of images and preload them
      var oldWinW = _winW;
      _winW = window.innerWidth;
      _winH = window.innerHeight;
      if ($('.js-name').offset()) {
        NAME_TOP = $('.js-name').offset().top;
      }
      initialized = true;
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
;
