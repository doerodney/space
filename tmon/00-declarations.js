function getValue(condition) {
    if (condition) {
        var value = 'blue';
        return value;
    } else {
        console.log('value = ', value);
        return value;
    }
}

console.log('Exploration of Declaration\n\n');

console.log('color =', color);

var color = getValue(true);
console.log('color =', color);

color = getValue(false);
console.log('color =', color);

const favorite = {name: 'cinnamon roll'};
console.log('favorite is initially:', favorite, '\n');

favorite.name = 'beer';
console.log('favorite is now:', favorite, '\n');

for (var i = 0; i < 5; i++) {
   console.log('i =', i);
}
console.log('\n');

for (let x = 0; x < 5; x++) {
	console.log('x = ', x);
}
console.log('\n');

console.log('i =', i);
//console.log('x =', x);

color = 'rave green';

//favorite = {composer: 'Vivaldi'}

console.log(favorite);
