
$(function() {
    var dropzoneOptions = {

        init : function () {
            $('.image-container').html('<span>GLISSER VOTRE IMAGE</span>')
        },

        dragover : function (e) {
            $('.image-container').addClass('image-container-hover').html('');
        },

        uploadprogress : function(file, progress, byteSent) {
            //console.log(file)
        },

        addedfile : function (file) {
            var reader = new FileReader();
            reader.addEventListener('load', function (data) {
                $('.image-container').html('<img style="width:100%; height:200px"src="' + data.srcElementresult+'">');
            });
            reader.readAsDataURL(file);
        }
    };
    $('.image-container').dropzone(dropzoneOptions);
});
