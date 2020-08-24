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
var jest_when_1 = require("jest-when");
var NeDBImpl_1 = __importDefault(require("./NeDBImpl"));
var nedb_1 = __importDefault(require("nedb"));
jest.mock('nedb');
describe('append()', function () {
    var key = 'key';
    var value = {
        source: 'source',
        value: 123,
        timestamp: 0,
    };
    it('should store a datapoint in NeDB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockInsert, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockInsert = jest.fn().mockImplementation(function (newDoc, callback) { return callback(null, {}); });
                    nedb_1.default.prototype.insert = mockInsert;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.append(key, value)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    expect(mockInsert).toBeCalledWith(__assign({ key: key }, value), expect.anything());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if store fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockInsert, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockInsert = jest.fn().mockImplementation(function (newDoc, callback) { return callback(new Error('error'), {}); });
                    nedb_1.default.prototype.insert = mockInsert;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.append(key, value)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    expect(mockInsert).toBeCalledWith(__assign({ key: key }, value), expect.anything());
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('delete()', function () {
    var key = 'key';
    it('should delete values in NeDB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockDelete, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockDelete = jest.fn().mockImplementation(function (query, opts, callback) { return callback(null, {}); });
                    nedb_1.default.prototype.remove = mockDelete;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.delete(key)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    expect(mockDelete).toBeCalledWith({ key: key }, { multi: true }, expect.anything());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if remove fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockDelete, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockDelete = jest.fn().mockImplementation(function (query, opts, callback) { return callback(new Error('error'), {}); });
                    nedb_1.default.prototype.remove = mockDelete;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.delete(key)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    expect(mockDelete).toBeCalledWith({ key: key }, { multi: true }, expect.anything());
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('fetch()', function () {
    var key = 'key';
    var begin = 0;
    var end = begin + 1000;
    var docs = [
        { source: 'source', value: 0, timestamp: 0 },
        { source: 'source', value: 2, timestamp: 200 },
        { source: 'source', value: 4, timestamp: 400 },
        { source: 'source', value: 6, timestamp: 600 },
        { source: 'source', value: 8, timestamp: 800 },
    ];
    it('should fetch values from NeDB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFind, mockSort, mockExec, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockFind = jest.fn(), mockSort = jest.fn();
                    mockExec = jest.fn()
                        .mockImplementation(function (callback) { return callback(null, docs); });
                    jest_when_1.when(mockSort).expectCalledWith({ timestamp: 1 })
                        .mockReturnValue({ exec: mockExec });
                    jest_when_1.when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: begin, $lt: end } })
                        .mockReturnValue({ sort: mockSort });
                    nedb_1.default.prototype.find = mockFind;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.fetch(key, begin, end)).resolves.toEqual(docs)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if it throws an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFind, mockSort, mockExec, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockFind = jest.fn(), mockSort = jest.fn();
                    mockExec = jest.fn()
                        .mockImplementation(function (callback) { return callback(new Error('error'), []); });
                    jest_when_1.when(mockSort).expectCalledWith({ timestamp: 1 })
                        .mockReturnValue({ exec: mockExec });
                    jest_when_1.when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: begin, $lt: end } })
                        .mockReturnValue({ sort: mockSort });
                    nedb_1.default.prototype.find = mockFind;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.fetch(key, begin, end)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('fetchLast()', function () {
    var key = 'key';
    var duration = 1000;
    var docs = [
        { source: 'source', value: 0, timestamp: 0 },
        { source: 'source', value: 2, timestamp: 200 },
        { source: 'source', value: 4, timestamp: 400 },
        { source: 'source', value: 6, timestamp: 600 },
        { source: 'source', value: 8, timestamp: 800 },
    ];
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('should fetch values from NeDB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFind, mockSort, mockExec, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(Date, 'now').mockReturnValue(1000);
                    mockFind = jest.fn(), mockSort = jest.fn();
                    mockExec = jest.fn()
                        .mockImplementation(function (callback) { return callback(null, docs); });
                    jest_when_1.when(mockSort).expectCalledWith({ timestamp: 1 })
                        .mockReturnValue({ exec: mockExec });
                    jest_when_1.when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: 0 } })
                        .mockReturnValue({ sort: mockSort });
                    nedb_1.default.prototype.find = mockFind;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.fetchLast(key, duration)).resolves.toEqual(docs)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if it throws an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFind, mockSort, mockExec, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(Date, 'now').mockReturnValue(1000);
                    mockFind = jest.fn(), mockSort = jest.fn();
                    mockExec = jest.fn()
                        .mockImplementation(function (callback) { return callback(new Error('error'), []); });
                    jest_when_1.when(mockSort).expectCalledWith({ timestamp: 1 })
                        .mockReturnValue({ exec: mockExec });
                    jest_when_1.when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: 0 } })
                        .mockReturnValue({ sort: mockSort });
                    nedb_1.default.prototype.find = mockFind;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.fetchLast(key, duration)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('query()', function () {
    var key = 'key';
    var docs = [
        { source: 'source', value: 0, timestamp: 0 },
    ];
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('should get a value from NeDB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFind, mockSort, mockLimit, mockExec, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockFind = jest.fn(), mockSort = jest.fn(), mockLimit = jest.fn();
                    mockExec = jest.fn()
                        .mockImplementation(function (callback) { return callback(null, docs); });
                    jest_when_1.when(mockLimit).expectCalledWith(1)
                        .mockReturnValue({ exec: mockExec });
                    jest_when_1.when(mockSort).expectCalledWith({ timestamp: -1 })
                        .mockReturnValue({ limit: mockLimit });
                    jest_when_1.when(mockFind).expectCalledWith({ key: key })
                        .mockReturnValue({ sort: mockSort });
                    nedb_1.default.prototype.find = mockFind;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.query(key)).resolves.toEqual(docs[0])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if it throws an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFind, mockSort, mockLimit, mockExec, db, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockFind = jest.fn(), mockSort = jest.fn(), mockLimit = jest.fn();
                    mockExec = jest.fn()
                        .mockImplementation(function (callback) { return callback(new Error('error'), []); });
                    jest_when_1.when(mockLimit).expectCalledWith(1)
                        .mockReturnValue({ exec: mockExec });
                    jest_when_1.when(mockSort).expectCalledWith({ timestamp: -1 })
                        .mockReturnValue({ limit: mockLimit });
                    jest_when_1.when(mockFind).expectCalledWith({ key: key })
                        .mockReturnValue({ sort: mockSort });
                    nedb_1.default.prototype.find = mockFind;
                    db = new nedb_1.default();
                    impl = new NeDBImpl_1.default(db);
                    return [4 /*yield*/, expect(impl.query(key)).rejects.toBeDefined()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
