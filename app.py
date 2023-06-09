# python3 -m venv venv
# pip install flask pymongo dnspython requests bs4

from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

# import certifi
import requests
import random

# ca = certifi.where()

client = MongoClient(
    'mongodb+srv://sparta:test@cluster0.qihykt0.mongodb.net/?retryWrites=true&w=majority') #, tlsCAFile=ca
db = client.dbsparta
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/teammate", methods=["POST"])
def teammate_post():

    image_receive = request.form['image_give']
    name_receive = request.form["name_give"]
    age_receive = request.form["age_give"]
    residence_receive = request.form["residence_give"]
    mbti_receive = request.form["mbti_give"]
    selfdesc_receive = request.form["selfdesc_give"]
    why_receive = request.form["why_give"]
    hobby_receive = request.form["hobby_give"]
    workstyle_receive = request.form["workstyle_give"]
    TMI_receive =request.form['TMI_give']
    favsong_receive = request.form['favsong_give']
    songurl_receive = request.form['songurl_give']

    # m_id는 1~9999사이의 랜덤한 정수이다.!
    m_id = random.randrange(1, 9999)

    doc = {
        'image': image_receive,
        'name': name_receive,
        'age': age_receive,
        'residence': residence_receive,
        'mbti': mbti_receive,
        'selfdesc': selfdesc_receive,
        'why': why_receive,
        'hobby': hobby_receive,
        'workstyle': workstyle_receive,
        'TMI': TMI_receive,
        'favsong': favsong_receive,
        'songurl': songurl_receive,
        
        'm_id': m_id
    }

    db.teammate.insert_one(doc)

    return jsonify({'msg': '저장완료!!'})


@app.route("/teammate", methods=["GET"])
def teammate_get():
    all_teammates = list(db.teammate.find({}, {'_id': False}))
    return jsonify({'result': all_teammates})

# 응원댓글 POST


@app.route("/commenter", methods=["POST"])
def commenter_post():
    nickname_receive = request.form['nickname_give']
    comment_receive = request.form['comment_give']
    # r_id는 20000~29999사이 랜덤정수
    r_id = random.randrange(20000, 29999)
    doc = {
        'nickname': nickname_receive,
        'comment': comment_receive,
        'r_id': r_id,
    }
    db.commenter.insert_one(doc)
    return jsonify({'msg': '응원하기 완료!!'})

# 응원댓글 LIST


@app.route("/commenter", methods=["GET"])
def commenter_get():
    commenter_data = list(db.commenter.find({}, {'_id': False}))
    return jsonify({'result': commenter_data})

# 응원댓글 UPDATE


@app.route("/commenter/<int:r_id>", methods=["POST"])
def commenter_put(r_id):
    comment_receive = request.form['comment_give']
    replace = request.form.get('replace', '').lower() == 'true'

    if replace:
        db.commenter.update_one(
            {'r_id': r_id}, {'$set': {'comment': comment_receive}})
        return jsonify({'msg': '수정 완료!!'})
    else:
        return jsonify({'msg': 'Invalid request.'})

# 댓글 삭제


@app.route("/comment_delete", methods=["POST"])
def delete_post():
    nickname_receive = request.form['nickname_give']
    print(nickname_receive)
    db.commenter.delete_one({'nickname': nickname_receive})
    return jsonify({'msg': "삭제 완료."})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
