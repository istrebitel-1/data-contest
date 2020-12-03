import requests
from bs4 import BeautifulSoup
import time
import json
#custom
from connection import conn, cursor


#functions
def get_national_projects_info(url):
  resp = requests.get(url).text
  data = json.loads(resp)

  # try:
  #   cursor.execute("truncate table national_projects")
  #   conn.commit()
  # except Exception as e:
  #   print("Error!", e) 

  for index, item in enumerate(data['items']):
    national_project_name = item['np_short_name']

    try:
      cursor.execute("insert into national_projects(id_national_project, project_name, project_budjet) values (%i, '%s', '%s')" %(index, national_project_name, 100))
      conn.commit()
    except Exception as e:
      print("Error!", e) 

    for index2, item2 in item['fedprojects']:
      federal_project_name = item2['fp_fullname']
      try:
        cursor.execute("insert into federal_projects(id_federal_project, id_national_project, project_name, project_budget) values (%i, %i, '%s', '%i')" %(index, index2, national_projects_name, 200+index2))
        conn.commit()
      except Exception as e:
        print("Error!", e) 





url = 'https://api.spending.gov.ru/v1/natprojects/nprojects/'
get_national_projects_info(url)

# url2 = 'https://futurerussia.gov.ru/' # url страницы
# r = requests.get(url2)
# with open('parse.html', 'w', encoding="utf-8") as output_file:
#   output_file.write(r.text)


#   with open("parse.html", "r", encoding="utf-8") as f:
#     contents = f.read()
#     soup = BeautifulSoup(contents, 'lxml')

#     national_projects_links = soup.find_all("a", {'class': 'ts-slider-projects-item ts-slider-projects__item'})

#     for i in range(0, len(national_projects_links)):
#       link_question='https://spending.gov.ru'+national_projects_links[i].get('href').strip()
#       print(link_question)

# file_path = 'parse.html'
# os.remove(file_path)
