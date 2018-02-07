function House(game) {
	this.game = game;

	this.width = 326/3;
	this.height = 400/3;
	this.x = canvas.width + this.width;
	this.y = canvas.height - this.height;

	this.frameListener = radio.listen('frameEvent', function(eventType) {
		this[eventType] && this[eventType]();
	}.bind(this));

	this.resizeListener = radio.listen('canvas-resize', function(canvas) {
		this.y = canvas.height - this.height;
	}.bind(this));

	game.houses.push(this);
	game.undeliveredHouses.push(this);
}

House.image = new Image();
House.image.src = 'images/house.png';

House.prototype.calcPosition = function() {
	this.x -= this.game.speed;

	if (this.x <= 0 - this.width) {
		this.destroy();
	}
}

House.prototype.drawFrame = function() {
	context.drawImage(House.image, this.x, this.y, this.width, this.height);
}

House.prototype.collide = function() {
	this.collided = true;
	removeFromArray(this.game.undeliveredHouses, this);
}

House.prototype.destroy = function() {
	this.frameListener.destroy();
	this.resizeListener.destroy();

	removeFromArray(this.game.houses, this);
	removeFromArray(this.game.undeliveredHouses, this);

	delete this;
}
