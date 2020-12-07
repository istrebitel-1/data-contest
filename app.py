from flask import Flask, render_template, url_for, request, send_from_directory
from parsers.connection import conn, cursor
import os


app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/')
def index():
    url_for('static', filename='script.js')
    url_for('static', filename='style.css')
    url_for('static', filename='scriptSideBar.js')
    url_for('static', filename='styleSideBar.css')
    return render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


# национальные проекты
@app.route('/db_natdata', methods=['GET'])
def database_np():
    cursor.execute("select np.project_name||'$'||npb.budget||' млрд. руб.$'||count(fp.id_federal_project)||'$'||round(cast(np.released_budget/1000000000 as numeric), 2)||'$'||round(cast(npb.budget-(np.released_budget/1000000000) as numeric), 2)||'$'||pictures.url||'$'||np.np_api_id||';'"
        " from national_projects np"
        " join pictures on pictures.id_np = np.id_national_project"
        " join federal_projects fp on np.id_national_project = fp.id_national_project"
        " join national_project_budget npb on npb.id_national_project = np.id_national_project"
        " group by np.project_name, np.released_budget, np.id_national_project, pictures.url, np.np_api_id, npb.budget"
        " order by np.id_national_project")
    results = cursor.fetchall()
    output = ""
    for item in results:
        for subitem in item:
            output+=subitem
    output = output[:-1]
    return output


# федеральные проекты
@app.route('/db_fedList', methods=['GET'])
def database_fp():
    api_np_id = request.args['tempid']
    cursor.execute(
        " select fp.project_name||'$'||fp.fp_api_id||';'"
        " from federal_projects fp "
        " join national_projects np on np.id_national_project = fp.id_national_project "
        " where np.np_api_id ='%s'" %(api_np_id))
    results = cursor.fetchall()
    output = ""
    for item in results:
        for subitem in item:
            output+=subitem
    output = output[:-1]
    return output


# Окно по федеральному проекту
@app.route('/db_fedwindow', methods=['GET'])
def db_fedwindow():
    api_fp_id = request.args['fp_id']
    cursor.execute(
        "select distinct np.project_name||'$'||fp.project_name||'$'||fp.contracts_count||'$'||round(cast(fp.contracts_sum as numeric), 2)"
        " ||'$'||fp.subsidies_count||'$'||round(cast(fp.subsidies_sum as numeric), 2)"
        " from test.national_projects np"
        " join test.federal_projects fp on np.id_national_project = fp.id_national_project "
        " join test.subsidies s on s.id_federal_project = fp.id_federal_project"
        " where fp.fp_api_id = '%s'" %(api_fp_id)
    )
    info_fp = cursor.fetchall()
    output = ''

    for item in info_fp:
        for subitem in item:
            output += str(subitem) 

    output  +='$'

    cursor.execute(
        " select distinct release_date"
        " from subsidies s2 "
        " join federal_projects fp on fp.id_federal_project = s2.id_federal_project "
        " where fp.fp_api_id = '%s'"
        " and s2.release_date <> '2020'" %(api_fp_id)
    )
    years = cursor.fetchall()

    for item in years:
        for subitem in item:
            output += str(subitem) + ';'

    output = output[:-1] +'$'

    cursor.execute(
        " select manager||';'||recipient||';'||subsidy_sum||';'||release_date"
        " from test.subsidies s "
        " join test.federal_projects fp on fp.id_federal_project = s.id_federal_project "
        " where fp.fp_api_id = '%s' and s.release_date = '2020'"
        " order by s.subsidy_sum desc"
        " limit 3" %(api_fp_id)
    )

    top_three = cursor.fetchall()

    for item in top_three:
        for subitem in item:
            output += str(subitem) + ';'

    output = output[:-1]

    return output


# Даты реализации субсидий для федерального проекта
@app.route('/db_fedwindow/year', methods=['GET'])
def db_fp_years():

    return


# панель администратора
@app.route('/admin/login', methods=['GET'])
def admin_panel():
    return render_template("admin_panel.html")


if __name__ == "__main__":
    #app.run(debug=True)
    app.run(debug=True, host="26.173.145.160", port="80")
