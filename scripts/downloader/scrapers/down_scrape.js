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
var successAlert = require('../../alerts/successAlert');
var runningAlert = require('../../alerts/runningAlert');
var errorAlert = require('../../alerts/errorAlert');
var plainExec = require('../execs/plainExec');
var execFile = require('child_process').execFile;
var HttpsProxyAgent = require('https-proxy-agent');
var fetch = require('node-fetch');
var fileExec = require('../execs/fileExec');
function down_scrape(data, extractorOptions) {
    Swal.fire({
        icon: 'success',
        title: 'Video found!',
        showCancelButton: true,
        confirmButtonText: 'Download',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        preConfirm: function () {
            runningAlert();
            scraping(data, extractorOptions).then(function (data) {
                fileExec(data);
            });
        }
    });
}
function urlFix(url) {
    return __awaiter(this, void 0, void 0, function () {
        var newURL;
        return __generator(this, function (_a) {
            newURL = url
                .replace(/\\\/|\/\\|\/\/|\\\\/g, '/')
                .replace(':/', '://')
                .replace(':///', '://');
            return [2 /*return*/, newURL];
        });
    });
}
function scraping(data, extractorOptions) {
    return new Promise(function (resolve) {
        if (data.proxyUse == true) {
            if (data.proxy !== '') {
                fetch(data.URL, { agent: new HttpsProxyAgent('http://' + data.proxy) })
                    .then(function (res) {
                    console.log(res);
                })["catch"](function (err) {
                    errorAlert(err, 'download', '');
                    console.log(err);
                });
            }
            else {
                errorAlert('', 'basic', "This site needs a proxy and I can't find one! Maybe wait a second as I may still be looking for one");
            }
        }
        else {
            data.options = 'print';
            execFile(versionInfo.ExtractorSet, [data.URL, data.path, data.options, data.proxy, versionInfo.ffmpegPath, data.instaUse, data.instaPass], extractorOptions, function (error, stdout) {
                if (error) {
                    errorAlert(error, 'download', '');
                }
                else {
                    var sources = stdout
                        .replace('[', '')
                        .replace(']', '')
                        .split(/(?<=}),/g);
                    console.log(sources);
                    var value = 0;
                    for (var i = 0; i <= sources.length; i++) {
                        console.log(sources[i]);
                        var lastChars = sources[i].slice(-2);
                        var source = sources[i];
                        if (lastChars !== '}}') {
                            source = sources[i] + '}';
                        }
                        var videoData = JSON.parse(source);
                        if (videoData.height > value) {
                            data.URL = videoData.url;
                        }
                        if (i == sources.length) {
                            resolve(data);
                        }
                    }
                }
            });
        }
    });
}
module.exports = down_scrape;
//# sourceMappingURL=down_scrape.js.map