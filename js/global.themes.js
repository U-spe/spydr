export default async function initThemeFX({ theme, assets }) {
    if (!assets || assets.length === 0) return async () => {};

    const container = document.createElement('div');
    container.className = 'spydr-theme-fx';
    Object.assign(container.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '1',
        overflow: 'hidden'
    });
    document.body.appendChild(container);

    const particles = [];
    const numParticles = 25;
    let animationFrameId;
    let isRunning = true;

    for (let i = 0; i < numParticles; i++) {
        const el = document.createElement('img');
        el.className = 'spydr-theme-fx';
        el.src = assets[Math.floor(Math.random() * assets.length)];
        
        const size = Math.random() * 30 + 15;
        Object.assign(el.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            willChange: 'transform',
            opacity: Math.random() * 0.3 + 0.7
        });

        const particle = {
            el,
            x: Math.random() * window.innerWidth,
            y: (Math.random() * window.innerHeight) - window.innerHeight,
            speedY: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 1.0,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2.0,
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.03 + 0.01,
            wobbleAmplitude: Math.random() * 1.5,
            size
        };

        particles.push(particle);
        container.appendChild(el);
    }

    let lastTime = performance.now();

    function animate(time) {
        if (!isRunning) return;
        
        let delta = (time - lastTime) / 16.66;
        if (delta > 2) delta = 2;
        lastTime = time;

        const width = window.innerWidth;
        const height = window.innerHeight;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.y += p.speedY * delta;
            p.x += (Math.sin(p.wobblePhase) * p.wobbleAmplitude + p.speedX) * delta;
            p.wobblePhase += p.wobbleSpeed * delta;
            p.rotation += p.rotationSpeed * delta;

            if (p.y > height + p.size) {
                p.y = -p.size;
                p.x = Math.random() * width;
            }
            
            if (p.x > width + p.size) p.x = -p.size;
            if (p.x < -p.size) p.x = width + p.size;

            p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return async function cleanup() {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        document.querySelectorAll('.spydr-theme-fx').forEach(el => el.remove());
    };
}
