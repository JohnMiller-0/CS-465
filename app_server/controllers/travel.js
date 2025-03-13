/* GET TRAVEL VIEW */

const travel = (req, res) => {
    res.render('travel', {title: 'travel'});
};

module.exports = {
    travel
};
