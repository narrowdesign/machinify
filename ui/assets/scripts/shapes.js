var paused = false;
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var winW = window.innerWidth;
  var winH = window.innerHeight;

  var smallScreen = false;
  var spirals;

  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  var aspect = .5;
  var axis = .5;
  var axisY = .45;
  var spiralOriginX = winW * axis
  var spiralOriginY = winH * axisY
  var rotation = 0;
  var pauseTimeout;
  var scrollTop = 0;
  var isTouchEnabled = false;
  var isTouching;

  sizeCanvas();

  // window.addEventListener('mousemove', function(){
  //   drawMbp()
  // }
  setInterval(function(){
    if (!paused) {
      drawMbp()
    }
  },60)
  window.addEventListener('touchstart', function(){
    isTouchEnabled = true;
    isTouching = true;
  });
  window.addEventListener('touchend', function(){
    isTouching = false;
  });
  window.addEventListener('scroll',function(){
    paused = true;
    if (scrollY > 700) {

    } else {
      clearTimeout(pauseTimeout)
      pauseTimeout = setTimeout(function(){
        paused = false;
      },100)
    }
  })

  window.addEventListener('resize',function(){
    sizeCanvas();
  })

  function sizeCanvas() {
    if (!isTouching) {
      winW = window.innerWidth;
      winH = window.innerHeight;
      smallScreen = false;
      // spirals = ['','ui/assets/images/spiral-line-black.svg','ui/assets/images/spiral-line-magenta.svg','ui/assets/images/spiral-line-cyan.svg',]
      spiralOriginX = winW * axis
      spiralOriginY = winH * axisY
      canvas.width = winW;
      canvas.height = winH;
      count = 0;
    }
  }

  var spiralRed = new Image;
  spiralRed.src = 'ui/assets/images/spiral-line.svg';
  var count = 0;
  var src = 0;
  var spirals = new Array('ui/assets/images/spiral-line.svg','ui/assets/images/spiral-line-purple.svg')
  var gradient = ctx.createLinearGradient(0, 0, winW, winH);
  gradient.addColorStop(0, 'rgba(4, 0, 58, .025)');
  gradient.addColorStop(1, 'rgba(46, 6, 62, .025)');

  var gradient2 = ctx.createLinearGradient(0, 0, winW, winH);
  gradient2.addColorStop(0, 'rgba(4, 0, 58, .25)');
  gradient2.addColorStop(1, 'rgba(46, 6, 62, .25)');
  var fillStyle = gradient;
  var clearingCount = 0;
  // every 10 seconds clear it dramatically
  function drawMbp() {
    count++;
    clearingCount++;
    if (count%100 == 0) {
      src = Number(!src)
      spiralRed.src = spirals[src];
    }
    if (clearingCount > 150 && clearingCount < 170) {
      fillStyle = gradient2;
    } else if (clearingCount > 170) {
      fillStyle = gradient;
      clearingCount = 0;
    }
    requestAnimationFrame(function(){
      ctx.globalAlpha = .6;
      ctx.fillStyle = fillStyle
      ctx.fillRect(0, 0, winW, winH);
      ctx.translate( spiralOriginX, spiralOriginY);
      ctx.rotate(.6)
      ctx.translate( -spiralOriginX + count/5, -spiralOriginY + count/5);
      ctx.drawImage(spiralRed, 0,0,winW,winH);
    })
    // }
  }
})();
