var canvas = document.getElementById("graphic2"),
    context = canvas.getContext("2d");

var width = 300,
    height = 150;

canvas.width = width;
canvas.height = height;

var particle;
var particleList = [];

for(var i = 0; i < 60; ++i)
{
    particle = new ParticleObject(i, width * .5, height * .5);
    particle.draw();
    particleList.push(particle);
}


setInterval(intervalHandler, 1000 / 30);

function intervalHandler()
{
//    context.fillStyle = "#ffffff";

//    context.beginPath();
//    context.fillRect(width * .5, height * .5, 1, 1);
//    context.closePath();
//    context.fill();

//*
    context.clearRect(0, 0, width, height);

/*/
    context.globalCompositeOperation = "source-atop";

    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.fillRect(0, 0, width, height);
    context.fill();
//*/

//    context.globalCompositeOperation = "lighter";

    for(var i = 0; i < particleList.length; ++i)
    {
        particle = particleList[i];
        particle.draw();
        particle.connect();
    }
}

function ParticleObject(pIndex, pX, pY)
{
    this.index = pIndex + Math.random();
    this.ticker = (Math.PI / 2);
    this.x = pX;
    this.y = pY;
    this.size = 1;
    this.color = "#ffffff";
    this.arcX = randomRange(-1, 1);
    this.arcY = randomRange(-1, 1);
    this.distance = 0;

    this.range = 6;
    this.speed = .002;

    this.draw = function()
    {
        context.moveTo(this.x, this.y);
        //context.fillStyle = this.radgrad;
        context.fillStyle = this.color;

        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        this.ticker += this.speed;
        this.ticker = this.ticker == 1 ? 0 : this.ticker;

        this.x += Math.sin(Math.cos(this.index * .1) + (this.ticker * this.index * .5)) * this.range;
        this.y += Math.cos(Math.cos(this.index * .4) + (this.ticker * this.index * .62)) * this.range;

//        this.radgrad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
//        this.radgrad.addColorStop(0, '#EEFF00');
//        this.radgrad.addColorStop(.8, '#FF0000');
//        this.radgrad.addColorStop(1, '#000000');
    }

    this.connect = function()
    {
        for(var i = 0; i < particleList.length; ++i)
        {
            particle = particleList[i];

            this.distance = Math.sqrt( Math.pow(particle.x - this.x, 2) + Math.pow(particle.y - this.y, 2) );

            if(this.distance > 50 && this.distance < 100)
            {
                this.isConnected++;

                context.strokeStyle = "rgba(255,255,255," +  (this.distance * 0.003).toString() + ")";
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(particle.x, particle.y);
                context.stroke();
            }

            /*

            */
            //particle.draw();
        }
    }
}

function randomRange(pFrom, pTo)
{
    return pFrom + (Math.random()*(pTo-pFrom));
}
