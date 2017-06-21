from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

app = Flask(__name__,static_folder='statics')

@app.route("/")
def index():
    return render_template("index.html")

def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
