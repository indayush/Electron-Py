import sys
import os
sys.path.append(os.getcwd()+"/api")
from api import signin
# from flask import Flask,jsonify,request

app = Flask(__name__)

@app.route("/login_form",methods=['POST'])
def login_form():
    username = request.form.get('username')
    password = request.form.get('password')
    rememberme = request.form.get('rememberme')

    return signin.comLogin(username,password,rememberme)

if __name__ == "__main__":
    app.run(debug=True,port=5000)