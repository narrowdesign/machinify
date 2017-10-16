
(function(){
  var WIN_W = 1000;
  var WIN_H = 666;

  var R = 330;

  var QUANTITY = 80;

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
    if (visible && frame < 120) {
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
          ctx.moveTo(i*30,WIN_H-(WIN_H*((frame-256)/350)));
          ctx.strokeStyle="rgba(157,178,237,.6)"
          ctx.lineWidth = .08;
          ctx.lineTo(i*30,Math.max(0,0));
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(i*30-5,WIN_H-(WIN_H*((frame-256)/350)));
          ctx.strokeStyle="#E52C58"
          ctx.lineWidth = 3;
          ctx.lineTo(i*30-5,Math.max(0,WIN_H - frame - (i*15) * (frame/(500-i*12))));
          ctx.stroke();
        }
        // if (frame > 504) {
        //   frame = 0;
        //   cycle++;
        // }
        loop();
      })
    }
  }

  function setStrokeColor(num) {
    if (num%2 == 0) {
      ctx.strokeStyle="#9DB2ED"
    } else {
      ctx.strokeStyle="#E52C58"
    }

  }

  init();


  var visible = false;
  var inview4 = new Waypoint.Inview({
    element: document.querySelector('.graphic4-container'),
    entered: function(direction) {
      if (!visible) {
        visible = true;
        frame = 0;
        loop();
      }
    },
    exited: function(direction) {
      frame = 0;
      visible = false;
      ctx.clearRect(0,0,WIN_W,WIN_H)
    }
  })


})();
