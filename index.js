const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');

const app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


const router = require('./router.js');

app.use('/', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});