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