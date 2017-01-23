var hostUrl = "";

function gp_loadPost (name, container){

    $.post(
        hostUrl,
        {type : "page",
         id : name,
         asHtml : true
        },
        function(data) {
            //set the container html
            container.html(data);
        });
}

//Initialise Everything
function gp_Init(url){

    $(".overlay").fadeIn();
    
    hostUrl = url;
    
    //Find everything that want's to be googpress-ed
    var containers = $('div').filter(function() {
        return $(this).data('googpress') != undefined;
    });

    //googpress them
    containers.each(function () {
        gp_loadPost ($(this).data("googpress"), $(this));
    });
    
}

$(document).ajaxStop(function() {
  $(".overlay").removeClass('slideInUp').addClass('slideOutDown');
});