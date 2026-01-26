// --- EXPLOSION PARTICLES ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', init);
init();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        this.life = 1;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#9d00ff';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.008;
        if (this.life <= 0) this.reset();
    }
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// --- SMOOTH LOADING SYSTEM ---
let progress = 0;
const bar = document.getElementById('bar');
const loader = document.getElementById('loader');
const site = document.getElementById('main-site');

const loadingInterval = setInterval(() => {
    progress += 1;
    bar.style.width = progress + "%";

    if (progress >= 100) {
        clearInterval(loadingInterval);
        finishLoading();
    }
}, 35); // පිරෙන වේගය මෙතනින් පාලනය කළ හැක

function finishLoading() {
    setTimeout(() => {
        loader.style.transition = "opacity 1s ease, transform 1s ease";
        loader.style.opacity = "0";
        loader.style.transform = "scale(1.1)";
        
        setTimeout(() => {
            loader.style.display = "none";
            site.style.display = "block";
            document.body.style.overflow = "auto";
            setTimeout(() => site.style.opacity = "1", 50);
        }, 1000);
    }, 500);
}
