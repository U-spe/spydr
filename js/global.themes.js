export default async function initThemeFX({ theme, assets }) {
    // Failsafe: if no assets are provided, do nothing and return an empty cleanup function
    if (!assets || assets.length === 0) return async () => {};

    // Create the master container for the particles
    const container = document.createElement('div');
    container.className = 'spydr-theme-fx';
    Object.assign(container.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '0', // Base level - ensure UI elements have a higher z-index (e.g., 1 or higher)
        overflow: 'hidden'
    });
    document.body.appendChild(container);

    const particles = [];
    const numParticles = 25; // Good balance for performance and visuals
    let animationFrameId;
    let isRunning = true;

    // Generate and inject the particles
    for (let i = 0; i < numParticles; i++) {
        const el = document.createElement('img');
        el.className = 'spydr-theme-fx';
        el.src = assets[Math.floor(Math.random() * assets.length)];
        
        const size = Math.random() * 30 + 15; // Random sizes between 15px and 45px
        Object.assign(el.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            willChange: 'transform',
            opacity: Math.random() * 0.3 + 0.7 // Slight opacity variance to add depth (0.7 to 1.0)
        });

        const particle = {
            el,
            x: Math.random() * window.innerWidth,
            y: (Math.random() * window.innerHeight) - window.innerHeight, // Start anywhere above/on screen
            speedY: Math.random() * 1.5 + 0.5, // Downward velocity
            speedX: (Math.random() - 0.5) * 1.0, // Horizontal drift
            rotation: Math.random() * 360, // Starting rotation
            rotationSpeed: (Math.random() - 0.5) * 2.0, // Continuous rotation velocity
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.03 + 0.01,
            wobbleAmplitude: Math.random() * 1.5,
            size
        };

        particles.push(particle);
        container.appendChild(el);
    }

    let lastTime = performance.now();

    // The animation loop
    function animate(time) {
        if (!isRunning) return;
        
        let delta = (time - lastTime) / 16.66; // Normalize to roughly 60fps
        if (delta > 2) delta = 2; // Cap delta to prevent massive jumps if tab becomes inactive
        lastTime = time;

        const width = window.innerWidth;
        const height = window.innerHeight;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Apply physics/movement
            p.y += p.speedY * delta;
            p.x += (Math.sin(p.wobblePhase) * p.wobbleAmplitude + p.speedX) * delta;
            p.wobblePhase += p.wobbleSpeed * delta;
            p.rotation += p.rotationSpeed * delta;

            // Screen wrapping (Bottom to Top)
            if (p.y > height + p.size) {
                p.y = -p.size;
                p.x = Math.random() * width;
            }
            
            // Screen wrapping (Side to Side)
            if (p.x > width + p.size) p.x = -p.size;
            if (p.x < -p.size) p.x = width + p.size;

            // Apply transformations via hardware-accelerated CSS
            p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // Kickstart the engine
    animationFrameId = requestAnimationFrame(animate);

    // Return the required async cleanup function
    return async function cleanup() {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        
        // Nuke every element attached to the DOM by this module
        document.querySelectorAll('.spydr-theme-fx').forEach(el => el.remove());
    };
}
