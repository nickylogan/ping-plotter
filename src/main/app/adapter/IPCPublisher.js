"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPCPublisher = /** @class */ (function () {
    function IPCPublisher(window) {
        this.window = window;
    }
    IPCPublisher.prototype.publishWidgetMessage = function (id, message) {
        if (this.window.isDestroyed())
            return Promise.reject();
        var evt = "DATA_WIDGET_" + id;
        this.window.webContents.send(evt, message);
    };
    return IPCPublisher;
}());
exports.default = IPCPublisher;
