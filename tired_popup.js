/**
 * @fileoverview
 */

(function(window) {
     tired.indexedDB.open(console.log.bind(console));

     function init() {
	 var closeButton = document.getElementById('close');
	 closeButton.addEventListener('click', window.close.bind(window));
     }
     document.addEventListener('DOMContentLoaded', init);
 })(this);