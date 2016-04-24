/**
 * Created by feer on 24/04/16.
 */

    function display(valor, postID) {
    $(function () {
        $('#comments-container').comments({
            roundProfilePictures: true,
            textareaRows: 1,
            enableAttachments: false,
            enableUpvoting: false,
            enableEditing: false,
            enableReplying: true,
            forceResponsive: true,
            readOnly: Boolean(valor),
            getComments: function (success, error) {
                setTimeout(function () {
                    success(commentsArray);
                }, 500);
            },
            postComment: function (data, success, error) {
                var id = postID; //Id del comentario del segmento

                console.log(data);
                if (data.parent != null) {
                    id = data.parent;
                    //if(data.p)
                }
                if (id.indexOf('c') > -1) {
                    alert("Error: No se puede inserta el comentario, recarga la pagina e intenta de nuevo");
                    //addC();
                    setTimeout(function () {
                        error(data);
                    }, 500);
                } else {
                    comment(id, data);
                    setTimeout(function () {
                        success(data);
                    }, 500);
                }


            },
            putComment: function (data, success, error) {
                setTimeout(function () {
                    success(data);
                }, 500);
            },
        });
    });
}

