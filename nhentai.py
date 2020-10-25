#!/usr/bin/python3
from bs4 import BeautifulSoup
import requests, os
from io import BytesIO
from PIL import Image
def parser(nuklir):
    hasil=requests.get('https://nhentai.net/g/%s'%(nuklir))
    parsing=BeautifulSoup(hasil.text, 'html.parser')
    komik=[]
    for i in parsing.find_all('a',class_='gallerythumb'):
        if i('img'):
            komik.append(i('img')[0]['data-src'])
    id_=komik[0].split('/')[-2]
    komik.insert(+0,'https://t.nhentai.net/galleries/%s/cover.jpg'%(id_))
    return download({
        'id':id_,
        'title':parsing.title.text,
        'image':komik,
        'url':hasil.url
    })
def download(form):
    id_ =form['id']
    title = form['title']
    url=form['url']
    halaman=[]
    print(form)
    for u in form['image'][1:]:
        print(u)
        halaman.append(Image.open(BytesIO(requests.get('https://i'+u[9:-5]+'.jpg').content)).convert("RGB"))
    halaman[0].save('pdf/%s.pdf'%(form['title']), save_all=True, append_images=halaman[1:-1])
    return title+'.pdf'
