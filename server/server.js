var express = require('express'),
    path = require('path'),
    chalk = require('chalk'),
    app = express();

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT || 8080);
console.log(chalk.yellow('Express server listening on port', process.env.PORT || 8080));
