/*------ Create Constellations Mouse trail, Canvas ----------*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
let frame = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    hue+=8;
    if (particlesArray.length < 100){
          for (let i = 0; i < 20; i++){
        particlesArray.push(new Particle());
      }
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    hue+=2;
    if (frame % 2 === 0){
      for (let i = 0; i < 7; i++){
        particlesArray.push(new Particle());
      }
    }
});

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
     }
}

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        particlesArray[i].update();
        particlesArray[i].draw();
      
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            console.log(particlesArray.length);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.02)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    frame++;
    requestAnimationFrame(animate);
}
animate();


/*------ Create stars, section Hero ----------*/
function createstars(type, quantity) {
    for(let i = 0; i < quantity; i++) {
       const star = document.createElement('div');
       star.classList.add("star", `type-${type}`);
       star.style.left = `${randomNumber(1, 99)}%`;
       star.style.bottom = `${randomNumber(1, 99)}%`;
       star.style.animationDuration = `${randomNumber(50, 200)}s`;
       document.body.appendChild(star)
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max ) + min;
}

createstars(1, 100);
createstars(2, 85);
createstars(3, 70);

/*------ Clock, section project ----------*/

setInterval(() => {
    let hh = document.getElementById('hh');
    let mm = document.getElementById('mm');
    let ss = document.getElementById('ss');
    let sec_dot = document.querySelector('.sec_dot');
    let min_dot = document.querySelector('.min_dot');
    let hr_dot = document.querySelector('.hr_dot');
    /*--- Central clock ---*/
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');
    let ampm = document.getElementById('ampm');
    /*-------------------*/
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    let am = h >= 12 ? "PM" : "AM";

// Convert 24hr clock to 12hr clock :
    if(h > 12) {
        h = h - 12;
    }

// Add zero before single digit number :
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
    ampm.innerHTML = am;


// 12 hrs - 60 mn - 60 seconds :

    hh.style.strokeDashoffset = 510 - (510 * h) / 12;
    mm.style.strokeDashoffset = 630 - (630 * m) / 60;
    ss.style.strokeDashoffset = 760 - (760 * s) / 60;

// 360/60 sec = 6 - 360/60 min = 6 - 720/24 hr = 30 :

    sec_dot.style.transform = `rotateZ(${s * 6}deg)`;
    min_dot.style.transform = `rotateZ(${m * 6}deg)`;
    hr_dot.style.transform = `rotateZ(${h * 30})deg)`;
})