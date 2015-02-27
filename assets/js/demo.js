var $       = require('jquery'),
    dropify = require('./dropify');

$(document).ready(function(){
    $('.dropify').dropify();
});



// wrap: '<div class="dropify-wrapper"></div>',
// message: '<div class="dropify-message"><span class="file-icon" /> <p>Glissez-déposez un fichier ici</p></div>',
// preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">Glissez-déposez ou cliquez pour remplacer</p></div></div></div>',
// filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>'
