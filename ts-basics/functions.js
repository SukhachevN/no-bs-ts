"use strict";
exports.__esModule = true;
exports.getName = exports.fetchData = exports.printFormat = exports.format = exports.addStrings = void 0;
function addNumbers(a, b) {
    return a + b;
}
var addStrings = function (first, second) {
    if (second === void 0) { second = ''; }
    return "".concat(first, " ").concat(second);
};
exports.addStrings = addStrings;
var format = function (title, param) {
    return "".concat(title, " ").concat(param);
};
exports.format = format;
var printFormat = function (title, param) {
    return console.log("".concat(title, " ").concat(param));
};
exports.printFormat = printFormat;
var fetchData = function (url) {
    return Promise.resolve("data from ".concat(url));
};
exports.fetchData = fetchData;
function introduce(salutation) {
    var names = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        names[_i - 1] = arguments[_i];
    }
    return "".concat(salutation, " ").concat(names.join(', '));
}
function getName(user) {
    return "".concat(user === null || user === void 0 ? void 0 : user.first, " ").concat(user === null || user === void 0 ? void 0 : user.last);
}
exports.getName = getName;
exports["default"] = addNumbers;
