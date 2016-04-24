/*var commentsArray = [
{  
   "id": 1,
   "parent": null,
   "created": "2015-01-01",
   "modified": "2015-01-01",
   "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
   "fullname": "Simon Powell",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": false,
   "upvote_count": 3,
   "user_has_upvoted": false
},
{  
   "id": 2,
   "parent": null,
   "created": "2015-01-02",
   "modified": "2015-01-02",
   "content": "Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
   "fullname": "Administrator",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/admin-user-icon.png",
   "created_by_admin": true,
   "created_by_current_user": false,
   "upvote_count": 2,
   "user_has_upvoted": false
},
{  
   "id": 3,
   "parent": null,
   "created": "2015-01-03",
   "modified": "2015-01-03",
   "content": "Sed posuere interdum sem.\nQuisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
   "fullname": "You",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": true,
   "upvote_count": 2,
   "user_has_upvoted": true
},
{  
   "id": 4,
   "parent": 3,
   "created": "2015-01-04",
   "modified": "2015-01-04",
   "file_url": "http://www.w3schools.com/html/mov_bbb.mp4",
   "file_mime_type": "video/mp4",
   "fullname": "Todd Brown",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": false,
   "upvote_count": 0,
   "user_has_upvoted": false
},
{  
   "id": 5,
   "parent": 4,
   "created": "2015-01-05",
   "modified": "2015-01-05",
   "content": "Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
   "fullname": "Hank Smith",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": false,
   "upvote_count": 0,
   "user_has_upvoted": false
},
{  
   "id": 6,
   "parent": 1,
   "created": "2015-01-06",
   "modified": "2015-01-06",
   "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
   "fullname": "Jack Hemsworth",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": false,
   "upvote_count": 1,
   "user_has_upvoted": false
},
{  
   "id": 7,
   "parent": 1,
   "created": "2015-01-07",
   "modified": "2015-01-07",
   "content": "Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
   "fullname": "Administrator",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/admin-user-icon.png",
   "created_by_admin": true,
   "created_by_current_user": false,
   "upvote_count": 0,
   "user_has_upvoted": false
},
{  
   "id": 8,
   "parent": 6,
   "created": "2015-01-08",
   "modified": "2015-01-08",
   "content": "Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
   "fullname": "You",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": true,
   "upvote_count": 0,
   "user_has_upvoted": false
},
{  
   "id": 9,
   "parent": 8,
   "created": "2015-01-09",
   "modified": "2015-01-10",
   "content": "Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
   "fullname": "Bryan Connery",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": false,
   "upvote_count": 0,
   "user_has_upvoted": false
},
{  
   "id": 10,
   "parent": 9,
   "created": "2015-01-10",
   "modified": "2015-01-10",
   "content": "Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
   "fullname": "You",
   "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
   "created_by_admin": false,
   "created_by_current_user": true,
   "upvote_count": 0,
   "user_has_upvoted": false
}
]*/

var commentsArray=[];
var callA = 0;
function empty_array(){

    commentsArray.length=0;
}
function buscar(actual){
    var size = commentsArray.length;
    for(var i = 0; i<size; i++){
        if(commentsArray[i].id == actual)
            return commentsArray[i].parent;
    }
    
}
function addC(postID){
    var coment;
    var array_info = new Array();
    function initC(){
        coment = {
            "id": 0,
            "parent": null,
            "created": "",
            "content": "",
            "fullname": "",
            "profile_picture_url":"",
            "created_by_admin": false,
            "created_by_current_user": false,
            "upvote_count": null,
            "user_has_upvoted": false
        }
    }

    FB.api(postID+"/comments",fetchAllComments);

    function fetchAllComments(response){
        if (response && !response.error) {
            //console.log('all comments');
            //console.log(response);


            var cantidad = response.data.length;
            for (var i = 0; i < cantidad; i++) {
                initC();
                callA = callA + 1;
                coment.content = response.data[i].message;
                coment.created = response.data[i].created_time;
                coment.id = response.data[i].id;
                //si no tenemos la URL, la obtenemos con graph api
                if(array_info[coment.id]!==undefined){//ya lo tenemos en el arreglo
                    coment.profile_picture_url=array_info[coment.id].profile;
                    coment.fullname = array_info[coment.id].fullname;
                }else {
                    pp(response.data[i].from.id, coment); //no lo tenemos y lo debemos buscar
                }
                commentsArray.push(coment);
                //buscamos los comentarios de este comentario
                c_of_c(coment.id);

            }

            if(response.data.length!=0){
                if(response.paging.next!==undefined) {
                    var arr = response.paging.next.split("v2.5");
                    //console.log(arr[0] + " : " + arr[1]);
                    FB.api(arr[1], 'GET', fetchAllComments);
                }
            }

        }

    }



   function c_of_c(parentID){
       FB.api(parentID+"/comments",fetchC);

       function fetchC(response){
           if (response && !response.error) {
               //console.log('c of comments');
               //console.log(response);

               var cantidad = response.data.length;
               for (var i = 0; i < cantidad; i++) {
                   initC();
                   callA = callA + 1;
                   coment.parent = parentID;
                   coment.content = response.data[i].message;
                   coment.created = response.data[i].created_time;
                   coment.id = response.data[i].id;
                   //pp(response.data[i].from.id, coment);
                   //si no tenemos la URL, la obtenemos con graph api
                   if(array_info[coment.id]!==undefined){//ya lo tenemos en el arreglo
                       coment.profile_picture_url=array_info[coment.id].profile;
                       coment.fullname = array_info[coment.id].fullname;
                   }else {
                       pp(response.data[i].from.id, coment); //no lo tenemos y lo debemos buscar
                   }
                   //console.log(callA);
                   commentsArray.push(coment);
               }

               if(response.data.length!=0){
                   if(response.paging.next!==undefined) {
                       var arr = response.paging.next.split("v2.5");
                       //console.log(arr[0] + " : " + arr[1]);
                       FB.api(arr[1], 'GET', fetchC);
                   }
               }

           }
       }
   }

    function pp(userID, comm){
        FB.api(
            "/"+userID+"/picture",
            function (response) {
                if (response && !response.error) {
                    comm.profile_picture_url = response.data.url;
                    //console.log(response.data.url);
                    //commentsArray.push(coment);
                    //buscamos los comentarios de este comentario
                    //c_of_c(coment.id);
                    getName(userID, comm);
                }
            }
        );
    }

    function getName(id, comm) {

        FB.api("/"+id , function(response){

            if(response && !response.error){
                comm.fullname = response.name;
                //volvemos a renderizar la tabla de comentarios
                /*$('#comments-container').comments({
                    refresh: function() {
                        $('#comments-container').addClass('rendered');
                    }
                });*/
                callA = callA - 1;//reducimos cuando el callback ha sido ejecutado
                //insertamos la data a la matriz
                array_info[id]={
                    fullname:comm.fullname,
                    profile: comm.profile_picture_url
                };
                if(callA==0){ // cuando todos los callbacks han sido ejecutados, podemos renderizar el arbol de comentarios.
                    console.log("RENDERIZANDO");
                    console.log(commentsArray);
                    $('#comments-container').comments({
                        refresh: function() {
                            $('#comments-container').addClass('rendered');
                            var comm_info={
                                profesor: htprofesor,
                                curso: htcurso,
                                comments: commentsArray
                            }
                            socket.emit('store-comm', comm_info);
                        }
                    });
                }
            }
        });
    }

}


