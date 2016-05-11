var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sentiment = require('sentiment-spanish');

var routes = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');
var qm_info = require('./routes/qm_info')
var menu = require('./routes/menu');
var qualify = require('./routes/qualify');
var request_token = require('./routes/request_token');
var tcallback = require('./routes/tcallback');
var profesor = require('./routes/profesor');
var curso = require('./routes/curso');
var asignacion = require('./routes/asignacion');

var http= require('http');
var mysql = require('mysql');
var app = express();
app.io=require('socket.io')();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/tweets', tweets);
app.use('/menu', menu);
app.use('/qualify', qualify);
app.use('/qm_info', qm_info);
app.use('/request_token', request_token);
app.use('/tcallback', tcallback);
app.use('/profesor',profesor);
app.use('/curso',curso);
app.use('/asignacion',asignacion);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//------------------------------------------------- MySQL methods for FB and Rating -----------------------------------------//
var connection = mysql.createConnection({
  host     : '52.36.161.208',//localhost
  user     : 'myuser', //root
  password : 'seminario',//050393
  database : 'Qualifyme_DB'
});
/*
Metodo para obtener la puntuacion en ESTRELLAS sobre
algun catedratico junto con el curso.
 */
function puntuacion_general(profesor, curso, socket){
  //connection.connect();
  var resultado=0;
  var myQuery= "SELECT AVG(TOTAL) AS TOTAL FROM CALIFICACION " +
      "WHERE PID_CURSO IN( SELECT ID_CURSO from CURSO where HASHTAG='"+curso+"')" +
      "AND PID_PROFESOR IN (SELECT ID_PROFESOR from PROFESOR where HASHTAG='"+profesor+"')"
  connection.query(myQuery, function(err, rows, fields) {
    if (err) throw err;
    resultado = rows[0].TOTAL;
    //emitimos el mensaje en este punto.
    socket.emit('Qresult', resultado);
  });

  //connection.end();
}

/*
Metodo para registrar el voto generado de forma anonima

 */

function votar(data, socket){

  var resultado=0;
  var myQuery= "SELECT ID_PROFESOR as ID FROM PROFESOR where HASHTAG='"+data.profesor+"'";
  connection.query(myQuery, function(err, rows, fields) {
    if (err) throw err;
    resultado = rows[0].ID;
    console.log('El ID_PROFESOR es: ', resultado);
    var myQuery2="SELECT ID_CURSO as ID from CURSO where HASHTAG='"+data.curso+"'";
    connection.query(myQuery2,function(err, rows, fields){
      if (err) throw err;
      var resultado2 = rows[0].ID;
      console.log('El ID_CURSO es: ', resultado);
      var miTotal = promedio_ponderado(
          data.puntualidad,
          data.c_horario,
          data.asistencia,
          data.t_estudiantes,
          data.metodologia,
          data.objetividad,
          data.revision,
          data.transparencia,
          data.comunicacion
      );

      var myQuery3="INSERT INTO CALIFICACION " +
          "(`PID_CURSO`,`PID_PROFESOR`,`PUNTUALIDAD`,`C_HORARIO`,`ASISTENCIA`,`T_ESTUDIANTES`,`METODOLOGIA`,`OBJETIVIDAD`,`REVISION`,`TRANSPARENCIA`,`COMUNICACION`,`TOTAL`)" +
          "VALUES (" +
          resultado2  + "," +
          resultado   + "," +
          data.puntualidad + "," +
          data.c_horario + "," +
          data.asistencia + "," +
          data.t_estudiantes + "," +
          data.metodologia + "," +
          data.objetividad + "," +
          data.revision + "," +
          data.transparencia + "," +
          data.comunicacion + "," +
          miTotal +
          ");"
      connection.query(myQuery3, function(err, rows, fields){
        if(err) throw err;
        socket.emit('Qvote');
      });
    });
  });



}

/*
Calculo del punteo general de una calificacion.
Las metricas son evaluadas segun su peso.
 */

function promedio_ponderado(p, c, a,t, m, o ,r, tr, com) {
  return ((p*1)+ (c*1) + (a*1) + (t*1)+ (m*1) + (o*1) + (r*1) + (tr*1) +(com*1))/9;
}

