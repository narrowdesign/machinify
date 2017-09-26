(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var raf;

  var canvas;
  var ctx;
  var canvasWidth = 1000;
  var canvasHeight = 666;

  var circleR = 40;
  var timeout = 0;
  var count = 0;
  var totalRadians = 0;
  var teeth = 0;
  var arms = 0;

  var inited = false;

  function init(){
    inited = true;
    canvas = document.getElementById("graphic1");
    ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawLines();
  }

  function drawLines() {
    ctx.translate(canvasWidth/2,canvasHeight/2);
    drawTimeout();
    teeth = Math.ceil(Math.random()*8) + 1
    arms = Math.ceil(Math.random()*2) + 3
    circleR = Math.floor(Math.random()*40) + 80;
    toY = Math.random()*150
    console.log(teeth,arms,circleR,toY)
  }
  function drawTimeout(){
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function(){
      count++;

      ctx.beginPath();
      ctx.moveTo(0,Math.floor(Math.random()*teeth)*circleR);
      var radians = Math.PI/180*((Math.floor(Math.random()*arms)/arms)*90);
      var x = 300;
      ctx.lineTo(-300,toY);
      count%2 ? ctx.strokeStyle="#9DB2ED" : ctx.strokeStyle="#E52C58";;
      ctx.lineWidth=0.2;

      ctx.stroke();
      ctx.rotate(radians);
      totalRadians+=radians;
      drawTimeout();

      if (count > 500) {
        resetLines()
      }
    })
  }

  function resetLines() {
    count = 0;
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawLines();
  }

  window.addEventListener('scroll',function(e){
    if (scrollY > document.getElementById("graphic1").getBoundingClientRect().top - window.innerHeight && !inited) {
      init();
    }
  })

})();
