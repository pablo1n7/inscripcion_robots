from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

import json
from robot import *

app = Flask(__name__,static_folder='statics')
client = MongoClient('mongodb://localhost:27017/')
db = client.comprobot

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/registroRobots")
def formulario():
    return render_template("formulario.html")


@app.route('/inscribirRobot', methods=['POST'])
def inscribirRobot():
    r = Robot(request.get_json())
    r.guardar(db)
    return json.dumps({'status':'OK'})

@app.route('/getRobots', methods=['GET'])
def getRobots():
    robots = [r.json_serialize() for r in Robot.get_all(db)]
    return json.dumps(robots)

def main():
    app.run(host="192.168.0.104",debug=True)
    #app.run(debug=True)

if __name__ == '__main__':
    main()
