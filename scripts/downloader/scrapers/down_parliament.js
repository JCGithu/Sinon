function down_parliament(data) {
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
      let quals = ['normal', 'live'];
      runningAlert();
      for (let i = 0; i < quals.length; i++) {
        if (dlquality == 'normal') {
          execFile(
            versionInfo.ExtractorSet,
            [
              data.URL,
              data.path,
              order,
              data.proxy,
              versionInfo.ffmpegPath,
              data.instaUse,
              data.instaPass,
            ],
            extractorOptions,
            (error, stdout) => {
              if (error) {
                errorAlert(error, 'download', '', swalColour, '');
              } else {
                var livestreamurl = stdout.replace('\\r/', '/');
                successAlert(quals[i], livestreamurl, swalColour);
              }
            }
          );
        } else {
          //Python to change to JS
/*           if 'parliamentlive.tv' in parsedURL:
          feednumber = re.findall('x\/(.*?.*)', str(parsedURL))
          feednumbertwo = str(feednumber).replace('[','').replace(']','').replace("'","")
          anotherurl = 'https://ukparliament.cdn.eurovisioncdn.net/live/' + str(feednumbertwo) + '/live.isml/live-audio_track_0_eng=64000-video=1300000.m3u8'
          print (anotherurl) */
        }
      }
    },
  });
}

module.exports = down_parliament;
