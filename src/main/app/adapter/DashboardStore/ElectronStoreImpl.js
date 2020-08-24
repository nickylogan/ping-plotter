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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_store_1 = __importDefault(require("electron-store"));
var ElectronStoreImpl = /** @class */ (function () {
    function ElectronStoreImpl() {
        this.store = new electron_store_1.default({
            schema: ElectronStoreImpl.schema,
        });
    }
    ElectronStoreImpl.prototype.addWidget = function (id, widget) {
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
    ElectronStoreImpl.prototype.deleteWidget = function (id) {
        this.store.delete("widgets." + id);
        return Promise.resolve();
    };
    ElectronStoreImpl.prototype.get = function () {
        var title = this.store.get('title');
        var widgets = this.store.get('widgets') || {};
        return Promise.resolve({ title: title, widgets: widgets });
    };
    ElectronStoreImpl.prototype.getWidget = function (id) {
        var widget = this.store.get("widgets." + id);
        if (widget === undefined) {
            return Promise.reject("cannot find widget#" + id);
        }
        return Promise.resolve(widget);
    };
    ElectronStoreImpl.prototype.updateWidget = function (id, edit) {
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
    ElectronStoreImpl.schema = {
        title: {
            type: 'string',
        },
        widgets: {
            additionalProperties: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    metric: { type: 'string' },
                    type: { type: 'string' },
                    interval: { type: 'number' },
                },
            },
        },
    };
    return ElectronStoreImpl;
}());
exports.default = ElectronStoreImpl;
