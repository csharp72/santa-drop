function Sleigh(game) {
	this.x = 400;
	this.y = 100;
	this.yAccel = 0;
	this.width = 3928/9;
	this.height = 351;
	this.reloadRate = 1000;
	this.readyToFire = true;
	this.jumpStrength = 13;
	this.image = new Image();
	this.image.src = 'images/running.png';

	this.game = game;

	this.STATES = {
		running: {frames: 9, currentFrame:1},
	}

	this.state = this.STATES.running;

	this.animationSpeed = 5;

	this.frameListener = radio.listen('frameEvent', function(eventType) {
		this[eventType] && this[eventType]();
	}.bind(this));
}

Sleigh.prototype.calcPosition = function() {
	if (this.yAccel < this.game.TERMINAL_VELOCITY) {
		this.yAccel += this.game.GRAVITY;
	}

	this.y = Math.min(this.y + this.yAccel, canvas.height - this.height/3 + 30);

}

Sleigh.prototype.checkCollision = function() {
	if (this.y == canvas.height - this.height/3 + 30) {
		this.game.over();
	}
}

Sleigh.prototype.drawFrame = function() {

	context.drawImage(this.image, this.width * this.state.currentFrame-1, 0, this.width, this.height, this.x, this.y, this.width/3, this.height/3);

	if (this.animationSpeed == 5) {
		this.animationSpeed = 0;
		if (this.state.currentFrame < this.state.frames - 1) {
			this.state.currentFrame++;
		} else {
			this.state.currentFrame = 1;
		}
	} else {
		this.animationSpeed ++
	}

}

Sleigh.prototype.gainAlt = function() {
	if (this.y > 0 - this.height) {
		this.yAccel = Math.max(this.yAccel - this.jumpStrength, -this.game.TERMINAL_VELOCITY);
	}
}

Sleigh.prototype.dropPresent = function(){
	if (this.readyToFire) {
		var present = new Present(this.game, this);
		this.readyToFire = false;
		setTimeout(function(){
			this.readyToFire = true;
		}.bind(this), this.reloadRate);
	}
}

Sleigh.prototype.destroy = function() {
	this.frameListener.destroy();
	delete this;
}
