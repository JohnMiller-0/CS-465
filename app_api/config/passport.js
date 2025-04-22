const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');


passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      console.log("📥 Passport strategy triggered with:", username);
      
      try {
        const user = await User.findOne({ email: username });
  
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        const isValid = user.validPassword(password);

        if (!isValid) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));