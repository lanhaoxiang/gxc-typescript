"use strict";
//Documentation: https://github.com/EOSIO/eos/blob/48ee386b3ab91b00fbe5342314a7d3ae5fd9bdc2/contracts/eosiolib/datastream.hpp
//Class stuff: https://github.com/EOSIO/eos/blob/48ee386b3ab91b00fbe5342314a7d3ae5fd9bdc2/contracts/eosiolib/datastream.hpp#L459
//Parts of this class are inspired by eosargentina, thank you.
Object.defineProperty(exports, "__esModule", { value: true });
require("allocator/arena");
var string_1 = require("~lib/internal/string");
var DataStream = /** @class */ (function () {
    function DataStream(start, length) {
        this.start = start;
        this.pos = start;
        this.end = start + length;
    }
    DataStream.prototype.length = function () {
        return (this.pos - this.start);
    };
    /**
     *  Skips a specified number of bytes from this stream
     *  @brief Skips a specific number of bytes from this stream
     *  @param s The number of bytes to skip
     */
    DataStream.prototype.skip = function (s) {
        this.pos += s;
    };
    DataStream.prototype.readToDest = function (destptr, len) {
        //eosio_assert( size_t(_end - _pos) >= (size_t)s, "read" );
        copy_memory(this.pos, destptr, len);
        this.pos += len;
    };
    DataStream.prototype.readVarInt32 = function () {
        var value = 0;
        var shift = 0;
        var b = 0;
        do {
            b = this.read();
            value |= (b & 0x7f) << (7 * shift++);
        } while (b & 0x80);
        return value;
    };
    DataStream.prototype.writeVarInt32 = function (value) {
        do {
            var b = value & 0x7f;
            value >>= 7;
            b |= ((value > 0 ? 1 : 0) << 7);
            this.write(b);
        } while (value);
    };
    //should probably replace this to u8 write
    DataStream.prototype.write = function (val) {
        //eosio_assert( _pos < _end, "put" );
        store(this.pos, val);
        this.pos += sizeof();
    };
    DataStream.prototype.read = function () {
        var value = load(this.pos);
        this.pos += sizeof();
        return value;
    };
    DataStream.prototype.writeBool = function (b) {
        this.write(b);
    };
    DataStream.prototype.readBool = function () {
        return this.read() != 0;
    };
    DataStream.prototype.writeString = function (s) {
        this.writeVarInt32(s.lengthUTF8() - 1); //not sure about the minus 1 yet
        if (s == "")
            return;
        copy_memory(this.pos, s.toUTF8(), s.lengthUTF8());
    };
    DataStream.prototype.readString = function () {
        var len = this.readVarInt32();
        //let len: u32 = this.read<u32>();
        if (len == 0)
            return "";
        var s = string_1.allocateUnsafe(len);
        for (var i = 0; i < len; i++) {
            var b = this.read();
            store(s + 2 * i, b, string_1.HEADER_SIZE);
        }
        return s;
    };
    //Does this work with nonprimitives?
    //May need arr to be T?
    DataStream.prototype.writeVector = function (arr) {
        this.writeVarInt32(arr.length);
        this.writeArray(arr);
    };
    //Don't think this works with non primitives though
    //May need to return T?
    DataStream.prototype.readVector = function () {
        var len = this.readVarInt32();
        return this.readArray(len);
    };
    DataStream.prototype.readArray = function (len) {
        if (len == 0)
            return new Array();
        var arr = new Array(len);
        for (var i = 0; i < len; i++) {
            arr[i] = this.read();
        }
        return arr;
    };
    DataStream.prototype.writeArray = function (arr) {
        for (var i = 0; i < arr.length; i++)
            this.write(arr[i]);
    };
    return DataStream;
}());
exports.DataStream = DataStream;
