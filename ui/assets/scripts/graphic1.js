(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var canvas;
  var ctx;
  var canvasWidth = 300;
  var canvasHeight = 150;

  var circleR = 20;
  var timeout = 0;
  var often = 15;
  var count = 0;

  function init(){
    // often = 5;
    canvas = document.getElementById("graphic1");
    ctx = canvas.getContext("2d");
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
      var radians = Math.PI/180*(Math.random()*90);
      var x = 200;
      ctx.lineTo(-200,0);

      ctx.strokeStyle="#E52C58";
      ctx.lineWidth=0.05;

      ctx.stroke();
      ctx.rotate(radians);

      ctx.beginPath();
      ctx.moveTo(0,Math.floor(Math.random()*12)*circleR);
      var radians = Math.PI/180*(Math.random()*90);
      var x = 200;
      ctx.lineTo(-200,0);
      ctx.strokeStyle="#9DB2ED";
      ctx.lineWidth=0.05;

      ctx.stroke();
      ctx.rotate(radians);
      drawTimeout();
    })
  }
  init()

})();
