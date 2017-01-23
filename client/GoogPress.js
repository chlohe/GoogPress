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



function gp_loadPosts(startIndex, endIndex, container, postDivClass){

    $.post(
        hostUrl,
        {type : "post",
         start : startIndex,
         end : endIndex,
         asHtml : true
        },
        function(data) {
           
            if (data == "Out of bounds")
            {
                console.warn("The posts you requested do not exist - out of bounds");
                return;
            }

            var parsed = JSON.parse(data); 
            
            parsed.forEach(function (post){
                container.append($('<div class="' + postDivClass + '">' + post + '</div>'))
            });

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
  $(".overlay").toggleClass('slideInUp slideOutDown');
});