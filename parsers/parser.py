import requests
from bs4 import BeautifulSoup

#custom
from connection import conn, cursor


#functions
def get_national_projects_info():
  url = 'https://spending.gov.ru/np/' # url страницы
  r = requests.get(url)
  with open('parse.html', 'w', encoding="utf-8") as output_file:
    output_file.write(r.text)

  with open("parse.html", "r", encoding="utf-8") as f:
      contents = f.read()
      soup = BeautifulSoup(contents, 'lxml')

      national_projects_links = soup.find_all("a", {'class': 'spending-info-card'})
      national_projects_name = soup.find_all("div", {'class': 'h3 font-weight-bold mb-4'})
      
      try:
        cursor.execute("truncate table national_projects")
        conn.commit()
      except Exception as e:
        return print("Error!", e) 

      for i in range(0, len(national_projects_links)):
        name = national_projects_name[i].text.strip()
        link_question='https://spending.gov.ru'+national_projects_links[i].get('href').strip()
        try:
          cursor.execute("insert into national_projects(id_national_project, project_name, project_link) values (%i, '%s', '%s')" %(int(i+1), name, link_question))
          conn.commit()
        except Exception as e:
          print("Error!", e) 
          continue


#get_national_projects_info()


url2 = 'https://futurerussia.gov.ru/' # url страницы
r = requests.get(url2)
with open('parse.html', 'w', encoding="utf-8") as output_file:
  output_file.write(r.text)


  with open("parse.html", "r", encoding="utf-8") as f:
    contents = f.read()
    soup = BeautifulSoup(contents, 'lxml')

    national_projects_links = soup.find_all("a", {'class': 'ts-slider-projects-item ts-slider-projects__item'})

    for i in range(0, len(national_projects_links)):
      link_question='https://spending.gov.ru'+national_projects_links[i].get('href').strip()
      print(link_question)
