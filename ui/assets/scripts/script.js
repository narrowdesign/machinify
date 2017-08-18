var _winW = window.innerWidth; // width of the window
var _winH = window.innerHeight;
var onLine, scrollX, scrollY, gyroscopeGamma, gyroscopeBeta, oldScrollX=0, oldScrollY=0, scrollXTotal=0, scrollYTotal=0, scrollXVelocity=0, scrollYVelocity=0, scrollXPercent, scrollYPercent, touchEnabled, oldTouchX, oldTouchY, touchX, touchY, touchMoveTotal=0, mouseX, mouseY, oldMouseX=0, oldMouseY=0, mouseXVelocity, mouseYVelocity, mouseXTotal=0, mouseYTotal=0, mouseXPercent, mouseYPercent, mouseXSpeed, mouseYSpeed, cookies, language, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, keyTotal=0, keyCache='', keyCurrent, mouseEnterTotal, mouseLeaveTotal, mouseDragTime, mouseUpEvents=0, mouseDownEvents=0, mouseDownTime, clicks=0, currentDate, startDate, currentTime, startTime, totalTime, activeTime, inactiveTime, plugins, device, OS, OSVersion, browser, browserVersion;

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
  WIN.on('mousedown', function(){
    $('.output-mouseDownEvents .output-bar').css({width:'100%'});
    $('.output-clicks .output-bar').css({width:'100%'});
    mouseDownEvents++
  });
  WIN.on('mouseup', function(){
    $('.output-mouseDownEvents .output-bar').css({width:'0'});
    $('.output-clicks .output-bar').css({width:'0'});
    mouseUpEvents++});
  WIN.on('touchstart', touchStartHandler);
  WIN.on('touchmove', touchMoveHandler);
  // WIN.on('touchend', touchEndHandler);
  WIN.on('click', function(){clicks++});
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation',function(e){
      // gyroscopeBeta = (e.beta).toFixed(3);
      // gyroscopeGamma = (e.gamma).toFixed(3);
    })
  }else{
    window.addEventListener("devicemotion",function(e){
      gyroscopeBeta = (event.acceleration.x * 2).toFixed(3);
      gyroscopeGamma = (event.acceleration.y * 2).toFixed(3);
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
    cookies = navigator.cookiesEnabled?"enabled":"disabled";
    language = navigator.language;
    device = navigator.platform
    OSVersion = navigator.platform
    browser = browser
    browserVersion = navigator.platform
    startDate = new Date();
    startTime = startDate.toTimeString();

    $('.output-cookies .output-value').text(cookies);
    $('.output-language .output-value').text(language);
    $('.output-device .output-value').text(device);
    $('.output-OS .output-value').text(OS);
    $('.output-OSVersion .output-value').text(OSVersion);
    $('.output-browser .output-value').text(browser);
    $('.output-browserVersion .output-value').text(browserVersion);

    render()
  })()
  var counter = 0;
  function render() {
    counter++;
    onLine = navigator.onLine?"online":"offline";
    currentDate = new Date();
    currentTime = (new Date()).toTimeString()
    totalTime = currentDate-startDate + 'ms';
    // console.log(counter)
    // $('.bg-pattern').css({
    //   backgroundPosition: '0 -' + counter + 'px'
    // })

    $('.output-mouseX .output-value').text(mouseX)
    $('.output-mouseX .output-bar').css({width: mouseXPercent * 100 + '%'})
    $('.output-mouseY .output-value').text(mouseY)
    $('.output-mouseY .output-bar').css({width: mouseYPercent * 100 + '%'})
    $('.output-mouseXPercent .output-value').text(mouseXPercent)
    $('.output-mouseXPercent .output-bar').css({width: mouseXPercent * 100 + '%'})
    $('.output-mouseYPercent .output-value').text(mouseYPercent)
    $('.output-mouseYPercent .output-bar').css({width: mouseYPercent * 100 + '%'})
    $('.output-scrollY .output-value').text(scrollY)
    $('.output-scrollY .output-bar').css({width: scrollYPercent * 100 + '%'})
    $('.output-scrollX .output-value').text(scrollX);
    $('.output-scrollX .output-bar').css({width: scrollXPercent * 100 + '%'})
    $('.output-scrollXTotal .output-value').text(scrollXTotal);
    $('.output-scrollYTotal .output-value').text(scrollYTotal);
    $('.output-scrollXVelocity .output-value').text(scrollXVelocity);
    $('.output-scrollYVelocity .output-value').text(scrollYVelocity);
    $('.output-scrollYVelocity .output-bar').css({width: scrollYVelocity + '%'})
    $('.output-scrollXPercent .output-value').text(scrollXPercent);
    $('.output-scrollYPercent .output-value').text(scrollYPercent);
    $('.output-scrollYPercent .output-bar').css({width: scrollYPercent * 100 + '%'})
    $('.output-touchEnabled .output-value').text(touchEnabled);
    $('.output-touchX .output-value').text(touchX);
    $('.output-touchY .output-value').text(touchY);
    $('.output-gyroscopeGamma .output-value').text(gyroscopeGamma);
    $('.output-gyroscopeBeta .output-value').text(gyroscopeBeta);
    $('.output-touchMoveTotal .output-value').text(touchMoveTotal);
    $('.output-mouseX .output-value').text(mouseX);
    $('.output-mouseY .output-value').text(mouseY);
    $('.output-mouseXVelocity .output-value').text(mouseXVelocity);
    $('.output-mouseXVelocity .output-bar').css({width: Math.abs(mouseXVelocity) + '%'})
    $('.output-mouseYVelocity .output-value').text(mouseYVelocity);
    $('.output-mouseYVelocity .output-bar').css({width: Math.abs(mouseYVelocity) + '%'})
    $('.output-mouseXTotal .output-value').text(mouseXTotal);
    $('.output-mouseYTotal .output-value').text(mouseYTotal);
    $('.output-keyTotal .output-value').text(keyTotal);
    $('.output-keyCache .output-value').text(keyCache);
    $('.output-keyCurrent .output-value').text(keyCurrent);
    $('.output-mouseEnterTotal .output-value').text(mouseEnterTotal);
    $('.output-mouseLeaveTotal .output-value').text(mouseLeaveTotal);
    $('.output-mouseDragTime .output-value').text(mouseDragTime);
    $('.output-mouseUpEvents .output-value').text(mouseUpEvents);
    $('.output-mouseDownEvents .output-value').text(mouseDownEvents);
    $('.output-mouseDownTime .output-value').text(mouseDownTime);
    $('.output-clicks .output-value').text(clicks);
    $('.output-startTime .output-value').text(startTime);
    $('.output-currentDate .output-value').text(currentDate.toDateString());
    $('.output-currentTime .output-value').text(currentTime);
    $('.output-totalTime .output-value').text(totalTime);
    $('.output-activeTime .output-value').text(activeTime);
    $('.output-inactiveTime .output-value').text(inactiveTime);
    $('.output-onLine .output-value').text(onLine)

    requestAnimationFrame(render)
  }
  function scrollHandler(e) {
    scrollX = WIN.scrollLeft();
    scrollY = WIN.scrollTop();
    scrollXPercent = (scrollX/_winW).toFixed(3);;
    scrollYPercent = (scrollY/BODY.innerHeight()).toFixed(3);
    if (oldScrollX) {
      scrollXVelocity = Math.abs(scrollX - oldScrollX);
    } else if (oldScrollX == scrollX) {
      scrollXVelocity = 0;
    }
    if (oldScrollY) {
      scrollYVelocity = Math.abs(scrollY - oldScrollY);
    } else if (oldScrollY == scrollY) {
      scrollYVelocity = 0;
    }
    scrollXTotal += Math.abs(scrollXVelocity);
    scrollYTotal += Math.abs(scrollYVelocity);
    oldScrollX = scrollX;
    oldScrollY = scrollY;
    var moved = scrollY - oldScrollY;
    if (scrollY > 200 && !BODY.hasClass('is-scrolled')) {
      BODY.addClass('is-scrolled')
    } else if (scrollY < 200 && BODY.hasClass('is-scrolled')) {
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

  }

  function keydownHandler(e) {
    keyTotal++;
    keyCurrent = String.fromCharCode(e.which);
    keyCache = (keyCurrent + keyCache);
    keyCache = keyCache.substr(0,3)
    $('.output-keyCurrent .output-bar').css({width:'100%'});
  }
  function keyupHandler(e) {
    if (e.keyCode === 39) {
      $('.bg-dark-blue').css({
        backgroundColor: '#060031'
      })
      $('.bg-pattern').css({
        backgroundImage: 'url("ui/assets/images/pattern2.png")'
      })
      $('header div').eq(0).attr('class', 'pos-r w-100p ms-d-f a-i-baseline t-a-c j-c-center')
      $('header h1').removeClass('bd-t')

      $('.js-point').attr('class', 'js-point pos-r d-f fx-c j-c-between m-b-5 ms-w-50p p-h-col05')

      $('.js-quotes').removeClass('ms-d-f')
      $('.js-quotes').addClass('p-b-3 t-a-c')
      $('.js-quote').removeClass('ms-w-30p p-v-8')
      $('.js-quote').addClass('ms-w-100p p-v-3 t-a-c')
    }
    if (e.keyCode === 37) {
      $('.bg-dark-blue').css({
        backgroundColor: '#27071E'
      })
      $('.bg-pattern').css({
        backgroundImage: 'url("ui/assets/images/pattern.png")'
      })
      $('header div').eq(0).attr('class', 'pos-r w-100p ms-d-f a-i-baseline t-a-l j-c-between')
      $('header h1').addClass('bd-t')
      $('.js-point').attr('class', 'js-point pos-r d-f fx-c j-c-between m-b-5 ms-w-22p')

      $('.js-quotes').addClass('ms-d-f')
      $('.js-quotes').removeClass('p-b-3 t-a-c')
      $('.js-quote').addClass('ms-w-30p p-v-8')
      $('.js-quote').removeClass('ms-w-100p p-v-3 t-a-c')
    }
    $('.output-keyCurrent .output-bar').css({width:'0'});
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
    mouseXPercent = (mouseX / _winW).toFixed(3);
    mouseYPercent = (mouseY / _winH).toFixed(3);
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
  BODY.addClass('is-in');

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
