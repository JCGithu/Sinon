"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runningAlert = void 0;
var sweetalert2_1 = require("sweetalert2");
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
//# sourceMappingURL=runningAlert.js.map