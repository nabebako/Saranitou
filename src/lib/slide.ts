class Slide<element extends HTMLElement> {
	private static body: HTMLBodyElement;

	private _target: element;
	get target() {
		return this._target;
	}
	private set target(val: element) {
		this._target = val;
	}
	
	private attatchStart() {
		this.target.addEventListener('mousedown', () => {
			this.target.classList.remove('transition-transform', 'indicate-moveable');
			this.target.classList.add('z-40');
			Slide.body.classList.add('h-full', 'overflow-y-hidden');
			this.shouldMove = true;
			this.target.style.cursor = 'grabbing';
		});
		this.target.addEventListener('touchstart', (e) => {
			this.target.classList.remove('transition-transform', 'indicate-moveable');
			this.target.classList.add('z-40');
			Slide.body.classList.add('h-full', 'overflow-y-hidden');
			this.startX = e.touches.item(0).pageX;
			this.shouldMove = true;
		});
	}

	private attatchEnd() {
		window.addEventListener('mouseup', () => {
			this.x = 0;
			this.target.classList.add('transition-transform');
			this.target.classList.remove('z-40');
			Slide.body.classList.remove('h-full', 'overflow-y-hidden');
			this.target.style.transform = 'translate(0px) rotate(0deg)';
			this.shouldMove = false;
			this.target.style.cursor = 'grab';
		});
		window.addEventListener('touchend', () => {
			this.x = 0;
			this.target.classList.add('transition-transform');
			this.target.classList.remove('z-40');
			Slide.body.classList.remove('h-full', 'overflow-y-hidden');
			this.target.style.transform = 'translate(0px) rotate(0deg)';
			this.shouldMove = false;
		});
	}

	x: number;
	startX: number;
	shouldMove: boolean;

	onRight: () => void;
	onLeft: () => void;

	constructor(target: element, slideThreshold = 0.6, slideSpeed = 1.5, onRight = () => {}, onLeft = () => {}) {
		Slide.body = document.querySelector('body');

		this.target = target;
		this.x = 0;
		this.startX = 0;
		this.shouldMove = false;
		this.onRight = onRight;
		this.onLeft = onLeft;

		target.style.cursor = 'grab';
		target.classList.add('relative');

		this.attatchStart();
		this.attatchEnd()

		window.addEventListener('mousemove', (e) => {
			if (this.shouldMove) {
				this.x += e.movementX * slideSpeed;
				target.style.transform = `translate(${this.x}px) rotate(${this.x * 0.04}deg)`;
			}
			if (this.x > target.offsetWidth * slideThreshold) {
				this.onRight();
				target.style.transform = 'translate(0px) rotate(0deg)';
				this.x = 0;
				this.shouldMove = false;
			} else if (this.x < target.offsetWidth * -1 * slideThreshold) {
				this.onLeft();
				target.style.transform = 'translate(0px) rotate(0deg)';
				this.x = 0;
				this.shouldMove = false;
			}
		});
		window.addEventListener('touchmove', (e) => {
			if (this.shouldMove) {
				this.x = (e.targetTouches.item(0).clientX - this.startX) * slideSpeed;
				target.style.transform = `translate(${this.x}px) rotate(${this.x * 0.04}deg)`;
			}
			if (this.x > target.offsetWidth * slideThreshold) {
				this.onRight();
				target.style.transform = 'translate(0px) rotate(0deg)';
				this.x = 0;
				this.shouldMove = false;
			} else if (this.x < target.offsetWidth * -1 * slideThreshold) {
				this.onLeft();
				target.style.transform = 'translate(0px) rotate(0deg)';
				this.x = 0;
				this.shouldMove = false;
			}
		});
		
	};

	setOnRight(callback: () => void) {
		this.onRight = callback;
		return this;
	}
	setOnLeft(callback: () => void) {
		this.onLeft = callback;
		return this;
	}
}	

export { Slide };