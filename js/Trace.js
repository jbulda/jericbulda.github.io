export class Trace {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.history = [{x: this.x, y: this.y}];
        this.speed = 2;
        this.angle = (Math.floor(Math.random() * 8) * Math.PI) / 4;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 30;
        this.active = true;
    }

    update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.history.push({x: this.x, y: this.y});
        this.life++;
        if (this.life > this.maxLife) this.active = false;
    }

draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.4)'; // Neon Green
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Add the "Glow"
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00ff41';
    
    ctx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    ctx.stroke();

    // Reset shadow so it doesn't affect other elements
    ctx.shadowBlur = 0;

    if (!this.active) {
        ctx.fillStyle = '#00ff41';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}
}