const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');



//handlebars stuff:
// ('express-handlebars');
// const hbs = exphbs.create({});


const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the default template/view engine.
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// set up session
const sess = {
  secret: 'caNWeputaNYthIngHERE',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000, //expires after 1 day
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
} 
app.use(session(sess))

// homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

// keep it simple. use wildcards later
app.use(routes);


//make sequelize rebuild the tables again IF IN DEVELOPMENT, otherwise if it's not ok to sync, just produce/find the existing tables
const okToSync = process.env.NODE_ENV === "production" ? false : true;
sequelize.sync({ force: okToSync }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});