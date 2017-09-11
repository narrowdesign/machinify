var _winW = window.innerWidth; // width of the window
var _winH = window.innerHeight;
var onLine, scrollX, scrollY, gyroscopeGamma, gyroscopeBeta, oldScrollX=0, oldScrollY=0, scrollXTotal=0, scrollYTotal=0, scrollXVelocity=0, scrollYVelocity=0, scrollXPercent, scrollYPercent, touchEnabled, oldTouchX, oldTouchY, touchX, touchY, touchMoveTotal=0, mouseX=0, mouseY=0, oldMouseX=0, oldMouseY=0, mouseXVelocity=0, mouseYVelocity=0, mouseXTotal=0, mouseYTotal=0, mouseXPercent, mouseYPercent, mouseXSpeed, mouseYSpeed, cookies, language, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, scrollX, keyTotal=0, keyCache='', keyCurrent, mouseEnterTotal, mouseLeaveTotal, mouseDragTime, mouseUpEvents=0, mouseDownEvents=0, mouseDownTime, clicks=0, currentDate, startDate, currentTime, startTime, totalTime, activeTime, inactiveTime, plugins, device, OS, OSVersion, browser, browserVersion;

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
    $('.output-mouseDownEvents .output-bar-fill').css({width:'100%'});
    $('.output-clicks .output-bar-fill').css({width:'100%'});
    mouseDownEvents++
  });
  WIN.on('mouseup', function(){
    $('.output-mouseDownEvents .output-bar-fill').css({width:'0'});
    $('.output-clicks .output-bar-fill').css({width:'0'});
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
    scrollHandler();

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
    cookies = 'Do not cookie';
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

    currentDate = new Date();
    var start = new Date(currentDate.getFullYear(), 0, 0);
    var diff = currentDate - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    $('.output-currentDate .output-value').text(currentDate.toDateString());
    $('.output-currentDate .output-bar-fill').css({width: (day/365) * 100 + '%'});
    render()
  })()
  var counter = 0;
  setInterval(render,60);
  function render() {
    counter++;
    if (scrollY < 600) {
      currentDate = new Date();
      currentTime = (new Date()).toTimeString()
      totalTime = currentDate-startDate;

      $('.output-mouseX .output-value').text('mx ' + mouseX)
      $('.output-mouseX .output-bar-fill').css({width: mouseXPercent * 100 + '%'})
      $('.output-mouseY .output-value').text('my ' + mouseY)
      $('.output-mouseY .output-bar-fill').css({width: mouseYPercent * 100 + '%'})
      $('.output-totalTime .output-value').text('cycles ' + totalTime);
      $('.output-totalTime .output-bar-fill').css({width: Math.min(100,totalTime/200) + '%'});
      $('.output-mouseXVelocity .output-value').text('mxv ' + mouseXVelocity);
      $('.output-mouseXVelocity .output-bar-fill').css({width: Math.min(100,Math.abs(mouseXVelocity)) + '%'})
      $('.output-mouseYVelocity .output-value').text('myv ' + mouseYVelocity);
      $('.output-mouseYVelocity .output-bar-fill').css({width: Math.min(100,Math.abs(mouseYVelocity)) + '%'})

    }
  }
  function scrollHandler(e) {
    scrollY = WIN.scrollTop();

    var moved = scrollY - oldScrollY;
    if (scrollY > 200 && !BODY.hasClass('is-scrolled')) {
      BODY.addClass('is-scrolled')
    } else if (scrollY < 200 && BODY.hasClass('is-scrolled')) {
      BODY.removeClass('is-scrolled');
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
    $('.output-keyCurrent .output-bar-fill').css({width:'100%'});
  }
  function keyupHandler(e) {
    if (e.keyCode === 39) {
      $('.bg-pattern').css({
        // backgroundImage: 'url("ui/assets/images/pattern3.png")'
      })
      $('header div').eq(0).attr('class', 'pos-r w-100p ms-d-f a-i-baseline t-a-c j-c-center')

      $('.js-quotes').removeClass('ms-d-f')
      $('.js-quotes').addClass('p-b-3 t-a-c')
      $('.js-quote').removeClass('ms-w-30p p-v-8')
      $('.js-quote').addClass('ms-w-100p p-v-3 t-a-c')
    }
    if (e.keyCode === 38) {
      $('.bg-pattern').css({
        // backgroundImage: 'url("ui/assets/images/pattern2.png")'
      })
      $('header div').eq(0).attr('class', 'pos-r w-100p ms-d-f a-i-baseline t-a-c j-c-center')

      $('.js-quotes').removeClass('ms-d-f')
      $('.js-quotes').addClass('p-b-3 t-a-c')
      $('.js-quote').removeClass('ms-w-30p p-v-8')
      $('.js-quote').addClass('ms-w-100p p-v-3 t-a-c')
    }
    if (e.keyCode === 37) {
      $('.bg-pattern').css({
        // backgroundImage: 'url("ui/assets/images/pattern.png")'
      })
      $('header div').eq(0).attr('class', 'pos-r w-100p ms-d-f a-i-baseline t-a-l j-c-between')

      $('.js-quotes').addClass('ms-d-f')
      $('.js-quotes').removeClass('p-b-3 t-a-c')
      $('.js-quote').addClass('ms-w-30p p-v-8')
      $('.js-quote').removeClass('ms-w-100p p-v-3 t-a-c')
    }
    $('.output-keyCurrent .output-bar-fill').css({width:'0'});
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

  (function cycleGraphics() {

    var linesStatus = new Array();
    for (var i=0;i<$('.graphic-lines line').length;i++) {
      linesStatus[i] = 'nope';
    }

    var dashedControls = false;
    dashControlLines();
    setInterval(function(){
      dashControlLines()
    },3000)
    function dashControlLines() {
      dashedControls = !dashedControls;
      for (var i=0;i<$('.control-line').length;i++) {
        dashControlLine(i)
      }
    }
    function dashControlLine(num) {
      var dashOffset = 0;
      if (dashedControls) {
        dashOffset = '1500px'
      }
      $('.control-line').css({
        strokeDashoffset: dashOffset,
      })
    }

    for (var i=-1;i<$('.graphic4-lines line').length;i = i+9) {
      lineJump(i)
    }
    function lineJump(num) {
      $('.graphic4-lines line').eq(num).css({
        transform: 'scaleY(' + (num*(Math.random() + 2)) + ')',
        transitionDelay: num/40 + 's',
        transformOrigin: '0 120%',
        stroke: '#CB375B'
      }).addClass('is-on')
    }
    setInterval(function(){
      $('.graphic4-lines line').css({
        transform: 'scaleY(1)',
        transitionDelay: '0s',
      }).removeClass('is-on')
      setTimeout(function(){
        for (var i=-1;i<$('.graphic4-lines line').length;i = i+9) {
          lineJump(i)
        }
      },300)
    },6000)

    linesInterval = setInterval(doLines,20);
    setInterval(setDials,3000);
    var dialOffset = 80;
    setDials();
    function setDials() {
      if (dialOffset == 80) {
        dialOffset = 0;
        $('.graphic1-spiral1 path').css({
          strokeDashoffset: 0,
          strokeWidth: 2
        })
        setTimeout(function(){
          linesInterval = setInterval(doLines,20);
          for (var i=0;i<$('.graphic-lines line').length;i++) {
            linesStatus[i] = 'nope';
          }
        },500)
      } else {
        dialOffset = 80;
        $('.graphic1-spiral1 path').css({
          strokeDashoffset: 80,
          strokeWidth: 1
        })
        clearInterval(linesInterval)
      }
      $('.dial-ring').css({
        strokeDashoffset: dialOffset,
      })

      $('.graphic-lines line').css({
        transform: 'scaleX(1)',
        opacity: '.8',
        stroke: '#ccc'
      })
    }

    function doLines() {
      if (linesStatus.indexOf('nope') != '-1') {
        for (var i=0;i<$('.graphic-lines line').length;i++) {
          updateLine(i)
        }
      }
    }
    function updateLine(i) {
      var line = $('.graphic-lines line').eq(i);
      var opacity = Math.random() - .2;
      var scale = Math.random() * 3;
      if (linesStatus[i] != "done") {
        if (opacity > .75 || scale > 5) {
          linesStatus[i] = "done";
          line.css({
            transform: 'scaleX(30)',
            transformOrigin: '50%',
            opacity: 1,
            stroke: '#CB375B'
          });
        } else {
          line.css({
            opacity: opacity,
            transform: 'scaleX(' + scale + ')',
            transformOrigin: '50%'
          })
        }
      }
    }

  })()
  // setInview($('.js-watch-next'));
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
  var growthGroup = $('.growth g').length;
  $('.growth path').each(function(i){
    $('.growth path').eq(i).css({
      transitionDelay: Math.random() + 's'
    })
  })
  setInterval(function(){
    var group = $('.growth g').eq(growthGroup);
    var offset = 0;
    if (Math.random() > .8) {
      offset = '-120px'
    }
    var pathNum = Math.floor(Math.random() * $('path',group).length);
    $('path',group).css({
      strokeDashoffset: offset,
    })
    growthGroup--;
    if (growthGroup <= 0) {
      growthGroup = $('.growth g').length
    }
  },100)
})
