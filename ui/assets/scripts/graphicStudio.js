
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
  var progress = 0;
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
    ctx.lineCap = "round";
  }

  function loop() {
    if (visible) {
      requestAnimationFrame(function(){
        frame++;
        progress = Math.min(1,frame/100);
        ctx2.clearRect(0,0,WIN_W,WIN_H);
        ctx2.drawImage(canvas,0,0);

        ctx.clearRect(0,0,WIN_W,WIN_H);
        ctx.globalAlpha = .93;
        ctx.drawImage(canvas2,0,0);
        ctx.globalAlpha = 1;
        ctx.strokeStyle="#060130";
        ctx.lineWidth = 2;

// PILLS 1-3
        roundRect(1,1,20,350,10,false,true);
        roundRect(87,1,20,350,10,false,true);
        roundRect(173,1,20,350,10,false,true);

        ctx.beginPath();
        ctx.strokeStyle="#E52C58";
        ctx.moveTo(11,340);
        ctx.lineTo(11,333-progress * 320);
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle="#E52C58";
        ctx.moveTo(97,340);
        ctx.lineTo(97,333-progress * 320);
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle="#E52C58";
        ctx.moveTo(183,340);
        ctx.lineTo(183,333-progress * 320);
        ctx.lineWidth = 5;
        ctx.stroke();


// BIG CIRCLE

        ctx.lineWidth = 2;
        ctx.strokeStyle="#060130";
        ctx.beginPath();
        ctx.arc(480,175,174,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(480,175,152,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle="#E52C58";
        ctx.arc(480,175,163,0,progress * (Math.PI*2));
        ctx.stroke();

// PILLS 3-6
        ctx.lineWidth = 2;

        ctx.strokeStyle="#060130";
        roundRect(1,400,664,20,10,false,true);
        roundRect(1,465,664,20,10,false,true);
        roundRect(1,530,664,20,10,false,true);

        ctx.beginPath();
        ctx.strokeStyle="#E52C58";
        ctx.moveTo(11,410);
        ctx.lineTo(progress * 654,410);
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle="#E52C58";
        ctx.moveTo(11,475);
        ctx.lineTo(progress * 654,475);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle="#E52C58";
        ctx.moveTo(11,540);
        ctx.lineTo(progress * 654,540);
        ctx.stroke();


// SMALL CIRCLES
        ctx.strokeStyle="#060130";

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(37,629,36,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(179,629,36,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(331,629,36,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(484,629,36,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(629,629,36,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(37,629,20,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(179,629,20,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(331,629,20,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(484,629,20,0,Math.PI*2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(629,629,20,0,Math.PI*2);
        ctx.stroke();

        ctx.strokeStyle="#E52C58";

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(37,629,28,0,progress * (Math.PI*2));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(179,629,28,0,progress * (Math.PI*2));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(331,629,28,0,progress * (Math.PI*2));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(484,629,28,0,progress * (Math.PI*2));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(629,629,28,0,progress * (Math.PI*2));
        ctx.stroke();

        loop()

      })
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle="#E52C58";
  }

  function setStrokeColor(num) {
    if (num%2 == 0) {
      ctx.strokeStyle="#060130"
    } else {
      ctx.strokeStyle="#E52C58"
    }

  }
  function roundRect(x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.stroke();
    }
    if (fill) {
      ctx.fill();
    }
  }


  init();

})()
