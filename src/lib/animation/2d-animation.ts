interface Position2D {
	x: number;
	y: number;
}

interface AnimationType {
	spring: SpringAnimation;
	curve: BezierCruveAnimation;
}

export class Canvas {
	private ctx: CanvasRenderingContext2D;

	constructor(
		public canvasElement: HTMLCanvasElement,
		public canvasWidth: number,
		public canvasHeight: number,
		public elementWidth: number,
		public elementHeight: number,
		public objects: CanvasObject[] = []
	) {
		this.ctx = canvasElement.getContext('2d');
		canvasElement.width = canvasWidth;
		canvasElement.height = canvasHeight;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		return this;
	}
	render() {
		this.objects.forEach((object) => {
			object.render(this.ctx);
		});
		return this;
	}
	addObject(object: CanvasObject) {
		this.objects = [...this.objects, object];
		return this;
	}
	fixDpi() {
		const ratio = window.devicePixelRatio;
		this.canvasElement.width = this.elementWidth * ratio;
		this.canvasElement.height = this.elementHeight * ratio;
		this.canvasElement.style.width = `${this.elementWidth}px`;
		this.canvasElement.style.height = `${this.elementHeight}px`;
		this.ctx.scale(ratio, ratio);

		return this;
	}
	setCtx(setter: (ctx: CanvasRenderingContext2D) => CanvasRenderingContext2D) {
		this.ctx = setter(this.ctx);
	}
}

abstract class CanvasObject {
	abstract render(renderingContext: CanvasRenderingContext2D): void;

	position: Position2D;

	constructor(x = 0, y = 0) {
		this.position = { x: x, y: y };

		this.render = this.render.bind(this);
	}

	addAnimation<T extends keyof AnimationType>(
		animationType: T,
		cps: Position2D[],
		controler?: AnimationControler
	): AnimationType[T] {
		let animation: AnimationType[T];
		switch (animationType) {
			case 'curve':
				animation = new BezierCruveAnimation(cps, this);
				break;
			case 'spring':
				animation = new SpringAnimation(cps, this);
				break;
			default:
				break;
		}
		if (controler) animation.attatchToController(controler);
		return animation;
	}
}
export class Circle extends CanvasObject {
	constructor(x = 0, y = 0, public r = 5) {
		super(x, y);
	}

	render(renderingContext: CanvasRenderingContext2D): void {
		renderingContext.beginPath();
		renderingContext.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
		renderingContext.fill();
	}
}
export class Square extends CanvasObject {
	constructor(x = 0, y = 0, public height = 5, public width = 5) {
		super(x, y);
	}

	render(renderingContext: CanvasRenderingContext2D) {}
}

export class AnimationControler {
	private shouldRenderLoop: boolean;
	private animationQueue = 0;
	private updateLoop: any = 0;
	private t = 0;

	tickPerSecond = 100;

	shouldLoop = false;
	shouldReverse = false;
	shouldReduceQueue = false;

	constructor(
		public canvas: Canvas = undefined,
		private animations: Animation[] = [],
		options: {
			tickPerSecond?: number;
			shouldReverse?: boolean;
			shouldLoop?: boolean;
			shouldReduceQueue?: boolean;
		} = {}
	) {
		if (options) {
			this.tickPerSecond = options?.tickPerSecond ?? this.tickPerSecond;
			this.shouldLoop = options?.shouldLoop ?? this.shouldLoop;
			this.shouldReverse = options?.shouldReverse ?? this.shouldReverse;
			this.shouldReduceQueue = options?.shouldReduceQueue ?? this.shouldReduceQueue;
		}

		this.tick = this.tick.bind(this);
		this.update = this.update.bind(this);
		this.clear = this.clear.bind(this);
		this.render = this.render.bind(this);
		this.start = this.start.bind(this);
		this.pause = this.pause.bind(this);
		this.reset = this.reset.bind(this);
	}

	attatchNewCanvas(canvas: Canvas): AnimationControler {
		this.canvas = canvas;
		this.animations.forEach((animation) => this.canvas.addObject(animation.object));
		return this;
	}
	crateNewCanvas(
		canvasElement: HTMLCanvasElement,
		canvasWidth: number,
		canvasHeight: number,
		elementWidth: number,
		elementHeight: number
	): AnimationControler {
		this.canvas = new Canvas(canvasElement, canvasWidth, canvasHeight, elementWidth, elementHeight);
		this.animations.forEach((animation) => this.canvas.addObject(animation.object));
		return this;
	}
	addAnimation(animation: Animation): AnimationControler {
		this.animations = [...this.animations, animation];
		this.canvas?.addObject(animation.object);
		return this;
	}
	setOptions(options: {
		tickPerSecond?: number;
		shouldReverse?: boolean;
		shouldLoop?: boolean;
		shouldReduceQueue?: boolean;
	}): AnimationControler {
		this.tickPerSecond = options?.tickPerSecond ?? this.tickPerSecond;
		this.shouldLoop = options?.shouldLoop ?? this.shouldLoop;
		this.shouldReverse = options?.shouldReverse ?? this.shouldReverse;
		this.shouldReduceQueue = options?.shouldReduceQueue ?? this.shouldReduceQueue;
		return this;
	}

