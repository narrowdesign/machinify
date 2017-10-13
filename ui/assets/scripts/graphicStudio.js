// One of my first <canvas> experiments, woop! :D

(function(){
  var WIN_W = 666;
  var WIN_H = 666;

  var R = 330;

  var QUANTITY = 5;

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
      loop()
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
      if (frame%19 === 0) {
       ctx.globalAlpha = .2;
      } else {
        ctx.globalAlpha = 1;
      }
      ctx.beginPath();
      ctx.lineWidth = 1;
      shapes = 25;
      sides = 25;
      for (var s=0;s<shapes;s++) {
        sides--;
        if (sides > 2) {
          for (var i=0;i<sides;i++) {
            // start at 0°
            ctx.lineTo(
                333 + Math.cos(Math.PI * i / (sides/2)) * (300 - s*13),
                333 + Math.sin(Math.PI * i / (sides/2)) * (300 - s*13)
            );
          }
          ctx.lineTo(
            333 + Math.cos(0) * (300 - s*13),
            333 + Math.sin(0) * (300 - s*13));
          // and back
        }
      }
      ctx.strokeStyle = setStrokeColor(frame);
      ctx.stroke();

      if (frame > 300) {
        sides = 20;
        frame = 0;
      }
      // loop();
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
