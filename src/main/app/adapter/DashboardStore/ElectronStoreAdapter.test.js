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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_store_1 = __importDefault(require("electron-store"));
var jest_when_1 = require("jest-when");
var ElectronStoreAdapter_1 = __importDefault(require("./ElectronStoreAdapter"));
jest.mock('electron-store');
describe('addWidget()', function () {
    var id = 'widget-id';
    var widget = {
        id: id,
        title: 'title',
        metric: 'metric',
        type: 'type',
        interval: 2000,
    };
    it('should store a widget to electron-store', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockHas, mockSet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockHas = jest.fn(), mockSet = jest.fn();
                    jest_when_1.when(mockHas).expectCalledWith("widgets." + id).mockReturnValue(false);
                    jest_when_1.when(mockSet).expectCalledWith("widgets." + id, widget);
                    electron_store_1.default.prototype.has = mockHas;
                    electron_store_1.default.prototype.set = mockSet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.addWidget(id, widget)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not allow storing a duplicate widget', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockHas, mockSet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockHas = jest.fn(), mockSet = jest.fn();
                    jest_when_1.when(mockHas).expectCalledWith("widgets." + id).mockReturnValue(true);
                    electron_store_1.default.prototype.has = mockHas;
                    electron_store_1.default.prototype.set = mockSet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.addWidget(id, widget)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    expect(mockSet).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject when set fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockHas, mockSet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockHas = jest.fn(), mockSet = jest.fn();
                    jest_when_1.when(mockHas).expectCalledWith("widgets." + id).mockReturnValue(false);
                    jest_when_1.when(mockSet).expectCalledWith("widgets." + id).mockImplementation(function () { throw new Error(); });
                    electron_store_1.default.prototype.has = mockHas;
                    electron_store_1.default.prototype.set = mockSet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.addWidget(id, widget)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('deleteWidget()', function () {
    var id = 'widget-id';
    it('should delete a widget from electron-store', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockDelete, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockDelete = jest.fn();
                    jest_when_1.when(mockDelete).expectCalledWith("widgets." + id);
                    electron_store_1.default.prototype.delete = mockDelete;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.deleteWidget(id)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('get()', function () {
    var title = 'dashboard-title';
    var widgets = {
        'widget-id': {
            id: 'widget-id',
            title: 'title',
            metric: 'metric',
            type: 'type',
            interval: 2000,
        },
    };
    var dashboard = { title: title, widgets: widgets };
    it('should return the dashboard in electron-store', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockGet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGet = jest.fn();
                    jest_when_1.when(mockGet).expectCalledWith('title').mockReturnValueOnce('dashboard-title');
                    jest_when_1.when(mockGet).expectCalledWith('widgets').mockReturnValue(widgets);
                    electron_store_1.default.prototype.get = mockGet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.get()).resolves.toEqual(dashboard)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('getWidget()', function () {
    var id = 'widget-id';
    var widget = {
        id: 'widget-id',
        title: 'title',
        metric: 'metric',
        type: 'type',
        interval: 2000,
    };
    it('should return the widget in electron-store', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockGet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGet = jest.fn();
                    jest_when_1.when(mockGet).expectCalledWith("widgets." + id).mockReturnValue(widget);
                    electron_store_1.default.prototype.get = mockGet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.getWidget(id)).resolves.toEqual(widget)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if the widget does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockGet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGet = jest.fn();
                    jest_when_1.when(mockGet).expectCalledWith("widgets." + id).mockReturnValue(undefined);
                    electron_store_1.default.prototype.get = mockGet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.getWidget(id)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('updateWidget()', function () {
    var id = 'widget-id';
    var widget = {
        id: 'widget-id',
        title: 'title',
        metric: 'metric',
        type: 'type',
        interval: 2000,
    };
    var edit = {
        id: 'widget-id',
        title: 'updated-title',
        metric: 'updated-metric',
        type: 'updated-type',
        interval: 3000,
    };
    var updated = __assign(__assign({}, widget), edit);
    it('should update the widget in electron-store', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockGet, mockSet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGet = jest.fn(), mockSet = jest.fn();
                    jest_when_1.when(mockGet).expectCalledWith("widgets." + id).mockReturnValue(widget);
                    jest_when_1.when(mockSet).expectCalledWith("widgets." + id, updated);
                    electron_store_1.default.prototype.get = mockGet;
                    electron_store_1.default.prototype.set = mockSet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.updateWidget(id, edit)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if the widget does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockGet, mockSet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGet = jest.fn(), mockSet = jest.fn();
                    jest_when_1.when(mockGet).expectCalledWith("widgets." + id).mockReturnValue(undefined);
                    electron_store_1.default.prototype.get = mockGet;
                    electron_store_1.default.prototype.set = mockSet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.updateWidget(id, widget)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    expect(mockSet).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if store fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockGet, mockSet, store, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGet = jest.fn(), mockSet = jest.fn();
                    jest_when_1.when(mockGet).expectCalledWith("widgets." + id).mockReturnValue(undefined);
                    jest_when_1.when(mockSet).expectCalledWith("widgets." + id, updated).mockImplementation(function () { throw new Error(); });
                    electron_store_1.default.prototype.get = mockGet;
                    electron_store_1.default.prototype.set = mockSet;
                    store = new electron_store_1.default();
                    impl = new ElectronStoreAdapter_1.default(store);
                    return [4 /*yield*/, expect(impl.updateWidget(id, widget)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
