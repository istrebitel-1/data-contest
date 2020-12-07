from flask import Flask, render_template, url_for, request
from parsers.connection import conn, cursor

app = Flask(__name__)

@app.route('/')
def index():
    url_for('static', filename='script.js')
    url_for('static', filename='style.css')
    url_for('static', filename='scriptSideBar.js')
    url_for('static', filename='styleSideBar.css')
    url_for('static', filename='scriptFedWin.js')
    url_for('static', filename='styleSFedWin.css')
    return render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


#национальные проекты
@app.route('/db_natdata', methods=['GET'])
def database_np():
    cursor.execute("select np.project_name||'$'||npb.budget||' млрд. руб.$'||count(fp.id_federal_project)||'$'||round(cast(np.released_budget/1000000000 as numeric), 2)||'$'||round(cast(npb.budget-(np.released_budget/1000000000) as numeric), 2)||'$'||pictures.url||'$'||np.np_api_id||';'"
                    " from test.national_projects np"
                    " join test.pictures on pictures.id_np = np.id_national_project"
                    " join test.federal_projects fp on np.id_national_project = fp.id_national_project"
                    " join test.national_project_budget npb on npb.id_national_project = np.id_national_project"
                    " group by np.project_name, np.released_budget, np.id_national_project, pictures.url, np.np_api_id, npb.budget"
                    " order by np.id_national_project")
    results = cursor.fetchall()
    output = ""
    for item in results:
        for subitem in item:
            output+=subitem
    output = output[:-1]
    return output


#федеральные проекты
@app.route('/db_fedList', methods=['GET'])
def database_fp():
    api_np_id = request.args['tempid']
    cursor.execute(
        "select fp.project_name||'$'||fp.fp_api_id||';'"
        "from test.federal_projects fp "
        "join test.national_projects np on np.id_national_project = fp.id_national_project "
        "where np.np_api_id ='%s'" %(api_np_id))

    results = cursor.fetchall()
    output = ""
    for item in results:
        for subitem in item:
            output+=subitem
    output = output[:-1]
    return output



if __name__ == "__main__":
    app.run(debug=True, host="26.237.70.37", port="80")
