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
//Utils
var _a = require('../utilities/utils'), lineBreak = _a.lineBreak, swalColours = _a.swalColours, URLwipe = _a.URLwipe;
var execFile = require('child_process').execFile;
var stream = require('stream');
var promisify = require('util').promisify;
var extractorPath = path.join(__dirname, '/../../engine/dist/extractor');
var extractorOptions = {
    cwd: extractorPath
};
versionInfo.extractorPath = extractorPath;
var errorAlert = require('../alerts/errorAlert');
var inputDetails = require('../downloader/inputDetails');
var gateKeeper = require('../downloader/gateKeeper');
//Downloaders
var down_bbc = require('../downloader/scrapers/down_bbc');
var down_file = require('../downloader/scrapers/down_file');
var down_insta = require('../downloader/scrapers/down_insta');
var down_parliament = require('../downloader/scrapers/down_parliament');
var down_periscope = require('../downloader/scrapers/down_periscope');
var down_skip = require('../downloader/scrapers/down_skip');
var down_youtube = require('../downloader/scrapers/down_youtube');
var down_mp4 = require('../downloader/scrapers/down_mp4');
var down_scrape = require('../downloader/scrapers/down_scrape');
var down_facebook = require('../downloader/scrapers/down_facebook');
function downloader() {
    return __awaiter(this, void 0, void 0, function () {
        var input;
        return __generator(this, function (_a) {
            //Inputs
            swalColours();
            input = inputDetails();
            if (input.path === '') {
                errorAlert('', 'basic', 'No download path given!');
            }
            gateKeeper(input).then(function (data) {
                if (data == false) {
                    errorAlert('', 'basic', "Couldn't connect to URL!");
                }
                var category = [
                    'file',
                    'skip',
                    'youtube',
                    'instagram',
                    'periscope',
                    'facebook',
                    'parliament',
                    'bbc',
                    'mp4',
                    'scrape',
                ];
                var versions = [
                    down_file,
                    down_skip,
                    down_youtube,
                    down_insta,
                    down_periscope,
                    down_facebook,
                    down_parliament,
                    down_bbc,
                    down_mp4,
                    down_scrape,
                ];
                for (var i = 0; i < category.length; i++) {
                    if (data.category == category[i]) {
                        versions[i](data, extractorOptions);
                    }
                }
                URLwipe();
            });
            return [2 /*return*/];
        });
    });
}
module.exports = downloader;
//# sourceMappingURL=downloader.js.map