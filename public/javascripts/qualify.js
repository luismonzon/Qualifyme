
var htprofesor = local_data.prof; //'ReneOrnelyz';
var htcurso = local_data.curs;//'EDD';
console.log("QUALIFY: "+local_data.id);
var mirating = 0;
var socket = io.connect();
var peticion = {profesor:htprofesor, curso:htcurso};
var mi_voto = {
    profesor: htprofesor,
    curso: htcurso,
    puntualidad: '0',
    c_horario: '0',
    asistencia: '0',
    t_estudiantes: '0',
    metodologia: '0',
    objetividad: '0',
    revision: '0',
    transparencia: '0',
    comunicacion: '0'
};
var puntuacion = 0;
socket.emit('req_info', JSON.stringify(peticion));
socket.on('Qresult', function (data) {
    console.log('el resultado es: ' + data);
    mirating = data;
    $("#rateYo1").rateYo("option", "rating", mirating);
});
socket.on('Qvote', function (data) {
    console.log('Has votado tio!');
    //emitimos la peticion de calificacion general, para poder actualizar los resultados.
    socket.emit('req_info', JSON.stringify(peticion));
});
function vote(){
    socket.emit('vote', JSON.stringify(mi_voto));
}
function get_votes() {
    mi_voto.puntualidad = $("#rate_puntualidad").rateYo("option", "rating");
    mi_voto.c_horario = $("#rate_hestablecido").rateYo("option", "rating");
    mi_voto.asistencia = $("#rate_asistencia").rateYo("option", "rating");
    mi_voto.t_estudiantes = $("#rate_trato").rateYo("option", "rating");
    mi_voto.metodologia = $("#rate_metodologia").rateYo("option", "rating");
    mi_voto.objetividad = $("#rate_objetividad").rateYo("option", "rating");
    mi_voto.revision = $("#rate_revision").rateYo("option", "rating");
    mi_voto.transparencia = $("#rate_transparencia").rateYo("option", "rating");
    mi_voto.comunicacion = $("#rate_comunicacion").rateYo("option", "rating");
    vote();
}


