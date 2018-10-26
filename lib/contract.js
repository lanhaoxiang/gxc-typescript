"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datastream_1 = require("./datastream");
var env_1 = require("./env");
var datatable_1 = require("./datatable");
var Contract = /** @class */ (function () {
    function Contract(receiver, code) {
        this.receiver = receiver;
        this.code = code;
    }
    Contract.prototype.getActionStream = function () {
        var len = env_1.action_data_size();
        var arr = new Uint8Array(len);
        env_1.read_action_data(arr.buffer, len);
        var ds = new datastream_1.DataStream(arr.buffer, len);
        return ds;
    };
    Contract.prototype.getTable = function (tableName) {
        return new datatable_1.DataTable(tableName, this.receiver, this.code);
    };
    return Contract;
}());
exports.Contract = Contract;
