const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    try {
        await user.save(); // 👈 async/await instead of callback
        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
};

const login = (req, res) => {
    console.log("🔥 Login route hit");
    console.log("Body:", req.body);
    if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({"message" : "All fields are required."});
    }

    passport.authenticate('local', (err, user, info) => {
        if(err)
        {
            console.log(err);
            return res.status(400).json(err);
        }
        
        if(user)
        {
            const token = user.generateJwt();
            res.status(200).json({token});
        } else {
            res.status(401).json(info);
        }
    } )(req, res);
};

module.exports = {
    register,
    login
};