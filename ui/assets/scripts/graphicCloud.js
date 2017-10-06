var canvas = document.getElementById("graphic-cloud"),
    context = canvas.getContext("2d");

var colors = new Array('49,97,118','186,64,109')

canvas.width = 1000;
canvas.height = 1000;

var particle;
var particleList = [];

for(var i = 0; i < 60; ++i)
{
    particle = new ParticleObject(i, canvas.width * .5, canvas.height * .5);
    particle.draw();
    particleList.push(particle);
}


setInterval(intervalHandler, 1000 / 30);

function intervalHandler()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

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
    this.size = 5;
    this.color = "#ffffff";
    this.arcX = randomRange(-1, 1);
    this.arcY = randomRange(-1, 1);
    this.distance = 0;

    this.range = 3;
    this.speed = .0005;

    this.draw = function()
    {
        context.moveTo(this.x, this.y);
        context.fillStyle = this.color;
        context.globalAlpha = .6;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        this.ticker += this.speed;

        this.ticker = this.ticker == 1 ? 0 : this.ticker;

        this.x += Math.sin(Math.cos(this.index * .5) + (this.ticker * this.index * .5)) * this.range;
        this.y += Math.cos(Math.cos(this.index * .9) + (this.ticker * this.index * .75)) * this.range;

        this.x = Math.max(Math.min(1000,this.x),0);
        this.y = Math.max(Math.min(1000,this.y),0);

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
                this.size = Math.ceil(this.distance/20);
                this.color = i%2 == 0 ? '#060130' : '#E2305B';

                context.strokeStyle = i%2 == 0 ? "#E2305B" : "#060130";
                context.beginPath();
                context.moveTo(this.x, this.y);

                context.lineWidth = 1.5;
                context.lineTo(particle.x, particle.y);
                context.stroke();
            }
        }
    }
}

function randomRange(pFrom, pTo)
{
    return pFrom + (Math.random()*(pTo-pFrom));
}
