<<<<<<< Updated upstream
const { remote, ipcRenderer } = require('electron');
const Swal = require('sweetalert2');
const { app, dialog } = require('electron').remote;

const win = remote.getCurrentWindow();
const fs = require('fs');
const path = require('path');
const os = require('os');

const FFmpegStatic = require('ffmpeg-static-electron');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const ffmpegOptions = {
  cwd: ffmpegPath,
=======
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __asyncValues =
  (this && this.__asyncValues) ||
  function (o) {
    if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
    var m = o[Symbol.asyncIterator],
      i;
    return m
      ? m.call(o)
      : ((o = typeof __values === 'function' ? __values(o) : o[Symbol.iterator]()),
        (i = {}),
        verb('next'),
        verb('throw'),
        verb('return'),
        (i[Symbol.asyncIterator] = function () {
          return this;
        }),
        i);
    function verb(n) {
      i[n] =
        o[n] &&
        function (v) {
          return new Promise(function (resolve, reject) {
            (v = o[n](v)), settle(resolve, reject, v.done, v.value);
          });
        };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({ value: v, done: d });
      }, reject);
    }
  };
var _a = require('electron'),
  remote = _a.remote,
  ipcRenderer = _a.ipcRenderer;
var Swal = require('sweetalert2');
var _b = require('electron').remote,
  app = _b.app,
  dialog = _b.dialog;
var win = remote.getCurrentWindow();
var fs = require('fs');
var path = require('path');
var os = require('os');
var FFmpegStatic = require('ffmpeg-static');
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(FFmpegStatic);
var contents = fs.readFileSync(path.resolve(__dirname, '..') + '/package.json');
var packageVersion = JSON.parse(contents).version;
var ffmpegOptions = {
  cwd: FFmpegStatic,
>>>>>>> Stashed changes
};
var versionInfo = {
  OS: '',
  ExtractorSet: 'extractor',
  ffmpegSet: 'ffmpeg',
  ffmpegPath: ffmpegPath,
  extractorPath: '',
};
var cpuCount = os.cpus().length;
//console.log(cpuCount)
var OSs = ['Win', 'Mac', 'X11', 'Linux'];
var plat = ['Windows', 'MacOS', 'UNIX', 'Linux'];
for (var i = 0; i < OSs.length; i++) {
  if (navigator.appVersion.indexOf(OSs[i]) != -1) {
    versionInfo.OS = plat[i];
  }
  if (navigator.appVersion.indexOf('Mac') != -1) {
    versionInfo.ExtractorSet = './extractor';
    versionInfo.ffmpegSet = './ffmpeg';
  }
}
<<<<<<< Updated upstream

const Block = require('../scripts/block');
const swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50' };

=======
var extractorPath = path.join(__dirname, '/../../engine/dist/extractor');
if (fs.existsSync(extractorPath)) {
  versionInfo.extractorPath = extractorPath;
} else {
  var extractorPath_1 = path.join(__dirname, '/../engine/dist/extractor');
  versionInfo.extractorPath = extractorPath_1;
}
var Block = require('../scripts/block');
var swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50' };
>>>>>>> Stashed changes
//Components
var wave = require('../scripts/components/wave');
var toolmenu = require('../scripts/components/toolmenu');
var optionsPage = require('../scripts/components/optionsPage');
var documentation = require('../scripts/components/documentation');
var toolBar = require('../scripts/components/toolBar');
var mainTitle = require('../scripts/components/title');
//Tool components
var toolDown = require('../scripts/components/tools/toolDown');
var toolConv = require('../scripts/components/tools/toolConv');
var toolEffect = require('../scripts/components/tools/toolEffect');
var toolSwap = require('../scripts/utilities/animations').toolSwap;
var versionChecker = require('../scripts/utilities/utils').versionChecker;
var proxyGenerator = require('../scripts/utilities/proxy');
var sinon = new Block('#sinon');
var bootComps = [wave, toolmenu, optionsPage, documentation, toolBar, mainTitle];
var tools = [toolDown, toolConv, toolEffect];
var toolKit = new Block('#currentTool');
for (var _i = 0, tools_1 = tools; _i < tools_1.length; _i++) {
  var tool = tools_1[_i];
  toolKit.addComponent(tool);
}
toolKit.showComponent('toolDown');
function sinonBoot() {
  var e_1, _a;
  return __awaiter(this, void 0, void 0, function () {
    var bootComps_1, bootComps_1_1, comp, e_1_1, target, customProxy, versionNumber, animations, settings, tools_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          bootComps_1 = __asyncValues(bootComps);
          _b.label = 1;
        case 1:
          return [4 /*yield*/, bootComps_1.next()];
        case 2:
          if (!((bootComps_1_1 = _b.sent()), !bootComps_1_1.done)) return [3 /*break*/, 4];
          comp = bootComps_1_1.value;
          sinon.addComponent(comp);
          _b.label = 3;
        case 3:
          return [3 /*break*/, 1];
        case 4:
          return [3 /*break*/, 11];
        case 5:
          e_1_1 = _b.sent();
          e_1 = { error: e_1_1 };
          return [3 /*break*/, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(bootComps_1_1 && !bootComps_1_1.done && (_a = bootComps_1['return']))) return [3 /*break*/, 8];
          return [4 /*yield*/, _a.call(bootComps_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3 /*break*/, 10];
        case 9:
          if (e_1) throw e_1.error;
          return [7 /*endfinally*/];
        case 10:
          return [7 /*endfinally*/];
        case 11:
          sinon.loadAll();
          target = document.getElementById('docText');
          customProxy = document.getElementById('customProxy');
          versionNumber = document.getElementById('ver');
          if (target) {
            target.innerHTML = fs.readFileSync(path.resolve(__dirname, '../GUI/changelog.html'), 'utf-8');
            animations = require('../scripts/utilities/animations');
            settings = require('../scripts/utilities/settings');
            tools_2 = require('../scripts/utilities/toolFunctions');
            toolSwap(toolKit);
            versionChecker();
            if (customProxy.value == '') {
              proxyGenerator().then(function (proxy) {
                customProxy.value = proxy;
              });
            }
          }
          return [2 /*return*/];
      }
    });
  });
}
sinonBoot();
//# sourceMappingURL=index.js.map
