"use client";

import React, { useEffect, useRef } from 'react'
import "./rain.css";

export const Rain = () => {
    const canvasRef1 = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef1.current;
        const canvas_m = canvasRef2.current;
        if (!canvas || !canvas_m) return;

        const ctx = canvas.getContext("2d")!;
        const ctx_m = canvas_m.getContext("2d")!;
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
        canvas_m.width = width;
        canvas_m.height = height;

        class Vector {
            constructor(public x: number, public y: number) { }
        }

        class Particle {
            static idCounter = 0;
            x: number;
            y: number;
            size: number;
            id: number;
            velocity: Vector;
            splashing = false;

            constructor(x: number, y: number, size = 5, velocity = new Vector(0, 0)) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.id = ++Particle.idCounter;
                this.velocity = velocity;
            }

            render(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = "rgba(128,255,255,.8)";
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }

            splash(n: number) {
                for (let i = 0; i < n; i++) {
                    const p = particlePool.getParticle(false);
                    if (p) {
                        p.velocity.x = Math.randomRange(-100, 100);
                        p.velocity.y = Math.randomRange(-4, -1);
                        p.x = this.x;
                        p.y = height - 1;
                        p.size = this.size / 2;
                        p.splashing = false;
                        particles.push(p);
                    }
                }
            }

            reset(): this {
                this.velocity.x = this.velocity.y = 0;
                this.x = Math.randomRange(-300, width + 0);
                this.y = -100;
                this.size = Math.randomRange(config.minDropSize, config.maxDropSize);
                this.splashing = false;
                return this;
            }

            isOutOfBounds(): boolean {
                return this.x > width + 0 || this.x < -300 || this.y > height;
            }

            update(dt: number): this {
                const g = (dt / 1000) * 9.8 * (this.size / 2);
                this.velocity.y += g;
                this.velocity.x = config.windForce * g;
                this.y += this.velocity.y;
                this.x += this.velocity.x;
                return this;
            }
        }

        class Pool {
            particles: Particle[] = [];

            constructor(amount: number) {
                while (amount--) this.storeParticle(this.createParticle());
            }

            getParticle(createNewIfNeeded = false): Particle | false {
                if (this.particles.length) {
                    return this.particles.pop()!.reset();
                } else if (createNewIfNeeded || this.particles.length + particles.length < config.numParticles) {
                    return this.createParticle().reset();
                } else return false;
            }

            storeParticle(p: Particle): Particle {
                this.particles.push(p);
                return p;
            }

            createParticle(): Particle {
                return new Particle(0, 0);
            }

            isAvailable(): boolean {
                return this.particles.length > 0;
            }
        }

        const config = {
            minDropSize: 2,
            maxDropSize: 5,
            windForce: 10,
            particlesPerSplash: 0,
            dropsPerInterval: 10,
            dropInterval: 100,
            numParticles: 1000,
        };

        const particles: Particle[] = [];
        const particlePool = new Pool(config.numParticles);

        let delta = 0;
        let old_t = 0;
        let new_t = 0;
        let dropTimer = 0;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            canvas_m.width = width;
            canvas_m.height = height;
        };

        const update = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx_m.clearRect(0, 0, canvas_m.width, canvas_m.height);

            new_t = time;
            delta = old_t ? new_t - old_t : new_t;

            dropTimer += delta;
            if (dropTimer >= config.dropInterval) {
                dropTimer = 0;
                for (let i = 0; i < config.dropsPerInterval; i++) {
                    if (particlePool.isAvailable()) {
                        const p = particlePool.getParticle();
                        if (p) particles.push(p);
                    }
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update(delta);
                p.render(ctx);
                p.render(ctx_m);

                if (p.isOutOfBounds()) {
                    if (!p.splashing) p.splash(config.particlesPerSplash);
                    particlePool.storeParticle(p);
                    particles.splice(i, 1);
                }
            }

            old_t = new_t;
            requestAnimationFrame(update);
        };

        Math.randomRange = function (min: number, max: number): number {
            return Math.random() * (max - min) + min;
        };

        requestAnimationFrame(update);
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
            <canvas ref={canvasRef1} className="c1" />
            <div className="reflection-wrapper">
                <canvas ref={canvasRef2} className="c2" />
            </div>
        </div>
    );
};

declare global {
    interface Math {
        randomRange(min: number, max: number): number;
    }
}

// export const Rain = () => {
//     return (
//         <div className="wrapper">
//             <canvas className="c1" />
//             <div className="reflection-wrapper">
//                 <canvas className="c2" />
//             </div>
//         </div>
//     )
// }