//-----------------------------------------------Metodos para el almacenaje de post y comentarios de FB --------------------------------------------//
function FB_init_carga(data, socket){
  //primero debemos obtener el ID del post del cual estos comentarios son hijos
  //verificamos que tenga un post de fb asociado

    var resultado=-1;
    var myQuery= "SELECT count(ID_POST) as TOTAL from POST " +
        "where ID_PROFESOR IN(" +
        "SELECT ID_PROFESOR from PROFESOR where HASHTAG='"+data.profesor+"'" +
        ") " +
        "AND ID_CURSO IN(" +
        "select ID_CURSO from CURSO where HASHTAG='"+data.curso+"'" +
        ")"
    //console.log(myQuery);
    connection.query(myQuery, function(err, rows, fields) {
        if (err) throw err;
        resultado = rows[0].TOTAL;
        if(resultado > 0){
            get_PostID(data,socket);
        }
    });


}

/*
Obtiene el ID del post que corresponde a la pareja catedratico-curso
 */
function get_PostID(data, socket){
    var resultado=-1;
    var myQuery= "SELECT ID_POST, ID_ORIGINAL from POST " +
        "where ID_PROFESOR IN(" +
        "SELECT ID_PROFESOR from PROFESOR where HASHTAG='"+data.profesor+"'" +
        ") " +
        "AND ID_CURSO IN(" +
        "select ID_CURSO from CURSO where HASHTAG='"+data.curso+"'" +
        ")"
    //console.log(myQuery);
    connection.query(myQuery, function(err, rows, fields) {
        if (err) throw err;
        resultado = rows[0].ID_POST;
        insert_post_comments(data,socket, resultado);
    });
}

/*
    Iteracion sobre los comentarios de un post, para poder
    hacer el posterior analisis con la herramienta sentiment,
 */

function insert_post_comments(data,socket, resultado){
    for(comment in data.comments){
        var result = sentiment(data.comments[comment].content, {
            'no': -1
        });
        add_comment(data.comments[comment],resultado, result.score);
    }
}

/*
   Con este metodo insertamos los comentarios nuevos a la base de datos.
   La insercion es asincronica, por lo que no afectara al rendimiento de la pagina mientras el usuario navega.
   Se hace un conteo antes de insertar, para poder saber si el elemento ya se encuentra almacenado en la base de datos.
   Solamente se almacenan los elementos que no se tienen en la base de datos. 

 */
function add_comment(comment, padre, score){
    var total = "select COUNT(ID_ORIGINAL) AS TOTAL from COMENTARIO WHERE ID_ORIGINAL="+comment.id;
    connection.query(total, function(err, rows, fields) {
        if (err) throw err;
        var resultado2 = rows[0].TOTAL;
        if(resultado2==0) {
            //console.log('INSERTA');
            var myQuery = "INSERT INTO COMENTARIO(`ID_ORIGINAL`,`MENSAJE`,`FECHA`,`ID_POST`,`puntuacion`) " +
                "VALUES(" + comment.id + ",'" + comment.content + "','" + comment.created + "'," + padre + "," + score + ")";
            //console.log(myQuery);
            connection.query(myQuery, function (err, rows, fields) {
                if (err) {
                }
                ;
            });
        }
    });

}

/*
Calculo del sentimiento general, obteniendo un promedio de los coments en fb
como los twits de Twitter.
Se maneja un promedio para cada uno, posteriormente dicho promedio se promedia entre si, para
obtener un promedio general entre ambas plataformas.
 */

function AVG(data, socket){
    var myQuery= "call avgFB('"+data.prof+"','"+data.curs+"')";
    connection.query(myQuery, function(err, rows) {
        if (err) throw err;
        var myScore = rows[0][0].PUNTUACION;
        myScore = (Number(myScore) + Number(data.score))/2;
        console.log("MOOD BAR EMITIDO");
        socket.emit('SMoodBar', myScore);
    });
}


//------------------------------- Manejo de sockets -----------------------------------------------------------------------//
app.io.on('connection', function(socket){
  socket.on('req_info', function(data){
    var objeto = JSON.parse(data);
    console.log('req_info');  
    puntuacion_general(objeto.profesor, objeto.curso, socket);
  });
  socket.on('vote', function(data){
    //data es un JSON con la puntuacion del usuario y los nombres de profe y curso
    var objeto;
    objeto = JSON.parse(data);
    votar(objeto, socket);
  });
  socket.on('store-comm',function (data) {
     FB_init_carga(data,socket);

  });
    socket.on('MoodBar',function (data) {
        AVG(data,socket);
    });
});



module.exports = app;
