#!/usr/bin/env pipenv run python
# -*- coding: utf-8 -*-

#PARSING
import re
import requests
from bs4 import BeautifulSoup

#SHELL
import subprocess
import os
import sys

#REAL INPUTS

test = False

if test is True :
    initialurl = 'https://myfox8.com/news/woman-participates-in-covid-19-vaccine-trial-so-she-can-hug-her-grandchildren-again/'
    downloadPath = r'C:\Users\jackc\Desktop\metro'
    order = 'extract'
    finalurl = ''
    geo = 'UK'
    userProxy = ''
    ffmpegPath = r''
    instaUse = ''
    instaPass = ''
else:
    initialurl = sys.argv[1]
    downloadPath = sys.argv[2]
    order = sys.argv[3]
    finalurl = sys.argv[4]
    geo = sys.argv[5]
    userProxy = sys.argv[6]
    ffmpegPath = sys.argv[7]
    instaUse = sys.argv[8]
    instaPass = sys.argv[9]

soup = ''

#EXTRACTOR
if 'extract' in order:

    errorcode = ''

    if '.mp4' in initialurl:
        errorcode = 'Generic'
    if '.mpd' in initialurl:
        errorcode = 'Generic'
    if '.m3u8' in initialurl:
        errorcode = 'Generic'
    if '.mp3' in initialurl:
        errorcode = 'Generic'

    def run_extractor(initialurl,userProxy):

        finalurl = "noweb"
        errorcode = 'pass'
        soup = ''

        text_file = open("NeedProxyList.txt", "r")
        proxy_list1 = text_file.readlines()
        proxy_list_final=[]

        def proxyCheck(initialurl, userProxy):
            for element in proxy_list1:
                proxy_list_final.append(element.strip())

            if any(s in initialurl for s in proxy_list_final):
                proxyRun = ''
                proxyCode = ''
                def proxyGet(userProxy):
                    if userProxy == '':
                        import dlproxy
                        return dlproxy.runProxy(proxyCode)
                    else: 
                        return userProxy
                proxyFill = proxyGet(userProxy)
                proxyRun = {
                "http": proxyFill,
                "https": proxyFill,
                }
            else:
                proxyRun = ''
                proxyCode = 'No'
            return proxyRun
        
        if 'UK' in geo:
            proxyRun = proxyCheck(initialurl, userProxy)
        else:
            proxyRun = ''

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36"
        }

        bypasslist = (
        'youtube.com',
        'twitter.com',
        'reddit.com',
        'instagram.com',
        'facebook.com',
        'cbc.ca', 
        'liveleak.com',
        'www.wsj.com/video/',
        'worldstarhiphop.com',
        'dailymail.co.uk',
        'itv.com/presscentre',
        'nbcnews.com',
        'parliamentlive.tv',
        'pscp.tv',
        'cloudfront.net',
        'vimeo.com',
        'itv.com/hub',
        'bbc.co.uk/iplayer',
        'bbc.co.uk/sounds',
        'bbc.co.uk/news/',
        '.cbslocal.com',
        'twitch.tv',
        'crunchyroll.com',
        'myspace.com',
        'soundcloud.com',
        'bandcamp.com',
        'tumblr.com',
        'weibo.com',
        )

        if any(s in initialurl for s in bypasslist):
            finalurl = initialurl
            errorcode = ''

        if 'facebook.com' in initialurl:
            if 'posts' in initialurl:
                source = requests.get(initialurl, verify=True).text
                soup = BeautifulSoup(source, 'lxml')
                texttwo = re.findall('permalinkURL:"(.*?videos.*?)"}],', str(soup))
                finalurl = str(texttwo[0]).replace("'","").replace("[","").replace("]","").replace("\/","/")
            
        if 'tiktok.com' in initialurl:
            if '?' in initialurl:
                texttwo = re.findall('video/(.*?)u', initialurl)
                textthree = str(texttwo).replace('[','').replace(']','').replace('?','').replace("'","")
            if '?' not in initialurl:
                textthree = initialurl[-19:]
            initialurl = 'https://www.tiktok.com/embed/' + textthree
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            texttwo = re.findall('(https\:\/\/v[0-9].*?)"', str(soup))
            finalurl = str(texttwo).replace("'","").replace("[","").replace("]","")

        if 'audioboom.com' in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = str(BeautifulSoup(source, 'lxml'))
            text = re.findall('(https.*?mp3)', soup)
            finalurl = text[1]

        #SINON RIPS

        if "abc7.com" in initialurl:
            texttwo = initialurl[-8:-1]
            textthree = 'https://api.abcotvs.com/v3/kabc/item/'+ texttwo + '?key=otv.web.kabc.player'
            r = requests.get(textthree, verify=True)
            textfour = re.findall('(https\:\/\/hq.*?mp4)', r.text)
            finalurl = ''.join(textfour)

        if "6abc.com" in initialurl:
            texttwo = initialurl[-8:-1]
            textthree = 'https://api.abcotvs.com/v3/wpvi/item/'+ texttwo + '?key=otv.web.kabc.player'
            r = requests.get(textthree, verify=True)
            textfour = re.findall('(https\:\/\/hq.*?mp4)', r.text)
            finalurl = ''.join(textfour)

        if "abc4.com" in initialurl:
            source = requests.get(initialurl, proxies = proxyRun, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('head')
            matchone = match.find('script', {'id': 'bob_003_tag_loader'})
            texttwo = re.findall('video_asset_url.*?(https.*?mp4)', str(matchone))
            textthree = ''.join(texttwo)
            finalurl = textthree.replace('\/','/')

        if 'wkrg.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('head')
            matchone = match.find('script', {'id': 'bob_003_tag_loader'})
            texttwo = re.findall('video_asset_url.*?(https.*?mp4)', str(matchone))
            textthree = ''.join(texttwo)
            finalurl = textthree.replace('\/','/')

        if 'woodtv.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('head')
            matchone = match.find('script', {'id': 'bob_003_tag_loader'})
            texttwo = re.findall('video_asset_url.*?(https.*?mp4)', str(matchone))
            textthree = ''.join(texttwo)
            finalurl = textthree.replace('\/','/')

        if 'abc11.com' in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            finalurl = str(re.findall('thumbnailUrl.*?(https.*?.m3u8)', str(soup))).replace("'","").replace("(","").replace(")","").replace("]","").replace("[","").replace('"','')

        if "tmj4.com" in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            finalurl = soup.find('div', class_ = 'PlaylistItem WheelItemVideo')['data-mp4']

        if "wptv.com" in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            finalurl = soup.find('div', class_ = 'PlaylistItem WheelItemVideo')['data-mp4']

        if "cbs12.com" in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            texttwo = re.findall('(http\:\\\/\\\/x(.*?)\.mp4)', soup.text)
            textthree = ''.join(texttwo[0])
            textfour = textthree.replace('\/','/')
            textfive = re.findall('(http\:\/\/.*?mp4)', textfour)
            finalurl = ''.join(textfive)

        if "wabi.tv" in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('(https\:\/\/.*?mp4)', soup.text)
            finalurl = ''.join(match)

        if "metro.co.uk" in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('source', {'type': 'video/mp4'})['src']
            finalurl = match.replace("640x360", "1024x576").replace("960x540", "1024x576").replace("480x270", "1024x576")

        if "mirror.co.uk" in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            finalurl = soup.find('meta', {'property': 'videoUrl'})['content']
            
        if "abc13.com" in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            matchone = soup.find('div', {'class': 'video-schema'})
            textthree = re.findall('(https\:\/\/content.*?)\"', str(matchone))
            textfour = str(textthree)
            finalurl = textfour.replace("'","").replace("[","").replace("]","")

        if 'wate.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun , verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('(var video_asset_url = "https.*?mp4)', soup.text)
            finalurl = str(match).replace('var video_asset_url = "','').replace('\\\\/','/').replace("'","").replace("[","").replace("]","")

        if 'cbsnews.com' in initialurl:
            source = requests.get(initialurl ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('(contentUrl":"https:.*?m3u8)', soup.text)
            finalurl = str(match).replace('contentUrl":"','').replace('\\\\/','/').replace("'","").replace("[","").replace("]","")
        
        '''  
        if ".cbslocal.com" in initialurl: 
            textfive = 'novideo'
            source = requests.get(initialurl, proxies = proxyRun, verify=True)
            print (source.headers)
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('script', {'type': 'application/ld+json'})
            matchone = str(re.findall('video.*?contentUrl.*?(https.*?)"', match.text)).replace("'","").replace("]","").replace("[","").replace('\\\/','/')
            source = requests.get(matchone, proxies = proxyRun, verify=True)
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('script', {'type': 'application/ld+json'})
            soup = 'noo'
            if 'contentUrl' in str(soup):
                matchtwo = re.findall('video\\\/(.*?)\-', match.text)
                textthree = 'https://tkx.apis.anvato.net/rest/v2/mcp/video/' + matchtwo[1] + '?anvack=DVzl9QRzox3ZZsP9bNu5Li3X7obQOnqP&anvtrid=w248f329fc8c8b77a1ab6c419&rtyp=fp&X-Anvato-Adst-Auth=3eFUXK5MECnX%2BWByfg6uXxwtdt8QxZvdRWnXoK%2BsxH%2FnxkVlSj1vd97U2pSiU%2FjUu1Ny%2FENZmJL5%2FI%2BgVO%2BXkw%3D%3D'
            if 'contentUrl' not in str(soup):
                match = str(re.findall(',"video":"(.*?)"', str(soup)))
                matchtwo = match.replace("'","").replace("]","").replace("[","")
                textthree = 'https://tkx.apis.anvato.net/rest/v2/mcp/video/' + matchtwo + '?anvack=DVzl9QRzox3ZZsP9bNu5Li3X7obQOnqP&anvtrid=w248f329fc8c8b77a1ab6c419&rtyp=fp&X-Anvato-Adst-Auth=3eFUXK5MECnX%2BWByfg6uXxwtdt8QxZvdRWnXoK%2BsxH%2FnxkVlSj1vd97U2pSiU%2FjUu1Ny%2FENZmJL5%2FI%2BgVO%2BXkw%3D%3D'
            source = requests.get(textthree, proxies = proxyRun, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            if '4000' in str(soup):
                textfive = re.findall('(http\:.*?4000\.mp4)', str(soup))
            else:
                if '_2500_' in str(soup):
                    textfive = re.findall('kbps":"2500".*?(http.*?_2500_.*?.mp4)', str(soup))
                else:
                    if '1500.' in str(soup):
                        textfive = re.findall('(http\:.*?1500\.mp4)', str(soup))
            textsix = ''.join(textfive)
            finalurl = textsix.replace('\/','/')
        '''
        if 'wxyz.com' in initialurl:
            source = requests.get(initialurl, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            finalurl = soup.find('div', class_ = 'PlaylistItem WheelItemVideo')['data-mp4']

        if 'wesh.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('div', {'id': 'w0'})['data-player-id']
            texttwo = 'https://nitehawk.hearst.io/embeds/' + match
            source = requests.get(texttwo, verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            finalurl = str(re.findall('"preset_name": "rover_16x9_720p_hd", "full_url": "(.*?)", "mapped_preset_name":', soup.text)).replace("'","").replace("]","").replace("[","")

        if 'news9.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('"Live","uri":"(.*?)"', soup.text)
            texttwo = str(match)
            finalurl = texttwo.replace("'","").replace("[","").replace("]","").replace("_1.mp4","_2.mp4")
        
        if 'khon2.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('(https:\/\/nxsglobal.*?mp4)', soup.text)
            finalurl = str(match).replace("'","").replace("[","").replace("]","")

        if 'wusa9.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = soup.find('div', {'class': 'video'})['data-model-apiresponse']
            textthree = str(re.findall('(http.*?m3u8)', str(match)))
            finalurl = textthree.replace("'","").replace("[","").replace("]","").replace(".m3u8","_1.ts")

        if "wbir.com" in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = str(re.findall('(https://video.*?m3u8)', str(soup))).replace("'","").replace("[","").replace("]","")
            finalurl = match.replace('.m3u8','_1.ts')

        if 'local10.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('(.m3u8"},{"url":"https:.*?mp4)', soup.text)
            finalurl = str(match[1]).replace('.m3u8"},{"url":"','').replace("'","").replace("[","").replace("]","")

        if 'idahonews.com' in initialurl:
            source = requests.get(initialurl ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            finalurl = str(re.findall('"mp4Url":"(.*?)"', str(soup))[1]).replace("\/","/").replace("'","").replace("[","").replace("]","")

        if 'wral.com' in initialurl: #NOT DONE
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            matchone = soup.find('iframe', {'class': 'wral-embedded-player'})['src']
            source = requests.get(matchone, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('x-mpegURL.*?(http.*?m3u8)', str(soup))
            finalurl = str(match[0]).replace('\/','/').replace("'","").replace("[","").replace("]","")

        if 'nbcsandiego.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = str(re.findall('mp4_url.*?(http.*?.mp4)', str(soup))).replace("'","").replace("[","").replace("]","").replace('\/','/')
            finalurl = match.replace('\/','/')

        if 'wtae.com' in initialurl: 
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('data-type="leaderboard.*?"(.*?)-leaderboard', str(soup))
            matchtwo = str(match[1]).replace('id="','')
            texttwo = 'https://nitehawk.hearst.io/embeds/' + matchtwo
            textthree = texttwo.replace(' ','')
            source = requests.get(textthree, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            if '1080p' in str(soup):
                match = re.findall('1080p.*?full_url.*?(http.*?.mp4)', str(soup))
            if '1080p' not in str(soup):
                if '720p' in str(soup):
                    match = re.findall('720p.*?full_url.*?(http.*?.mp4)', str(soup))
                if '720p' not in str(soup):
                    if '480p' in str(soup):
                        match = re.findall('480p.*?full_url.*?(http.*?.mp4)', str(soup))
                    if '480p' not in str(soup):
                        if '360p' in str(soup):
                            match = re.findall('360p.*?full_url.*?(http.*?.mp4)', str(soup))
                        if '360p' not in str(soup):
                            match = re.findall('240p.*?full_url.*?(http.*?.mp4)', str(soup))
            finalurl = str(match[0])
        
        if 'wpbf.com' in initialurl: 
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('data-player-id="(.*?)"', str(soup))
            matchtwo = str(match).replace('[','').replace(']','').replace("'","")
            texttwo = 'https://nitehawk.hearst.io/embeds/' + matchtwo
            textthree = texttwo.replace(' ','')
            source = requests.get(textthree, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            if '1080p' in str(soup):
                match = re.findall('1080p.*?full_url.*?(http.*?.mp4)', str(soup))
            if '1080p' not in str(soup):
                if '720p' in str(soup):
                    match = re.findall('720p.*?full_url.*?(http.*?.mp4)', str(soup))
                if '720p' not in str(soup):
                    if '480p' in str(soup):
                        match = re.findall('480p.*?full_url.*?(http.*?.mp4)', str(soup))
                    if '480p' not in str(soup):
                        if '360p' in str(soup):
                            match = re.findall('360p.*?full_url.*?(http.*?.mp4)', str(soup))
                        if '360p' not in str(soup):
                            match = re.findall('240p.*?full_url.*?(http.*?.mp4)', str(soup))
            finalurl = str(match[1]).replace('[','').replace(']','').replace("'","")

        if 'inforum.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('(https.*?mp4.*?)"', str(soup))
            finalurl = str(match[1])

        if 'kansascity.com' in initialurl: #notdone
            print ('This is a bad website. Use HLS Extension')
            
            '''
            source = requests.get(initialurl, proxies = proxyRun ,verify=True, headers = headers ).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('data-video-id="(.*?)"', str(soup))
            matchtwo = str(match[0]).replace("'","").replace("[","").replace("]","")
            texttwo = 'https://edge.api.brightcove.com/playback/v1/accounts/5502557046001/videos/' + matchtwo
            source = requests.get(texttwo, proxies = proxyRun ,verify=True, headers = headers).text
            soup = BeautifulSoup(source, 'lxml')
            print (str(soup))
            finalurl = str(re.findall('dash+xml","src":"(.*?)","', str(soup)))
            '''

        if 'wcvb.com' in initialurl:
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            match = re.findall('(stream_url.*?thumbnail_url)', soup.text)
            finalurl = str(match).replace('stream_url":"','').replace('","thumbnail_url','').replace('\\\\/','/').replace("'","").replace("[","").replace("]","")

        #FOXLIST

        foxlist = (
        'fox5sandiego.com',
        'fox10phoenix.com',
        'fox61.com',
        'fox13news.com',
        'fox5dc.com',
        'fox5atlanta.com',
        'wnep.com',
        'fox6now.com',
        'wtvr.com',
        'kdvr.com',
        'q13fox.com',
        'fox40.com',
        'fox4kc.com',
        'fox2now.com',
        'fox59.com',
        'foxla.com',
        'ktvu.com',
        'fox35orlando.com',
        'fox32chicago.com',
        'fox2detroit.com',
        'fox9.com',
        'fox5ny.com',
        'fox46charlotte.com',
        'fox29.com',
        'fox7austin.com',
        'fox4news.com',
        'fox26houston.com',
        'weareiowa.com',
        'myfox8.com',
        'wogx.com',
        'boston25news.com',
        'fox23.com'
        )

        if any(s in initialurl for s in foxlist):
            source = requests.get(initialurl, proxies = proxyRun ,verify=True).text
            soup = BeautifulSoup(source, 'lxml')
            matchtwo = "novideo"
            textthree = 'nah'
            texttwo = 'nah'

            if 'player_params' in str(soup):
                match = re.findall('decodeURIComponent(.*?), player_params', str(soup))
                texttwo = str(match[0]).replace("'","").replace("(","").replace(")","").replace("]","").replace("[","").replace('"','')
                matchtwo = 'https://house-fastly.us-east-1.ooyala.com/' + texttwo + '/1/dash/1.mpd'
            
            if 'prod/v3' in str(soup): #ANVATO V3 NOTTTT DONE
                #headersource = requests.get(initialurl, proxies = proxyRun ,verify=True).text
                match = str(soup.find('div', {'class': 'media-wrapper'}))
                matchtwo = str(re.findall('video":"(.*?)"', str(match))).replace('"','').replace("]","").replace("[","").replace("'","")
                texttwo = 'https://tkx.apis.anvato.net/rest/v2/mcp/video/' + matchtwo + '?anvack=anvato_mcp_lin_web_prod_4c36fbfd4d8d8ecae6488656e21ac6d1ac972749&anvtrid=wdbf644bca4ad4b88bd6fd863ed0510a&rtyp=fp&X-Anvato-Adst-Auth=BE%2FWfi77Egsiqwz0gg8ikqZHH4kI6uIbwL3rVDN2Q12tSA4QUPQnKXFqvK7LL8I%2FOu%2FZnZdhVR4d1IBfUifzCg%3D%3D'
                '''print (texttwo)'''
                source = requests.get(texttwo,proxies = proxyRun ,verify=True).text
                '''print (str(source))'''
                soup = BeautifulSoup(source, 'lxml')

            if 'anvatoId' in str(soup): #FIND ANVATO
                match = str(re.findall('anvatoId:(.*?),category', str(soup.prettify))).replace("'","").replace("]","").replace("[","").replace('"','')
                matchtwo = match[:6]
                texttwo = 'https://tkx.apis.anvato.net/rest/v2/mcp/video/' + matchtwo + '?anvack=bmQv8nXMalCOobBhvhpo9eMTE1OzN4lD&anvtrid=wdbf644b6161976fba36f9bf670b886a&rtyp=fp&X-Anvato-Adst-Auth=8o0qbsYBNlpcATSLrzxga9hCCn3ejtUqVD49vWd4QFdj4IlapcPTWhWgCDZ6%2B%2FQGdQzBt37LIs4KjMvtgZFENQ%3D%3D'
                source = requests.get(texttwo, proxies = proxyRun ,verify=True).text
                soup = BeautifulSoup(source, 'lxml')
            
            if 'anvatoId' not in str(soup): #FIND ANVATO
                if 'anvato-video-feature' in str(soup):
                    match = re.findall('data-videoid="(.*?)"', str(soup.prettify))
                    matchtwo = (match[0]).replace("'","").replace("]","").replace("[","").replace('"','')
                    texttwo = 'https://tkx.apis.anvato.net/rest/v2/mcp/video/' + matchtwo + '?anvack=GWj6LAB5n9XwdUvDZMT58Se7ldlQvn3o&anvtrid=wdbf644b2e050e4896d60e74d17a601f&rtyp=fp&X-Anvato-Adst-Auth=I7VVk%2BPODy7jzqRZJbEJ7run9S%2FGVe5vl%2F4UWRNfhyaBFH5tHkVOBjRwAaCw4xobgwndWrQ6A62Vr9cT1a%2FwiQ%3D%3D'
                    source = requests.get(texttwo, proxies = proxyRun ,verify=True).text
                    soup = BeautifulSoup(source, 'lxml')
            
            if 'anvato' in str(texttwo): #ANVATO RIP CODE
                if '3000.mp4' in str(soup):
                        match = str(re.findall('3000.*?"embed_url":"(.*?3000.mp4)', str(soup)))
                if '3000.mp4' not in str (soup):
                    if '2000.mp4' in str(soup):
                        match = str(re.findall('2000.*?"embed_url":"(.*?2000.mp4)', str(soup)))
                    if '2000.mp4' not in str (soup):
                        if '1800.mp4' in str(soup):
                            match = str(re.findall('1800.*?"embed_url":"(.*?1800.mp4)', str(soup)))
                        if '1800.mp4' not in str (soup):
                            if '1500.mp4' in str(soup):
                                match = str(re.findall('1500.*?"embed_url":"(.*?1500.mp4)', str(soup)))
                            if '1500.mp4' not in str(soup):
                                if '1000.mp4' in str(soup):
                                    match = str(re.findall('1000.*?"embed_url":"(.*?1000.mp4)', str(soup)))
                                if '1000.mp4' not in str(soup):
                                    if '600.mp4' in str(soup):
                                        match = str(re.findall('600.*?"embed_url":"(.*?600.mp4)', str(soup)))
                                    if '600.mp4' not in str (soup):
                                        match = str(re.findall('500.*?"embed_url":"(.*?500.mp4)', str(soup)))
                matchtwo = match.replace("'","").replace("]","").replace("[","").replace('"','').replace('\/','/').replace('\/','/')
            
            if '.m3u8' in str(soup):
                if 'data-stream' in str(soup):
                    match = str(soup.find('div', {'class': 'video'})['data-stream'])
                    matchtwo = str(match).replace('.m3u8','_1.ts')
            
            if 'ooyalaplayer-1' in str(soup):
                match = str(re.findall('vid_asset_url=(.*?)&', str(soup.prettify))).replace("'","").replace("]","").replace("[","")
                textthree = 'https://house-fastly.us-east-1.ooyala.com/' + match + '/1/ts/1.m3u8'
                if ',' in str(match):
                    texttwo = str(re.findall('(.*?),', str(match))).replace("'","").replace("]","").replace("[","")
                    textthree = 'https://house-fastly.us-east-1.ooyala.com/' + texttwo + '/1/ts/1.m3u8'
            
            if '1/ts/1.m3u8' in textthree:
                source = requests.get(textthree, proxies = proxyRun ,verify=True).text
                soup = BeautifulSoup(source, 'lxml')
                if '1920_3600K' in str(soup):
                    matchtwo = textthree.replace("1.m3u8","1920_3600K/manifest.m3u8")
                if '1920_3600K' not in str(soup):
                    if '1920_2600K' in str(soup):
                        matchtwo = textthree.replace("1.m3u8","1920_2600K/manifest.m3u8")
                    if '1920_2600K' not in str(soup):
                        if '1280_1600K' in str(soup):
                            matchtwo = textthree.replace("1.m3u8","1280_1600K/manifest.m3u8")
                        if '1280_1600K' not in str(soup):
                            if '1280_1000K' in str(soup):
                                matchtwo = textthree.replace("1.m3u8","1280_1000K/manifest.m3u8")
                            if '1280_1000K' not in str(soup):
                                if '640_900K' in str(soup):
                                    matchtwo = textthree.replace("1.m3u8","640_900K/manifest.m3u8")
                                if '640_900K' not in str(soup):
                                    if '640_600K' in str(soup):
                                        matchtwo = textthree.replace("1.m3u8","640_600K/manifest.m3u8")
                                    if '640_600K' not in str(soup):
                                        matchtwo = textthree.replace("1.m3u8","320_300K/manifest.m3u8")
            
            if 'data-mp4' in str(soup):
                matchtwo = str(re.findall('data-mp4=(.*?mp4)', str(soup.prettify))).replace('"','').replace("]","").replace("[","").replace("'","")
            finalurl = matchtwo
        
        return finalurl

    if errorcode == 'Generic':
        print (errorcode)
    else:
        finalurl = run_extractor(initialurl, userProxy)

        #NO RESULTS
        if initialurl == '':
            errorcode = 'Err004' #No URL inputted
            print (errorcode)
        else:
            if "noweb" in finalurl:
                errorcode = "Err001" #This website is not covered. Ask Jack.
                print (errorcode)
            else:
                if "Access Restricted" in soup:
                    errorcode = "Err005" #Geo-restricted
                    print (errorcode)
                else:
                    if "novideo" in finalurl:
                        errorcode = "Err002" #Can't see any video on this page?
                        print (errorcode)
                    else:
                        if finalurl == '':
                            errorcode = "Err002" #Can't see any video on this page?
                            print (errorcode)
                        else:
                            if finalurl == 'locked':
                                errorcode = "Err003"  #This is a secure video
                                print (errorcode)
                            else:
                                print (finalurl)

if 'normal' in order:
    import dlnormal
    dlnormal.download(downloadPath, finalurl, ffmpegPath)

if 'high' in order:
    import dlhigh
    dlhigh.download(downloadPath, finalurl, ffmpegPath)

if 'live' in order:
    import dllive
    dllive.download(finalurl)

if 'periscopefail' in order:
    import dlperiscope
    dlperiscope.m3u8(initialurl)

if 'stories' in order:
    import dlstories
    dlstories.start(downloadPath, finalurl, instaUse, instaPass, ffmpegPath)

sys.stdout.flush()