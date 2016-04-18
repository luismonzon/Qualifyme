var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');
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


var connection = mysql.createConnection({
  host     : '52.38.100.153',//localhost
  user     : 'myuser', //root
  password : 'seminario',//050393
  database : 'Qualifyme_DB'
});


function solve(){
  //connection.connect();

  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
  });

  // connection.end();
}

function puntuacion_general(profesor, curso, socket){
  //connection.connect();
  var resultado=0;
  var myQuery= "SELECT AVG(TOTAL) AS TOTAL FROM CALIFICACION " +
      "WHERE PID_CURSO IN( SELECT ID_CURSO from CURSO where HASHTAG='"+curso+"')" +
      "AND PID_PROFESOR IN (SELECT ID_PROFESOR from PROFESOR where HASHTAG='"+profesor+"')"
  connection.query(myQuery, function(err, rows, fields) {
    if (err) throw err;
    resultado = rows[0].TOTAL;
    console.log('El total es: ', resultado);
    //emitimos el mensaje en este punto.
    socket.emit('Qresult', resultado);
  });

  //connection.end();
}

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
      console.log(miTotal);

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

        console.log(myQuery3);
        socket.emit('Qvote');
      });
    });
  });



}

function promedio_ponderado(p, c, a,t, m, o ,r, tr, com) {
  return ((p*1)+ (c*1) + (a*1) + (t*1)+ (m*1) + (o*1) + (r*1) + (tr*1) +(com*1))/9;
}

app.io.on('connection', function(socket){
  console.log('a user connected');
  //solve();
  socket.on('req_info', function(data){
    //data es un JSON con profesor y curso
    var objeto = JSON.parse(data);
    puntuacion_general(objeto.profesor, objeto.curso, socket);
  });
  socket.on('vote', function(data){
    //data es un JSON con la puntuacion del usuario y los nombres de profe y curso
    var objeto;
    objeto = JSON.parse(data);
    votar(objeto, socket);
  });
});



module.exports = app;
