"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var NedbAdapter = /** @class */ (function () {
    function NedbAdapter(db) {
        this.db = db;
    }
    NedbAdapter.prototype.append = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.insert(__assign({ key: key }, value), function (err) {
                if (err) {
                    reject("failed to append: " + err);
                }
                resolve();
            });
        });
    };
    NedbAdapter.prototype.delete = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.remove({ key: key }, { multi: true }, function (err) {
                if (err) {
                    reject("failed to remove: " + err);
                }
                resolve();
            });
        });
    };
    NedbAdapter.prototype.fetch = function (key, begin, end) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.find({ key: key, timestamp: { $gte: begin, $lt: end } })
                .sort({ timestamp: 1 })
                .exec(function (err, docs) {
                if (err) {
                    reject("failed to fetch: " + err);
                }
                resolve(docs);
            });
        });
    };
    NedbAdapter.prototype.fetchLast = function (key, duration) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var begin = Date.now() - duration;
            _this.db.find({ key: key, timestamp: { $gte: begin } })
                .sort({ timestamp: 1 })
                .exec(function (err, docs) {
                if (err) {
                    reject("failed to fetch: " + err);
                }
                resolve(docs);
            });
        });
    };
    NedbAdapter.prototype.query = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.find({ key: key })
                .sort({ timestamp: -1 })
                .limit(1)
                .exec(function (err, docs) {
                if (err) {
                    reject("failed to fetch: " + err);
                }
                resolve(docs[0]);
            });
        });
    };
    return NedbAdapter;
}());
exports.default = NedbAdapter;
