/* 
    FAFURION — SCRIPTS
    Core interactions, Particles, and Lightning
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVBAR SCROLL EFFECT ---
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 2. REVEAL ON SCROLL ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. PARALLAX HERO ---
    const heroBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        heroBg.style.transform = `translateY(${offset * 0.4}px)`;
    });

    // --- 4. RAIN PARTICLES (CANVAS) ---
    const canvas = document.getElementById('fx-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    const initCanvas = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    class RainDrop {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.l = Math.random() * 20 + 10;
            this.v = Math.random() * 5 + 10;
        }
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(174, 194, 224, 0.2)';
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.v * 0.1, this.y + this.l);
            ctx.stroke();
        }
        update() {
            this.y += this.v;
            this.x += this.v * 0.1;
            if (this.y > height) {
                this.y = -this.l;
                this.x = Math.random() * width;
            }
        }
    }

    const animateParticles = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);

    for (let i = 0; i < 150; i++) {
        particles.push(new RainDrop());
    }
    animateParticles();

    // --- 5. LIGHTNING EFFECT ---
    const lightningOverlay = document.getElementById('lightning-overlay');
    
    const triggerLightning = () => {
        const delay = Math.random() * 10000 + 5000; // Random delay between 5-15s
        setTimeout(() => {
            // Quick flash sequence
            lightningOverlay.style.opacity = '0.3';
            setTimeout(() => {
                lightningOverlay.style.opacity = '0';
                setTimeout(() => {
                    lightningOverlay.style.opacity = '0.1';
                    setTimeout(() => {
                        lightningOverlay.style.opacity = '0';
                        triggerLightning();
                    }, 50);
                }, 50);
            }, 100);
        }, delay);
    };

    triggerLightning();

    // --- 6. GLITCH TEXT (OPTIONAL REFINEMENT) ---
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchText.style.textShadow = `
                    ${Math.random() * 10}px 0 #00fff2, 
                    ${Math.random() * -10}px 0 #c5a059
                `;
                setTimeout(() => {
                    glitchText.style.textShadow = 'none';
                }, 100);
            }
        }, 200);
    }

    // --- 7. AUDIO TOGGLE (MOCKUP) ---
    const audioBtn = document.getElementById('toggle-audio');
    let isPlaying = false;
    audioBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        audioBtn.classList.toggle('playing', isPlaying);
        alert("En un entorno real, aquí se reproduciría una melodía nórdica épica ( Wardruna / Danheim style ).");
    });

});
