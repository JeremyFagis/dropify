![Dropify](src/images/cover.jpg)

Dropify
=========

Override your input files with style.

Demo here : [http://jeremyfagis.github.io/dropify](http://jeremyfagis.github.io/dropify/)


## Dependency

[jQuery](https://github.com/jquery/jquery) is required to do the magic.


## Installation

Clone the project in your workspace

	$ git clone git@github.com:JeremyFagis/dropify.git
	$ cd dropify

Download packages

	$ npm install

Compile assets

	$ gulp build


## Compilation

	# All compilations and watch. You will have minified and not minified files.
	$ gulp

	# Dev compilation (watch & no-minification)
	$ gulp --dev

    # Prod compilation, you will have minified and not minified files
    $ gulp build

	# Prod compilation, you will have only minified files
	$ gulp build --dev


## NPM Package

[www.npmjs.com/package/dropify](https://www.npmjs.com/package/dropify)


## Usage

You have to include __[dist/js/dropify.js](dist/js/dropify.js)__, __[dist/css/dropify.css](dist/css/dropify.css)__ and __dist/fonts/*__ to your project, then you juste have to init the jQuery plugin like that :

```javascript
$('.dropify').dropify();
```

## Options

* __defaultFile:__ If there is a default file on the input. You can use options when you use the plugin or directly __data-default-file="url_of_your_file"__ on you DOM element (it's recommended).

```html
<input type="file" class="dropify" data-default-file="url_of_your_file" />
```


* __height:__  Set the height of your dropify element. For exemple you want 300px height, you have to add the attribute __data-height="300"__ on your DOM element.

```html
<input type="file" class="dropify" data-height="300" />
```


* __maxFileSize:__  Set the max filesize of the uploaded document. An error will be display if the file size is bigger than the option. You can use unit like K, M and G.

```html
<input type="file" class="dropify" data-max-file-size="3M" />
```


* __disabled:__  You can disable the input if you add the attr __disabled="disabled"__.

```html
<input type="file" class="dropify" disabled="disabled" />
```


* __disableRemove:__  You can disable the remove button if you add the attr __data-disable-remove="true"__.

```html
<input type="file" class="dropify" data-disable-remove="true" />
```


* __messages:__  You can translate default messages. You juste have to add an options array when you init the plugin. This messages will be replaced in the __tpl__ option.

```javascript
$('.dropify').dropify({
    messages: {
    	'default': 'Drag and drop a file here or click',
    	'replace': 'Drag and drop or click to replace',
    	'remove':  'Remove',
        'error':   'Sorry, this file is too large'

    }
}
```


* __tpl:__  You can update default template. You juste have to add an options array when you init the plugin.

```javascript
$('.dropify').dropify({
    tpl: {
        wrap:        '<div class="dropify-wrapper"></div>',
        message:     '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
        preview:     '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
        filename:    '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
        clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>',
        error:       '<p class="dropify-error">{{ error }}</p>'
    }
}
```


## Events

* __dropify.beforeClear:__  This event is called when you click on the "remove" button, just before clearing the Dropify. You can access to all the Dropify object properties using __element.xxxx__. See how to use it.

```javascript
var drEvent = $('.dropify-event').dropify();

drEvent.on('dropify.beforeClear', function(event, element){
    return confirm("Do you realy want to delete \"" + element.filename + "\" ?");
});
```

* __dropify.afterClear:__  This event is called after the Dropify is clear. You can access to all the Dropify object properties using __element.xxxx__. See how to use it.

```javascript
var drEvent = $('.dropify-event').dropify();

drEvent.on('dropify.afterClear', function(){
    alert('File deleted');
});
```
