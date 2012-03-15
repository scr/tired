/**
 * @fileoverview
 */

(function(window) {
     var tireds;

     function Tireds() {};

     Tireds.prototype = {
	 rmTired: function(e) {
	     var id = Number(e.target.innerText);
	     console.log(id);
	     this.innerHTML = '';
	     tired.indexedDB.rmTime(id, this.addTired.bind(this));
	 },
	 addTired: function(t) {
	     var containingDiv = document.createElement('div');
	     var div = document.createElement('div');
	     containingDiv.appendChild(div);
	     div.innerText = t.timeStamp;
	     var span = document.createElement('span');
	     span.innerText = new Date(t.timeStamp).toString();
	     containingDiv.appendChild(span);
	     this.appendChild(containingDiv);
	     div.addEventListener('click', this.rmTired.bind(this));
	 }
     };

     function addTired() {
	 tireds.innerHTML = '';
	 tired.indexedDB.addTime(tireds.addTired.bind(tireds));
     }

     function init() {
	 var closeButton = document.getElementById('close');
	 closeButton.addEventListener('click', window.close.bind(window));

	 var tiredButton = document.getElementById('tired');
	 tiredButton.addEventListener('click', addTired);

	 tireds = document.getElementById('tireds');
	 Tireds.prototype.__proto__ = tireds.__proto__;
	 tireds.__proto__ = Tireds.prototype;

	 tired.indexedDB.open(tireds.addTired.bind(tireds));
     }
     document.addEventListener('DOMContentLoaded', init);
 })(this);