import json
import os
from datetime import datetime, date, timedelta
import MySQLdb
from flask import Flask
from flask import render_template,request
#from settings.config import *


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        elif isinstance(o,date):
            return o.isoformat()
        elif isinstance(o,timedelta):
            return o.microseconds

        return json.JSONEncoder.default(self, o)


app = Flask(__name__)

db = MySQLdb.connect(host=os.getenv('MYSQL_HOST'""",DATABASE_HOST"""),
                     user=os.getenv('MYSQL_USER'""", DATABASE_USERNAME"""),
                     passwd=os.getenv('MYSQL_PASSWORD'""",DATABASE_PASSWORD"""),
                     db=os.getenv('MYSQL_DB'""",DATABASE_NAME)"""))


@app.route("/")
def index():

    return render_template("home.html")

@app.route("/dashboard")
def dashboard():
    return render_template("eventsdashboard.html")


@app.route("/statistics/" , methods=['GET'])
def getData():

    date_end_string = request.args.get('endDate')
    date_start_string = request.args.get('startDate')

    datenow = datetime.strptime(date_end_string,'%Y-%m-%d')
    datestart = datetime.strptime(date_start_string,'%Y-%m-%d')

    print(datenow)
    print(datestart)

    if request.method == 'GET':

        curs = db.cursor(MySQLdb.cursors.DictCursor)
        curs.execute('''SELECT * FROM eventsmanager_app_sitevisits WHERE date >= %s and date <= %s''',(datestart,datenow))
        sitesvisits = curs.fetchall()
        curs.execute('''SELECT * FROM eventsmanager_app_webcastvisits WHERE date >= %s and date <= %s''',(datestart,datenow))
        eventvisits = curs.fetchall()
        curs.execute('''SELECT * FROM eventsmanager_app_support WHERE date >= %s and date <= %s''',(datestart,datenow))
        support = curs.fetchall()
        curs.execute('''SELECT * FROM eventsmanager_app_eventrating''')
        ratings = curs.fetchall()
        events = json.dumps([{'sitevisits':sitesvisits,'eventvisits':eventvisits,'support':support,'ratings':ratings}],cls=DateTimeEncoder)
        return events

if __name__ == "__main__":
    app.run(debug=True)
