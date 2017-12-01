from flask import Flask,jsonify
from flask import render_template,request
from flask_mysqldb import MySQL
import MySQLdb
from datetime import datetime,date,timedelta
import json

MYSQL_HOST = 'lucataproejctnew.c66082eq1miy.eu-west-2.rds.amazonaws.com'
MYSQL_USER = 'marver'
MYSQL_PASSWORD = 'Lucata05111950666'
MYSQL_DB = 'marver'
MYSQL_PORT = '3306'


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

db = MySQLdb.connect(host=MYSQL_HOST,    # your host, usually localhost
                     user=MYSQL_USER,         # your username
                     passwd=MYSQL_PASSWORD,  # your password
                     db=MYSQL_DB)

@app.route("/")
def index():

    return render_template("eventsdashboard.html")


@app.route("/statistics")
def getData():
    curs = db.cursor(MySQLdb.cursors.DictCursor)
    curs.execute('''SELECT * FROM eventsmanager_app_sitevisits''')
    sitesvisits = curs.fetchall()
    curs.execute('''SELECT * FROM eventsmanager_app_webcastvisits''')
    eventvisits = curs.fetchall()
    curs.execute('''SELECT * FROM eventsmanager_app_support''')
    support = curs.fetchall()
    curs.execute('''SELECT * FROM eventsmanager_app_eventrating''')
    ratings = curs.fetchall()
    events = json.dumps([{'sitevisits':sitesvisits,'eventvisits':eventvisits,'support':support,'ratings':ratings}],cls=DateTimeEncoder)
    return events


if __name__ == "__main__":
    app.run(debug=True)
