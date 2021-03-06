var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport');

var env = process.env.NODE_ENV = process.env.NODE_ENV  || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));
if(env === "prod"){
mongoose.connect('mongodb://localhost/meanapp');
}else{
mongoose.connect('mongodb://admin:password@ds011890.mlab.com:11890/meanapptest');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback (){
    console.log('meanapp db opened')

});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;

Messe.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});



app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
})

app.get('*', function(req, res){
    res.render('index',{
        mongoMessage: mongoMessage

    });

});


var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + ' ....' + ' lol');