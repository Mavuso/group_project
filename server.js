var express = require('express');
var bodyParser = require('body-parser');
var mainRouter = require('./mainRoutes');
var todoRoute = require('./todoRoutes');
app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',mainRouter);
app.use('/todo',todoRoute);

app.use('/cdn',express.static('public'));
console.log("Running");
var server = app.listen(3000);

module.exports = app;
