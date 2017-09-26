(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var canvas;
  var ctx;
  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;

  var circleR = 30;
  var timeout = 0;
  var often = 15;
  var count = 0;

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
    drawTimeout();
  }
  function drawTimeout(){
    requestAnimationFrame(function(){
      count++;
      ctx.beginPath();
      ctx.moveTo(0,Math.floor(Math.random()*12)*circleR);
      var radians = Math.PI/180*((Math.floor(Math.random()*4)/4)*90);
      var x = 300;
      ctx.lineTo(-300,0);

      ctx.strokeStyle="#E52C58";
      ctx.lineWidth=0.2;

      ctx.stroke();
      ctx.rotate(radians);

      ctx.beginPath();
      ctx.moveTo(0,Math.floor(Math.random()*12)*circleR);
      var radians = Math.PI/180*((Math.floor(Math.random()*4)/4)*90);
      var x = 300;
      ctx.lineTo(-300,0);
      ctx.strokeStyle="#9DB2ED";
      ctx.lineWidth=0.2;

      ctx.stroke();
      ctx.rotate(radians);
      drawTimeout();
    })
  }

  window.addEventListener('scroll',function(e){
    if (scrollY > document.getElementById("graphic1").getBoundingClientRect().top - window.innerHeight && !inited) {
      init();
    }
  })

})();
