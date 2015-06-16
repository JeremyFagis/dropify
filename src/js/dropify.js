var pluginName = "dropify";

function Dropify (element, options) {
    defaults = {
        defaultFile: '',
        maxFileSize: 0,
        messages: {
            defaultMessage: 'Drag and drop a file here or click',
            replaceMessage: 'Drag and drop or click to replace',
            removeMessage:  'Remove',
            errorMessage:   'Sorry, this file is too large'
        },
        tpl: {
            wrap:        '<div class="dropify-wrapper"></div>',
            message:     '<div class="dropify-message"><span class="file-icon" /> <p>defaultMessage</p></div>',
            preview:     '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">replaceMessage</p></div></div></div>',
            filename:    '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
            clearButton: '<button type="button" class="dropify-clear">removeMessage</button>',
            error:       '<p class="dropify-error">errorMessage</p>'
        }
    };

    this.element        = element;
    this.settings       = $.extend(true, defaults, options, $(this.element).data());
    this._name          = pluginName;
    this.imgFileFormats = ['png', 'jpg', 'jpeg', 'gif', 'bpm'],
    this.file           = null,
    this.filename       = null,
    this.filenameElt    = null,
    this.wrap           = null,
    this.preview        = null,
    this.isHTML5        = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;
    this.isDisabled     = false,

    this.translate();
    this.init();
}

Dropify.prototype = {
    init: function () {
        if (this.isHTML5) {
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
            defaultFile = this.settings.defaultFile || '';

        element.wrap($(this.settings.tpl.wrap));
        this.wrap = element.parent();

        if (this.isTouchDevice() === true) {
            this.wrap.addClass('touch-fallback');
        }

        if (element.attr('disabled')) {
            this.isDisabled = true;
            this.wrap.addClass('disabled');
        }

        var messageWrapper = $(this.settings.tpl.message).insertBefore(element);
        this.errorElt = $(this.settings.tpl.error);
        this.errorElt.appendTo(messageWrapper);

        this.preview = $(this.settings.tpl.preview);
        this.preview.insertAfter(element);

        if (this.isDisabled === false) {
            this.clearButton = $(this.settings.tpl.clearButton);
            this.clearButton.insertAfter(this.element);

            var _this = this;
            this.clearButton.on('click', function(e){
                _this.clearElement();
            });
        }

        this.filenameElt = $(this.settings.tpl.filename);
        this.filenameElt.prependTo(this.preview.find('.dropify-infos-inner'));

        if (defaultFile.trim() != '') {
            this.filename = defaultFile;
            this.setPreview(defaultFile);
            this.setFilename(this.getFilename(defaultFile));
        }
    },

    readUrl: function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader(),
                _this = this;

            this.file = input.files[0];

            if (this.checkFileSize()) {
                reader.onload = function(e) {
                    _this.setPreview(e.target.result, _this.file.name);
                }

                reader.readAsDataURL(_this.file);
            } else {
                this.wrap.addClass('has-error');
                this.resetPreview();
                this.clearElement();
            }
        }
    },

    setPreview: function(src) {
        this.wrap.removeClass('has-error').addClass('has-preview');
        var render = this.preview.children('.dropify-render');

        if (this.isImage() === true) {
            $('<img />').attr('src', src).appendTo(render);
        } else {
            $('<i />').attr('class', 'dropify-font-file').appendTo(render);
            $('<span class="dropify-extension" />').html(this.getFileType()).appendTo(render);
        }

        this.preview.fadeIn();
    },

    resetPreview: function() {
        this.wrap.removeClass('has-preview');
        var render = this.preview.children('.dropify-render');
        render.find('.dropify-extension').remove();
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
        this.file = null;
        $(this.element).replaceWith($(this.element).val('').clone(true));
        this.resetPreview();
    },

    setSize: function() {
        if (this.settings.height) {
            this.wrap.height(this.settings.height);
        }
    },

    isTouchDevice: function() {
        return (('ontouchstart' in window)
             || (navigator.MaxTouchPoints > 0)
             || (navigator.msMaxTouchPoints > 0));
    },

    getFileType: function() {
        return this.filename.split('.').pop().toLowerCase();
    },

    isImage: function() {
        var ext = this.getFileType();
        if ($.inArray(ext, this.imgFileFormats) != "-1") {
            return true;
        }

        return false;
    },

    translate: function() {
        for (var name in this.settings.tpl) {
            for (var key in this.settings.messages) {
                this.settings.tpl[name] = this.settings.tpl[name].replace(key, this.settings.messages[key]);
            }
        }
    },

    checkFileSize: function() {
        if (this.maxFileSizeToByte() === 0 || this.file.size <= this.maxFileSizeToByte()) {
            return true;
        }

        return false;
    },

    maxFileSizeToByte: function() {
        var value = 0;

        if (this.settings.maxFileSize !== 0) {
            var unit  = this.settings.maxFileSize.slice(-1).toUpperCase(),
                kb    = 1024,
                mb    = kb * 1024,
                gb    = mb * 1024;

            if (unit === 'K') {
                value = parseFloat(this.settings.maxFileSize) * kb;
            } else if (unit === 'M') {
                value = parseFloat(this.settings.maxFileSize) * mb;
            } else if (unit === 'G') {
                value = parseFloat(this.settings.maxFileSize) * gb;
            }
        }

        return value;
    }

};

$.fn[ pluginName ] = function ( options ) {
    this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data( this, "plugin_" + pluginName, new Dropify( this, options ) );
        }
    });

    return this;
};

