"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../lib/env");
var contract_1 = require("../lib/contract");
var utils_1 = require("../lib/utils");
var models_1 = require("./models");
var HelloWorld = /** @class */ (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelloWorld.prototype.create = function (args) {
        //test receiver
        env_1.printi(this.receiver);
        //test parameters
        env_1.printi(args.num_rows);
        env_1.printi(args.num_cols);
        env_1.printi(args.seed);
        //test api
        env_1.printi(env_1.get_action_asset_id());
        env_1.printi(env_1.get_action_asset_amount());
        env_1.printi(env_1.get_trx_sender());
        //test deposit/withdraw
        env_1.withdraw_asset(this.receiver, env_1.get_trx_sender(), env_1.get_action_asset_id(), env_1.get_action_asset_amount() / 2); //返还1半给送钱的
        //test storage create/delete/query/modify
        //db_store_i64(scope : u64, table : u64, payer: u64, id : u64,  data : u32, len : u32) : i32;
        var buffer_address = utils_1.string2cstr("my first book");
        var dt = this.getTable('book');
        dt.set("mybook");
        // let book_idx_1 = db_store_i64(this.receiver, N("book"), 0, this.receiver, buffer_address, 13);//TODO FIXME get_table_objects failed
    };
    HelloWorld.prototype.apply = function (action) {
        if (action == utils_1.N("create")) {
            this.create(models_1.Create.fromStream(this.getActionStream()));
        }
        else {
            utils_1.assert(false, "unknown action");
        }
    };
    return HelloWorld;
}(contract_1.Contract));
/**
 * entry point of the contract
 * @param {u64} receiver - The contract caller
 * @param {u64} code - The id of this contract
 * @param {u64} action - The method that called
 */
function apply(receiver, code, action) {
    var gol = new HelloWorld(receiver, code);
    gol.apply(action);
}
exports.apply = apply;
