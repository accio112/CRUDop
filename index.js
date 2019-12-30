require('./models/database');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const productController = require('./controllers/product.controller');

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(process.env.PORT||3000, () => {
    console.log('Express server started at port:',process.env.PORT);
});

app.use('/product', productController);
app.use('*',function (req,res){
    res.redirect('/product');
});