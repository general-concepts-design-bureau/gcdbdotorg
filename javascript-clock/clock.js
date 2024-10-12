const clockcanvas = document.getElementById("analogue-clock");
const ctx = clockcanvas.getContext("2d");
const fps = 10; // Max 1000 "fps"
var radius;
drawCanvas();
drawClock();

window.addEventListener('resize', drawCanvas, false);

function drawCanvas() {
    if(window.innerHeight < window.innerWidth) {
        clockcanvas.height = window.innerHeight;
        clockcanvas.width = clockcanvas.height;
    } else {
        clockcanvas.width = window.innerWidth;
        clockcanvas.height = clockcanvas.width;
    }

    radius = clockcanvas.height / 2;

    ctx.translate(radius, radius);
    radius = radius * 0.90;
}

function drawClock() {
    drawCanvas();
    drawFace(ctx, radius);
    drawHours(ctx, radius);
    drawHourDots(ctx, radius);
    drawMinuteDots(ctx, radius);
    drawTime(ctx, radius);

    // const now = new Date();
    // if (now.getMilliseconds() < 250) {
    //     drawSecondBlink(ctx, radius);
    // }

    setTimeout(() => {
        window.requestAnimationFrame(drawClock);
    }, 1000 / fps);
}

function drawFace(ctx, radius) {
    //face
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    //edge
    const grad = ctx.createRadialGradient(0, 0, radius * 0.99, 0, 0, radius * 1.01);
    grad.addColorStop(0, 'black');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, 'black');
    ctx.beginPath;
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.01;
    ctx.stroke();

    //centre dot
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function drawHourDots(ctx, radius) {
    pos = 0.53;
    for(let num = 1; num < 25; num++) {
        let ang = num * Math.PI / 12;
        ctx.rotate(ang);
        ctx.translate(0, -radius * pos);
        ctx.rotate(-ang);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.01, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.rotate(ang);
        ctx.translate(0, radius * pos);
        ctx.rotate(-ang);
    }
}

function drawHours(ctx, radius) {
    // 1 to 6
    pos = 0.55;
    ctx.font = radius * 0.11 + "px JosefinSans";
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    for(let num = 1; num < 7; num++) {
        let ang = num * Math.PI / 12;
        ctx.rotate(ang);
        ctx.translate(0, -radius * pos);
        //ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        //ctx.rotate(ang);
        ctx.translate(0, radius * pos);
        ctx.rotate(-ang);
    }
    
    ctx.textBaseline = 'top';

    // 7 to 17
    for (let num = 7; num < 18; num++) {
        let ang = num * Math.PI / 12;
        ctx.rotate(ang);
        ctx.translate(0, -radius * pos - (radius * 0.02));
        ctx.rotate(180 * Math.PI / 180);
        //ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(180 * Math.PI / 180);
        //ctx.rotate(ang);
        ctx.translate(0, radius * pos + (radius * 0.02));
        ctx.rotate(-ang);
    }

    ctx.textBaseline = 'bottom';
    
    // 18 to 24
    for (let num = 18; num < 25; num++) {
        let ang = num * Math.PI / 12;
        ctx.rotate(ang);
        ctx.translate(0, -radius * pos);
        //ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        //ctx.rotate(ang);
        ctx.translate(0, radius * pos);
        ctx.rotate(-ang);
    }
}

function drawMinuteDots(ctx, radius) {
    for(let num = 1; num < 61; num++) {
        let ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.9);
        ctx.rotate(-ang);
        ctx.beginPath();
        if(num%5 == 0) {
            ctx.arc(0, 0, radius * 0.015, 0, 2 * Math.PI);
        } else {
            ctx.arc(0, 0, radius * 0.004, 0, 2 * Math.PI);
        }
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.9);
        ctx.rotate(-ang);
    }
}

function drawSecondBlink(ctx, radius) {
    let displace = radius * 0.1;
    let sidelength = radius * 0.1;
    ctx.beginPath();
    ctx.translate(displace, displace);
    ctx.rect(sidelength, sidelength, sidelength, sidelength);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.translate(-displace, -displace);
}

function drawTime(ctx, radius) {
    const now = new Date();
    //now.setSeconds = now.getSeconds + 1;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour = hour%24;
    hour = (hour*Math.PI/12)+(minute*Math.PI/(12*60))+(second*Math.PI/(12*60*60));
    drawHand(ctx,hour, radius*0.5, radius*0.03);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.03);
    //second
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.005);
    drawHand(ctx, second, -radius*0.15, radius*0.005);
    //document.getElementById("timezone").innerHTML = "UTC+" + (0 - now.getTimezoneOffset()/60);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}