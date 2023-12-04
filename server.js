const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');



//handlebars stuff:
('express-handlebars');

const hbs = exphbs.create({});

//also import models

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Handlebars as the default template/view engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

//All other routes are directed elsewhere
app.use("*", routes);


//make sequelize rebuild the tables again IF IN DEVELOPMENT, otherwise if it's not ok to sync, just produce/find the existing tables
const okToSync = process.env.NODE_ENV === "production" ? false : true;
sequelize.sync({ force: okToSync }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});