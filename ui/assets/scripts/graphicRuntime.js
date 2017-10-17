// One of my first <canvas> experiments, woop! :D

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

  var characters = new Array('<','>','{','}','[',']','/','.',',','”')



  function init() {
    canvas = document.getElementById( 'graphic-runtime' );
    canvas2 = document.getElementById( 'canvas-scratch' );

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx2 = canvas2.getContext('2d');

      windowResizeHandler();


      var inview7 = new Waypoint.Inview({
        element: document.querySelector('.graphic-runtime-container'),
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
        ctx2.drawImage(canvas,1,0);

        ctx.clearRect(0,0,WIN_W,WIN_H);
        ctx.globalAlpha = .999;
        ctx.drawImage(canvas2,0,0);
        ctx.globalAlpha = 1;
        if (frame % 4 == 0) {
          setFillColor(frame)
          ctx.font = Math.random()*400 + 'px sans-serif';
          var character = characters[Math.floor(Math.random()*characters.length)]
          ctx.strokeText(character,Math.random()*666,Math.random()*666);
        }
        loop();
      })
    }
  }

  function setFillColor(num) {
    if (num/4%2 == 0) {
      ctx.strokeStyle="#060130"
    } else {
      ctx.strokeStyle="#E52C58"
    }

  }

  init();

})()
