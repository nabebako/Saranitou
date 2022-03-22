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

// class Slideable {
// 	target: HTMLElement;
// 	shouldMove: boolean;
// 	x: number;
// 	startX: number;

// 	constructor(target: HTMLElement) {
// 		this.target = target;
// 		this.shouldMove = false;
// 		this.x = 0;
// 		this.startX = 0;

// 		this.target.addEventListener('mousedown', () => {
// 			this.target.classList.remove('transition-transform');
// 			this.shouldMove = true;
// 		});
// 		this.target.addEventListener('touchstart', (e) => {
// 			this.target.classList.remove('transition-transform');
// 			this.startX = e.touches.item(0).pageX;
// 			this.shouldMove = true;
// 		});
// 		window.addEventListener('mousemove', (e) => {
// 			if(this.shouldMove) {
// 				this.x += e.movementX;
// 				this.target.style.transform = `translate(${this.x}px) rotate(${this.x * 0.04}deg)`;
// 			}
// 			if(this.x > this.target.offsetWidth * 0.75) {
// 				dislike();
// 				this.target.style.transform = 'translate(0px) rotate(0deg)';
// 				this.x = 0;
// 				this.shouldMove = false;
// 			}
// 			else if(this.x < this.target.offsetWidth * -0.75) {
// 				like();
// 				this.target.style.transform = 'translate(0px) rotate(0deg)';
// 				this.x = 0;
// 				this.shouldMove = false;
// 			}
// 		});
// 		window.addEventListener('touchmove', (e) => {
// 			if(this.shouldMove) {
// 				this.x = e.targetTouches.item(0).clientX - this.startX;
// 				this.target.style.transform = `translate(${this.x}px) rotate(${this.x * 0.04}deg)`;
// 			}
// 			if(this.x > this.target.offsetWidth * 0.4) {
// 				dislike();

// 				this.target.style.transform = 'translate(0px) rotate(0deg)';
// 				this.x = 0;
// 				this.shouldMove = false;
// 			}
// 			else if(this.x < this.target.offsetWidth * -0.4) {
// 				like();
// 				this.target.style.transform = 'translate(0px) rotate(0deg)';
// 				this.x = 0;
// 				this.shouldMove = false;
// 			}
// 		});
// 		window.addEventListener('mouseup', () => {
// 			this.x = 0;
// 			this.target.classList.add('transition-transform');
// 			this.target.style.transform = 'translate(0px) rotate(0deg)';
// 			  this.shouldMove = false;
// 		  });
// 		window.addEventListener('touchend', () => {
// 			this.x = 0;
// 			this.target.classList.add('transition-transform');
// 			this.target.style.transform = 'translate(0px) rotate(0deg)';
// 			this.shouldMove = false;
// 		});
// 	}
// }
