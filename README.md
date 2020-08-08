
# Sinon
### A handy video tool.
#### Video tool built using [electron](http://electron.atom.io/), [node.js](https://nodejs.org/), and [python](https://www.python.org/).

## Note

This is my first scripting project and I have learnt alongside it so there are undoubtedly a number of mistakes or (*probably extremely*) unoptimized code. If you can see a cruicial fault or want to offer improvement I welcome it -- provided it's constructive.

## Currently supported releases:

* OS X
* Windows

If you think it is missing a feature or you've found a bug feel free to open an issue, or even better sending a PR that fixes that.

## Features

*  __Video Downloader__: You can rip video from over 50 sites across the internet. Please test out a site and the app will tell you if it's included. If not please pass it on and it will be included in the next update.

*  __Converter__: You can convert to mp4, mp3, and GIF

*  __Effects__:
	* **Audio Waveform**: Turn clips into .MOV files with transparency for quick edits.
	![Example of wave produced](https://raw.githubusercontent.com/JCGithu/jackgracie.co.uk/master/dist/wave.jpg)
	* **Social Media Blur**: You know that unnamed effect where square or vertical video is centered in a 16:9 frame with a larger, blurred, version behind? Yeah this is that.
![Social Media Blur example](https://raw.githubusercontent.com/JCGithu/jackgracie.co.uk/master/dist/blur.jpg)


*  __Social Media__: Facebook, Twitter, Youtube, Instagram, Periscope, Twitch, Weibo, and even Tiktok because I need to stay relevant fellow kids.

*  __TV__:  To download BBC iPlayer and Sounds you will install 'Get_iPlayer'.

*  __Audio__: Sites such as Soundcloud and Audioboom are also covered.

*  __Live Feeds__: Grab livestream codes (.m3u8) from Youtube and Periscope (or Parliament Live if you're missing that excitement in your life) these can be plugged into OBS and other software to record.

*  __Proxies__:
	* **Custom Proxies**: Ability to add a custom proxy has been added in settings.
	* **Automatic Proxies**: If a custom proxy is not set the app will automatically grab a free service online. Please note these may be tempremental, very slow, or most likely both.

*  __Other Features__:
	* **Dark Mode**: Because why not.
	* **Automatic URL Wiping**: to save those vital milliseconds.
	* **Autosaved settings**.

## Development

Simply clone this repo and run `npm install` and then `npm run rebuild`.
Afterwards you can run `npm start` to run the app.

## Thanks

This app is thanks to the tools made available by the teams behind __ffmepg__, __youtube-dl__, and __get_iplayer__.

Additional thanks to __Dirk Vingerhoeds__ for his PyInstaStories code.

## License

MIT
