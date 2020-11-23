function down_bbc(data) {
  let iplayerMode = '--radiomode=best';
  if (data.URL.indexOf('iplayer') >= 0) {
    iplayerMode = '--tvmode=best';
  }

  Swal.fire({
    icon: 'success',
    title: 'Found!',
    text: 'Nice one, do you want the whole show or a segment?',
    input: 'select',
    inputOptions: {
      whole: 'Whole Episode',
      clip: 'Clip a Segment',
    },
    inputPlaceholder: 'Select',
    showCancelButton: true,
    confirmButtonText: 'Download',
    showLoaderOnConfirm: true,
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe'),
    preConfirm: (timing) => {
      function runiPlayer(iplayerArgs) {
        console.log(iplayerArgs);
        let iplayerOptions = {
          maxBuffer: 1024 * 30720,
          shell: true,
        };
        const iPlay = spawn('get_iplayer', iplayerArgs, iplayerOptions);

        document.getElementById('progressText').textContent = '...';

        iPlay.stdout.on('data', function (data) {
          console.log(data.toString().match(/(\d+.\d)%/g));
          if (data.toString() == null) {
            document.getElementById('progressText').textContent = '...';
          } else {
            document.getElementById('progressText').textContent = (
              '' + ('' + data.toString().match(/(\d+.\d)%/g)).replace(/\.0/g, '')
            ).replace(/null/g, '');
          }
        });
        iPlay.stderr.on('data', function (data) {
          console.log('stderr: ' + data.toString());
        });
        iPlay.on('close', () => {
          lineBreak();
          successAlert('', '', swalColour);
        });
      }

      if (timing === 'whole') {
        let iplayerArgs = ['--force', '--overwrite', '--log-progress', iplayerMode, '--output', downloadPath, data.URL];
        convertAlert();
        runiPlayer(iplayerArgs);
      }
      if (timing === 'clip') {
        Swal.fire({
          title: 'Input Start and Stop Times',
          html:
            "<a style='color:black'>Format is hh:mm:ss</a>" +
            '<input id="swal-input1" class="swal2-input" placeholder="00:00:00">' +
            '<input id="swal-input2" class="swal2-input" placeholder="00:00:00">',
          focusConfirm: false,
          target: document.getElementById('swalframe'),
          preConfirm: (formValues) => {
            let startNumber = document.getElementById('swal-input1').value,
              endNumber = document.getElementById('swal-input2').value,
              start = '--start=' + startNumber,
              end = '--stop=' + endNumber;
            if (start !== '') {
              if (end !== '') {
                let iplayerArgs = [
                  '--force',
                  '--overwrite',
                  '--log-progress',
                  iplayerMode,
                  start,
                  end,
                  '--output',
                  downloadPath,
                  data.URL,
                ];
                convertAlert();
                runiPlayer(iplayerArgs);
              }
            }
          },
        });
      }
    },
  });
}

module.exports = down_bbc;
