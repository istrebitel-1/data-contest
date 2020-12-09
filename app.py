from flask import Flask, render_template, url_for, request, send_from_directory
from parsers.connection import conn, cursor
import os
import json


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
    cursor.execute("select np.project_name, npb.budget||' млрд. руб.',count(fp.id_federal_project), cast(round(cast(np.released_budget/1000000000 as numeric), 2) as float), cast(round(cast(npb.budget-(np.released_budget/1000000000) as numeric), 2) as float), pictures.url, np.np_api_id"
                    " from national_projects np"
                    " join pictures on pictures.id_np = np.id_national_project"
                    " join federal_projects fp on np.id_national_project = fp.id_national_project"
                    " join national_project_budget npb on npb.id_national_project = np.id_national_project"
                    " group by np.project_name, np.released_budget, np.id_national_project, pictures.url, np.np_api_id, npb.budget"
                    " order by np.id_national_project")
    results = cursor.fetchall()
    return json.dumps(results, ensure_ascii=False, separators=(',', ': '))


# федеральные проекты
@app.route('/db_fedList', methods=['GET'])
def database_fp():
    api_np_id = request.args['np_id']
    cursor.execute(" select fp.project_name, fp.fp_api_id"
                    " from federal_projects fp "
                    " join national_projects np on np.id_national_project = fp.id_national_project "
                    "  where np.np_api_id ='%s'" %(api_np_id)
    )
    results = cursor.fetchall()
    return json.dumps(results, ensure_ascii=False, separators=(',', ': '))


# Окно по федеральному проекту
@app.route('/db_fedwindow', methods=['GET'])
def db_fedwindow():
    api_fp_id = request.args['fp_id']
    cursor.execute("select distinct np.project_name, fp.project_name, fp.contracts_count, cast(round(cast(fp.contracts_sum as numeric), 2) as float)"
                    " ,fp.subsidies_count, cast(round(cast(fp.subsidies_sum as numeric), 2) as float)"
                    " from national_projects np"
                    " join federal_projects fp on np.id_national_project = fp.id_national_project "
                    " left join subsidies s on s.id_federal_project = fp.id_federal_project"
                    " where fp.fp_api_id = '%s'" %(api_fp_id)
    )   

    results = cursor.fetchall()

    cursor.execute(" select distinct release_date"
                    " from subsidies s2 "
                    " right join federal_projects fp on fp.id_federal_project = s2.id_federal_project "
                    " where fp.fp_api_id = '%s'" %(api_fp_id)
    )

    years = cursor.fetchall()
    last_year = ''
    if years[0][0] != None:

        for item in years:
            for subitem in item:
                last_year = subitem

        cursor.execute(" select subs_url, manager, recipient, subsidy_sum, release_date"
                    " from subsidies s "
                    " join federal_projects fp on fp.id_federal_project = s.id_federal_project "
                    " where fp.fp_api_id = '%s' and s.release_date = '%s'"
                    " order by s.subsidy_sum desc"
                    " limit 3" %(api_fp_id, last_year)
        )

        top_three = cursor.fetchall()

        for i in range(1, len(years)):
            years[0] += years[i]

        results.append(years[0])

        if top_three != None:

            for i in range(1, len(top_three)):
                top_three[0] += top_three[i]
            results.append(top_three[0])
    else:
        results.append(years[0])

    return json.dumps(results, ensure_ascii=False, separators=(',', ': '))


# Даты реализации субсидий для федерального проекта
@app.route('/db_fedwindow/year', methods=['GET'])
def db_fp_years():
    years = request.args['year']
    api_fp_id = request.args['federal_id']
    cursor.execute(" select subs_url, manager, recipient, subsidy_sum, release_date"
                    " from subsidies s "
                    " join federal_projects fp on fp.id_federal_project = s.id_federal_project "
                    " where fp.fp_api_id = '%s' and s.release_date = %s"
                    " order by s.subsidy_sum desc"
                    " limit 3" %(api_fp_id, years)
    )

    top_three = cursor.fetchall()

    return json.dumps(top_three, ensure_ascii=False, separators=(',', ': '))


# ---------------------------------------------------
# панель администратора - в разработке
# 
# @app.route('/admin/login', methods=['GET'])
# def admin_panel():
#     return render_template("admin_panel_login.html")


# @app.route('/admin/login/check', methods=['GET'])
# def login():
#     login_c = request.args['login']
#     password = request.args['password']
#     cursor.execute(
#         "select login, password "
#         "from logins"
#     )
    
#     results = cursor.fetchall()

#     for item in results:
#         if login_c == item[0] and password == item[1]:
#              return "../admin_panel"
#         else:
#             return 'wrong'


# @app.route('/admin_panel')
# def ret_admpanel():       
#     return render_template('admin_panel.html')
# ---------------------------------------------------


if __name__ == "__main__":
    app.run(debug=True)
