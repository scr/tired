/**
 * @fileoverview
 */

const kTiredDbName = 'tired';

var indexedDB = window.indexedDB || window.webkitIndexedDB ||
                window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBKeyRange = window.webkitIDBKeyRange;
}

var tired = {};
tired.indexedDB = {};
tired.indexedDB.db = null;
tired.indexedDB.onerror = console.log.bind(console);
tired.indexedDB.open = function(cb) {
    var request = indexedDB.open(kTiredDbName);
    request.onsuccess = function(e) {
	var v = "1.0";
	var db = e.target.result;
	tired.indexedDB.db = db;
	if (v != db.version) {
	    var setVrequest = db.setVersion(v);
	    setVrequest.onfailure = tired.indexedDB.onerror;
	    setVrequest.onsuccess = function(e) {
		var store = db.createObjectStore(
		    kTiredDbName, {keyPath: "timeStamp"});
		tired.indexedDB.getAllTimes(cb);
	    };
	} else {
	    tired.indexedDB.getAllTimes(cb);
	}
    };
};

tired.indexedDB.addTime = function(cb) {
    var db = tired.indexedDB.db;
    var trans = db.transaction(
	[kTiredDbName], IDBTransaction.READ_WRITE);
    var store = trans.objectStore(kTiredDbName);
    var data = {
	timeStamp: new Date().getTime()
    };
    var request = store.put(data);
    request.onsuccess = function(e) {
	tired.indexedDB.getAllTimes(cb);
    };
    request.onerror = function(e) {
	console.error('Error adding: ' + e);
    };
};

tired.indexedDB.rmTime = function(timeStamp, cb) {
    var db = tired.indexedDB.db;
    var trans = db.transaction(
	[kTiredDbName], IDBTransaction.READ_WRITE);
    var store = trans.objectStore(kTiredDbName);
    var request = store.delete(timeStamp)
    request.onsuccess = function(e) {
	tired.indexedDB.getAllTimes(cb);
    };
    request.onerror = function(e) {
	console.error('Error deleting: ' + e);
    };
};

tired.indexedDB.getAllTimes = function(cb) {
    var db = tired.indexedDB.db;
    var trans = db.transaction(
	[kTiredDbName], IDBTransaction.READ_ONLY);
    var store = trans.objectStore(kTiredDbName);
    // Get everything in the store;
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);
    cursorRequest.onsuccess = function(e) {
	var result = e.target.result;
	if(!!result == false)
	    return;
	cb(result.value);
	result.continue();
    };
};