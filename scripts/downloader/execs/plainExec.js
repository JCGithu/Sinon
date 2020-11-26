const { execFile } = require('child_process');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

const { lineBreak } = require('../../utilities/utils');

function plainExec(data, extractorOptions){
  console.log(data);
  execFile(
    versionInfo.ExtractorSet,
    [
      data.URL,
      data.path,
      data.options,
      data.proxy,
      versionInfo.ffmpegPath,
      data.instaUse,
      data.instaPass,
    ],
    extractorOptions,
    (error, stdout) => {
      if (error) {
        errorAlert(error + stdout, 'download', '', swalColour);
      } else {
        console.log(stdout);
        successAlert('', '', swalColour);
      }
      lineBreak();
    }
  )
}

module.exports = plainExec;