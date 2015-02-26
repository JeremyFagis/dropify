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
                wrap: '<div class="dropify-wrapper form-control"></div>',
                message: '<div class="dropify-message"><span class="file-icon" /> <p>Glissez-déposez un fichier ici</p></div>',
                preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">Glissez-déposez ou cliquez pour remplacer</p></div></div></div>',
                filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>'
            }
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.imgFileFormats = ['png', 'jpg', 'jpeg', 'gif', 'bpm'],
        this.filename = null,
        this.filenameElt = null,
        this.preview = null,
        this.isIE = !!window.ActiveXObject;

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            if (!this.isIE) {
                var _this = this,
                    element = $(this.element),
                    defaultText = element.data('default-text') || this.settings.defaultText;

                _this.createElements();
                _this.setSize();

                element.on('change', function(){
                    _this.filename = _this.getFilename($(this).val());
                    _this.filename = (_this.filename != '') ? _this.filename : defaultText;
                    _this.setFilename(_this.filename);
                    _this.readUrl(this);
                });
            }
        },
        createElements: function() {
            var element = $(this.element),
                defaultText = element.data('default-text') || this.settings.defaultText,
                value = element.val() || defaultText,
                defaultImage = element.data('default-image') || '';

            element.wrap($(this.settings.tpl.wrap));
            $(this.settings.tpl.message).insertBefore(element);

            this.preview = $(this.settings.tpl.preview);
            this.preview.insertAfter(element);

            if (defaultImage != '') {
                this.filename = defaultImage;
                this.setPreview(defaultImage)
            }

            this.filenameElt = $(this.settings.tpl.filename);
            this.filenameElt.prependTo(this.preview.find('.dropify-infos-inner'));

            if (defaultImage != '') {
                this.setFilename(this.getFilename(defaultImage));
                this.preview.show();
            }
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
        isImage: function() {
            var ext = this.filename.split('.').pop().toLowerCase();
            if ($.inArray(ext, this.imgFileFormats) != "-1") {
                return true;
            }

            return false;
        },
        readUrl: function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader(),
                    _this = this;

                reader.onload = function(e) {
                    _this.setPreview(e.target.result, input.files[0].name);
                }

                reader.readAsDataURL(input.files[0]);
            } else {
                this.resetPreview();
            }
        },
        setPreview: function(src) {
            var render = this.preview.children('.dropify-render');
            this.resetPreview();

            if (this.isImage() === true) {
                $('<img />').attr('src', src).appendTo(render);
            } else {
                $('<i />').attr('class', 'file-icon').appendTo(this.preview.children('.dropify-render'));
            }

            this.preview.fadeIn();
        },
        resetPreview: function() {
            var render = this.preview.children('.dropify-render');
            render.find('i').remove();
            render.find('img').remove();
        },
        setSize: function() {
            if ($(this.element).attr('data-height')) {
                $(this.element).parent().height($(this.element).attr('data-height'));
            }
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
