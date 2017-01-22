var hostUrl = "";

function loadPost (name, container){

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
function Init(url){

    hostUrl = url;
    
    //Find everything that want's to be googpress-ed
    var containers = $('div').filter(function() {
        return $(this).data('googpress') != undefined;
    });

    //googpress them
    containers.each(function () {
        loadPost ($(this).data("googpress"), $(this));
    });
    
}

$(document).ajaxStop(function() {
  $(".overlay").fadeOut();
});