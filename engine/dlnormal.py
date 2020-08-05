#!/usr/bin/env pipenv run python

from __future__ import unicode_literals
import youtube_dl

import os
import subprocess
import sys
from pathlib import Path

#PARSING
import re
import requests
from bs4 import BeautifulSoup

def download(downloadPath, finalURL, ffmpegPath):

    print ('Normal Downloader Running')
    print ('URL recieved is:')
    print (finalURL)
    print ('Download Path Recieved is:')
    print (downloadPath)

    #YOUTUBE-DL LOGGING
    class MyLogger(object):
        def debug(self, msg):
            pass

        def warning(self, msg):
            pass

        def error(self, msg):
            print(msg)

    def my_hook(d):
        if d['status'] == 'finished':
            print('Success')

    ydl_opts = {
        'format': 'best',
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
        'outtmpl': downloadPath + '/%(title)s.mp4',
        'ffmpeg_location': ffmpegPath,
    }

    if 'twitter.com' in finalURL:

        accountName = str(re.findall('twitter.com/(.*?)/status', finalURL)).replace('[','').replace(']','').replace("'","")

        ydl_opts = {
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
        'outtmpl': downloadPath + '/' + str(accountName) + '.%(ext)s',
        'ffmpeg_location': ffmpegPath,
        }

    if 'pscp.tv' in finalURL:

        source = requests.get(finalURL, verify=True).text
        soup = BeautifulSoup(source, 'lxml')
        texttwo = re.findall('\(@(.*?)\)', str(soup))
        textthree = str(texttwo).replace('[','').replace(']','').replace("'","")

        ydl_opts = {
            'logger': MyLogger(),
            'progress_hooks': [my_hook],
            'outtmpl': downloadPath + '/' + textthree + '.%(ext)s',
            'ffmpeg_location': ffmpegPath,
        }


        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            r = ydl.extract_info(finalURL, False)
            finalURL = (r['formats'][-1]['url'])

    if 'cloudfront.net' in finalURL:

        ydl_opts = {
            'logger': MyLogger(),
            'progress_hooks': [my_hook],
            'outtmpl': downloadPath + '/%(title)s.%(ext)s',
            'ffmpeg_location': ffmpegPath,
        }

    if '.mpd' in finalURL:
        ydl_opts = {
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
        'outtmpl': downloadPath + '/%(title)s.%(ext)s',
        'ffmpeg_location': ffmpegPath,
        }

    if 'itv.com/hub' in finalURL:
        ydl_opts = {
            'quiet': True,
            'logger': MyLogger(),
            'progress_hooks': [my_hook],
            'outtmpl': downloadPath + '/%(title)s.%(ext)s',
            'ffmpeg_location': ffmpegPath,
        }

    if "bbc.co.uk/iplayer" in finalURL:
        pidcode = str(re.findall('episode/(.*?)/',finalURL)).replace('[','').replace(']','').replace("'","")
        subprocess.call(['get_iplayer --pid=' + pidcode + ' --force --overwrite --tvmode=best --output="' + downloadPath + '"/'], shell=True)
    else:
        if "bbc.co.uk/sounds" in finalURL:
            pidcode = str(re.findall('play/(.*?)',finalURL)).replace('[','').replace(']','').replace("'","")
            subprocess.call(['get_iplayer --pid=' + finalURL + ' --force --overwrite --radiomode=best --output="' + downloadPath + '"/'], shell=True)
        else:
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download([finalURL])