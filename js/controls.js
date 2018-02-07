function Controls(game) {
	this.game = game;

	window.addEventListener('keydown', this.keydown.bind(this));
}

Controls.KEYS = {
	space: 32,
	enter: 13,
	d: 68,
}

Controls.prototype.keydown = function(e) {
	// console.log('keydown', e.keyCode)

	if (e.keyCode == Controls.KEYS.space) {
		this.game.sleigh.gainAlt();
	}

	if (e.keyCode == Controls.KEYS.enter || e.keyCode == Controls.KEYS.d) {
		this.game.sleigh.dropPresent();
	}
}

Controls.prototype.destroy = function() {
	window.removeEventListener('keydown', this.keydown);
}
