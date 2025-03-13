/* GET CONTACT VIEW */

const contact = (req, res) => {
    res.render('contact', {title: 'contact'});
};

module.exports = {
    contact
};
