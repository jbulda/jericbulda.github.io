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
        // Inside js/SkillRadar.js -> render()
        this.skills.forEach((s, i) => {
            const r = (s.level / 100) * this.radius;
            const angle = (Math.PI * 2 * i) / this.skills.length;
            const cx = this.center + r * Math.sin(angle);
            const cy = this.center - r * Math.cos(angle);

            // Explicitly styling the nodes to ensure visibility on black
            svg += `<circle cx="${cx}" cy="${cy}" r="6" 
            fill="#00ff41" 
            stroke="#050505" 
            stroke-width="2" 
            class="skill-node" 
            data-name="${s.name}" 
            data-level="${s.level}%" 
            style="filter: drop-shadow(0 0 5px #00ff41); cursor: pointer;" />`;
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
                // We inject the H3 and P tags to match our new CSS
                this.details.innerHTML = `
                <h3>${e.target.dataset.name}</h3>
                <p>Expertise Level: <span style="color: #fff; font-weight: bold;">${e.target.dataset.level}</span></p>
                <div class="progress-bar" style="margin-top: 15px;">
                    <div class="progress" style="width: ${e.target.dataset.level}"></div>
                </div>
            `;
                // Subtle glow effect on the panel when active
                this.details.style.borderColor = 'rgba(0, 255, 65, 0.5)';
                this.details.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.1)';
            });

            node.addEventListener('mouseleave', () => {
                this.details.style.borderColor = 'rgba(0, 255, 65, 0.2)';
                this.details.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.6)';
            });
        });
    }
}