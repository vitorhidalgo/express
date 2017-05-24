var express = require('express');
var namespace = require('express-namespace');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var app = express();

app.set('port', 3001);
app.use(cookieParser());
app.use(expressSession({secret: 'meuTokenSecreto'}));

function myMiddleware(req, res, next)
{
    req.body.message = 'Intercepted by middleware';
    next();
}

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(myMiddleware);

app.get(
    '/:msg', 
    function(req, res)
    {
        req.session.minhaSession = req.params.msg
        res.send('Hello World');
    }
);

app.get
(
    '/', 
    function(req, res)
    {
        // res.cookie('meuCookie', 123, {maxAge: 60000});
        // console.log(req.cookies.meuCookie);
        console.log(req.session.minhaSession);
        res.send('Hello World');
    }
);

app.post
(
    '/teste', 
    function(req, res)
    {
        var myJson = req.body;
        res.format
        (
            {
                text : function()
                {
                    res.send('Just Text');
                },
                json : function()
                {
                    myJson.reqType = 'JSON';
                    res.json(myJson);
                }
            }
        )
    }
);

app.namespace
(
    '/alunos', 
    function()
    {
        app.get('/', function(req, res){
            var alunos = [
                { nome : 'Maria' },
                { nome : 'João' },
                { nome : 'Bárbara' },
                { nome : 'Pedro' },
                { nome : 'Vitor' },
                { nome : 'Tatiane' },
            ];
            res.render( 'alunos', { titulo: 'TreinaWeb', alunos } );
        });
        app.get('/:id', function(req, res){});
        app.get('/create', function(req, res){});
        app.get('/update/:id', function(req, res){});
    }
);


app.listen(app.get('port'));
console.log(`Server on port ${app.get('port')}`);