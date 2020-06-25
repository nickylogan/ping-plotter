"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var IPCController_1 = __importDefault(require("./adapter/IPCController"));
var IPCPublisher_1 = __importDefault(require("./adapter/IPCPublisher"));
var NetworkPing_impl_1 = __importDefault(require("./adapter/metrics/NetworkPing.impl"));
var DashboardInteractor_1 = __importDefault(require("./usecase/DashboardInteractor"));
var App = /** @class */ (function () {
    function App(window) {
        this.window = window;
    }
    App.prototype.run = function () {
        var pub = new IPCPublisher_1.default(this.window);
        var metrics = {
            ping: new NetworkPing_impl_1.default(),
        };
        var interactor = new DashboardInteractor_1.default(pub, null, null, metrics);
        var controller = new IPCController_1.default(interactor);
        controller.registerHandlers();
    };
    return App;
}());
exports.default = App;
