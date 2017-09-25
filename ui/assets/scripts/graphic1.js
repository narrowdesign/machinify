(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var spirals;

  var canvas = document.querySelector('#graphic1');

  var winW = canvas.width;
  var winH = canvas.height;

  var ctx = canvas.getContext('2d');
  var rotation = 0;
  var pauseTimeout;
  var scrollTop = 0;

  sizeCanvas();

  setInterval(function(){
    drawMbp()
    drawMbp()
    drawMbp()
  },60)
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
    winW = canvas.width;
    winH = canvas.width;
    canvas.width = canvas.width;
    canvas.height = canvas.height;
  }

  var spiralRed = new Image;
  spiralRed.src = 'ui/assets/images/straight-line.svg';
  var count = 0;
  var clearingCount = 0;
  // every 10 seconds clear it dramatically
  function drawMbp() {
    count++;
    clearingCount++;
    requestAnimationFrame(function(){
      ctx.globalAlpha = 1;
      ctx.rotate(.025)
      ctx.drawImage(spiralRed, 0,0,350,2);
    })
    // }
  }
})();
