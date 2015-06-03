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

	#  compilation (watch & minification)
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

* __height:__  Set the height of your dropify element. For exemple you want 300px height, you have to add the attribute __data-height="300"__ on your DOM element.

* __disabled:__  You can disable the input if you add the attr __disabled="disabled"__.

* __messages:__  You can translate default messages. You juste have to add an options array when you init the plugin.

```javascript
messages: {
	defaultMessage: 'Drag and drop a file here or click',
	replaceMessage: 'Drag and drop or click to replace',
	removeMessage:  'Remove'
}
```

* __tpl:__  You can update default template. You juste have to add an options array when you init the plugin.

```javascript
tpl: {
    wrap:        '<div class="dropify-wrapper"></div>',
    message:     '<div class="dropify-message"><span class="file-icon" /> <p>defaultMessage</p></div>',
    preview:     '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">replaceMessage</p></div></div></div>',
    filename:    '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
    clearButton: '<button type="button" class="dropify-clear">removeMessage</button>'
}
```
