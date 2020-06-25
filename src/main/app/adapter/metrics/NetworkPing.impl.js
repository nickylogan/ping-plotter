"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetworkPingImpl = /** @class */ (function () {
    function NetworkPingImpl() {
    }
    NetworkPingImpl.prototype.call = function (host, protocol, timeout) {
        var data = Math.random() * 100;
        return Promise.resolve(data);
    };
    NetworkPingImpl.prototype.is = function () {
        return 'network-ping';
    };
    return NetworkPingImpl;
}());
exports.default = NetworkPingImpl;
