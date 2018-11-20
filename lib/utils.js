"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("./env");
function toUTF8Array(str) {
    var utf8 = new Array();
    for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80)
            utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push((0xc0 | (charcode >> 6)));
            utf8.push((0x80 | (charcode & 0x3f)));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push((0xe0 | (charcode >> 12)));
            utf8.push((0x80 | ((charcode >> 6) & 0x3f)));
            utf8.push((0x80 | (charcode & 0x3f)));
        }
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                | (str.charCodeAt(i) & 0x3ff));
            utf8.push((0xf0 | (charcode >> 18)));
            utf8.push((0x80 | ((charcode >> 12) & 0x3f)));
            utf8.push((0x80 | ((charcode >> 6) & 0x3f)));
            utf8.push((0x80 | (charcode & 0x3f)));
        }
    }
    utf8.push(0x00);
    return utf8;
}
exports.toUTF8Array = toUTF8Array;
function string2cstr(str) {
    var cstr = toUTF8Array(str);
    var ptr = load(cstr);
    return ptr + sizeof();
}
exports.string2cstr = string2cstr;
function printstr(str) {
    env_1.prints(string2cstr(str));
}
exports.printstr = printstr;
function assert(condition, msg) {
    if (condition == false) {
        env_1.graphene_assert(0, string2cstr(msg));
    }
}
exports.assert = assert;
function char_to_symbol(c) {
    if (c >= 97 && c <= 122)
        return (c - 97) + 6;
    if (c >= 49 && c <= 53)
        return (c - 49) + 1;
    return 0;
}
function N(str) {
    var name = 0;
    var i = 0;
    for (; i < str.length && i < 12; i++) {
        name |= (char_to_symbol(str.charCodeAt(i)) & 0x1f) << (64 - 5 * (i + 1));
    }
    if (i == 12)
        name |= char_to_symbol(str.charCodeAt(12)) & 0x0F;
    return name;
}
exports.N = N;
