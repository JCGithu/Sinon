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
var sweetalert2_1 = require("sweetalert2");
var utils_1 = require("../Utilities/utils");
var successAlert_1 = require("../alerts/successAlert");
var convertAlert_1 = require("../alerts/convertAlert");
var errorAlert_1 = require("../alerts/errorAlert");
function videoConvert(convertInfo, swalColour) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            sweetalert2_1.default.fire({
                icon: 'info',
                title: "File format",
                text: "What format of video would you like to convert to?",
                input: 'select',
                inputOptions: {
                    mp4: '.mp4',
                    mov: '.mov',
                    avi: '.avi',
                    webm: '.webm',
                },
                confirmButtonText: 'Run!',
                showLoaderOnConfirm: true,
                backdrop: swalColour.loading,
                target: document.getElementById('swalframe'),
                preConfirm: function (videoForm) {
                    var videoFormCap = videoForm.toUpperCase();
                    var finalOutput = convertInfo.outputFile + '.' + videoForm;
                    if (convertInfo.inputExt.indexOf('.' + videoForm) >= 0 || convertInfo.inputExt.indexOf('.' + videoFormCap) >= 0) {
                        finalOutput = convertInfo.outputFile + '-SinonConverted.' + videoForm;
                    }
                    console.log('Final output: ', finalOutput);
                    utils_1.lineBreak();
                    sweetalert2_1.default.fire({
                        icon: 'info',
                        title: "Convert, how?",
                        text: "Remuxing is significantly faster for some formats (MKV, MOV, etc), however may lose additional audio and subtitle tracks",
                        input: 'select',
                        inputOptions: {
                            convert: 'Convert',
                            remux: 'Remux',
                        },
                        confirmButtonText: 'Run!',
                        showLoaderOnConfirm: true,
                        backdrop: swalColour.Loading,
                        target: document.getElementById('swalframe'),
                        preConfirm: function (videoConv) {
                            convertAlert_1.convertAlert(swalColour);
                            if (videoConv == 'convert') {
                                var runMP4 = ffmpeg(convertInfo.file).format(videoForm).on('progress', function (progress) { utils_1.progressBar(progress, ''); }).save(finalOutput);
                            }
                            else {
                                var runMP4 = ffmpeg(convertInfo.file).videoCodec('copy').audioCodec('aac').outputOptions([
                                    '-map 0:v', '-map 0:a:?',
                                ]).output(finalOutput).on('progress', function (progress) { utils_1.progressBar(progress, ''); });
                            }
                            runMP4.on('error', function (err, stdout, stderr) {
                                err = err + stdout + stderr;
                                errorAlert_1.errorAlert(err, 'convert', '', swalColour, '');
                            });
                            runMP4.on('end', function () {
                                successAlert_1.successAlert('convert', '', swalColour);
                            }).run();
                            console.log(videoForm + ' running');
                        }
                    });
                }
            });
            return [2 /*return*/];
        });
    });
}
module.exports = {
    videoConvert: videoConvert
};
//# sourceMappingURL=video.js.map