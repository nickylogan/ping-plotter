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
var ElectronStoreAdapter = /** @class */ (function () {
    function ElectronStoreAdapter(store) {
        this.store = store;
    }
    ElectronStoreAdapter.prototype.addWidget = function (id, widget) {
        if (this.store.has("widgets." + id)) {
            return Promise.reject('widget already exists');
        }
        try {
            this.store.set("widgets." + id, widget);
        }
        catch (e) {
            return Promise.reject("failed to store widget: " + e);
        }
        return Promise.resolve();
    };
    ElectronStoreAdapter.prototype.deleteWidget = function (id) {
        this.store.delete("widgets." + id);
        return Promise.resolve();
    };
    ElectronStoreAdapter.prototype.get = function () {
        var title = this.store.get('title');
        var widgets = this.store.get('widgets') || {};
        return Promise.resolve({ title: title, widgets: widgets });
    };
    ElectronStoreAdapter.prototype.getWidget = function (id) {
        var widget = this.store.get("widgets." + id);
        if (widget === undefined) {
            return Promise.reject("cannot find widget#" + id);
        }
        return Promise.resolve(widget);
    };
    ElectronStoreAdapter.prototype.updateWidget = function (id, edit) {
        var widget = this.store.get("widgets." + id);
        if (widget === undefined) {
            return Promise.reject("cannot find widget#" + id);
        }
        widget = __assign(__assign({}, widget), edit);
        try {
            this.store.set("widgets." + id, widget);
        }
        catch (e) {
            return Promise.reject("failed to update widget: " + e);
        }
        return Promise.resolve(undefined);
    };
    return ElectronStoreAdapter;
}());
exports.default = ElectronStoreAdapter;
