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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gifsicle = require('gifsicle');
var execFile = require('child_process').execFile;
var convertAlert_1 = require("../alerts/convertAlert");
var successAlert_1 = require("../alerts/successAlert");
var utils_1 = require("../Utilities/utils");
var OS_FF_1 = require("../Utilities/OS&FF");
var sweetalert2_1 = __importDefault(require("sweetalert2"));
function gifConvert(convertInfo, swalColour) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            sweetalert2_1.default.fire({
                icon: 'info',
                title: "Settings",
                text: "Normal or advanced settings?",
                input: 'select',
                inputOptions: {
                    basic: 'Basic',
                    advanced: 'Advanced',
                },
                confirmButtonText: 'Run!',
                showLoaderOnConfirm: true,
                backdrop: swalColour.loading,
                target: document.getElementById('swalframe'),
                preConfirm: function (gifQual) {
                    if (gifQual == 'basic') {
                        var finalOutput_1 = convertInfo.outputFile + '.gif';
                        var finalOutputName = path.parse(convertInfo.file).name + '.gif';
                        if (convertInfo.inputExt.indexOf('.gif') >= 0) {
                            finalOutput_1 = convertInfo.outputFile + '-SinonConverted.gif';
                            finalOutputName = path.parse(convertInfo.file).name + '-SinonConverted.gif';
                        }
                        var OptimalOutput_1 = convertInfo.outputFile + '_basic.gif';
                        OS_FF_1.ffmpeg(convertInfo.file).format('gif').fps(12).complexFilter([
                            '[0:v]mpdecimate[frames]',
                            '[frames]scale=w=trunc(oh*a/2)*2:h=360[rescaled]'
                        ], 'rescaled').on('progress', function (progress) {
                            document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed() + '%';
                            console.log('Processing: ' + progress.percent + '% done');
                            var percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
                            utils_1.win.setProgressBar(percentage);
                        }).save(finalOutput_1).on('end', function () {
                            document.getElementById("progressText").textContent = 'Optimising';
                            execFile(gifsicle, ['-o', OptimalOutput_1, '--lossy=100', '-O3', '--colors=128', finalOutput_1], function (err) {
                                console.log('Conversion Success!');
                                utils_1.fs.unlink(finalOutput_1, function (err) {
                                    if (err)
                                        throw err;
                                    console.log('File deleted!');
                                });
                                successAlert_1.successAlert('convert', '', swalColour);
                            });
                        });
                        console.log('gif running');
                        console.log('Final output: ', finalOutput_1);
                        utils_1.lineBreak();
                        convertAlert_1.convertAlert(swalColour);
                    }
                    else {
                        sweetalert2_1.default.mixin({
                            confirmButtonText: 'Next &rarr;',
                            progressSteps: ['1', '2', '3', '4', '5'],
                            backdrop: swalColour.loading,
                            target: document.getElementById('swalframe')
                        }).queue([
                            {
                                title: 'Resolution',
                                text: 'Please choose the resolution of your GIF',
                                input: 'select',
                                inputOptions: {
                                    High: '1080p',
                                    hMid: '720p',
                                    lMid: '480p',
                                    hlow: '360p',
                                    low: '240p',
                                },
                                inputPlaceholder: 'Select Resolution',
                            },
                            {
                                title: 'Colour Quality',
                                text: 'Please choose the colour space of your GIF',
                                input: 'select',
                                inputOptions: {
                                    High: 'High / 256',
                                    Mid: 'Normal / 128',
                                    Low: 'Optimised / 64',
                                },
                                inputPlaceholder: 'Select Colour Range',
                            },
                            {
                                title: 'Frame Rate',
                                text: 'Please choose your fps',
                                input: 'range',
                                inputAttributes: {
                                    min: '1',
                                    max: '60',
                                    step: '1',
                                },
                                inputValue: 25,
                            },
                            {
                                title: 'Crop',
                                text: 'Do you want to crop the GIF?',
                                input: 'select',
                                inputOptions: {
                                    None: 'No',
                                    Wide: 'Widescreen',
                                    Square: 'Square',
                                    Vertical: 'Vertical',
                                    Two: "2:1"
                                },
                            },
                            {
                                title: 'Compression',
                                text: 'Please your compression rate',
                                input: 'range',
                                inputAttributes: {
                                    min: '0',
                                    max: '100',
                                    step: '1',
                                },
                                inputValue: 50,
                            }
                        ]).then(function (result) {
                            if (result.value) {
                                var rez = void 0, qual = void 0, fps = void 0, crop = void 0, compress = void 0;
                                var gifValues = [rez, qual, fps, crop, compress];
                                var i = 0;
                                for (var gifValue in gifValues) {
                                    gifValues[i] = result.value[i];
                                    i++;
                                }
                                var reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=480[rescaled]';
                                var cRange_1 = '--colors=128';
                                var gifCrop = void 0;
                                if (rez == 'High') {
                                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=1080[rescaled]';
                                }
                                else if (rez == 'hMid') {
                                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=720[rescaled]';
                                }
                                else if (rez == 'hlow') {
                                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=360[rescaled]';
                                }
                                else if (rez == 'low') {
                                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=240[rescaled]';
                                }
                                ;
                                var opti_1 = true;
                                if (compress == 0) {
                                    opti_1 = false;
                                }
                                if (qual == 'High') {
                                    cRange_1 = '--colors=256';
                                }
                                else if (qual == 'Low') {
                                    cRange_1 = '--colors=64';
                                }
                                ;
                                if (crop == 'None') {
                                    gifCrop = '[rescaled]crop=w=iw[cropped]';
                                }
                                else if (crop == 'Wide') {
                                    gifCrop = "[rescaled]crop='in_w:if(lt(in_w,in_h),in_w*(9/16),in_h)'[cropped]";
                                }
                                else if (crop == 'Square') {
                                    gifCrop = "[rescaled]crop='if(lt(in_h,in_w),in_h,in_w):if(lt(in_w,in_h),in_w,in_h)'[cropped]";
                                }
                                else if (crop == 'Vertical') {
                                    gifCrop = '[rescaled]crop=w=ih*(9/16)[cropped]';
                                }
                                else if (crop == 'Two') {
                                    gifCrop = '[rescaled]crop=h=iw*0.5[cropped]';
                                }
                                ;
                                var lossy_1 = '--lossy=' + compress;
                                var finalOutput_2 = convertInfo.outputFile + '.gif';
                                var finalOutputName = path.parse(convertInfo.file).name + '.gif';
                                if (convertInfo.inputExt.indexOf('.gif') >= 0) {
                                    finalOutput_2 = convertInfo.outputFile + '-SinonConverted.gif';
                                    finalOutputName = path.parse(convertInfo.file).name + '-SinonConverted.gif';
                                }
                                var OptimalOutput_2 = convertInfo.outputFile + '_advanced.gif';
                                OS_FF_1.ffmpeg(convertInfo.file).format('gif').fps(fps).complexFilter([
                                    '[0:v]mpdecimate[frames]', reRez, gifCrop
                                ], 'cropped').on('progress', function (progress) {
                                    document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed() + '%';
                                    console.log('Processing: ' + progress.percent + '% done');
                                    var percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
                                    utils_1.win.setProgressBar(percentage);
                                }).save(finalOutput_2).on('end', function (stdout, stderr) {
                                    if (opti_1 == true) {
                                        document.getElementById("progressText").textContent = 'Optimising';
                                        execFile(gifsicle, ['-o', OptimalOutput_2, lossy_1, '-O3', cRange_1, finalOutput_2], function (err) {
                                            console.log('Conversion Success!');
                                            utils_1.fs.unlink(finalOutput_2, function (err) {
                                                if (err)
                                                    throw err;
                                                console.log('File deleted!');
                                            });
                                            successAlert_1.successAlert('convert', '', swalColour);
                                        });
                                    }
                                    else {
                                        successAlert_1.successAlert('convert', '', swalColour);
                                    }
                                });
                                console.log('gif running');
                                console.log('Final output: ', finalOutput_2);
                                utils_1.lineBreak();
                                convertAlert_1.convertAlert(swalColour);
                            }
                        });
                    }
                }
            });
            return [2 /*return*/];
        });
    });
}
module.exports = {
    gifConvert: gifConvert
};
