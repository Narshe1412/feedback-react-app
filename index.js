const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days expiration
    keys: [keys.cookieKey] //array of keys, can be multiple
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//heroku env
if (process.env.NODE_ENV === 'production') {
  // Express will serve prod assets
  app.use(express.static('client/build'));

  // Express will serve index.html if route is not defined in Express (aka defined in React-router)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);


console.log("testing key ", process.env.STRIPE_PUBLISHABLE_KEY)