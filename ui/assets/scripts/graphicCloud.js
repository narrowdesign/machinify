(function(){
    var canvas = document.getElementById("graphic-cloud");
    var ctx = canvas.getContext("2d");

    var colors = new Array('49,97,118','186,64,109')

    canvas.width = 1000;
    canvas.height = 1000;

    var particle;
    var particleList = [];
    var visible = 0;

    function init() {
      var inview5 = new Waypoint.Inview({
        element: document.querySelector('.graphic-cloud-container'),
        entered: function(direction) {
          if (!visible) {
            particleList = [];
            visible = true;
            frame = 0;
            sides = 3;
            shapes = 15;
            particleInterval = setInterval(createParticle,60);
            handlerInterval = setInterval(intervalHandler, 30);
          }
        },
        exited: function(direction) {
          frame = 0;
          visible = false;
          setTimeout(function(){
            resetLines();
            clearInterval(handlerInterval);
          },100)
        }
      })
    }

    function createParticle(){
      if (particleList.length < 60) {
          particle = new ParticleObject(particleList.length, canvas.width * Math.random(), canvas.height * Math.random());
          particle.draw();
          particleList.push(particle);
      } else {
        clearInterval(particleInterval);
      }
    }

    function intervalHandler()
    {
      if (visible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < particleList.length; ++i)
        {
            particle = particleList[i];
            particle.draw();
            particle.connect();
        }
      }
    }

    function ParticleObject(pIndex, pX, pY)
    {
        this.index = pIndex + Math.random();
        this.ticker = (Math.PI / 2);
        this.x = pX;
        this.y = pY;
        this.size = 5;
        this.color = "#ffffff";
        this.arcX = randomRange(-1, 1);
        this.arcY = randomRange(-1, 1);
        this.distance = 0;

        this.range = 3;
        this.speed = .0005;

        this.draw = function()
        {
            ctx.moveTo(this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = .6;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            this.ticker += this.speed;

            this.ticker = this.ticker == 1 ? 0 : this.ticker;

            this.x += Math.sin(Math.cos(this.index * .5) + (this.ticker * this.index * .5)) * this.range;
            this.y += Math.cos(Math.cos(this.index * .9) + (this.ticker * this.index * .75)) * this.range;

            var maxX = 1000-(Math.abs(this.y-500))/2;
            var maxY = 1000-(Math.abs(this.x-500))/2;
            var minX = (Math.abs(this.y-500))/2;
            var minY = (Math.abs(this.x-500))/2;
            this.x = Math.max(Math.min(maxX,this.x),minX);
            this.y = Math.max(Math.min(maxY,this.y),minY);

        }

        this.connect = function()
        {
            for(var i = 0; i < particleList.length; ++i)
            {
                particle = particleList[i];

                this.distance = Math.sqrt( Math.pow(particle.x - this.x, 2) + Math.pow(particle.y - this.y, 2) );

                if(this.distance > 50 && this.distance < 250)
                {
                    this.isConnected++;
                    this.size = Math.ceil(this.distance/30);
                    this.color = i%2 == 0 ? '#060130' : '#E2305B';

                    ctx.strokeStyle = i%2 == 0 ? "#E2305B" : "#060130";
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);

                    ctx.lineWidth = 12.5;
                    ctx.lineTo(particle.x, particle.y);
                    ctx.stroke();
                }
            }
        }
    }

    function randomRange(pFrom, pTo)
    {
        return pFrom + (Math.random()*(pTo-pFrom));
    }

    function resetLines(){
      particleList = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    init();
})();
