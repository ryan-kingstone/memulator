$(function() {
    jQuery(document).ready(function ($) { 
        console.log('Upload progress script initialized');
        $('#fileUpload').change(function() {
            $('#fileUpload').submit();
        });

        $( "#fileUpload" ).submit(function( event ) {

            console.log('triggered submit');
            $('.upload-progress').show();
            $('.upload-progress-label').show();
            var formData = new FormData();
            var file = document.getElementById('uploaded').files[0];

            $('#fileSpan').attr('data-filename', file.name);
            
            formData.append('uploaded', file);
            
            var xhr = new XMLHttpRequest();
            
            xhr.open('post', '/', true);
            
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentage = (e.loaded / e.total) * 100;
                    $('.upload-progress').text(Math.round(percentage) + '%')
                    console.log('Updating progress: ' + percentage + '%')
                }
            };
            
            xhr.onerror = function(e) {
                console.log(e);
            };
            
            xhr.onload = function() {
            };
            
            xhr.send(formData);

        });
    });
});