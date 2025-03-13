/* GET ROOMS VIEW */

const rooms = (req, res) => {
    res.render('rooms', {title: 'rooms'});
};

module.exports = {
    rooms
};
