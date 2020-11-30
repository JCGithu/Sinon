const { execFile } = require('child_process');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

const { lineBreak } = require('../../utilities/utils');

function plainExec(data, extractorOptions){
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
        if (data.URL.indexOf('twitter.com') >= 0) {
          successAlert(
            '',
            'Please note: Twitter videos are named after the username! Some tweets are just too long for titles.',
            swalColour
          );
        } else {
          successAlert('', '', swalColour);
        }
      }
      lineBreak();
    }
  )
}

module.exports = plainExec;