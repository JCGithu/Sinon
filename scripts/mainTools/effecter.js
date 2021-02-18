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
var _a = require('../utilities/utils.js'), swalColours = _a.swalColours, lineBreak = _a.lineBreak;
//Effects
var screengrabs = require('../effects/screengrab.js');
var socialBlur = require('../effects/blur.js');
var concat = require('../effects/concat.js');
var wave = require('../effects/wave.js');
function run_effect(targetFiles) {
    return __awaiter(this, void 0, void 0, function () {
        // SINGLE
        function singleEffect(format, multi) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (format.indexOf('wave') >= 0) {
                        return [2 /*return*/, wave(multi, swalColour, format, targetFiles)];
                    }
                    if (format.indexOf('blur') >= 0) {
                        return [2 /*return*/, socialBlur(multi, swalColour, format, targetFiles)];
                    }
                    if (format.indexOf('grabs') >= 0) {
                        return [2 /*return*/, screengrabs(multi, swalColour, format, targetFiles)];
                    }
                    if (format.indexOf('concat') >= 0) {
                        return [2 /*return*/, concat(multi, swalColour, format, targetFiles)];
                    }
                    return [2 /*return*/];
                });
            });
        }
        var outputFile, inputFull, inputExt, inputDir, pngFolder, inputName, finalOutput, e, format, multi;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lineBreak();
                    swalColours();
                    e = document.getElementById('convertFormat');
                    format = e.options[e.selectedIndex].value;
                    multi = false;
                    if (!(format.indexOf('custom') >= 0)) return [3 /*break*/, 1];
                    Swal.fire({
                        icon: 'info',
                        title: 'Pick your effects',
                        text: 'What effects do you want to run?',
                        html: "<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; width:100%'>" +
                            "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                            "<select id='custom_one' class='convFormat'>" +
                            "<option value='concat'>Join clips</option>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                            '</select>' +
                            '</div>' +
                            "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                            "<select id='custom_two' class='convFormat' classNamePrefix='conv'>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                            '</select>' +
                            '</div>' +
                            "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                            "<select id='custom_three' class='convFormat' classNamePrefix='conv'>" +
                            "<option value='blank'>N/A</option>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                            '</select>' +
                            '</div>' +
                            '</div>',
                        confirmButtonText: 'Run!',
                        showLoaderOnConfirm: true,
                        backdrop: swalColour.loading,
                        target: document.getElementById('swalframe'),
                        preConfirm: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                formats = [
                                    document.getElementById('custom_one').options[document.getElementById('custom_one').selectedIndex].value,
                                    document.getElementById('custom_two').options[document.getElementById('custom_two').selectedIndex].value,
                                    document.getElementById('custom_three').options[document.getElementById('custom_three').selectedIndex].value,
                                ];
                                multi = true;
                                console.log(formats);
                                singleEffect(formats[0], multi).then(function (outputs) {
                                    if (formats[2] == 'blank') {
                                        multi = false;
                                    }
                                    targetFiles = outputs;
                                    singleEffect(formats[1], multi).then(function (outputs) {
                                        if (formats[2] !== 'blank') {
                                            multi = false;
                                            targetFiles = outputs;
                                            singleEffect(formats[2], multi);
                                        }
                                    });
                                });
                                return [2 /*return*/];
                            });
                        }); }
                    });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, singleEffect(format, multi)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
module.exports = run_effect;
//# sourceMappingURL=effecter.js.map