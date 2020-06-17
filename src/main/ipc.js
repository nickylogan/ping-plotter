"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var electron_1 = require("electron");
var Message;
(function (Message) {
    Message["PING_REQUEST"] = "PING_REQUEST";
    Message["PING_DATA"] = "PING_DATA";
})(Message = exports.Message || (exports.Message = {}));
var Protocol;
(function (Protocol) {
    Protocol["TCP"] = "tcp";
    Protocol["UDP"] = "udp";
    Protocol["ICMP"] = "icmp";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
exports.registerEvents = function (window) {
    var reqs = {};
    var createRequest = function (id) {
        clearInterval(reqs[id]);
        reqs[id] = setInterval(function () {
            if (window.isDestroyed())
                return;
            var r = Math.random() * 100;
            var ts = Date.now();
            var lat = {
                latency: r > 98 ? undefined : r,
                timestamp: ts,
            };
            window.webContents.send(Message.PING_DATA, lat);
        }, 100);
    };
    var handlePingRequest = function (req) {
        var id = crypto_1.default.createHash('sha1').update(req.host).digest('base64');
        createRequest(id);
    };
    electron_1.ipcMain.on(Message.PING_REQUEST, function (evt, req) {
        handlePingRequest(req);
    });
};
