"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var electron_1 = __importDefault(require("electron"));
var nedb_1 = __importDefault(require("nedb"));
var path_1 = __importDefault(require("path"));
var Nedb;
(function (Nedb) {
    function initTimeSeriesDB() {
        var dir = electron_1.default.app.getPath('userData');
        var dbPath = path_1.default.join(dir, 'ts.db');
        var db = new nedb_1.default({ filename: dbPath, autoload: true });
        return new Promise(function (resolve, reject) {
            db.ensureIndex({ fieldName: 'key' }, function (err) { return err && reject("failed to init db: " + err); });
            db.ensureIndex({ fieldName: 'timestamp' }, function (err) { return err && reject("failed to init db: " + err); });
            resolve(db);
        });
    }
    Nedb.initTimeSeriesDB = initTimeSeriesDB;
})(Nedb || (Nedb = {}));
module.exports = Nedb;
