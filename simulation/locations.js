const locations = {
	'HQ': {
		'x': 0,
		'y': 0,
		'z': 0
	},
	'NE': {
		'x': 10000,
		'y': 10000,
		'z': 1000
	},
	'SE': {
		'x': -10000,
		'y': 10000,
		'z': 2000
	},
	'SW': {
		'x': -10000,
		'y': -10000,
		'z': 500
	},
	'NW': {
		'x': -10000,
		'y': 10000,
		'z': 1500
	}
};


exports.isValidLocation = function(name) { return( name in locations); }

exports.getLocation = function(name) {
	result = {};
	if (exports.isValidLocation(name)) {
		result = locations[name];
	}

	return result;
}


