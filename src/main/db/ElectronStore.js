"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var electron_store_1 = __importDefault(require("electron-store"));
var ElectronStore;
(function (ElectronStore) {
    function initDashboardDB() {
        var store = new electron_store_1.default({
            name: 'dashboard',
            schema: {
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
            },
        });
        return Promise.resolve(store);
    }
    ElectronStore.initDashboardDB = initDashboardDB;
})(ElectronStore || (ElectronStore = {}));
module.exports = ElectronStore;
