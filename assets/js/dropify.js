(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluginName = "dropify",
        defaults = {
            tpl: {
                wrap: '<div class="dropify-wrapper"></div>',
                message: '<div class="dropify-message"><span class="file-icon" /> <p>Glissez-déposez un fichier ici</p></div>',
                preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">Glissez-déposez ou cliquez pour remplacer</p></div></div></div>',
                filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
                clearButton: '<button type="button" class="dropify-clear">Supprimer</button>'
            }
        };

    function Plugin (element, options) {
        this.element        = element;
        this.settings       = $.extend({}, defaults, options, $(this.element).data());
        this._defaults      = defaults;
        this._name          = pluginName;
        this.imgFileFormats = ['png', 'jpg', 'jpeg', 'gif', 'bpm'],
        this.filename       = null,
        this.filenameElt    = null,
        this.wrap           = null,
        this.preview        = null,
        this.isIE           = !!window.ActiveXObject;

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            if (!this.isIE) {
                var _this = this;

                _this.createElements();
                _this.setSize();

                $(this.element).on('change', function(){
                    _this.resetPreview();
                    _this.filename = _this.getFilename($(this).val());
                    _this.setFilename(_this.filename);
                    _this.readUrl(this);
                });
            }
        },

        createElements: function() {
            var element = $(this.element),
                value = element.val() || '',
                defaultImage = this.settings.defaultImage || '';

            element.wrap($(this.settings.tpl.wrap));
            this.wrap = element.parent();
            $(this.settings.tpl.message).insertBefore(element);

            this.preview = $(this.settings.tpl.preview);
            this.preview.insertAfter(element);


            this.clearButton = $(this.settings.tpl.clearButton);
            this.clearButton.insertAfter(this.element);

            var _this = this;
            this.clearButton.on('click', function(e){
                _this.clearElement();
            });


            this.filenameElt = $(this.settings.tpl.filename);
            this.filenameElt.prependTo(this.preview.find('.dropify-infos-inner'));

            if (defaultImage != '') {
                this.filename = defaultImage;
                this.setPreview(defaultImage);
                this.setFilename(this.getFilename(defaultImage));
            }
        },

        readUrl: function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader(),
                    _this = this;

                reader.onload = function(e) {
                    _this.setPreview(e.target.result, input.files[0].name);
                }

                reader.readAsDataURL(input.files[0]);
            }
        },

        setPreview: function(src) {
            this.wrap.addClass('has-preview');
            var render = this.preview.children('.dropify-render');

            if (this.isImage() === true) {
                $('<img />').attr('src', src).appendTo(render);
            } else {
                $('<i />').attr('class', 'file-icon').appendTo(render);
            }

            this.preview.fadeIn();
        },

        resetPreview: function() {
            this.wrap.removeClass('has-preview');
            var render = this.preview.children('.dropify-render');
            render.find('i').remove();
            render.find('img').remove();
            this.preview.hide();
        },

        getFilename: function(src) {
            var filename = src.split('\\').pop();
            if (filename == src) {
                filename = src.split('/').pop();
            }

            return src != "" ? filename : '';
        },

        setFilename: function(filename) {
            this.filenameElt.children('.dropify-filename-inner').html(filename);
        },

        clearElement: function() {
            $(this.element).replaceWith($(this.element).val('').clone(true));
            this.resetPreview();
        },

        setSize: function() {
            if ($(this.element).attr('data-height')) {
                $(this.element).parent().height($(this.element).attr('data-height'));
            }
        },

        isImage: function() {
            var ext = this.filename.split('.').pop().toLowerCase();
            if ($.inArray(ext, this.imgFileFormats) != "-1") {
                return true;
            }

            return false;
        }

    };

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        return this;
    };

}));
