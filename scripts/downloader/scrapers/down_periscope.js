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
var axios = require('axios');
var runningAlert = require('../../alerts/runningAlert');
var successAlert = require('../../alerts/successAlert');
var errorAlert = require('../../alerts/errorAlert');
var progressBar = require('../../utilities/utils').progressBar;
var plainExec = require('../execs/plainExec');
function down_periscope(data, extractorOptions) {
    var _this = this;
    Swal.fire({
        icon: 'success',
        title: 'Video found!',
        text: 'Nice one, get .m3u8 url or download',
        input: 'select',
        inputOptions: {
            live: 'Grab .m3u8 Code',
            normal: 'Download Past Stream'
        },
        inputPlaceholder: 'Select Quality',
        confirmButtonText: 'Run!',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        target: document.getElementById('swalframe'),
        preConfirm: function (dlquality) {
            runningAlert();
            var regex = /(?<=\/w\/)[0-9A-Za-z]+/g;
            var token = data.URL.match(regex);
            if (token === null) {
                regex = /(?<=\/)[0-9A-Za-z]{13}(?![\/\.])/g;
                token = inputText.match(regex);
            }
            if (token[0].length > 20) {
                errorAlert('', 'basic', 'That Periscope URL looks too long. Please wait for the stream to load and the short URL to appear in your address bar');
            }
            else {
                data.URL = "https://api.periscope.tv/api/v2/getAccessPublic?token=" + token;
                axios.get(data.URL).then(function (response, error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (error) {
                            errorAlert(error, '', '');
                        }
                        else {
                            if (dlquality == 'normal') {
                                ffmpeg(response.data.replay_url)
                                    .format('mp4')
                                    .save(data.path + '\\periscope.mp4')
                                    .on('error', function (err, stdout, stderr) {
                                    err = err + stdout + stderr;
                                    errorAlert(err, 'convert', '');
                                })
                                    .on('progress', function (progress) {
                                    progressBar(progress, '');
                                })
                                    .on('end', function () {
                                    successAlert();
                                })
                                    .run();
                            }
                            else {
                                if (response.data.hls_url) {
                                    successAlert('live', response.data.hls_url);
                                }
                                else {
                                    errorAlert('', 'basic', 'No HLS URL found, is this livestream still running?');
                                }
                            }
                        }
                        return [2 /*return*/];
                    });
                }); });
            }
        }
    });
}
module.exports = down_periscope;
//# sourceMappingURL=down_periscope.js.map