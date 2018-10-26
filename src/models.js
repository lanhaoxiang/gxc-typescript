"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datastream_1 = require("../lib/datastream");
var Step = /** @class */ (function () {
    function Step(user, game) {
        this.user = user;
        this.game = game;
    }
    Step.fromStream = function (ds) {
        return new Step(ds.read(), ds.read());
    };
    Step.prototype.toStream = function () {
        var length = sizeof() + sizeof();
        var arr = new Uint8Array(length);
        var ds = new datastream_1.DataStream(arr.buffer, length);
        ds.write(this.user);
        ds.write(this.game);
        return ds;
    };
    return Step;
}());
exports.Step = Step;
var Create = /** @class */ (function () {
    function Create(user, game, num_rows, num_cols, seed) {
        this.user = user;
        this.game = game;
        this.num_rows = num_rows;
        this.num_cols = num_cols;
        this.seed = seed;
    }
    Create.fromStream = function (ds) {
        return new Create(ds.read(), ds.read(), ds.read(), ds.read(), ds.read());
    };
    return Create;
}());
exports.Create = Create;
var Remove = /** @class */ (function () {
    function Remove(user, game) {
        this.user = user;
        this.game = game;
    }
    Remove.fromStream = function (ds) {
        return new Step(ds.read(), ds.read());
    };
    return Remove;
}());
exports.Remove = Remove;
var RemoveAll = /** @class */ (function () {
    function RemoveAll(user) {
        this.user = user;
    }
    RemoveAll.fromStream = function (ds) {
        return new RemoveAll(ds.read());
    };
    return RemoveAll;
}());
exports.RemoveAll = RemoveAll;
