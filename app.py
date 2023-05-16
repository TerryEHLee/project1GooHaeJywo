from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

import certifi
import requests
from bs4 import BeautifulSoup

ca = certifi.where()

client = MongoClient(
    'mongodb+srv://sparta:test@cluster0.ck1xgjf.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta
app = Flask(__name__)

# index.html로 연결


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/teammate_posting", methods=["POST"])
def movie_post():
    name_receive = request.form['name_give']
    age_receive = request.form['age_give']
    hobby_receive = request.form['hobby_give']
    mbti_receive = request.form['mbti_give']
    image_receive = request.form['image_give']
    myfavoriteURL_receive = request.form['myfavoriteURL_give']

    doc = {
        'name': name_receive,
        'age': age_receive,
        'hobby': hobby_receive,
        'mbti': mbti_receive,
        'image': image_receive,
        'myfavoriteURL': myfavoriteURL_receive
    }

    db.teammate.insert_one(doc)
    return jsonify({'msg': '기록하기 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5100, debug=True)
