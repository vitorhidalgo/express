// PARTE 1
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/treinaweb');

// PARTE 2
var db = mongoose.connection;
db.on
(
    'error', 
    function()
    {
        console.log('erro de conexão');
    }
);

// PARTE 3
var cursoSchema = mongoose.Schema
(
    {
        nome: {
            type: String,
            required : true,
            index : {
                unique : true
            }
        },
        categoria : {
            type: String
        }
    }
);

// PARTE 4
var Curso = mongoose.model('Curso', cursoSchema);

var novoCurso = new Curso
(
    {
        nome : "AngularJS",
        categoria : "Front End"
    }
);

// PARTE 5
novoCurso.save
(
    function(err, res)
    {
        console.log(err, res);
    }
);

// PARTE 6
Curso.find
(
    {}, 
    [],
    {
        sort: 
        {
            nome: 1
        }
    }, 
    function(err, res)
    {
        console.log(res);
    }
);