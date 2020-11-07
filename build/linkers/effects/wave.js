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
var convertAlert_1 = require("../alerts/convertAlert");
var errorAlert_1 = require("../alerts/errorAlert");
var successAlert_1 = require("../alerts/successAlert");
var utils_1 = require("../Utilities/utils");
function wave(multi, swalColour, format) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    effectFile.forEach(function (fileSelected) {
                        var fileSettings = effectSetUp(fileSelected);
                        var finalOutput = fileSettings.outputFile + '-waveform.mov';
                        console.log('Final output: ', finalOutput);
                        utils_1.lineBreak();
                        convertAlert_1.convertAlert(swalColour);
                        ffmpeg(fileSelected)
                            .fps(25)
                            .format('mov')
                            .videoCodec('png')
                            .complexFilter(['aformat=channel_layouts=mono,compand=attacks=0:points=-80/-115|-35.1/-80|-35/-35|20/20=gain=-6,showwaves=s=2000x720:mode=cline:r=25:colors=#ffffff,format=yuva420p,colorkey=0x000000:0.1:0.5[v]'], 'v')
                            .outputOptions([
                            '-map 0:a',
                        ]).on('progress', function (progress) {
                            if (progress.percent === undefined) {
                                document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
                            }
                            else {
                                document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
                                console.log('Processing: ' + progress.percent + '% done');
                                var percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
                                utils_1.win.setProgressBar(percentage);
                            }
                        })
                            .on('error', function (err, stdout, stderr) {
                            errorAlert_1.errorAlert('', 'effect', err, swalColour, '');
                        })
                            .save(finalOutput).on('end', function (stdout, stderr) {
                            console.log('Conversion Success!');
                            resolve();
                            if (multi == false) {
                                successAlert_1.successAlert('effect', 'Wave created!', swalColour);
                                utils_1.win.setProgressBar(-1);
                            }
                        });
                    });
                })];
        });
    });
}
module.exports = {
    wave: wave
};
//# sourceMappingURL=wave.js.map