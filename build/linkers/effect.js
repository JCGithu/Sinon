"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./Utilities/utils");
//Effects
var screengrabs = require('./effects/screengrab').screengrabs;
var socialBlur = require('./effects/blur').socialBlur;
var concat = require('./effects/concat').concat;
var wave = require('./effects/wave').wave;
var sweetalert2_1 = require("sweetalert2");
function run_effect() {
    return __awaiter(this, void 0, void 0, function () {
        // SINGLE
        function singleEffect(format) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(format.indexOf('wave') >= 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, wave(multi, swalColour, format)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(format.indexOf('blur') >= 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, socialBlur(multi, swalColour, format)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!(format.indexOf('grabs') >= 0)) return [3 /*break*/, 6];
                            return [4 /*yield*/, screengrabs(multi, swalColour, format)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            if (!(format.indexOf('concat') >= 0)) return [3 /*break*/, 8];
                            return [4 /*yield*/, concat(multi, swalColour, format)];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        }
        var swalColour, outputFile, inputFull, inputExt, inputDir, pngFolder, inputName, finalOutput, e, format, multi;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utils_1.lineBreak();
                    swalColour = utils_1.swalColours();
                    e = document.getElementById("convertFormat");
                    format = e.options[e.selectedIndex].value;
                    if (!(format.indexOf('custom') >= 0)) return [3 /*break*/, 1];
                    sweetalert2_1.default.fire({
                        icon: 'info',
                        title: "Pick your effects",
                        text: "What effects do you want to run?",
                        html: "<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; width:100%'>" +
                            "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                            "<select id='custom_one' class='convFormat'>" +
                            "<option value='concat'>Join clips</option>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                            "</select>" +
                            "</div>" +
                            "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                            "<select id='custom_two' class='convFormat' classNamePrefix='conv'>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                            "</select>" +
                            "</div>" +
                            "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                            "<select id='custom_three' class='convFormat' classNamePrefix='conv'>" +
                            "<option value='blank'>N/A</option>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                            "</select>" +
                            "</div>" +
                            "</div>",
                        confirmButtonText: 'Run!',
                        showLoaderOnConfirm: true,
                        backdrop: swalColour.loading,
                        target: document.getElementById('swalframe'),
                        preConfirm: (function () { return __awaiter(_this, void 0, void 0, function () {
                            var custom_get, custom_get, custom_two, custom_get, custom_three, multi, nextStep, effectFile;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        custom_get = document.getElementById("custom_one");
                                        format = custom_get.options[custom_get.selectedIndex].value;
                                        custom_get = document.getElementById("custom_two");
                                        custom_two = custom_get.options[custom_get.selectedIndex].value;
                                        custom_get = document.getElementById("custom_three");
                                        custom_three = custom_get.options[custom_get.selectedIndex].value;
                                        multi = true;
                                        nextStep = false;
                                        console.log('Running effect one, code: ' + format);
                                        return [4 /*yield*/, singleEffect(format)];
                                    case 1:
                                        _a.sent();
                                        format = custom_two;
                                        effectFile = [finalOutput];
                                        console.log('Running effect two, code: ' + format);
                                        return [4 /*yield*/, singleEffect(format)];
                                    case 2:
                                        _a.sent();
                                        if (!(custom_three.indexOf('blank') <= 0)) return [3 /*break*/, 4];
                                        format = custom_three;
                                        effectFile = [finalOutput];
                                        console.log('Running effect three, code: ' + format);
                                        return [4 /*yield*/, singleEffect(format)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        sweetalert2_1.default.fire({
                                            icon: 'success',
                                            title: "Merge Success!",
                                            backdrop: swalColour.pass,
                                        });
                                        console.log('Custom effect finished');
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                    });
                    return [3 /*break*/, 3];
                case 1:
                    multi = false;
                    return [4 /*yield*/, singleEffect(format)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
