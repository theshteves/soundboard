var express = require('express'),
    path = require('path'),
//    favicon = require('serve-favicon'),
    app = express();

app.use(express.static(path.join(__dirname, '../views')))
//app.use(favicon(path.join(__dirname,'../public/favicon.ico')));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT || 8080);
console.log('Server created on port 8080');
