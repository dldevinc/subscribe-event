/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var subscribe = __webpack_require__(1);

	var subscribeElement = document.querySelector('.subscribe-mouse-move');
	var unsubscribeElement = document.querySelector('.unsubscribe-mouse-move');
	var unsubscribe;

	var x = document.querySelector('.x');
	var y = document.querySelector('.y');

	subscribe(subscribeElement, 'click', function() {
	    unsubscribe = subscribe(document, 'mousemove', function(e) {
	        x.value = e.pageX;
	        y.value = e.pageY;
	    });
	    unsubscribeElement.style.display = '';
	    subscribeElement.style.display = 'none';
	});

	subscribe(unsubscribeElement, 'click', function() {
	    unsubscribe();
	    subscribeElement.style.display = '';
	    unsubscribeElement.style.display = 'none';
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	!(function() {
	  "use strict";

	  function subscribeEvent(
	    element,
	    event,
	    handler,
	    options,
	    addSubscription,
	    removeSubscription
	  ) {
	    var unsubscribeFunction = removeSubscription;
	    var unsubscribe = function() {
	      element[unsubscribeFunction](event, handler);
	    };

	    if (addSubscription) {
	      element[addSubscription](event, handler, options);
	      return unsubscribe;
	    }

	    if (element.addEventListener) {
	      element.addEventListener(event, handler, options);
	      unsubscribeFunction = "removeEventListener";
	      return unsubscribe;
	    }

	    if (element.attachEvent) {
	      event = "on" + event;
	      element.attachEvent(event, handler);
	      unsubscribeFunction = "detachEvent";
	      return unsubscribe;
	    }

	    if (element.on) {
	      element.on(event, handler);
	      unsubscribeFunction = "off";
	      return unsubscribe;
	    }
	  }

	  function subscribe(element, event, handler, options) {
	    return subscribeEvent(element, event, handler, options);
	  }

	  subscribe.define = function(addSubscription, removeSubscription) {
	    return function(element, event, handler, options) {
	      return subscribeEvent(
	        element,
	        event,
	        handler,
	        options,
	        addSubscription,
	        removeSubscription
	      );
	    };
	  };

	  (function(subscribe) {
	    if (true) {
	      // CommonJS
	      module.exports = subscribe;
	    } else if (typeof define === "function" && define.amd) {
	      // AMD. anonymous module
	      define(subscribe);
	    } else {
	      // Global scope
	      global.subscribeEvent = subscribe;
	    }
	  })(subscribe);
	})();


/***/ })
/******/ ]);