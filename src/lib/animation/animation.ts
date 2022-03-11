interface Point {
	x: number;
	y: number;
}

class AnimationObject {
	cp: Point[];
	x: number;
	y: number;
	areScaled: boolean;

	scaledCp: Point[];
	scaledX: number;
	scaledY: number;

	constructor(cp: Point[], isScaled: boolean = false) {
		const ratio = window.devicePixelRatio;
		this.x = cp[0].x;
		this.y = cp[0].y;
		this.cp = cp.map((corrdinate) => {
			return { x: corrdinate.x, y: corrdinate.y };
		});
	}

	scale() {
		if (!this.areScaled) {
			const ratio = window.devicePixelRatio;
			this.scaledX;
			this.scaledY;
		}
	}
}

class Animation {
	animationObjects: AnimationObject[];
	t: number = 0;
	animationSpeed: number;
	canvas: HTMLCanvasElement;
	ctx: RenderingContext;
	draw: VoidFunction;
	move: VoidFunction;

	constructor(
		animationObjects: AnimationObject[] = [],
		animationSpeed: number = 0.1,
		canvas: HTMLCanvasElement = undefined,
		canvasContext: string = '2d'
	) {
		this.animationObjects = animationObjects;
		this.animationSpeed = animationSpeed;
		this.canvas = canvas;
		this.ctx = canvas?.getContext(canvasContext);
	}
	tick() {
		this.t += this.animationSpeed;
		if (this.t > 1) {
			this.t = 1;
		} else if (this.t < 0) {
			this.t = 0;
		}
	}
	setDraw(draw: VoidFunction) {
		this.draw = () => {
			this.animationObjects.forEach((object) => {
				draw();
			});
		};
	}
	setMove(move: VoidFunction) {
		this.move = () => {
			this.animationObjects.forEach((object) => {
				move();
			});
		};
	}
}

export default { Animation, AnimationObject };
