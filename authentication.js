var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var twoteUser = require('./models/twoteUser.js');
// var config = require('./oauth.js')

// module.exports = passport.use(new FacebookStrategy({
//   clientID: config.facebook.clientID,
//   clientSecret: config.facebook.clientSecret,
//   callbackURL: config.facebook.callbackURL
// },
module.exports = passport.use(new FacebookStrategy({
  clientID: process.env.facebook.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL
},


function(accessToken, refreshToken, profile, done) {
twoteUser.findOne({ oauthID: profile.id }, function(err, user) {
  if(err) { console.log(err); }
  if (!err && user != null) {
    done(null, user);
  } else {
   var user = new twoteUser({
    oauthID: profile.id, 
    userName: profile.displayName
    });
   
   user.save(function(err) {
        if(err) {
          console.log(err);
             } else {
                    console.log("saving user ...");
                    done(null, user);
              };
      });
  };
  });
  }
));