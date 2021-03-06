const axios = require('axios');
const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

const { progressBar } = require('../../utilities/utils');

const plainExec = require('../execs/plainExec');

function down_periscope(data, extractorOptions) {
  Swal.fire({
    icon: 'success',
    title: 'Video found!',
    text: 'Nice one, get .m3u8 url or download',
    input: 'select',
    inputOptions: {
      live: 'Grab .m3u8 Code',
      normal: 'Download Past Stream',
    },
    inputPlaceholder: 'Select Quality',
    confirmButtonText: 'Run!',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
    preConfirm: (dlquality) => {
      runningAlert();
      var regex = /(?<=\/w\/)[0-9A-Za-z]+/g;
      var token = data.URL.match(regex);
      data.URL = `https://api.periscope.tv/api/v2/getAccessPublic?token=${token}`;
      axios.get(data.URL).then(async (response, error) => {
        if (error) {
          errorAlert(error, '', '');
        } else {
          if (dlquality == 'normal') {
            console.log(response.data.replay_url);
            ffmpeg(response.data.replay_url)
              .format('mp4')
              .save(data.path + '\\periscope.mp4')
              .on('error', (err, stdout, stderr) => {
                err = err + stdout + stderr;
                errorAlert(err, 'convert', '');
              })
              .on('progress', (progress) => {
                progressBar(progress, '');
              })
              .on('end', () => {
                successAlert();
              })
              .run();
          } else {
            if (response.data.hls_url) {
              successAlert('live', response.data.hls_url);
            } else {
              errorAlert('', 'basic', 'No HLS URL found, is this livestream still running?');
            }
          }
        }
      });
    },
  });
}

module.exports = down_periscope;
