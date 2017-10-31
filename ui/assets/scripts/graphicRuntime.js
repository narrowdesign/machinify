// One of my first <canvas> experiments, woop! :D

(function(){
  var WIN_W = 666;
  var WIN_H = 666;

  var canvas;
  var ctx;

  var centerX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;
  var frame = 0;

  var gap = 10;

  var words = [];
  var rows = 15;
  var cols = 5;
  var numWords = 20;

  for (var i=0; i<numWords; i++) {
    var lastX = words[i-1] ? words[i-1].x : 0;
    var lastW = words[i-1] ? words[i-1].w : 0;
    var row = Math.floor(i / 20);
    if (i % 20 === 0) {
      lastX = 0;
    }
    words[i] = {
      x: lastX + lastW + 20,
      y: row * 50 + 180,
      w: Math.round(Math.random() * 8) * 30,
      row: row,
      lineDash: [Math.random()*100 + 20,gap,Math.random()*200 + 20,gap,Math.random()*100 + 20,gap,Math.random()*200 + 20,gap,Math.random()*50 + 20,gap]
    }
  }

  var visible = false;


  function init() {
    canvas = document.getElementById( 'graphic-runtime' );

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');

      windowResizeHandler();


      var inview7 = new Waypoint.Inview({
        element: document.querySelector('.graphic-runtime-container'),
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
          setTimeout(function(){
            ctx.clearRect(0,0,WIN_W,WIN_H);
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
  }

  function loop() {
    if (visible) {
      requestAnimationFrame(function(){
        frame++;
        if (frame % 2 === 0) {
          ctx.clearRect(0,0,WIN_W,WIN_H);
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          for (var i = 0; i < words.length; i++) {
            ctx.beginPath();
            ctx.setLineDash(words[i].lineDash);
            ctx.lineDashOffset = frame;
            setStrokeColor(i);
            ctx.moveTo(0, 333);
            ctx.quadraticCurveTo(400, 333, 666, 333 + (i - numWords/2) * 100);
            ctx.stroke();
          }
          ctx.font = '60px monospace';
          var textTop = '< >';
          var textBottom = '< / >';
          ctx.fillStyle="#060130"
          ctx.fillText(textTop,0,60);
          ctx.fillStyle="#E52C58"
          ctx.fillText(textBottom,0,653);
        }
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
