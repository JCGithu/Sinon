from __future__ import unicode_literals
import youtube_dl

import os
import sys
import subprocess
import re

def download(parsedURL):
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

		if 'pscp.tv' in parsedURL:
			ydl_opts = {
				'forceurl': True,
				'format': 'lhlsweb/lhls/hls/best',
				'forceurl': True,
				'quiet': True,
			}

			with youtube_dl.YoutubeDL(ydl_opts) as ydl:
				r = ydl.extract_info(parsedURL, False)
				print (r['formats'][-1]['url'])

			sys.stdout.flush()
		else:
			ydl_opts = {
				'format': '95/300/94/93',
				'forceurl': True,
				'quiet': True,
			}

			with youtube_dl.YoutubeDL(ydl_opts) as ydl:
				r = ydl.extract_info(parsedURL, False)
				rtwo = (r['formats'])
				if '/96/' in str(rtwo):
						print (r['formats'][-2]['url'])
				else:
						print (r['formats'][-1]['url'])

			sys.stdout.flush()