from flask import Flask, render_template, url_for
from parsers.connection import conn, cursor

app = Flask(__name__)

@app.route('/')
def index():
    url_for('static', filename='script.js')
    url_for('static', filename='style.css')
    return render_template("index.html")

#национальные проекты
@app.route('/db_natdata', methods=['GET'])
def database_np():
    cursor.execute("select np.project_name||'$'||round(cast(np.project_budget/10000000000 as numeric), 2)||' млрд. руб.$'||count(fp.id_federal_project)||'$'||count(fp.id_federal_project)||'$'||count(fp.id_federal_project)||';'"
        " from national_projects np"
        " join federal_projects fp on np.id_national_project = fp.id_national_project"
        " group by np.project_name, np.project_budget, np.id_national_project"
        " order by np.id_national_project")
    results = cursor.fetchall()
    output = ""
    for item in results:
        for subitem in item:
            output+=subitem
    output = output[:-1]
    return output


if __name__ == "__main__":
    app.run(debug=True)
