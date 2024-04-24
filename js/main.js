const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// Establece el tamaño del canvas
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speedX, speedY) {
        this.posx = x;
        this.posy = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillStyle = "#000"; // Text color inside circle
        context.fillText(this.text, this.posx, this.posy);
        context.closePath();
    }

    update() {
        this.posx += this.speedX;
        this.posy += this.speedY;
        this.rebote();
    }

    rebote() {
        if (this.posx + this.radius >= window_width || this.posx - this.radius <= 0) {
            this.speedX = -this.speedX;
            this.posx = Math.max(this.radius, Math.min(this.posx, window_width - this.radius));
        }
        if (this.posy + this.radius >= window_height || this.posy - this.radius <= 0) {
            this.speedY = -this.speedY;
            this.posy = Math.max(this.radius, Math.min(this.posy, window_height - this.radius));
        }
    }
}

let arrayCircle = [];
const speed = 8; // Velocidad
for (let i = 0; i < 15; i++) {
    let randomX = Math.random() * (window_width - 100) + 50;
    let randomY = Math.random() * (window_height - 100) + 50;
    let randomRadius = Math.random() * (100 - 18) + 18;
    let angle = Math.random() * 2 * Math.PI;
    let speedX = speed * Math.cos(angle);
    let speedY = speed * Math.sin(angle);
    let miCirculo = new Circle(randomX, randomY, randomRadius, "#b10b3d", "tec" +(i + 1), speedX, speedY);
    arrayCircle.push(miCirculo);
}

function animate() {
    ctx.clearRect(0, 0, window_width, window_height);
    for (let circle of arrayCircle) {
        circle.update();
        circle.draw(ctx);
    }
    requestAnimationFrame(animate);
}

animate();

/*
let miCirculo=new Circle (100, 100, 50, "blue", "Tec");

miCirculo.draw(ctx);

let miCirculo2=new Circle (270, 270, 50, "black", "Pachuca");

miCirculo2.draw(ctx);
*/