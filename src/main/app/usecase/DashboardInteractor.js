"use strict";
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
var auto_bind_1 = __importDefault(require("auto-bind"));
var uuid_1 = require("uuid");
var Repeater_1 = __importDefault(require("./Repeater"));
var DashboardInteractor = /** @class */ (function () {
    function DashboardInteractor(widgetPub, tsStore, dashboardStore, metrics) {
        this.widgetPub = widgetPub;
        this.tsStore = tsStore;
        this.dashboardStore = dashboardStore;
        this.metrics = metrics;
        this.repeater = new Repeater_1.default();
        auto_bind_1.default(this);
    }
    DashboardInteractor.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardStore.get()];
            });
        });
    };
    DashboardInteractor.prototype.getWidget = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardStore.getWidget(id)];
            });
        });
    };
    DashboardInteractor.prototype.addWidget = function (widget) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = uuid_1.v4();
                widget.id = id;
                try {
                    // TODO: uncomment when store is implemented
                    // await this.dashboardStore.addWidget(id, widget);
                    this.startPublisher(widget);
                    return [2 /*return*/, Promise.resolve(id)];
                }
                catch (e) {
                    // TODO: parse error
                    return [2 /*return*/, Promise.reject(e)];
                }
                return [2 /*return*/];
            });
        });
    };
    DashboardInteractor.prototype.updateWidget = function (id, edit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardStore.updateWidget(id, edit)];
            });
        });
    };
    DashboardInteractor.prototype.deleteWidget = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardStore.deleteWidget(id)];
            });
        });
    };
    DashboardInteractor.prototype.startPublisher = function (widget) {
        var _this = this;
        this.repeater.repeat(widget.id, function (stop) { return __awaiter(_this, void 0, void 0, function () {
            var timestamp, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now();
                        return [4 /*yield*/, this.getDataPoint(widget.metric)];
                    case 1:
                        data = _a.sent();
                        this.widgetPub.publishWidgetMessage(widget.id, { data: data, timestamp: timestamp }).catch(stop);
                        return [2 /*return*/];
                }
            });
        }); }, widget.interval);
    };
    DashboardInteractor.prototype.getDataPoint = function (metric) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now();
                        return [4 /*yield*/, this.metrics.ping.call('host', 'tcp', 1000)];
                    case 1:
                        value = _a.sent();
                        return [2 /*return*/, Promise.resolve({
                                source: metric,
                                value: value,
                                timestamp: timestamp,
                            })];
                }
            });
        });
    };
    return DashboardInteractor;
}());
exports.default = DashboardInteractor;
