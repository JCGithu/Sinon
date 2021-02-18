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
var convertAlert = require('../alerts/convertAlert.js');
var successAlert = require('../alerts/successAlert.js');
var _a = require('../utilities/utils.js'),
  lineBreak = _a.lineBreak,
  progressBar = _a.progressBar;
var execFile = require('child_process').execFile;
var gifsicle = require('gifsicle');
function gifConvert(convertInfo) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      Swal.fire({
        icon: 'info',
        title: 'Settings',
        text: 'Basic or advanced settings?',
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
            var basicVal = {
              value: ['hLow', 'Mid', '12', 'None', '0'],
            };
            gifRun(basicVal, convertInfo);
          } else {
            Swal.mixin({
              confirmButtonText: 'Next &rarr;',
              progressSteps: ['1', '2', '3', '4', '5'],
              backdrop: swalColour.loading,
              target: document.getElementById('swalframe'),
            })
              .queue([
                {
                  title: 'Resolution',
                  text: 'Please choose the resolution of your GIF',
                  input: 'select',
                  inputOptions: {
                    high: '1080p',
                    hMid: '720p',
                    lMid: '480p',
                    hLow: '360p',
                    low: '240p',
                  },
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
                    Two: '2:1',
                  },
                },
                {
                  title: 'Compression',
                  text: 'Please your compression rate </br> Please note this will increase conversion time.',
                  input: 'range',
                  inputAttributes: {
                    min: '0',
                    max: '100',
                    step: '1',
                  },
                  inputValue: 50,
                },
              ])
              .then(function (result) {
                gifRun(result, convertInfo);
              });
          }
        },
      });
      return [2 /*return*/];
    });
  });
}
function gifRun(result, convertInfo) {
  convertAlert(swalColour);
  var i = -1;
  function convertTHATFILE() {
    i++;
    if (i == convertInfo.targets.length) {
      console.log(i);
      successAlert('convert');
      win.setProgressBar(-1);
      console.log('finished!');
      lineBreak();
    } else if (i > convertInfo.targets.length) {
      return;
    } else {
      console.log(convertInfo.targets[i]);
      console.log(i);
      console.log('gif running');
      console.log(result);
      if (result.value) {
        var opti_1 = true;
        var rez_1 = ['high', 'hMid', 'lMid', 'hLow', 'low'];
        var rezRange_1 = [1080, 720, 480, 360, 240];
        var qual_1 = ['High', 'Mid', 'Low'];
        var qualRange_1 = [256, 128, 64];
        var crop_1 = ['None', 'Wide', 'Square', 'Vertical', 'Two'];
        var cropRange_1 = [
          'w=iw',
          "'in_w:if(lt(in_w,in_h),in_w*(9/16),in_h)'",
          "'if(lt(in_h,in_w),in_h,in_w):if(lt(in_w,in_h),in_w,in_h)'",
          'w=ih*(9/16)',
          'h=iw*0.5',
        ];
        var finalOutput_1 = convertInfo.targets[i].output + '.gif';
        if (convertInfo.targets[i].ext.indexOf('.gif') >= 0) {
          finalOutput_1 = convertInfo.targets[i].output + '-SinonConverted.gif';
        }
        var OptimalOutput_1 = convertInfo.targets[i].output + '_advanced.gif';
        function getOptions() {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              return [
                2 /*return*/,
                new Promise(function (resolve) {
                  var gifOptions = {};
                  gifOptions.fps = result.value[2];
                  if (result.value[4] == 0) {
                    opti_1 = false;
                  }
                  gifOptions.lossy = '--lossy=' + result.value[4];
                  for (var i_1 = 0; i_1 < rez_1.length + 1; i_1++) {
                    if (result.value[0] == rez_1[i_1]) {
                      gifOptions.resolution = '[frames]scale=w=trunc(oh*a/2)*2:h=' + rezRange_1[i_1] + '[rescaled]';
                    }
                    if (result.value[1] == qual_1[i_1]) {
                      gifOptions.colour = '--colors=' + qualRange_1[i_1];
                    }
                    if (result.value[3] == crop_1[i_1]) {
                      gifOptions.crop = '[rescaled]crop=' + cropRange_1[i_1] + '[cropped]';
                    }
                    if (i_1 == rez_1.length) {
                      resolve(gifOptions);
                    }
                  }
                }),
              ];
            });
          });
        }
        getOptions().then(function (gifOptions) {
          console.log(gifOptions);
          ffmpeg(convertInfo.targets[i].input)
            .format('gif')
            .fps(gifOptions.fps)
            .complexFilter(['[0:v]mpdecimate[frames]', gifOptions.resolution, gifOptions.crop], 'cropped')
            .on('progress', function (progress) {
              progressBar(progress, '');
            })
            .save(finalOutput_1)
            .on('end', function () {
              if (opti_1) {
                document.getElementById('progressText').textContent = 'Optimising';
                execFile(
                  gifsicle,
                  ['-o', OptimalOutput_1, gifOptions.lossy, '-O3', gifOptions.colour, finalOutput_1],
                  function () {
                    fs.unlink(finalOutput_1, function (err) {
                      if (err) throw err;
                      convertTHATFILE();
                    });
                  }
                );
              } else {
                convertTHATFILE();
              }
            });
        });
        console.log('Final output: ', finalOutput_1);
        lineBreak();
        convertAlert(swalColour);
      }
    }
  }
  convertTHATFILE();
}
module.exports = gifConvert;
//# sourceMappingURL=gif.js.map
