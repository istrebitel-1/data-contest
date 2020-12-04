import requests
from bs4 import BeautifulSoup
from os import remove
import time
import json
#custom
from connection import conn, cursor


#functions
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

  #нацпроекты
  for index, item in enumerate(data['items']):
    national_project_name = item['np_short_name']
    np_budget_released = item['total_sum']
    np_id = item['np_id'] #id нацпроекта

    try:
      cursor.execute("insert into national_projects(id_national_project, project_name, total_np_budget, released_budget, np_api_id) values (%i, '%s', %f, %f, '%s')" %(index+1, national_project_name, np_budget_released, np_budget_released, np_id))
      conn.commit()
    except Exception as e:
      print("Error!", e) 
    
    #федеральные проекты по нацпроекту
    for item2 in item['fedprojects']:
      fp_id = item2['fp_id'] #id федпроекта
      federal_project_name = item2['fp_fullname'] #название
      fp_budget = item2['total_sum'] #сумма контрактов и субсидий
      print(proj_id)
      try:
        cursor.execute("insert into federal_projects(id_federal_project, id_national_project, project_name, project_budget, fp_api_id) values (%i, %i, '%s', '%f', '%s')" %(proj_id, index+1, federal_project_name, fp_budget, fp_id))
        conn.commit()
      except Exception as e:
        print("Error!", e)


      #субсидии фeдпроекта
      url_subsidies = 'https://api.spending.gov.ru/v1/natprojects/subsidies?fp_id=' + fp_id 
      resp_subsidies = requests.get(url_subsidies).text
      data_subsidies = json.loads(resp_subsidies)

      for item_s in data_subsidies['items']:

        grbs_name = item_s['grbs_name']
        date_agreem = item_s['year']
        full_amount = item_s['full_amount']
        reciever = item_s['receivers'][0]['receiver_name']       
        try:
          cursor.execute("insert into subsidies(id_subsidy, id_federal_project, subsidy_sum, manager, recipient, release_date) values (%i, %i, %f, '%s', '%s', '%s')" %(subs_id, proj_id, full_amount, grbs_name ,reciever ,date_agreem))
          subs_id += 1
          conn.commit()
        except Exception as e:
          print("Error!", e)      

      proj_id += 1 #инкремент id федерального провекта



url = 'https://api.spending.gov.ru/v1/natprojects/nprojects/'
get_national_and_federal_projects_info(url)



# url2 = 'http://budget.gov.ru/epbs/faces/p/%D0%9D%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/%D0%9F%D0%B5%D1%80%D0%B5%D1%87%D0%B5%D0%BD%D1%8C%20%D0%BD%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BE%D0%B2?_adf.ctrl-state=29ouix84o_4&regionId=34' # url страницы
# r = requests.get(url2)
# with open('parse.html', 'w', encoding="utf-8") as output_file:
#   output_file.write(r.text)


#   with open("parse.html", "r", encoding="utf-8") as f:
#     contents = f.read()
#     soup = BeautifulSoup(contents, 'lxml')
#     print(soup)
#     national_projects_links = soup.find_all("a", {'class': 'ts-slider-projects-item ts-slider-projects__item'})

#     for i in range(0, len(national_projects_links)):
#       link_question='https://spending.gov.ru'+national_projects_links[i].get('href').strip()
#       print(link_question)

# file_path = 'parse.html'
# os.remove(file_path)


# items -> info -> sum, startDate