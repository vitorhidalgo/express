// PARTE 1
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// PARTE 2
var users = [
    {
        id : 1,
        name : 'maria',
        password : 'maria123'
    },
    {
        id : 2,
        name : 'joao',
        password : 'joao123'
    }
];

// PARTE 3
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'minhaChaveSecreta'
};

// PARTE 4
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    var user = users.find(user => user.id === jwt_payload.id);
    if(user)
    {
        next(null, user);
    }
    else
    {
        next(null, false);
    }
});

passport.use(strategy);

// PARTE 5
var app = express();
app.use(passport.initialize());
app.use(bodyParser.json());

// PARTE 6
app.post('/', function(req, res){
    try{
        var name = req.body.name,
        password = req.body.password,
        user = users.find(user => user.name === name);

        if(user && (user.password === password)){
            var payload = {id: user.id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: 'ok', token: token});
        }
        else
        {
            res.status(401).json({message: 'erro de autenticacao', 'user':undefined});
        }
    }
    catch(exception){
        res.status(401).json({error: exception});
    }
});

// PARTE 7
app.get('/', passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({message : "Sucesso! Você acessou uma rota privada!"});
});

// PARTE 8
app.listen(3000, function(){
    console.log('Express running');
})