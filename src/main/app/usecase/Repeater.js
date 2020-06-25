"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repeater = /** @class */ (function () {
    function Repeater() {
        this.repeats = {};
    }
    Repeater.prototype.repeat = function (id, callback, interval) {
        var _this = this;
        this.repeats[id] = {
            callback: callback,
            interval: interval,
            intervalObj: setInterval(function () {
                callback(function () { return clearInterval(_this.repeats[id].intervalObj); });
            }, interval),
        };
    };
    Repeater.prototype.updateCallback = function (id, callback) {
        var r = this.repeats[id];
        clearInterval(r.intervalObj);
        r.callback = callback;
        r.intervalObj = setInterval(function () {
            callback(function () { return clearInterval(r.intervalObj); });
        }, r.interval);
    };
    Repeater.prototype.updateInterval = function (id, interval) {
        var r = this.repeats[id];
        clearInterval(r.intervalObj);
        r.interval = interval;
        r.intervalObj = setInterval(function () {
            r.callback(function () { return clearInterval(r.intervalObj); });
        }, interval);
    };
    Repeater.prototype.stop = function (id) {
        var r = this.repeats[id];
        if (!r)
            return;
        clearInterval(r.intervalObj);
        delete this.repeats[id];
    };
    return Repeater;
}());
exports.default = Repeater;
