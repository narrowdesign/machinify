// One of my first <canvas> experiments, woop! :D

(function(){
  var WIN_W = 1000;
  var WIN_H = 666;

  var R = 330;

  var QUANTITY = 40;

  var canvas;
  var ctx;
  var ctx2;
  var dots;

  var centerX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;
  var frame = 0;
  var cycle = 0;



  function init() {
    canvas = document.getElementById( 'graphic4' );
    canvas2 = document.getElementById( 'canvas-scratch' );

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx2 = canvas2.getContext('2d');

      createdots();

      windowResizeHandler();

      loop();
    }
  }

  function createdots() {
    dots = [];

    for (var i = 0; i < QUANTITY; i++) {
      var dot;

      dots.push( dot );
    }
  }

  function windowResizeHandler() {
    WIN_W = 1000;
    WIN_H = 666;

    canvas.width = 1000;
    canvas.height = 666;
    canvas2.width = 1000;
    canvas2.height = 666;
  }

  function loop() {

    requestAnimationFrame(function(){
      frame++;
      ctx2.clearRect(0,0,WIN_W,WIN_H);
      ctx2.drawImage(canvas,0,0);

      ctx.clearRect(0,0,WIN_W,WIN_H);
      ctx.globalAlpha = .97;
      ctx.drawImage(canvas2,0,0);
      ctx.globalAlpha = 1;
      for (i = 0, len = dots.length; i < len; i++) {
        ctx.beginPath();
        ctx.moveTo(i*39,WIN_H-(WIN_H*((frame-256)/350)));
        ctx.strokeStyle = setStrokeColor(cycle);
        ctx.lineWidth = 1.5;
        ctx.lineTo(i*39,WIN_H - frame - (i*15) * (frame/(500-i*12)));
        ctx.stroke();
      }
      if (frame > 504) {
        frame = 0;
        cycle++;
      }
      loop();
    })
  }

  function setStrokeColor(num) {
    if (cycle%2 == 0) {
      ctx.strokeStyle="#9DB2ED"
    } else {
      ctx.strokeStyle="#E52C58"
    }

  }

  init();

}())
