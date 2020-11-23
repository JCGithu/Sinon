#!/usr/bin/env pipenv run python

from __future__ import unicode_literals
import youtube_dl

import os
import sys
import subprocess
from subprocess import call

def download(downloadPath, finalurl, ffmpegPath):
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
        'format': 'bestvideo+bestaudio/best',
        'updatetime': False,
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
        'outtmpl': downloadPath + '/%(title)s.%(ext)s',
        'ffmpeg_location': ffmpegPath,
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([finalurl])
