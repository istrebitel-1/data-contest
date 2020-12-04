import psycopg2

conn = psycopg2.connect(database="data_contest", user="postgres", password="4432", host="26.173.145.160", port="5434")
cursor = conn.cursor()

# cursor.execute("select * from national_projects")
# results = cursor.fetchall()
# print(results)