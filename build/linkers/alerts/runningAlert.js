"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runningAlert = void 0;
var sweetalert2_1 = __importDefault(require("sweetalert2"));
function runningAlert() {
    var swalOptions = {
        title: 'Running!',
        position: 'bottom',
        backdrop: false,
        toast: true,
        customClass: 'swal-running',
        target: document.getElementById('swalframe'),
        showCancelButton: true,
    };
    sweetalert2_1.default.fire(swalOptions);
}
exports.runningAlert = runningAlert;
;
