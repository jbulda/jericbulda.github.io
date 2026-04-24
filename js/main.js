import { CircuitBoard } from './CircuitBoard.js';
import { SkillRadar } from './SkillRadar.js'; // New Import

// 1. Initialize Circuit Background
const board = new CircuitBoard('hero-canvas');
board.animate();
window.boostParticles = () => board.boost();

// 2. Initialize Skill Radar
const mySkills = [
    { name: "SAPUI5", level: 95 },
    { name: "BTP / Cloud", level: 90 },
    { name: "OData v4", level: 85 },
    { name: "Clean Core", level: 80 },
    { name: "SVG/Canvas", level: 92 }
];

const radar = new SkillRadar('skill-radar', mySkills);
radar.render();