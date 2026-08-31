export default async function initThemeFX({
    theme = {},
    assets = [],
    container = null
} = {}) {
    const target =
        container ||
        document.getElementById(
            "theme-fx-container"
        );

    if (!target) {
        console.warn(
            "spydr theme fx // #theme-fx-container not found"
        );

        return () => {};
    }

    // Clean previous run.
    target.replaceChildren();
    target.hidden = false;

    if (!Array.isArray(assets) || assets.length === 0) {
        return () => {
            target.replaceChildren();
            target.hidden = true;
        };
    }

    target.classList.add(
        "spydr-theme-fx"
    );

    const reduceMotion =
        window.matchMedia?.(
            "(prefers-reduced-motion: reduce)"
        )?.matches;

    const viewportArea =
        window.innerWidth *
        window.innerHeight;

    // Responsive amount. Keep the screen alive but not buried.
    const particleCount =
        reduceMotion
            ? Math.min(10, assets.length * 3)
            : Math.max(
                20,
                Math.min(
                    38,
                    Math.round(
                        viewportArea / 43000
                    )
                )
            );

    const fragment =
        document.createDocumentFragment();

    const particles = [];

    for (
        let index = 0;
        index < particleCount;
        index += 1
    ) {
        const particle =
            document.createElement("img");

        const src =
            assets[
                Math.floor(
                    Math.random() *
                    assets.length
                )
            ];

        particle.className =
            "spydr-theme-particle";

        particle.src = src;
        particle.alt = "";
        particle.draggable = false;
        particle.decoding = "async";

        const size =
            26 + Math.random() * 44;

        const left =
            Math.random() * 100;

        const duration =
            9 + Math.random() * 13;

        const delay =
            -(Math.random() * duration);

        const sway =
            20 + Math.random() * 75;

        const rotate =
            (Math.random() - 0.5) * 220;

        const opacity =
            0.42 + Math.random() * 0.48;

        particle.style.setProperty(
            "--fx-size",
            `${size}px`
        );

        particle.style.setProperty(
            "--fx-left",
            `${left}%`
        );

        particle.style.setProperty(
            "--fx-duration",
            `${duration}s`
        );

        particle.style.setProperty(
            "--fx-delay",
            `${delay}s`
        );

        particle.style.setProperty(
            "--fx-sway",
            `${sway}px`
        );

        particle.style.setProperty(
            "--fx-rotate",
            `${rotate}deg`
        );

        particle.style.setProperty(
            "--fx-opacity",
            opacity.toFixed(2)
        );

        fragment.appendChild(
            particle
        );

        particles.push(
            particle
        );
    }

    target.appendChild(
        fragment
    );

    /*
     * Preload failures should not break the whole FX engine.
     * A missing image simply disappears.
     */
    const onError = event => {
        event.currentTarget?.remove();
    };

    particles.forEach(
        particle => {
            particle.addEventListener(
                "error",
                onError,
                { once: true }
            );
        }
    );

    return () => {
        particles.forEach(
            particle => {
                particle.removeEventListener(
                    "error",
                    onError
                );
            }
        );

        target.replaceChildren();
        target.classList.remove(
            "spydr-theme-fx"
        );
        target.hidden = true;
    };
}
