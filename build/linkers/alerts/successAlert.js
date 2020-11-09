"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successAlert = void 0;
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var copyString = require('../Utilities/utils').copyString;
function successAlert(passType, passText, swalColour) {
    var swalOptions = {
        icon: 'success',
        title: 'Download Success!',
        text: passText,
        backdrop: swalColour.pass,
        target: document.getElementById('swalframe'),
    };
    if (passType == 'live') {
        console.log('This livestream URL was found:');
        console.log(passText);
        swalOptions.title = 'Code found!';
        swalOptions.confirmButtonText = 'Copy to Clipboard';
        swalOptions.preConfirm = function () {
            copyString(passText.replace(/(\r\n|\n|\r)/gm, "").replace(" ", ""));
        };
    }
    else if (passType == 'convert') {
        swalOptions.title = 'Conversion Success!';
    }
    else if (passType == 'effect') {
        swalOptions.title = 'Effect Success!';
    }
    else if (passType == 'delete') {
        swalOptions.title = 'Deleted!';
    }
    sweetalert2_1.default.fire(swalOptions);
}
exports.successAlert = successAlert;
;
