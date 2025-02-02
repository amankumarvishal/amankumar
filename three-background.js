import * as THREE from 'three';

class ThreeBackground {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.points = [];
        
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('three-bg').appendChild(this.renderer.domElement);

        // Create particles
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < 1500; i++) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;

            vertices.push(x, y, z);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            color: 0x00ff00,
            transparent: true,
            opacity: 0.5
        });

        const points = new THREE.Points(geometry, material);
        this.scene.add(points);
        this.points = points;

        this.camera.position.z = 500;

        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.points.rotation.x += 0.001;
        this.points.rotation.y += 0.001;

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize
const threeBackground = new ThreeBackground();
