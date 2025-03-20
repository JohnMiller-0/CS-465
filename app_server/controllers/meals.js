/* GET meals VIEW */
var fs = require('fs');
var dishes = JSON.parse(fs.readFileSync('./data/dishes.json', 'utf8'));

const meals = (req, res) => {
    res.render('meals', {title: 'meals', dishes});
};

module.exports = {
    meals
};
