export default async function initThemeFX({ theme, assets }) {
    if (!assets || assets.length === 0) {
        return async () => {};
    }

    const container = document.createElement('div');
    container.className = 'spydr-theme-fx';

    Object.assign(container.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
    });

    const host =
        document.getElementById('theme-fx-container') ||
        document.getElementById('bg-effects-container') ||
        document.body;

    host.appendChild(container);

    const particles = [];
    const numParticles = 25;

    let animationFrameId;
    let isRunning = true;

    for (let i = 0; i < numParticles; i++) {
        const el = document.createElement('img');

        el.className = 'spydr-theme-fx';
        el.src = assets[Math.floor(Math.random() * assets.length)];
        el.draggable = false;

        const size = Math.random() * 30 + 15;

        Object.assign(el.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            willChange: 'transform, opacity',
            opacity: Math.random() * 0.3 + 0.7,
            userSelect: 'none'
        });

        const particle = {
            el,

            x: Math.random() * window.innerWidth,

            // Start spread throughout the screen
            y: Math.random() * window.innerHeight - window.innerHeight,

            // Faster falling
            speedY: Math.random() * 3 + 2,

            // Slight horizontal movement
            speedX: (Math.random() - 0.5) * 1.0,

            rotation: Math.random() * 360,

            rotationSpeed:
                (Math.random() - 0.5) * 2.0,

            wobblePhase:
                Math.random() * Math.PI * 2,

            wobbleSpeed:
                Math.random() * 0.03 + 0.01,

            wobbleAmplitude:
                Math.random() * 1.5,

            size,

            // Time before respawning
            respawnDelay: 0
        };

        particles.push(particle);
        container.appendChild(el);
    }

    let lastTime = performance.now();

    function animate(time) {
        if (!isRunning) return;

        let delta =
            (time - lastTime) / 16.66;

        // Prevent huge jumps after tab inactivity
        if (delta > 2) {
            delta = 2;
        }

        lastTime = time;

        const width = window.innerWidth;
        const height = window.innerHeight;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            /*
             * WAITING TO RESPAWN
             */
            if (p.respawnDelay > 0) {
                p.respawnDelay -= delta;

                // Completely invisible while waiting
                p.el.style.opacity = '0';

                if (p.respawnDelay <= 0) {
                    // Spawn ABOVE the screen
                    p.y =
                        -p.size -
                        Math.random() * 150;

                    // New random horizontal position
                    p.x =
                        Math.random() * width;

                    // New random rotation
                    p.rotation =
                        Math.random() * 360;

                    // New random falling speed
                    p.speedY =
                        Math.random() * 3 + 2;

                    // Bring it back
                    p.el.style.opacity =
                        Math.random() * 0.3 + 0.7;
                }

                continue;
            }

            /*
             * FALLING MOVEMENT
             */

            p.y +=
                p.speedY * delta;

            p.x +=
                (
                    Math.sin(p.wobblePhase) *
                    p.wobbleAmplitude +
                    p.speedX
                ) * delta;

            p.wobblePhase +=
                p.wobbleSpeed * delta;

            p.rotation +=
                p.rotationSpeed * delta;

            /*
             * LEFT / RIGHT WRAPPING
             */

            if (p.x > width + p.size) {
                p.x = -p.size;
            }

            if (p.x < -p.size) {
                p.x = width + p.size;
            }

            /*
             * BOTTOM OF SCREEN
             *
             * Don't teleport immediately.
             * Let it disappear first.
             */

            if (p.y > height + p.size) {
                p.respawnDelay =
                    Math.random() * 30 + 15;

                p.el.style.opacity = '0';

                continue;
            }

            /*
             * DRAW PARTICLE
             */

            p.el.style.transform =
                `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
        }

        animationFrameId =
            requestAnimationFrame(animate);
    }

    /*
     * START ENGINE
     */

    animationFrameId =
        requestAnimationFrame(animate);

    /*
     * CLEANUP
     */

    return async function cleanup() {
        isRunning = false;

        if (animationFrameId) {
            cancelAnimationFrame(
                animationFrameId
            );
        }

        container.remove();

        document
            .querySelectorAll('.spydr-theme-fx')
            .forEach(el => el.remove());
    };
}
