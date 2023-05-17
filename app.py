# pip install flask pymongo dnspython requests bs4

from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

import certifi
import requests
import random
from bs4 import BeautifulSoup

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.qihykt0.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route("/teammate", methods=["POST"])
def teammate_post():
    name_receive = request.form['name_give']
    age_receive = request.form['age_give']
    residence_receive = request.form['residence_give']
    food_receive = request.form['food_give']
    mbti_receive = request.form['mbti_give']
    selfdesc_receive = request.form['selfdesc_give']
    respect_receive = request.form['respect_give']
    recentmovie_receive = request.form['recentmovie_give']
    trailer_receive = request.form['trailer_give']
    image_receive = request.form['image_give']
    
    #m_id는 mongdodb의 teammate 컬렉션에서 검색된 문서들의 개수 + 1~9999사이의 난수이다.!
    m_id = len(list(db.teammate.find({})))+random.randrange(1, 9999)

    doc = {
		'name':name_receive,
        'age':age_receive,
        'residence':residence_receive,
        'food':food_receive,
        'mbti':mbti_receive,
        'selfdesc':selfdesc_receive,
        'respect':respect_receive,
        'recentmovie':recentmovie_receive,
        'trailer':trailer_receive,
        'image': image_receive,
        'm_id':m_id
        
    }

    db.teammate.insert_one(doc)

    return jsonify({'msg':'저장완료!!'})

@app.route("/teammate", methods=["GET"])
def teammate_get():
    all_teammates = list(db.teammate.find({},{'_id':False}))
    return jsonify({'result':all_teammates})

@app.route("/commenter", methods=["POST"])
def commenter_post():
    nickname_receive = request.form['nickname_give']
    comment_receive = request.form['comment_give']
    doc = {
            'nickname': nickname_receive,
            'comment': comment_receive
    }
    db.commenter.insert_one(doc)
    return jsonify({'msg':'응원하기 완료!!'})

@app.route("/commenter", methods=["GET"])
def commenter_get():
    commenter_data = list(db.commenter.find({}, {'_id': False}))
    return jsonify({'result':commenter_data})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5100, debug=True)