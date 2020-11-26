const axios = require('axios');
const runningAlert = require('../../alerts/runningAlert');
const successAlert = require('../../alerts/successAlert');
const errorAlert = require('../../alerts/errorAlert');

function down_parliament(data) {
  runningAlert();
  var regex = /[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+/g;
  var code = data.URL.match(regex);
  data.URL = `http://videoplayback.parliamentlive.tv/Player/Live/${code}`
  axios
    .get(data.URL)
    .then(async (response, error) => {
      if (error){
        errorAlert(error, '', '', swalColour);
      } else {
        var regex = /[0-9A-Za-z\/\.\-\:]+.m3u8/g;
        var livestreamURL = response.data.match(regex);
        successAlert('live', livestreamURL[0], swalColour);
      }
    })
}

module.exports = down_parliament;
