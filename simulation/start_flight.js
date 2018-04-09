process = require('process');

const from = process.argv[2] || 'HQ';
const to = process.argv[3] || 'NE';

const location = {
	'HQ': { 'x': 0, 'y': 0, 'z': 0 },
	'NE': { 'x': 10000, 'y': 10000, 'z': 1000 },
	'SE': { 'x': -10000, 'y': 10000, 'z': 2000 },
	'SW': { 'x': -10000, 'y': -10000, 'z': 500 },
	'NW': { 'x': -10000, 'y': 10000, 'z': 1500 }
};


console.log('From: ' + from); 
console.log('To: ' + to);
