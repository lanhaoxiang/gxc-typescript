"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var env_1 = require("./env");
var datastream_1 = require("./datastream");
var DataTable = /** @class */ (function () {
    function DataTable(tableName, receiver, code) {
        this.table = utils_1.N(tableName);
        this.receiver = receiver;
        this.code = code;
    }
    DataTable.prototype.get = function (key) {
        var itr = env_1.db_find_i64(this.code, this.receiver, this.table, key);
        if (itr == -1) {
            return null;
        }
        else {
            var len = env_1.db_get_i64(itr, 0, 0);
            var arr = new Uint8Array(len);
            env_1.db_get_i64(itr, arr.buffer, len);
            return new datastream_1.DataStream(arr.buffer, len);
        }
    };
    DataTable.prototype.set = function (key, item) {
        if (this.get(key) == null) {
            return env_1.db_store_i64(this.receiver, this.table, this.receiver, key, item.start, item.length());
        }
        else {
            var itr = env_1.db_find_i64(this.code, this.receiver, this.table, key);
            return env_1.db_update_i64(itr, this.receiver, item.start, item.length());
        }
    };
    DataTable.prototype.delete = function (key) {
        if (this.get(key) != null) {
            var itr = env_1.db_find_i64(this.code, this.receiver, this.table, key);
            env_1.db_remove_i64(itr);
        }
    };
    DataTable.prototype.remove = function (key) {
        this.delete(key);
    };
    return DataTable;
}());
exports.DataTable = DataTable;
