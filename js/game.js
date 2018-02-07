function Game() {
	this.GRAVITY = .2;
	this.TERMINAL_VELOCITY = 10;
	this.speed = 2;
	this.frame = 1;
	this.paused = false;

	this.houses = [];
	this.presents = [];
	this.undeliveredHouses = [];

	this.spirit = 0;

	this.starField = new StarField(this);
	this.sleigh = new Sleigh(this);
	this.controls = new Controls(this);

	window.addEventListener('blur', this.pause.bind(this));

	window.requestAnimationFrame(this.gameFrame.bind(this));

}

Game.ELEMENTS = {
	pauseNotification: document.querySelector('#pause-notification'),
	restartButton: document.querySelector('#restart-button'),
	resumeButton: document.querySelector('#resume-button'),
	spirit: document.querySelector('#spirit'),
	crashNotification: document.querySelector('#crash-notification'),
	finalScore: document.querySelector('#final-score'),
}

Game.prototype.gameFrame = function() {
	if (!this.paused) {
		window.requestAnimationFrame(this.gameFrame.bind(this));

		// clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// // calculate new positions
		// radio.broadcast('frameEvent', 'calcPosition');
		this.sleigh.calcPosition();
		this.presents.forEach(function(present) {
			present.calcPosition();
		});
		this.houses.forEach(function(house) {
			house.calcPosition();
		});

		// // check collisions
		// radio.broadcast('frameEvent', 'checkCollision');
		this.sleigh.checkCollision();
		this.presents.forEach(function(present) {
			present.checkCollision();
		});

		// // draw frames
		// radio.broadcast('frameEvent', 'drawFrame');
		this.starField.drawFrame();
		this.houses.forEach(function(house) {
			house.drawFrame();
		});
		this.presents.forEach(function(present) {
			present.drawFrame();
		});
		this.sleigh.drawFrame();


		if (this.frame % 60 === 0) {
			new [House][Math.floor(Math.random()*.9999)](this);
		}

		this.frame ++;
	}
}

Game.prototype.adjustScore = function(amt) {
	this.spirit += amt;
	Game.ELEMENTS.spirit.innerText = this.spirit;
}

Game.prototype.pause = function() {
	if (!this.paused) {
		this.paused = true;
		addClass(Game.ELEMENTS.pauseNotification, 'shown');
	}
}

Game.prototype.resume = function() {
	removeClass(Game.ELEMENTS.pauseNotification, 'shown');
	this.paused = false;
	window.requestAnimationFrame(this.gameFrame.bind(this));
}

Game.prototype.over = function(amt) {
	this.paused = true;
	addClass(Game.ELEMENTS.crashNotification, 'shown');
	Game.ELEMENTS.finalScore.innerText = this.spirit;
}

Game.prototype.reset = function() {
	this.sleigh.destroy();
	for (var i = this.houses.length - 1; i >= 0; i--) {
		this.houses[i].destroy();
	};
	for (var i = this.presents.length - 1; i >= 0; i--) {
		this.presents[i].destroy();
	};

	this.sleigh = new Sleigh(this);
	this.spirit = 0;
	Game.ELEMENTS.spirit.innerText = this.spirit;

	this.speed = 2;
	this.frame = 1;
	this.paused = false;

	window.requestAnimationFrame(this.gameFrame.bind(this));
}

Game.prototype.destroy = function() {
	window.removeEventListener('blur', this.pause);
	delete this;
}
