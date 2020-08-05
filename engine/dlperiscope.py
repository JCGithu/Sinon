from __future__ import unicode_literals
import re
import requests
from bs4 import BeautifulSoup
import sys
import youtube_dl

def m3u8(initialurl):
    pscpcode = str((re.findall('/w/(.*.)', initialurl))).replace('"','').replace("]","").replace("[","").replace("'","")
    perijson = 'https://proxsee.pscp.tv/api/v2/accessVideoPublic?broadcast_id=' + pscpcode + '&replay_redirect=false'
    source = requests.get(perijson ,verify=True)
    data = source.json()
    if 'Bad Request' in str(data):
        class MyLogger(object):
            def debug(self, msg):
                pass

            def warning(self, msg):
                pass

            def error(self, msg):
                print(msg)

        def my_hook(d):
            if d['status'] == 'finished':
                print ('Live URL extract success')

        ydl_opts = {
            'cachedir': False,
            'geo_bypass': True,
            'forceurl': True,
            'quiet': True,
            'format': 'lhlsweb/lhls/hls/best',
            'cookie': 'Number10Cookies.txt',
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            r = ydl.extract_info(initialurl, False)
            print (r['formats'][-1]['url'])
    else:
        if 'replay_url' in data:
            sourcetwo = requests.get(data['replay_url'] ,verify=True).text
            texttwo = (re.findall('(Transcoding.*?=replay)', sourcetwo))
            print (texttwo)
            textthree = 'https://prod-fastly-eu-west-1.video.periscope.tv/' + texttwo[1]
            print (textthree)
        else:
            sourcetwo = requests.get(data['hls_url'] ,verify=True).text
            texttwo = (re.findall('(Transcoding.*?live)', sourcetwo))
            textthree = 'https://prod-fastly-eu-west-1.video.periscope.tv/' + texttwo[1]
            print (textthree)
    sys.stdout.flush()