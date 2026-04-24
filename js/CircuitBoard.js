import { Trace } from './Trace.js';

export class CircuitBoard {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.traces = [];
        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        this.resize();
        for (let i = 0; i < 50; i++) {
            this.traces.push(new Trace(this.canvas));
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.fillStyle = 'rgba(248, 250, 252, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.traces.forEach(t => {
            t.update();
            t.draw(this.ctx);
            if (!t.active && Math.random() > 0.98) t.reset();
        });
        requestAnimationFrame(() => this.animate());
    }

    boost() {
        this.traces.forEach(t => {
            t.speed = 12;
            setTimeout(() => t.speed = 2, 600);
        });
    }
}