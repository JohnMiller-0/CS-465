/* GET ROOMS VIEW */
var fs = require('fs');
var suites = JSON.parse(fs.readFileSync('./data/suites.json', 'utf8'));

const rooms = (req, res) => {
    res.render('rooms', {title: 'rooms', suites});
};

module.exports = {
    rooms
};
