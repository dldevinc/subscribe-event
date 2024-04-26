var subscribe = require("../dist/cjs.js");
var assert = require("assert");

var dummyEventName = "test";
var dummyFunction = function(){};
var dummyOptions = { capture: true };


describe("subscribe", function() {
    it("call addEventListener if defined", function(done) {
        var dummyObj = {
            addEventListener: function (event, handler) {
                assert(event === dummyEventName);
                handler();
            }
        };

        subscribe(dummyObj, dummyEventName, done);
    });

    it("call attachEvent if defined", function(done) {
        var dummyObj = {
            attachEvent: function (event, handler) {
                assert(event === "on" + dummyEventName);
                handler();
            }
        };

        subscribe(dummyObj, dummyEventName, done);
    });

    it("call on if defined", function(done) {
        var dummyObj = {
            on: function (event, handler) {
                assert(event === dummyEventName);
                handler();
            }
        };

        subscribe(dummyObj, dummyEventName, done);
    });

    it("call removeEventListener when unsubscribe was called", function() {
        var dummyObj = {
            addEventListener: function (event, handler, options) {
                this.handler = handler;
                assert(event === dummyEventName);
                assert(options === dummyOptions);
            },
            removeEventListener: function(event, handler, options) {
                assert(event === dummyEventName);
                assert(this.handler, handler);
                assert(options === dummyOptions);
            }
        };

        subscribe(dummyObj, dummyEventName, dummyFunction, dummyOptions)();
    });

    it("call detachEvent when unsubscribe was called", function() {
        var dummyObj = {
            attachEvent: function (event, handler) {
                this.handler = handler;
                assert(event === "on" + dummyEventName);
            },
            detachEvent: function(event, handler) {
                assert(event === "on" + dummyEventName);
                assert(this.handler, handler);
            }
        };

        subscribe(dummyObj, dummyEventName, dummyFunction)();
    });

    it("call on if defined", function() {
        var dummyObj = {
            on: function (event, handler) {
                this.handler = handler;
                assert(event === dummyEventName);
            },
            off: function(event, handler) {
                assert(event === dummyEventName);
                assert(this.handler, handler);
            }
        };

        subscribe(dummyObj, dummyEventName, dummyFunction)();
    });
});

describe("subscribe.define", function() {
    it("define subscribe function", function(done) {
        var dummyObj = {
            testSubscribe: function(event, handler) {
                assert(event === dummyEventName);
                handler();
            }
        };

        var customSubscribe = subscribe.define("testSubscribe");
        customSubscribe(dummyObj, dummyEventName, done);
    });

    it("define unsubscribe function", function() {
        var dummyObj = {
            testSubscribe: function(event, handler, options) {
                assert(event === dummyEventName);
                this.handler = handler;
                assert(options === dummyOptions);
            },

            testUnsubscribe: function(event, handler, options) {
                assert(event === dummyEventName);
                assert(this.handler === handler);
                assert(options === dummyOptions);
            }
        };

        var customSubscribe = subscribe.define("testSubscribe", "testUnsubscribe");
        customSubscribe(dummyObj, dummyEventName, dummyFunction, dummyOptions)();
    });
});