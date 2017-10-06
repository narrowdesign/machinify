// One of my first <canvas> experiments, woop! :D

(function(){
  var WIN_W = 1000;
  var WIN_H = 1000;

  var R = 330;

  var QUANTITY = 20;

  var canvas;
  var ctx;
  var ctx2;
  var dots;

  var centerX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;
  var frame = 0;



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
    WIN_W = 1000;
    WIN_H = 1000;

    canvas.width = 1000;
    canvas.height = 1000;
    canvas2.width = 1000;
    canvas2.height = 1000;
  }

  function loop() {

    requestAnimationFrame(function(){
      frame++;
      ctx2.clearRect(0,0,WIN_W,WIN_H);
      ctx2.drawImage(canvas,0,0);

      ctx.clearRect(0,0,WIN_W,WIN_H);
      ctx.globalAlpha = .85;
      ctx.drawImage(canvas2,0,0);
      ctx.globalAlpha = 1;
      canvas.style.transform = 'rotate(' + frame/1.5 + 'deg)'
      for (i = 0, len = dots.length; i < len; i++) {
        ctx.beginPath();
        ctx.strokeStyle = setStrokeColor(i);
        ctx.lineWidth = 1;
        var startAngle = (Math.PI*1.5) + i;
        var endAngle = Math.PI*1.5 + ((Math.PI*2) + i/2) * (frame/200);
        if (frame > 300 - i*5) {
          ctx.strokeStyle = setStrokeColor(i+Math.floor(frame/15));
        }
        ctx.arc(centerX, centerY, R - (QUANTITY - i)*15, startAngle, endAngle, false);
        ctx.stroke();
        if (frame > 400) {
          frame = 0;
        }
      }
      loop();
    })
  }

  function setStrokeColor(num) {
    if (num%3 == 0) {
      ctx.strokeStyle="#9DB2ED"
    } else if (num%3 == 1) {
      ctx.strokeStyle="#E52C58"
    } else {
      ctx.strokeStyle= '#b38ac1'
    }

  }

  init();

}())
