"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var events_1 = require("../definitions/events");
var IPCController = /** @class */ (function () {
    function IPCController(interactor) {
        this.interactor = interactor;
    }
    IPCController.prototype.registerHandlers = function () {
        var _this = this;
        electron_1.ipcMain.on(events_1.Events.REQ_INIT, function (evt) {
            _this.interactor.init()
                .then(function (dashboard) { return evt.reply(events_1.Events.RES_OK_INIT, dashboard); })
                .catch(function (err) { return evt.reply(events_1.Events.RES_ERR_INIT, err); });
        });
        electron_1.ipcMain.on(events_1.Events.REQ_GET_WIDGET, function (evt, message) {
            var id = message.data;
            _this.interactor.getWidget(id)
                .then(function (dashboard) { return evt.reply(events_1.Events.RES_OK_GET_WIDGET, dashboard); })
                .catch(function (err) { return evt.reply(events_1.Events.RES_ERR_GET_WIDGET, err); });
        });
        electron_1.ipcMain.on(events_1.Events.REQ_ADD_WIDGET, function (evt, message) {
            var widget = message.data;
            _this.interactor.addWidget(widget)
                .then(function (id) { return evt.reply(events_1.Events.RES_OK_ADD_WIDGET, id); })
                .catch(function (err) { return evt.reply(events_1.Events.RES_ERR_ADD_WIDGET, err); });
        });
        electron_1.ipcMain.on(events_1.Events.REQ_EDIT_WIDGET, function (evt, message) {
            var edit = message.data;
            _this.interactor.updateWidget(edit.id, edit)
                .then(function () { return evt.reply(events_1.Events.RES_OK_EDIT_WIDGET); })
                .catch(function (err) { return evt.reply(events_1.Events.RES_ERR_EDIT_WIDGET, err); });
        });
        electron_1.ipcMain.on(events_1.Events.REQ_DELETE_WIDGET, function (evt, message) {
            var id = message.data;
            _this.interactor.deleteWidget(id)
                .then(function () { return evt.reply(events_1.Events.RES_OK_DELETE_WIDGET); })
                .catch(function (err) { return evt.reply(events_1.Events.RES_ERR_DELETE_WIDGET, err); });
        });
    };
    return IPCController;
}());
exports.default = IPCController;
