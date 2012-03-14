/**
 * @fileoverview Script for tired extension.
 */

(function(window) {
     var image = new Image();
     var canvas = document.createElement('canvas');

     /**
      * 
      */
     function initCanvas() {
	 canvas.height = image.height;
	 canvas.width = image.width;
	 var context = canvas.getContext('2d');
	 context.drawImage(image, 0, 0);
	 var data = context.getImageData(0, 0, canvas.width, canvas.height);
	 chrome.browserAction.setIcon({imageData: data});
     }

     /**
      * 
      */
     function init() {
	 // canvas = document.getElementById('browser_icon');
	 image.addEventListener('load', initCanvas);
	 image.src = 'icon.png';
     }

     document.addEventListener('DOMContentLoaded', init);
 })(this);
