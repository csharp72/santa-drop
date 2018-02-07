Radio = function(){
	this.channels = Object.create(null);
}

Radio.prototype.listen = function(channel, callback) {
	var channels = this.channels;

	if (!channels[channel]) {
		channels[channel] = [];
	}

	channels[channel].push(callback);

	return {
		destroy: function() {
			channels[channel].splice(channels[channel].indexOf(callback), 1);
		}
	}
}

Radio.prototype.broadcast = function(channel, info) {
	var channels = this.channels;

	if (!channels[channel] || !channels[channel].length) {
		return;
	}

	channels[channel].forEach(function(callback) {
		callback(info);
	});
}

radio = new Radio();
