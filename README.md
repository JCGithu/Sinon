
# Sinon
### A handy video tool.
#### Video tool built using [electron](http://electron.atom.io/), [node.js](https://nodejs.org/), and [python](https://www.python.org/).

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

*  __Audio__: Sites such as Soundcloud are also covered.

*  __Live Feeds__: Grab livestream codes (.m3u8) from Youtube and Periscope (or Parliament Live if you're missing that excitement in your life) these can be plugged into OBS and other software to record.

*  __Proxies__:
	* **Custom Proxies**: Ability to add a custom proxy has been added in settings.
	* **Automatic Proxies**: If a custom proxy is not set the app will automatically grab a free service online. Please note these may be tempremental, very slow, or most likely both.

*  __Other Features__:
	* **Dark Mode**: Because why not.
	* **Automatic URL Wiping**: to save those vital milliseconds.
	* **Autosaved settings**.

## Development
To build your own version of the app follow the following.
### Requierments: Node & Python 3 
> * Clone the repo to a folder
> * `npm install` to download dependencies
> * `pip install pipenv` install pipenv
> * `cd engine` you will need to be in the engine folder to build the python executable
> * `pipenv install` install python dependancies
> * `pipenv run pyinstaller -w --noconfirm extractor.py dllive.py dlstories.py` to build the downloader executable.
> * `npm start` to run the app.

## Thanks

This app is thanks to the tools made available by the teams behind __ffmepg__, __youtube-dl__, and __get_iplayer__.

Additional thanks to __Dirk Vingerhoeds__ for his PyInstaStories code and everyone over on the [Twitch stream](https://twitch.tv/colloquialowl):


| [GreatGameGal](https://twitch.tv/greatgamegal) |  The_Kiwi_Fruitbird | [RetroMMO](https://twitch.tv/retrommo) |
|--------------|---|---|
| [DaneHarnett](https://twitch.tv/daneharnett) | MG_John | [PikaProgram](https://github.com/PikaProgram) |
| [Nerolynx](https://github.com/nqngo) | <a href="https://github.com/dragonDScript" rel="dragonDScript">![dragonDScript](https://avatars2.githubusercontent.com/u/46191980?s=25)</a> | [Donjo9](https://github.com/donjo9) |


## License

[MIT](LICENSE)
