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
var _a = require('../utilities/utils.js'),
  lineBreak = _a.lineBreak,
  progressBar = _a.progressBar;
var successAlert = require('../alerts/successAlert.js');
var convertAlert = require('../alerts/convertAlert.js');
var errorAlert = require('../alerts/errorAlert.js');
function videoConvert(convertInfo) {
  return __awaiter(this, void 0, void 0, function () {
    var swalSet;
    return __generator(this, function (_a) {
      swalSet = {
        icon: 'info',
        input: 'select',
        confirmButtonText: 'Run!',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        target: document.getElementById('swalframe'),
      };
      Swal.fire(
        Object.assign(
          {
            title: 'File format',
            text: 'What format of video would you like to convert to?',
            inputOptions: {
              mp4: '.mp4',
              mov: '.mov',
              avi: '.avi',
              webm: '.webm',
            },
            preConfirm: function (videoForm) {
              Swal.fire(
                Object.assign(
                  {
                    title: 'Convert, how?',
                    text:
                      'Remuxing is significantly faster for some formats (MKV, MOV, etc), however may lose additional audio and subtitle tracks',
                    inputOptions: {
                      convert: 'Convert',
                      remux: 'Remux',
                    },
                    preConfirm: function (videoConv) {
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
                          var finalOutput = convertInfo.targets[i].output + '.' + videoForm;
                          if (
                            convertInfo.targets[i].ext.indexOf('.' + videoForm) >= 0 ||
                            convertInfo.targets[i].ext.indexOf('.' + videoForm.toUpperCase()) >= 0
                          ) {
                            finalOutput = convertInfo.targets[i].output + '-SinonConverted.' + videoForm;
                          }
                          console.log('Final output: ', finalOutput);
                          var runMP4 = ffmpeg(convertInfo.targets[i].input);
                          if (videoConv == 'convert') {
                            runMP4.format(videoForm);
                            runMP4.save(finalOutput);
                          } else {
                            runMP4.videoCodec('copy');
                            runMP4.audioCodec('aac');
                            runMP4.outputOptions(['-map 0:v', '-map 0:a:?']);
                            runMP4.output(finalOutput);
                          }
                          runMP4
                            .on('error', function (err, stdout, stderr) {
                              err = err + stdout + stderr;
                              errorAlert(err, 'convert', '');
                            })
                            .on('progress', function (progress) {
                              progressBar(progress, '');
                            })
                            .on('end', function () {
                              convertTHATFILE();
                            })
                            .run();
                        }
                      }
                      convertTHATFILE();
                    },
                  },
                  swalSet
                )
              );
            },
          },
          swalSet
        )
      );
      return [2 /*return*/];
    });
  });
}
module.exports = videoConvert;
//# sourceMappingURL=video.js.map
