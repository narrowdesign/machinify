
(function(){
  var WIN_W = 666;
  var WIN_H = 666;

  var R = 330;

  var QUANTITY = 5;

  var canvas;
  var ctx;
  var ctx2;

  var centerX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;
  var frame = 0;
  var cycle = 0;

  var sides = 3;
  var shapes = 15;

  var direction = 'down';

  var visible = false;



  function init() {
    canvas = document.getElementById( 'graphic-studio' );
    canvas2 = document.getElementById( 'canvas-scratch' );

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx2 = canvas2.getContext('2d');

      windowResizeHandler();


      var inview6 = new Waypoint.Inview({
        element: document.querySelector('.graphic-studio-container'),
        entered: function(direction) {
          if (!visible) {
            visible = true;
            frame = 0;
            sides = 3;
            shapes = 15;
            loop();
          }
        },
        exited: function(direction) {
          frame = 0;
          visible = false;
          setTimeout(function(){
            ctx.clearRect(0,0,WIN_W,WIN_H);
            ctx2.clearRect(0,0,WIN_W,WIN_H);
          },100)
        }
      })
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
    if (visible) {
      requestAnimationFrame(function(){
        frame++;
        ctx2.clearRect(0,0,WIN_W,WIN_H);
        ctx2.drawImage(canvas,0,0);

        ctx.clearRect(0,0,WIN_W,WIN_H);
        ctx.globalAlpha = .93;
        ctx.drawImage(canvas2,0,0);
        ctx.globalAlpha = .7;
        ctx.beginPath();
        shapes = 15;
        if (direction == 'down') {
          sides -= sides/1000;
          if (sides < 3) {
            direction = 'up';
            frame = 0;
          }
        } else {
          sides += sides/1000;
          if (sides > 8) {
            direction = 'down';
            frame = 0;
          }
        }
        for (var s=0;s<shapes;s++) {
          for (var i=0;i<=sides;i++) {
            ctx.lineTo(
              333 + (Math.cos((Math.PI * i + Math.PI/4) / (sides/2))) * (333-s*23-Math.random()),
              333 + (Math.sin((Math.PI * i + Math.PI/4) / (sides/2))) * (333-s*23-Math.random())
            );
          }
        }
        ctx.strokeStyle = setStrokeColor(frame);
        ctx.stroke();
        loop();
      })
    }
  }

  function setStrokeColor(num) {
    if (num%2 == 0) {
      ctx.strokeStyle="#060130"
    } else {
      ctx.strokeStyle="#E52C58"
    }

  }

  init();

})()
