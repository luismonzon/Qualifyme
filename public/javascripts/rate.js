/**
 * Created by feer on 14/04/16.
 */
$(function () {

    var rating = 0;

    $(".counter").text(rating);

    $("#rateYo1").on("rateyo.init", function () {
        console.log("rateyo.init");
    });

    $("#rateYo1").rateYo({
        rating: rating,
        readOnly: true,
        numStars: 5,
        precision: 2,
        minValue: 0,
        maxValue: 5,
        starWidth: "64px",
        spacing: "5px",
        multiColor: true,
        onInit: function () {

            console.log("On Init");
        },
        onSet: function () {

            console.log("On Set");
        }
    }).on("rateyo.set", function () {
            console.log("rateyo.set");
        })
        .on("rateyo.change", function () {
            console.log("rateyo.change");
        });

    $(".rateyo").rateYo();

    $(".rateyo-readonly-widg").rateYo({

        rating: rating,
        numStars: 5,
        precision: 2,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        console.log(data.rating);
    });
    init_('#rate_puntualidad');
    init_('#rate_hestablecido');
    init_('#rate_asistencia');
    init_('#rate_trato');
    init_('#rate_metodologia');
    init_('#rate_objetividad');
    init_('#rate_revision');
    init_('#rate_transparencia');
    init_('#rate_comunicacion');
});

function init_(nombre){
    var rating = 0;

    $(".counter").text(rating);

    $(nombre).on("rateyo.init", function () {
        console.log("rateyo.init");
    });

    $(nombre).rateYo({
        rating: rating,
        readOnly: false,
        numStars: 5,
        precision: 2,
        minValue: 0,
        maxValue: 5,
        starWidth: "32px",
        spacing: "5px",
        halfStar: true,
        multiColor: true,
        onInit: function () {

            console.log("On Init");
        },
        onSet: function () {

            console.log("On Set");
        }
    }).on("rateyo.set", function () {
            console.log("rateyo.set");
        })
        .on("rateyo.change", function () {
            console.log("rateyo.change");
        });


    $(".rateyo").rateYo();

    $(".rateyo-readonly-widg").rateYo({

        rating: rating,
        numStars: 5,
        precision: 2,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        console.log(data.rating);
    });
}