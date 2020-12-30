#!/usr/bin/env pipenv
# -*- coding: utf-8 -*-

from __future__ import unicode_literals

#PARSING
import re
import requests
from bs4 import BeautifulSoup
import json

#SHELL
import subprocess
import os
import sys
from pathlib import Path

import youtube_dl

#REAL INPUTS

test = False

if test is True :
	parsedURL = 'https://www.tiktok.com/@therock/video/6879854011848150277'
	downloadPath = r"C:\\Users\\jackc\\Desktop\\metro"
	options = 'normal'
	userProxy = ''
	ffmpegPath = r''
	instaUse = ''
	instaPass = ''
	print('TEST IS STILL ON')
else:
	parsedURL = sys.argv[1]
	downloadPath = sys.argv[2]
	options = sys.argv[3]
	userProxy = sys.argv[4]
	ffmpegPath = sys.argv[5]
	instaUse = sys.argv[6]
	instaPass = sys.argv[7]

def download(downloadPath, options, parsedURL, ffmpegPath):

	#YOUTUBE-DL LOGGING
	class MyLogger(object):
		def debug(self, msg):
			pass

		def warning(self, msg):
			pass

		def error(self, msg):
			print(msg)

	def download_hook(d):
		if d['status'] == 'finished':
				print('Success')

	ydl_opts = {
		'format': 'best[ext=mp4]/best',
		'logger': MyLogger(),
		'progress_hooks': [download_hook],
		'outtmpl': downloadPath + '/%(title)s.%(ext)s',
		'ffmpeg_location': ffmpegPath,
		'verbose': True,
	}
	if 'high' in options:
		ydl_opts['format'] = 'bestvideo+bestaudio/best'
		ydl_opts['updatetime'] = False
		ydl_opts['postprocessors'] = [{
				'key': 'FFmpegVideoConvertor',
				'preferedformat': 'mp4',
		}]
	if 'print' in options:
		ydl_opts['forceurl'] = True

	if 'twitter.com' in parsedURL:
		accountName = re.findall(r'(?<=\/)[A-z0-9]+(?=\/status)', parsedURL)
		ydl_opts['outtmpl'] = downloadPath + '/' + accountName[0] + '.mp4'

	if 'itv.com/hub' in parsedURL:
		ydl_opts['quiet'] = True

	if "bbc.co.uk/iplayer" in parsedURL:
		pidcode = str(re.findall('episode/(.*?)/',parsedURL)).replace('[','').replace(']','').replace("'","")
		subprocess.call(['get_iplayer --pid=' + pidcode + ' --force --overwrite --tvmode=best --output="' + downloadPath + '"/'], shell=True)
	else:
		if "bbc.co.uk/sounds" in parsedURL:
			pidcode = str(re.findall('play/(.*?)',parsedURL)).replace('[','').replace(']','').replace("'","")
			subprocess.call(['get_iplayer --pid=' + parsedURL + ' --force --overwrite --radiomode=best --output="' + downloadPath + '"/'], shell=True)
		else:
			with youtube_dl.YoutubeDL(ydl_opts) as ydl:
				if 'print' in options:
					r = ydl.extract_info(parsedURL, False)
					r2 = json.dumps(r['formats'])
					print (r2)
				else:
					ydl.download([parsedURL])


if 'facebook.com' in parsedURL:
		if 'posts' in parsedURL:
				source = requests.get(parsedURL, verify=True).text
				soup = BeautifulSoup(source, 'lxml')
				texttwo = re.findall('permalinkURL:"(.*?videos.*?)"}],', str(soup))
				parsedURL = str(texttwo[0]).replace("'","").replace("[","").replace("]","").replace("\/","/")

if 'normal' in options or 'high' in options or 'print' in options:
	download(downloadPath, options, parsedURL, ffmpegPath)

if 'live' in options:
	import dllive
	dllive.download(parsedURL)

if 'stories' in options:
	import dlstories
	dlstories.start(downloadPath, parsedURL, instaUse, instaPass, ffmpegPath)

sys.stdout.flush()