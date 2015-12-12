
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
                    .html('<img src="' + data.srcElement.result+'">');

                $('#mag-thumb')
                    .html('<img src="' + data.srcElement.result+'">');
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
        },

        getImages : function () {
            return dropzoneOptions.images;
        }
    };
    $('.image-container')
        .dropzone(dropzoneOptions);
});