	tick(): AnimationControler {
		this.t += (0.01 * this.tickPerSecond) / 100;
		if (this.t > 1) this.t = 1;
		if (this.t < 0) this.t = 0;
		return this;
	}
	update(): AnimationControler {
		this.tick();
		this.animations.forEach((object) => {
			object.update(this.t);
		});

		if (this.t >= 1 || this.t <= 0) {
			if (this.shouldReverse && this.shouldLoop) {
				this.tickPerSecond *= -1;
			} else if (this.shouldLoop) {
				this.reset();
				this.start();
			} else if (this.shouldReverse) {
				this.pause();
				this.tickPerSecond *= -1;
			} else {
			}

			if (this.animationQueue > 0) {
				this.start();
				this.animationQueue--;
			}
		}

		return this;
	}
	clear(): AnimationControler {
		this.canvas.clear();
		return this;
	}

	render(): void {
		if (!this.canvas) {
			throw new Error(
				'Canvas undefined, attatch this controler to a canvas object before calling render, start, pause, or reset'
			);
		}
		this.canvas.clear().render();
		if (this.shouldRenderLoop) requestAnimationFrame(this.render);
	}
	start(): void {
		if (!this.canvas) {
			throw new Error(
				'Canvas undefined, attatch this controler to a canvas object before calling render, start, pause, or reset'
			);
		}
		if (!this.shouldRenderLoop) {
			this.shouldRenderLoop = true;
			requestAnimationFrame(this.render);
		}
		if (this.updateLoop === 0) {
			this.updateLoop = setInterval(this.update, 10);
		} else {
			this.animationQueue++;
			if (this.shouldReduceQueue) this.animationQueue = this.animationQueue % 2;
		}
	}
	pause(): void {
		if (!this.canvas) {
			throw new Error(
				'Canvas undefined, attatch this controler to a canvas object before calling render, start, pause, or reset'
			);
		}
		this.shouldRenderLoop = false;
		clearInterval(this.updateLoop);
		this.updateLoop = 0;
	}
	reset(): void {
		if (!this.canvas) {
			throw new Error(
				'Canvas undefined, attatch this controler to a canvas object before calling render, start, pause, or reset'
			);
		}
		this.shouldRenderLoop = false;
		clearInterval(this.updateLoop);
		this.updateLoop = 0;
		this.t = 0;
		this.update().render();
	}
}

abstract class Animation {
	protected isAttatchedToController = false;

	constructor(public cps: Position2D[], public object: CanvasObject = undefined) {
		this.update = this.update.bind(this);
		this.addNewObject = this.addNewObject.bind(this);
		this.attatchToController = this.attatchToController.bind(this);
		this.cps = object ? [object.position, ...cps] : cps;
	}

	abstract update(t: number): this;

	addNewObject(object: CanvasObject): this {
		this.object = object;
		this.cps = [object.position, ...this.cps];
		return this;
	}
	attatchToController(contorler: AnimationControler): this {
		if (!this.isAttatchedToController) contorler.addAnimation(this);
		this.isAttatchedToController = true;
		return this;
	}
}
export class SpringAnimation extends Animation {
	constructor(cps: Position2D[], object: CanvasObject = undefined) {
		super(cps, object);
	}

	update(t: number): this {
		return this;
	}
}
export class BezierCruveAnimation extends Animation {
	constructor(cps: Position2D[], object: CanvasObject = undefined) {
		super(cps, object);
	}

	update(t: number): this {
		const cx = 3 * (this.cps[1].x - this.cps[0].x);
		const bx = 3 * (this.cps[2].x - this.cps[1].x) - cx;
		const ax = this.cps[3].x - this.cps[0].x - cx - bx;

		const cy = 3 * (this.cps[1].y - this.cps[0].y);
		const by = 3 * (this.cps[2].y - this.cps[1].y) - cy;
		const ay = this.cps[3].y - this.cps[0].y - cy - by;

		const xt = ax * (t * t * t) + bx * (t * t) + cx * t + this.cps[0].x;
		const yt = ay * (t * t * t) + by * (t * t) + cy * t + this.cps[0].y;

		this.object.position = { x: xt, y: yt };

		return this;
	}
}

export default { Canvas, Circle, Square, AnimationControler, BezierCruveAnimation };
