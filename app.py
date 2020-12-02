from flask import Flask, render_template, url_for


app = Flask(__name__)

@app.route('/')
def index():
    url_for('static', filename='style.css')
    url_for('static', filename='js.js')
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)