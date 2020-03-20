//node and express template for basic web server
var express = require('express');
var app = express();

//set up handlebars layout as 'main'
var handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//get port or use 3000
app.set('port', process.env.PORT || 3000);

//for serving static files
app.use(express.static(__dirname + '/public'));

//Routes renders 'home' view
app.get('/', function(req, res){
    res.render('home');
});

//custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});


// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate.');
});

