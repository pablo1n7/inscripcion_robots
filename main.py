from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

import json
from robot import *

app = Flask(__name__,static_folder='statics')

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/inscribirRobot', methods=['POST'])
def inscribirRobot():
    #user =  request.form['username']
    #password = request.form['password']
    print(request.get_json())
    r = Robot(request.get_json())
    return json.dumps({'status':'OK'})

def main():
    #app.run(host="192.168.0.104",debug=True)
    app.run(debug=True)
if __name__ == '__main__':
    main()
