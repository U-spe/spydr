// Ensure the method right above this one ends with a closing bracket like this: }

    async applyBgStyle(style) {
        const body = document.body;

        const canvas =
            document.getElementById("stars-canvas");

        const fog =
            document.getElementById("fog-overlay");

        // Save body state for CSS
        body.dataset.bgStyle = style;

        // Kill old custom FX (using optional chaining in case it doesn't exist yet)
        this.disableCustomGradientFX?.();

        // Kill image Theme FX
        if (this.cleanupFX) {
            try {
                await this.cleanupFX();
            } catch (error) {
                console.warn(
                    "spydr theme // FX cleanup failed:",
                    error
                );
            }

            this.cleanupFX = null;
        }

        // Stop stars
        this.stopStars?.();

        // Reset layers
        if (canvas) {
            canvas.style.display = "none";
        }

        if (fog) {
            fog.style.opacity = "0";
        }


        // =====================================================
        // REGULAR spydr
        // =====================================================

        if (style === "none") {
            return;
        }


        // =====================================================
        // STARS
        // =====================================================

        if (style === "stars") {
            this.enableStars();
            return;
        }


        // =====================================================
        // FOG
        // =====================================================

        if (style === "fog") {
            if (fog) {
                fog.style.opacity = "1";
            }

            return;
        }


        // =====================================================
        // GRADIENT
        // CSS handles body[data-bg-style="gradient"]
        // =====================================================

        if (style === "gradient") {
            return;
        }


        // =====================================================
        // THEME FX
        // =====================================================

        if (style === "theme") {

            const theme =
                this.currentTheme ||
                document.documentElement.dataset.theme ||
                "spydr";


            // spydr = STARS
            if (theme === "spydr") {
                this.enableStars();
                return;
            }


            // CUSTOM = MOVING CUSTOM GRADIENT
            if (theme === "custom") {
                this.enableCustomGradientFX?.();
                return;
            }


            // EVERYTHING ELSE = IMAGE PARTICLES
            if (this.applyThemeFX) {
                await this.applyThemeFX(theme);
            }
        }
    }

    enableStars() {
        const canvas =
            document.getElementById("stars-canvas");

        if (!canvas) {
            console.warn(
                "spydr theme // stars canvas missing"
            );
            return;
        }

        this.stopStars?.();

        canvas.style.display = "block";

        const ctx =
            canvas.getContext("2d");

        if (!ctx) return;

        let width;
        let height;

        const stars = [];

        const resize = () => {
            width = canvas.width =
                window.innerWidth;

            height = canvas.height =
                window.innerHeight;
        };

        resize();

        for (let i = 0; i < 160; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.7 + 0.3,
                speed: Math.random() * 0.25 + 0.05,
                alpha: Math.random() * 0.7 + 0.2
            });
        }

        const draw = () => {
            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            for (const star of stars) {
                star.y += star.speed;

                if (star.y > height) {
                    star.y = 0;
                    star.x =
                        Math.random() * width;
                }

                ctx.globalAlpha =
                    star.alpha;

                ctx.fillStyle =
                    "#ffffff";

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    star.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }

            ctx.globalAlpha = 1;

            this.starAnimationFrame =
                requestAnimationFrame(draw);
        };

        window.addEventListener(
            "resize",
            resize
        );

        this.starResizeHandler =
            resize;

        draw();
    }

    stopStars() {
        if (this.starAnimationFrame) {
            cancelAnimationFrame(
                this.starAnimationFrame
            );

            this.starAnimationFrame =
                null;
        }

        if (this.starResizeHandler) {
            window.removeEventListener(
                "resize",
                this.starResizeHandler
            );

            this.starResizeHandler =
                null;
        }

        const canvas =
            document.getElementById(
                "stars-canvas"
            );

        if (canvas) {
            const ctx =
                canvas.getContext("2d");

            ctx?.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            canvas.style.display =
                "none";
        }
    }
