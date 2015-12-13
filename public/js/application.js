
$(function() {
    var dropzoneOptions = {

        autoIncrement : 0,

        images : [],

        init : function () {
            $('.image-container').html('<span>GLISSER VOTRE IMAGE</span>');
        },

        dragover : function (e) {
            $('.image-container')
                .addClass('image-container-hover');
        },

        drop : function(e) {
            $('.image-container')
                .removeClass('image-container-hover');
        },

        addedfile : function (file) {
            var reader = new FileReader();
            reader.addEventListener('load', function (data) {
                dropzoneOptions.insertImage(file);
                $('.image-container')
                    .html('<img src="' + data.srcElement.result+'" id="zoom_01" data-zoom_image="'+data.srcElement.result+'">');
                $('#zoom_01').elevateZoom({
                    zoomType: "window",
                    cursor: "crosshair",
                    zoomWindowFadeIn: 100,
                    zoomWindowFadeOut: 150,
                    zoomWindowPosition: "mag-thumb",
                    zoomWindowHeight: 200,
                    zoomWindowWidth:200,
                    borderSize: 0,
                    easing:true
                });
                setTimeout(function(){
                    var capture = {};
                    var target = $(".zoomWindow");
                    html2canvas(target, {
                        onrendered: function(canvas) {
                            capture.img = canvas.toDataURL( "image/png" );
                            capture.data = { 'image' : capture.img };
                            $.ajax({
                                url: "/src/ajax.php",
                                data: capture.data,
                                type: 'post',
                                success: function( result ) {
                                    console.log( result );
                                    alert("success");
                                },
                                error:function(){
                                    alert("error");
                                }
                            });
                        }
                    });
                },2000);

                /*$('#mag-thumb')
                    .html('<img src="' + data.srcElement.result+'">');*/
            });
            reader.readAsDataURL(file);
        },

        insertImage : function (file) {
            var image = {
                id : dropzoneOptions.autoIncrement + 1,
                file : file
            };
            dropzoneOptions.images.push(image);
            dropzoneOptions.autoIncrement++;
            return image;
        },

        getImages : function () {
            return dropzoneOptions.images;
        }
    };
    $('.image-container')
        .dropzone(dropzoneOptions);
});