// One of my first <canvas> experiments, woop! :D

(function(){
  var WIN_W = 666;
  var WIN_H = 666;

  var R = 330;

  var QUANTITY = 60;

  var canvas;
  var ctx;
  var ctx2;
  var dots;

  var centerX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;
  var frame = 0;
  var cycle = 0;



  function init() {
    canvas = document.getElementById( 'graphic-studio' );
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
    WIN_W = 666;
    WIN_H = 666;

    canvas.width = 666;
    canvas.height = 666;
    canvas2.width = 666;
    canvas2.height = 666;
  }

  function loop() {

    requestAnimationFrame(function(){
      frame++;
      ctx2.clearRect(0,0,WIN_W,WIN_H);
      ctx2.drawImage(canvas,0,0);

      ctx.clearRect(0,0,WIN_W,WIN_H);
      ctx.globalAlpha = .95;
      ctx.drawImage(canvas2,0,0);
      ctx.globalAlpha = 1;
      for (i = 0, len = dots.length; i < len; i++) {
        ctx.beginPath();
        ctx.moveTo(WIN_W,WIN_H - 1+i*20);
        ctx.strokeStyle = setStrokeColor(i);
        ctx.lineCap = 'round'
        ctx.lineWidth = 2;
        ctx.lineTo(WIN_W - frame * 3 + (i-Math.abs(dots.length/2)),i*20);
        ctx.stroke();
      }
      if (frame > 534) {
        frame = 0;
        cycle++;
      }
      loop();
    })
  }

  function setStrokeColor(num) {
    if (num%2 == 0) {
      ctx.strokeStyle="#060130"
    } else {
      ctx.strokeStyle="#E52C58"
    }

  }

  init();

}())
