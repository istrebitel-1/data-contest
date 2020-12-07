import requests
from bs4 import BeautifulSoup
from os import remove
import datetime
import json

# custom
from connection import conn, cursor


# functions
def get_national_and_federal_projects_info(url):
    resp = requests.get(url).text
    data = json.loads(resp)
    proj_id = 1
    subs_id = 1

    try:
        cursor.execute("truncate table national_projects")
        cursor.execute("truncate table federal_projects")
        cursor.execute("truncate table subsidies")
        conn.commit()
    except Exception as e:
        print("Error!", e)

    # нацпроекты
    for index, item in enumerate(data['items']):
        national_project_name = item['np_short_name']
        np_budget_released = item['total_sum']
        np_id = item['np_id']  # id нацпроекта

        try:
            cursor.execute(
                "insert into national_projects(id_national_project, project_name, total_np_budget, released_budget, np_api_id) values (%i, '%s', %f, %f, '%s')" % (
                index + 1, national_project_name, np_budget_released, np_budget_released, np_id))
            conn.commit()
        except Exception as e:
            print("Error!", e)

        # федеральные проекты по нацпроекту
        for item2 in item['fedprojects']:
            api_fp_id = item2['fp_id']  # id федпроекта
            federal_project_name = item2['fp_fullname']  # название
            fp_budget = item2['total_sum']  # сумма контрактов и субсидий
            subsidies_count = item2['subsidies_count']  # кол-во субсидий
            subsidies_sum = item2['subsidies_sum']  # сумма субсидий
            contracts_count = item2['contracts_count']  # кол-во контрактов
            contracts_sum = item2['contracts_sum']  # сумма контрактов

            print('Феделарьный проект №',proj_id)

            try:
                cursor.execute(
                    "insert into federal_projects(id_federal_project, id_national_project, project_name, project_budget, fp_api_id, subsidies_count, contracts_count, contracts_sum, subsidies_sum)"
                    "values (%i, %i, '%s', %f, '%s', %i, %i, %f, %f)" % (
                    proj_id, index + 1, federal_project_name, fp_budget, api_fp_id, subsidies_count, contracts_count,
                    contracts_sum, subsidies_sum))
                conn.commit()
            except Exception as e:
                print("Error!", e)

            if subsidies_count > 0:
                pages = subsidies_count//50 + 1
                subsidies_info('https://api.spending.gov.ru/v1/natprojects/fpsubsidies?fp_id=%s&page=' %(api_fp_id), api_fp_id, proj_id, subs_id, pages)
            subs_id += subsidies_count
            proj_id += 1  # инкремент id федерального провекта


def subsidies_info(url, api_fp_id, fp_id, s_start_id, pages):

    # субсидии фeдпроекта
    subs_id_f = s_start_id

    for i in range(1, pages+1):

        print(url+str(i), '\t', 'время отправки запроса: ', datetime.datetime.now())
        resp_subsidies = requests.get(url+str(i)).text
        data_subsidies = json.loads(resp_subsidies)
        print(url+str(i), '\t', 'время получения данных: ', datetime.datetime.now())
        
        for item_s in data_subsidies['items']:

            regnum = item_s['regnum'] # уникальный рег. номер субсидии
            grbs_name = item_s['grbs_name'] # имя ГРБС
            date_agreem = item_s['year'] # дата соглашения
            full_amount = item_s['amount'] # сумма субсидии
            reciever = item_s['receivers'][0]['receiver_name'] # получатель
            reciever = reciever.replace("'", '') # замена кавычек для корректных sql запросов

            if grbs_name == None: # в апи почти всегда не данных по ГРБС /не костыль/
                grbs_svr_code = item_s['grbs_svr_code'] # код по сводному регистру
                resp_grbs = requests.get("https://spending.gov.ru/subsidies/grbs/%s/" %(grbs_svr_code))
                soup = BeautifulSoup(resp_grbs.text, 'lxml')
                data_grbs = soup.find_all('p', {'class' :"h3 text-center font-weight-semibold mb-0"})
                grbs_name = data_grbs[0].text

            try:
                cursor.execute(
                    "insert into subsidies(id_subsidy, id_federal_project, subsidy_sum, manager, recipient, release_date, reg_num)"
                    "values (%i, %i, %f, '%s', '%s', %i, '%s')" % (
                    subs_id_f, fp_id, full_amount, grbs_name, reciever, date_agreem, regnum))
                conn.commit()
            except Exception as e:
                print('Error!', e, '\nTrying to fix it...\n')

            subs_id_f += 1

        print('Успешно записано 50 субсидий, всего: %i' %(subs_id_f-1))


startdt = datetime.datetime.now() # время начала парсинга

url = 'https://api.spending.gov.ru/v1/natprojects/nprojects/'
get_national_and_federal_projects_info(url)

print('начало выполнения:', startdt, '\n', 'конец выполнения:', datetime.datetime.now())
