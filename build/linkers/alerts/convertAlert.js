"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAlert = void 0;
var sweetalert2_1 = require("sweetalert2");
function convertAlert(swalColour) {
    sweetalert2_1.default.fire({
        title: 'Generating...',
        html: "<p id='progressText'></p>",
        backdrop: swalColour.loading,
        allowOutsideClick: false,
        showConfirmButton: false,
        target: document.getElementById('swalframe'),
    });
}
exports.convertAlert = convertAlert;
