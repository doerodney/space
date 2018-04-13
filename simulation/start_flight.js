process = require('process');

const from = process.argv[2] || 'HQ';
const to = process.argv[3] || 'NE';

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


if (from in locations) {
	console.log('From: ' + from + ' (' + locations[from].x + ',' + locations[from].y + ',' + locations[from].z + ')');

	if (to in locations) {
		console.log('To: ' + to + ' (' + locations[to].x + ',' + locations[to].y + ',' + locations[to].z + ')');
	} else {
		console.log(to + ' is not  valid location.');
	}

} else {
	console.log(from + ' is not a valid location.');
}
