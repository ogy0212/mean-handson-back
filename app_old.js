const fs = require('fs');
const _ = require('lodash');
const {promisify} = require('util');

const calc = require('./calc');



promisify(fs.readFile)('colors.txt', 'UTF-8').then(data => {
    const filtered = _(data.split('\r\n'))
    .filter(color => {
        return color === 'black';
    }).map(color => {
        return `picked up ${color}`
    }).value();
    console.log(filtered);
})




// var colors = fs.readFileSync('colors.txt', 'UTF-8').split('\r\n');
// const colors = fs.readFile('colors.txt', 'UTF-8', function(err, data) {
//     const filtered = _(data.split('\r\n')).filter(
//         (color) => {return color === 'black';}
//     ).value();
//     console.log(filtered);
// });

// const filtered = _(colors).filter(
//     (color) => {return color === 'black';}
// ).map(
//     (color) => {return color + 'hoge';}
// ).value();

// console.log(filtered);