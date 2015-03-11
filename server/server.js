var express = require('express'),
    path = require('path'),
    chalk = require('chalk'),
    app = express(),
    router = express.Router();

app.use(express.static(path.join(__dirname, '../public')))

router.use(function(req, res, next) {
    console.log(chalk.green('%s %s %s', req.method, req.url, req.path));
    next();
});

app.get('/', function(req, res) {
    console.log(req);
    res.render('index.html');
});

app.listen(process.env.PORT || 8080);
console.log(chalk.yellow('Express server listening on port', process.env.PORT || 8080));
