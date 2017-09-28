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
  var rings = 0;
  var ringSections = new Array();

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
    rings = Math.round(Math.random() * 6) + 2;
    ringSections = [];
    for (var i=0;i<rings;i++) {
      ringSections[i] = Math.round(Math.random() * 16) + 4;
    }
    cancelAnimationFrame(raf);
    drawTimeout();
  }
  function drawTimeout(){
    raf = requestAnimationFrame(function(){
      count++;
      ctx.beginPath();
      var myRing = Math.round(Math.random()*rings);
      var start = 333/(myRing+1);
      ctx.moveTo(start,0);
      var radians = Math.PI/180*(360/ringSections[myRing]);
      ctx.lineTo(166,0);
      count%2 ? ctx.strokeStyle="#9DB2ED" : ctx.strokeStyle="#E52C58";;

      ctx.stroke();
      ctx.rotate(radians);
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
