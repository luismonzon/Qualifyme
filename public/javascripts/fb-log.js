/**
 * Created by feer on 12/04/16.
 */
function obtener_posts(){
    var total = 0;
    //metodo para leer posts
    var publicaciones = {};
    FB.api("/1165440753479632/feed", 'GET', fetchNextPage);
    var contador=0;
    function fetchNextPage(response) {
        if (response && !response.error) {
            //console.log(response);
            //total = total + response.data.length;
            //console.log(total);
            console.log(response);
            var cantidad = response.data.length;
            //console.log(cantidad);
            for (var i = 0; i < cantidad; i++) {
                if (response.data[i].hasOwnProperty('message')) {
                    publicaciones[response.data[i].id] = response.data[i];
                }
            }

            if (response.data.length != 0) {
                var arr = response.paging.next.split("v2.5");
                //console.log(arr[0] + " : " + arr[1]);
                if(contador<2) {
                    contador = contador + 1 ;
                    FB.api(arr[1], 'GET', fetchNextPage);

                }
                socket.emit('fb-post', JSON.stringify(publicaciones));
                //console.log(publicaciones);
            }

        } else {
            console.log("error");
        }
    }
}

function comment(id,data){
    var answer = FB.api(
        "/" + id + "/comments",
        "POST",
        {
            "message": data.content
        },
        function (response) {
            if (response && !response.error) {
                console.log('func '+id);
                //volvemos a cargar
                //empty_array();
                //addC();
            }else{
                console.log('NO func '+id);
                if(id.indexOf('c')>-1){
                    console.log("vuelve a cargar la pagina");
                }else {
                    var correccion = buscar(id);
                    if(correccion!=undefined) {
                        console.log('CORRECCION: ' + correccion);
                        comment(correccion, data);
                    }else{
                        var ok = confirm("Lo sentimos, debes unirte al siguiente grupo para poder comentar. Selecciona OK, para ser redirigido al grupo. ");
                        if(ok){
                            window.location="https://www.facebook.com/groups/1165440753479632/";
                        }else{
                            location.reload();
                        }
                    }
                }
            }
        }
    );
}

/*
 var total = 0;
 //metodo para leer posts
 var publicaciones = {};
 FB.api("/1165440753479632/feed", 'GET', fetchNextPage);
 function fetchNextPage(response) {
 if (response && !response.error) {
 //console.log(response);
 //total = total + response.data.length;
 //console.log(total);
 var cantidad = response.data.length;
 console.log(cantidad);
 for (var i = 0; i < cantidad; i++) {
 if (response.data[i].hasOwnProperty('message')) {
 publicaciones[response.data[i].id] = response.data[i];
 }
 }

 if (response.data.length != 0) {
 var arr = response.paging.next.split("v2.5");
 //console.log(arr[0] + " : " + arr[1]);
 FB.api(arr[1], 'GET', fetchNextPage);
 socket.emit('fb-post', JSON.stringify(publicaciones));
 console.log(publicaciones);
 }

 } else {
 console.log("error");
 }
 }*/

/*var comentarios = {};
 FB.api('/1165440753479632_1165506266806414/comments','GET',fetchNextComment);
 function fetchNextComment(response){
 if(response && !response.error){
 var cantidad = response.data.length;
 console.log(cantidad);
 for(var i = 0; i<cantidad; i++){
 comentarios[response.data[i].id] = response.data[i];
 }

 }
 if (response.data.length != 0) {
 var arr = response.paging.next.split("v2.5");
 //console.log(arr[0] + " : " + arr[1]);
 FB.api(arr[1],'GET',fetchNextComment);
 socket.emit('fb-comm',JSON.stringify(comentarios));
 console.log(publicaciones);
 }
 }*/
//metodo para insertar POST(preguntas)
/*
 FB.api("/1165440753479632/feed", "POST", {
 "message": "Nuevo mensaje de prueba"
 }, function (response) {
 if (response && !response.error) {
 document.getElementById('status').innerHTML =
 'Post insertado al grupo';
 }
 });*/

//metodo para insertar comments (respuestas)
/* FB.api(
 "/1165440753479632_1166091150081259/comments",
 "POST",
 {
 "message": "This is a test comment"
 },
 function (response) {
 if (response && !response.error) {
 document.getElementById('status').innerHTML =
 'Comment insertado al post';
 }
 }
 );*/