<script lang="ts">
    import { onMount } from "svelte";

    export let canvasWidth: number = 500;
    export let canvasHeight: number = 500;
    let canvasContainer: HTMLDivElement;
    
    interface Point {
        x: number,
        y: number
    }

    function quadraticBezier(cp0x: number, cp0y: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, cp3x: number, cp3y: number, t: number): Point {
        if(t > 1) t = 1;

        const cx = 3 * (cp1x - cp0x);
        const bx = 3 * (cp2x - cp1x) - cx;
        const ax = cp3x - cp0x - cx - bx;

        const cy = 3 * (cp1y - cp0y);
        const by = 3 * (cp2y - cp1y) - cy;
        const ay = cp3y - cp0y - cy - by;
        
        const xt = ax*(t*t*t) + bx*(t*t) + cx*(t) + cp0x;
        const yt = ay*(t*t*t) + by*(t*t) + cy*(t) + cp0y;

        return { x: xt, y: yt };
    };

    onMount(() => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

		canvas.width = 500;
		canvas.height = 500;

		ctx.fillStyle = document.documentElement.classList.contains('dark')? 'rgb(203 213 225)':'rgb(15 23 42)';

        class CanvasMoveable {
            cp: Point[];
            x: number;
            y: number;
            r: number;
            static t: number = 0;
            static animationSpeed: number = 0.065;

            constructor(cp: Point[], r: number = 8) {
				const ratio = window.devicePixelRatio;
                this.r = r;
                this.x = cp[0].x * canvasWidth / 500;
                this.y = cp[0].y * canvasWidth / 500;
                this.cp = cp.map((corrdinate) => {
                    return { x: corrdinate.x * canvasWidth / 500, y: corrdinate.y * canvasWidth / 500 };
                });
            };
            static tick() {
                CanvasMoveable.t += CanvasMoveable.animationSpeed;
                if(CanvasMoveable.t > 1) {
                    CanvasMoveable.t = 1;
                }
                else if(CanvasMoveable.t < 0) {
                    CanvasMoveable.t = 0;
                }
            };
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();
            };
            move() {
                const {x, y} = quadraticBezier(this.cp[0].x, this.cp[0].y, this.cp[1].x, this.cp[1].y, this.cp[2].x, this.cp[2].y, this.cp[3].x, this.cp[3].y, CanvasMoveable.t);
                this.x = x;
                this.y = y;
            };
        };

        const firstPoint = new CanvasMoveable([
            {x: 250, y: 100},
            {x: 400, y: 125},
            {x: 450, y: 300},
            {x: 350, y: 300}
        ], 2);
        const secondPoint = new CanvasMoveable([
            {x: 250, y: 250},
            {x: 100, y: 125},
            {x: 200, y: 100},
            {x: 250, y: 150}
        ], 2);
        const thirdPoint = new CanvasMoveable([
            {x: 250, y: 400},
            {x: 400, y: 125},
            {x: 200, y: 250},
            {x: 150, y: 300}
        ], 2);

        function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			CanvasMoveable.tick();

			firstPoint.move();
			secondPoint.move();
			thirdPoint.move();
            
			firstPoint.draw();
			secondPoint.draw();
			thirdPoint.draw();

            if(CanvasMoveable.t >= 1 || CanvasMoveable.t <= 0) {
                CanvasMoveable.animationSpeed *= -1;
            }
            else {
                requestAnimationFrame(animate);
            }
        }

		function fixDpi() {
			const ratio = window.devicePixelRatio;
    		canvas.width = canvasWidth * ratio;
    		canvas.height = canvasHeight * ratio;
    		canvas.style.width = `${canvasWidth}px`;
    		canvas.style.height = `${canvasHeight}px`;
    		canvas.getContext("2d").scale(ratio, ratio);
		}

        canvasContainer.addEventListener('click', animate);

		fixDpi();

        firstPoint.draw();
        secondPoint.draw();
        thirdPoint.draw();

        document.documentElement.addEventListener('theme-change', () => {
            ctx.fillStyle = document.documentElement.classList.contains('dark')? 'rgb(203 213 225)':'rgb(15 23 42)';
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			firstPoint.draw();
			secondPoint.draw();
			thirdPoint.draw();
        });
	});
</script>

<div class="" bind:this="{canvasContainer}">
    <canvas height="{canvasHeight}" width="{canvasWidth}"></canvas>
</div>