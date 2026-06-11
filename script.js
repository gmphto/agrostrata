// Farm Animation Canvas
class FarmAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        this.tractors = [];
        this.combines = [];
        this.drones = [];
        this.workers = [];
        this.managers = [];
        this.crops = [];
        this.clouds = [];
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.handleResize());
    }
    
    init() {
        // Initialize tractors
        for (let i = 0; i < 3; i++) {
            this.tractors.push({
                x: Math.random() * this.width,
                y: this.height * 0.6 + Math.random() * 100,
                speed: 0.5 + Math.random() * 0.5,
                size: 40 + Math.random() * 20,
                color: '#FF5722',
                direction: Math.random() > 0.5 ? 1 : -1,
                trail: []
            });
        }
        
        // Initialize combine harvesters
        for (let i = 0; i < 2; i++) {
            this.combines.push({
                x: Math.random() * this.width,
                y: this.height * 0.7 + Math.random() * 80,
                speed: 0.3 + Math.random() * 0.3,
                size: 50 + Math.random() * 15,
                color: '#FFC107',
                direction: Math.random() > 0.5 ? 1 : -1,
                harvesting: true
            });
        }
        
        // Initialize drones
        for (let i = 0; i < 4; i++) {
            this.drones.push({
                x: Math.random() * this.width,
                y: this.height * 0.3 + Math.random() * 100,
                speed: 1 + Math.random() * 1,
                size: 15 + Math.random() * 10,
                color: '#2196F3',
                pattern: Math.floor(Math.random() * 3),
                sprayParticles: []
            });
        }
        
        // Initialize field workers
        for (let i = 0; i < 5; i++) {
            this.workers.push({
                x: Math.random() * this.width,
                y: this.height * 0.75 + Math.random() * 50,
                speed: 0.2 + Math.random() * 0.2,
                size: 12 + Math.random() * 4,
                color: '#8D6E63',
                action: Math.random() > 0.5 ? 'planting' : 'inspecting'
            });
        }
        
        // Initialize field managers
        for (let i = 0; i < 2; i++) {
            this.managers.push({
                x: Math.random() * this.width,
                y: this.height * 0.65 + Math.random() * 60,
                speed: 0.15 + Math.random() * 0.15,
                size: 14 + Math.random() * 4,
                color: '#4CAF50',
                hasTablet: true
            });
        }
        
        // Initialize crops (field rows)
        for (let i = 0; i < 8; i++) {
            this.crops.push({
                y: this.height * 0.65 + i * 40,
                growth: Math.random(),
                type: Math.floor(Math.random() * 3),
                swayOffset: Math.random() * Math.PI * 2
            });
        }
        
        // Initialize clouds
        for (let i = 0; i < 5; i++) {
            this.clouds.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height * 0.4,
                speed: 0.2 + Math.random() * 0.3,
                size: 60 + Math.random() * 80,
                opacity: 0.3 + Math.random() * 0.3
            });
        }
    }
    
    handleResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.init();
    }
    
    drawSky() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height * 0.6);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#2d2d44');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height * 0.6);
    }
    
    drawClouds() {
        this.clouds.forEach(cloud => {
            cloud.x += cloud.speed;
            if (cloud.x > this.width + cloud.size) {
                cloud.x = -cloud.size;
                cloud.y = Math.random() * this.height * 0.4;
            }
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.size * 0.4, cloud.y - cloud.size * 0.2, cloud.size * 0.4, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.size * 0.8, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawMountains() {
        const gradient = this.ctx.createLinearGradient(0, this.height * 0.4, 0, this.height * 0.6);
        gradient.addColorStop(0, '#3e2723');
        gradient.addColorStop(1, '#5d4037');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height * 0.6);
        
        for (let i = 0; i <= this.width; i += 50) {
            const y = this.height * 0.5 + Math.sin(i * 0.01) * 30 + Math.sin(i * 0.02) * 20;
            this.ctx.lineTo(i, y);
        }
        
        this.ctx.lineTo(this.width, this.height * 0.6);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawFields() {
        // Draw different field sections with varying shades of green and brown
        const fieldColors = [
            ['#2E7D32', '#388E3C'],
            ['#5D4037', '#6D4C41'],
            ['#4CAF50', '#66BB6A'],
            ['#8D6E63', '#A1887F']
        ];
        
        for (let i = 0; i < 4; i++) {
            const y = this.height * 0.6 + i * 80;
            const gradient = this.ctx.createLinearGradient(0, y, 0, y + 80);
            gradient.addColorStop(0, fieldColors[i][0]);
            gradient.addColorStop(1, fieldColors[i][1]);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, y, this.width, 80);
            
            // Add field lines
            this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            this.ctx.lineWidth = 1;
            for (let j = 0; j < this.width; j += 100) {
                this.ctx.beginPath();
                this.ctx.moveTo(j, y);
                this.ctx.lineTo(j, y + 80);
                this.ctx.stroke();
            }
        }
    }
    
    drawCrops(time) {
        this.crops.forEach((crop, index) => {
            const sway = Math.sin(time * 0.002 + crop.swayOffset) * 3;
            
            for (let x = 0; x < this.width; x += 20) {
                const plantHeight = 15 + crop.growth * 20;
                const plantX = x + sway * (index % 2 === 0 ? 1 : -1);
                
                // Draw plant stem
                this.ctx.strokeStyle = '#4CAF50';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(plantX, crop.y);
                this.ctx.quadraticCurveTo(plantX + sway * 2, crop.y - plantHeight / 2, plantX + sway * 3, crop.y - plantHeight);
                this.ctx.stroke();
                
                // Draw leaves
                this.ctx.fillStyle = '#66BB6A';
                this.ctx.beginPath();
                this.ctx.ellipse(plantX + sway * 4, crop.y - plantHeight * 0.7, 6, 3, Math.PI / 4, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.beginPath();
                this.ctx.ellipse(plantX - sway * 2, crop.y - plantHeight * 0.5, 5, 2.5, -Math.PI / 4, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    }
    
    drawTractor(tractor, time) {
        tractor.x += tractor.speed * tractor.direction;
        
        // Wrap around
        if (tractor.direction > 0 && tractor.x > this.width + tractor.size) {
            tractor.x = -tractor.size;
        } else if (tractor.direction < 0 && tractor.x < -tractor.size) {
            tractor.x = this.width + tractor.size;
        }
        
        const x = tractor.x;
        const y = tractor.y;
        const size = tractor.size;
        
        // Store trail for dust effect
        tractor.trail.push({ x, y, alpha: 1 });
        if (tractor.trail.length > 20) tractor.trail.shift();
        
        // Draw dust trail
        tractor.trail.forEach((point, i) => {
            point.alpha -= 0.05;
            if (point.alpha > 0) {
                this.ctx.fillStyle = `rgba(139, 119, 101, ${point.alpha * 0.3})`;
                this.ctx.beginPath();
                this.ctx.arc(point.x - tractor.direction * 20, point.y + size/2, 8 * (i/20), 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        // Draw tractor body
        this.ctx.fillStyle = tractor.color;
        this.ctx.fillRect(x - size/2, y - size/4, size, size/2);
        
        // Draw cabin
        this.ctx.fillStyle = '#FFCCBC';
        this.ctx.fillRect(x + size/6, y - size/2, size/3, size/3);
        
        // Draw wheels
        this.ctx.fillStyle = '#424242';
        const wheelRotation = time * 0.005 * tractor.speed * tractor.direction;
        
        // Back wheel (larger)
        this.ctx.save();
        this.ctx.translate(x - size/4, y + size/4);
        this.ctx.rotate(wheelRotation);
        this.ctx.fillRect(-size/4, -size/4, size/2, size/2);
        // Wheel spokes
        this.ctx.strokeStyle = '#757575';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size/4);
        this.ctx.lineTo(0, size/4);
        this.ctx.moveTo(-size/4, 0);
        this.ctx.lineTo(size/4, 0);
        this.ctx.stroke();
        this.ctx.restore();
        
        // Front wheel (smaller)
        this.ctx.save();
        this.ctx.translate(x + size/3, y + size/4);
        this.ctx.rotate(wheelRotation);
        this.ctx.fillRect(-size/6, -size/6, size/3, size/3);
        this.ctx.restore();
        
        // Draw plow attachment
        this.ctx.fillStyle = '#616161';
        this.ctx.fillRect(x - size/2 - size/4, y, size/4, size/6);
    }
    
    drawCombine(combine, time) {
        combine.x += combine.speed * combine.direction;
        
        if (combine.direction > 0 && combine.x > this.width + combine.size) {
            combine.x = -combine.size;
        } else if (combine.direction < 0 && combine.x < -combine.size) {
            combine.x = this.width + combine.size;
        }
        
        const x = combine.x;
        const y = combine.y;
        const size = combine.size;
        
        // Main body
        this.ctx.fillStyle = combine.color;
        this.ctx.fillRect(x - size/2, y - size/3, size, size/2);
        
        // Header (cutting platform)
        this.ctx.fillStyle = '#FFA000';
        const headerBob = Math.sin(time * 0.01) * 3;
        this.ctx.fillRect(x - size/2 - size/4, y + headerBob, size * 1.5, size/6);
        
        // Grain tank
        this.ctx.fillStyle = '#FFD54F';
        this.ctx.fillRect(x, y - size/2, size/3, size/3);
        
        // Cabin
        this.ctx.fillStyle = '#FFF8E1';
        this.ctx.fillRect(x + size/8, y - size/2.5, size/4, size/4);
        
        // Wheels
        this.ctx.fillStyle = '#212121';
        const wheelRot = time * 0.004 * combine.speed * combine.direction;
        
        this.ctx.save();
        this.ctx.translate(x - size/3, y + size/4);
        this.ctx.rotate(wheelRot);
        this.ctx.fillRect(-size/4, -size/4, size/2, size/2);
        this.ctx.restore();
        
        this.ctx.save();
        this.ctx.translate(x + size/3, y + size/4);
        this.ctx.rotate(wheelRot);
        this.ctx.fillRect(-size/5, -size/5, size/2.5, size/2.5);
        this.ctx.restore();
        
        // Chaff particles when harvesting
        if (combine.harvesting) {
            for (let i = 0; i < 3; i++) {
                const px = x - size/2 - Math.random() * size;
                const py = y + Math.random() * size/2;
                this.ctx.fillStyle = '#FFECB3';
                this.ctx.fillRect(px, py, 3, 3);
            }
        }
    }
    
    drawDrone(drone, time) {
        drone.x += drone.speed * (Math.random() > 0.5 ? 1 : -1);
        
        if (drone.x > this.width + drone.size) drone.x = -drone.size;
        if (drone.x < -drone.size) drone.x = this.width + drone.size;
        
        const x = drone.x;
        const y = drone.y + Math.sin(time * 0.003) * 10;
        const size = drone.size;
        
        // Drone body
        this.ctx.fillStyle = drone.color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size, size/3, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Arms
        this.ctx.strokeStyle = drone.color;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x - size * 1.5, y - size/4);
        this.ctx.lineTo(x + size * 1.5, y - size/4);
        this.ctx.moveTo(x - size * 1.5, y + size/4);
        this.ctx.lineTo(x + size * 1.5, y + size/4);
        this.ctx.stroke();
        
        // Propellers
        const propellerPositions = [
            { x: -size * 1.5, y: -size/4 },
            { x: size * 1.5, y: -size/4 },
            { x: -size * 1.5, y: size/4 },
            { x: size * 1.5, y: size/4 }
        ];
        
        propellerPositions.forEach(pos => {
            const propAngle = time * 0.05;
            this.ctx.strokeStyle = '#90CAF9';
            this.ctx.lineWidth = 2;
            this.ctx.save();
            this.ctx.translate(x + pos.x, y + pos.y);
            this.ctx.rotate(propAngle);
            this.ctx.beginPath();
            this.ctx.moveTo(-size/2, 0);
            this.ctx.lineTo(size/2, 0);
            this.ctx.moveTo(0, -size/4);
            this.ctx.lineTo(0, size/4);
            this.ctx.stroke();
            this.ctx.restore();
        });
        
        // Spray particles for spraying drone
        if (drone.pattern === 0) {
            for (let i = 0; i < 5; i++) {
                drone.sprayParticles.push({
                    x: x + (Math.random() - 0.5) * size,
                    y: y + size/2 + Math.random() * 20,
                    alpha: 1,
                    vy: 1 + Math.random()
                });
            }
            
            drone.sprayParticles.forEach((particle, i) => {
                particle.y += particle.vy;
                particle.alpha -= 0.02;
                
                if (particle.alpha > 0) {
                    this.ctx.fillStyle = `rgba(76, 175, 80, ${particle.alpha})`;
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            });
            
            drone.sprayParticles = drone.sprayParticles.filter(p => p.alpha > 0);
        }
        
        // LED light
        this.ctx.fillStyle = time % 1000 < 500 ? '#FF5722' : '#4CAF50';
        this.ctx.beginPath();
        this.ctx.arc(x, y - size/4, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawWorker(worker, time) {
        worker.x += worker.speed * (Math.random() > 0.5 ? 1 : -1);
        
        if (worker.x > this.width) worker.x = 0;
        if (worker.x < 0) worker.x = this.width;
        
        const x = worker.x;
        const y = worker.y;
        const size = worker.size;
        
        // Body
        this.ctx.fillStyle = worker.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y - size/2, size/3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Torso
        this.ctx.fillRect(x - size/4, y - size/3, size/2, size/2);
        
        // Legs (animated walking)
        const legSwing = Math.sin(time * 0.008) * size/4;
        this.ctx.strokeStyle = '#5D4037';
        this.ctx.lineWidth = 3;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x - size/6, y);
        this.ctx.lineTo(x - size/6 + legSwing, y + size/2);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + size/6, y);
        this.ctx.lineTo(x + size/6 - legSwing, y + size/2);
        this.ctx.stroke();
        
        // Arms based on action
        this.ctx.strokeStyle = worker.color;
        if (worker.action === 'planting') {
            const armAngle = Math.sin(time * 0.01) * Math.PI/4;
            this.ctx.save();
            this.ctx.translate(x - size/4, y - size/4);
            this.ctx.rotate(armAngle);
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, size/3);
            this.ctx.stroke();
            this.ctx.restore();
        } else {
            // Inspecting - holding clipboard
            this.ctx.fillStyle = '#FFECB3';
            this.ctx.fillRect(x + size/6, y - size/6, size/4, size/3);
        }
        
        // Hat
        this.ctx.fillStyle = '#FFA000';
        this.ctx.beginPath();
        this.ctx.arc(x, y - size/2 - 2, size/2.5, Math.PI, 0);
        this.ctx.fill();
    }
    
    drawManager(manager, time) {
        manager.x += manager.speed * (Math.random() > 0.5 ? 1 : -1);
        
        if (manager.x > this.width) manager.x = 0;
        if (manager.x < 0) manager.x = this.width;
        
        const x = manager.x;
        const y = manager.y;
        const size = manager.size;
        
        // Body (suit)
        this.ctx.fillStyle = manager.color;
        this.ctx.fillRect(x - size/3, y - size/2, size/1.5, size/1.5);
        
        // Head
        this.ctx.fillStyle = '#FFCCBC';
        this.ctx.beginPath();
        this.ctx.arc(x, y - size/2 - size/4, size/4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Holding tablet
        if (manager.hasTablet) {
            this.ctx.fillStyle = '#424242';
            const tabletBob = Math.sin(time * 0.005) * 2;
            this.ctx.fillRect(x + size/4, y - size/4 + tabletBob, size/2, size/3);
            
            // Screen glow
            this.ctx.fillStyle = 'rgba(76, 175, 80, 0.5)';
            this.ctx.fillRect(x + size/4 + 2, y - size/4 + tabletBob + 2, size/2 - 4, size/3 - 4);
        }
        
        // Legs
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x - size/6, y + size/2);
        this.ctx.lineTo(x - size/6, y + size);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + size/6, y + size/2);
        this.ctx.lineTo(x + size/6, y + size);
        this.ctx.stroke();
    }
    
    animate() {
        const time = Date.now();
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw scene layers
        this.drawSky();
        this.drawClouds();
        this.drawMountains();
        this.drawFields();
        this.drawCrops(time);
        
        // Draw machinery and people
        this.tractors.forEach(tractor => this.drawTractor(tractor, time));
        this.combines.forEach(combine => this.drawCombine(combine, time));
        this.drones.forEach(drone => this.drawDrone(drone, time));
        this.workers.forEach(worker => this.drawWorker(worker, time));
        this.managers.forEach(manager => this.drawManager(manager, time));
        
        requestAnimationFrame(() => this.animate());
    }
}

// Chart.js-like functionality without external library
class SimpleChart {
    constructor(canvasId, type, data, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.type = type;
        this.data = data;
        this.options = options;
        
        this.resize();
        this.draw();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.draw();
        });
    }
    
    resize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }
    
    draw() {
        if (this.type === 'line') {
            this.drawLineChart();
        } else if (this.type === 'bar') {
            this.drawBarChart();
        } else if (this.type === 'pie') {
            this.drawPieChart();
        }
    }
    
    drawLineChart() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const padding = 40;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height - 2 * padding) * i / 5;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Draw lines for each dataset
        this.data.datasets.forEach((dataset, datasetIndex) => {
            const maxValue = Math.max(...dataset.data);
            const minValue = Math.min(...dataset.data);
            const range = maxValue - minValue || 1;
            
            ctx.strokeStyle = dataset.borderColor;
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            dataset.data.forEach((value, index) => {
                const x = padding + (width - 2 * padding) * index / (dataset.data.length - 1);
                const y = height - padding - (value - minValue) / range * (height - 2 * padding);
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
            
            // Draw points
            dataset.data.forEach((value, index) => {
                const x = padding + (width - 2 * padding) * index / (dataset.data.length - 1);
                const y = height - padding - (value - minValue) / range * (height - 2 * padding);
                
                ctx.fillStyle = dataset.borderColor;
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
        });
        
        // Draw labels
        ctx.fillStyle = '#9e9e9e';
        ctx.font = '12px Montserrat';
        ctx.textAlign = 'center';
        
        this.data.labels.forEach((label, index) => {
            const x = padding + (width - 2 * padding) * index / (this.data.labels.length - 1);
            ctx.fillText(label, x, height - 10);
        });
    }
    
    drawBarChart() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const padding = 40;
        
        ctx.clearRect(0, 0, width, height);
        
        const maxValue = Math.max(...this.data.datasets[0].data);
        const barWidth = (width - 2 * padding) / this.data.labels.length * 0.6;
        const gap = (width - 2 * padding) / this.data.labels.length * 0.4;
        
        this.data.datasets[0].data.forEach((value, index) => {
            const x = padding + index * (barWidth + gap) + gap / 2;
            const barHeight = (value / maxValue) * (height - 2 * padding);
            const y = height - padding - barHeight;
            
            // Gradient fill
            const gradient = ctx.createLinearGradient(x, y, x, height - padding);
            gradient.addColorStop(0, this.data.datasets[0].backgroundColor);
            gradient.addColorStop(1, this.data.datasets[0].borderColor);
            
            ctx.fillStyle = gradient;
            
            // Rounded top bars
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
            ctx.fill();
            
            // Value label
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Montserrat';
            ctx.textAlign = 'center';
            ctx.fillText(`${value}%`, x + barWidth / 2, y - 8);
            
            // Category label
            ctx.fillStyle = '#9e9e9e';
            ctx.font = '11px Montserrat';
            ctx.fillText(this.data.labels[index], x + barWidth / 2, height - 15);
        });
    }
    
    drawPieChart() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;
        
        let startAngle = -Math.PI / 2;
        
        const total = this.data.datasets[0].data.reduce((sum, value) => sum + value, 0);
        
        this.data.labels.forEach((label, index) => {
            const value = this.data.datasets[0].data[index];
            const sliceAngle = (value / total) * Math.PI * 2;
            const color = this.data.datasets[0].backgroundColor[index];
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            // Label
            const midAngle = startAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(midAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(midAngle) * (radius * 0.7);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Montserrat';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${value}%`, labelX, labelY);
            
            startAngle += sliceAngle;
        });
    }
}

// Animate numbers on scroll
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.dataset.target);
                const isDecimal = target % 1 !== 0;
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    entry.target.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                }, stepTime);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => observer.observe(num));
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize farm animation
    new FarmAnimation('farmAnimation');
    
    // Initialize charts
    // Yield Chart
    new SimpleChart('yieldChart', 'line', {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'TerraGrow Farms',
            data: [100, 115, 128, 142, 158, 175],
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF50'
        }, {
            label: 'Industry Average',
            data: [100, 103, 106, 109, 112, 115],
            borderColor: '#9E9E9E',
            backgroundColor: '#9E9E9E'
        }]
    });
    
    // Performance Chart
    new SimpleChart('performanceChart', 'pie', {
        labels: ['Efficiency', 'Quality', 'Speed'],
        datasets: [{
            data: [42, 35, 23],
            backgroundColor: ['#4CAF50', '#FFC107', '#2196F3']
        }]
    });
    
    // Resource Chart
    new SimpleChart('resourceChart', 'bar', {
        labels: ['Water', 'Fertilizer', 'Pesticides', 'Fuel', 'Labor'],
        datasets: [{
            label: 'Savings %',
            data: [35, 25, 40, 30, 20],
            backgroundColor: '#4CAF50',
            borderColor: '#2E7D32'
        }]
    });
    
    // ROI Chart
    new SimpleChart('roiChart', 'bar', {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [{
            label: 'ROI %',
            data: [185, 240, 310, 385, 450],
            backgroundColor: '#FFC107',
            borderColor: '#FFA000'
        }]
    });
    
    // Initialize other features
    animateNumbers();
    initSmoothScroll();
    initNavbarScroll();
});

// Add roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radii) {
        if (typeof radii === 'number') {
            radii = [radii, radii, radii, radii];
        }
        
        const [topLeft, topRight, bottomRight, bottomLeft] = radii;
        
        this.moveTo(x + topLeft, y);
        this.lineTo(x + width - topRight, y);
        this.quadraticCurveTo(x + width, y, x + width, y + topRight);
        this.lineTo(x + width, y + height - bottomRight);
        this.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
        this.lineTo(x + bottomLeft, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
        this.lineTo(x, y + topLeft);
        this.quadraticCurveTo(x, y, x + topLeft, y);
        this.closePath();
    };
}
