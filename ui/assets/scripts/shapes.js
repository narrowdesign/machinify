(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var winW = window.innerWidth;
  var winH = winW*.618033;

  var smallScreen = false;
  var spirals;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var aspect = .5;
  var axis = .5;
  var spiralOriginX = winW * axis
  var spiralOriginY = winW * axis * aspect
  var keydown;

  sizeCanvas();

  // window.addEventListener('mousemove', function(){
  //   drawMbp()
  // }
  setInterval(function(){
    drawMbp()
  },30)
  window.addEventListener('touchmove',drawMbp);
  window.addEventListener('keydown',function() {
    if (rotation > 90 || rotation < -1300)
    keydown = true;
    drawMbp()
    drawMbp()
    drawMbp()
  });
  window.addEventListener('keyup',function() {
    keydown = false;
  });

  window.addEventListener('resize',function(){
    sizeCanvas()
  })

  function sizeCanvas() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    smallScreen = false;
    // spirals = ['','ui/assets/images/spiral-line-black.svg','ui/assets/images/spiral-line-magenta.svg','ui/assets/images/spiral-line-cyan.svg',]
    spiralOriginX = winW * axis
    spiralOriginY = winW * aspect * axis
    canvas.width = winW;
    canvas.height = winW*.618033;

    if (winW < winH) {
      canvas.width = winH*.618033;
      canvas.height = winH;
    }
  }

  var spiralRed = new Image;
  spiralRed.src = 'ui/assets/images/spiral-line.svg';
  var count = 0;
  function drawMbp() {
    count++;
    if (count % 2) {
      requestAnimationFrame(function(){
        ctx.globalAlpha = .4;
        ctx.translate( spiralOriginX, spiralOriginY);
        ctx.rotate(.6)
        ctx.translate( -spiralOriginX, -spiralOriginY);
        ctx.drawImage(spiralRed, 0,0,winW,winH);
      })
    }
    // }
  }
})();
