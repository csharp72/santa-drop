function Present(game, sleigh) {
	this.game = game;

	this.x = sleigh.x + 10;
	this.y = sleigh.y + 60;
	this.yAccel = sleigh.yAccel + 5;
	this.width = 20;
	this.height = 20;
	this.color = ['#FFD800','#0000FF','#00FF00'][Math.floor(Math.random()*3)];

	this.frameListener = radio.listen('frameEvent', function(eventType) {
		this[eventType] && this[eventType]();
	}.bind(this));

	game.presents.push(this);
}

Present.prototype.calcPosition = function() {
	if (this.yAccel < this.game.TERMINAL_VELOCITY) {
		this.yAccel += this.game.GRAVITY;
	}

	this.y = Math.max(Math.min(this.y + this.yAccel, canvas.height - this.height), 0);

	if (this.y == canvas.height - this.height) {
		this.x -= this.game.speed;
	}

	if (this.x <= 0 - this.width) {
		this.destroy();
	}
}

Present.prototype.checkCollision = function() {
	if (this.delivered) return;

	var house;
	for (var i = this.game.undeliveredHouses.length - 1; i >= 0; i--) {
		house = this.game.undeliveredHouses[i];
		if (this.x >= house.x &&
				this.x + this.width <= house.x + house.width &&
				this.y >= house.y &&
				this.y + this.height <= house.y + house.height) {
			this.collide();
			house.collide();
			this.game.adjustScore(1);
			break;
		}
	}
}

Present.prototype.collide = function() {
	this.delivered = true;
}

Present.prototype.drawFrame = function() {
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fillStyle = this.color;
	context.fill();
}



Present.prototype.destroy = function() {
	this.frameListener.destroy();
	removeFromArray(this.game.presents, this);
	delete this;
}
