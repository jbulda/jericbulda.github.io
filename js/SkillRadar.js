export class SkillRadar {
    constructor(containerId, skills) {
        this.container = document.getElementById(containerId);
        this.details = document.getElementById('skill-details');
        this.skills = skills;
        this.size = 300;
        this.radius = this.size * 0.4;
        this.center = this.size / 2;
    }

    render() {
        let svg = `<svg width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}" style="overflow: visible;">`;
        
        // 1. Draw Background Polygons
        for (let i = 1; i <= 5; i++) {
            let r = (this.radius / 5) * i;
            svg += `<polygon points="${this.getPoints(r)}" class="radar-grid" />`;
        }

        // 2. Draw Skill Area
        const skillPoints = this.skills.map((s, i) => {
            const r = (s.level / 100) * this.radius;
            const angle = (Math.PI * 2 * i) / this.skills.length;
            return `${this.center + r * Math.sin(angle)},${this.center - r * Math.cos(angle)}`;
        }).join(" ");
        svg += `<polygon points="${skillPoints}" class="skill-area" />`;

        // 3. Draw Nodes
        this.skills.forEach((s, i) => {
            const r = (s.level / 100) * this.radius;
            const angle = (Math.PI * 2 * i) / this.skills.length;
            const cx = this.center + r * Math.sin(angle);
            const cy = this.center - r * Math.cos(angle);
            svg += `<circle cx="${cx}" cy="${cy}" r="5" class="skill-node" data-name="${s.name}" data-level="${s.level}%" />`;
        });

        svg += `</svg>`;
        this.container.innerHTML = svg;
        this.addInteractivity();
    }

    getPoints(r) {
        return this.skills.map((_, i) => {
            const angle = (Math.PI * 2 * i) / this.skills.length;
            return `${this.center + r * Math.sin(angle)},${this.center - r * Math.cos(angle)}`;
        }).join(" ");
    }

    addInteractivity() {
        this.container.querySelectorAll('.skill-node').forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                this.details.innerHTML = `<h3>${e.target.dataset.name}</h3><p>Proficiency: ${e.target.dataset.level}</p>`;
            });
        });
    }
}