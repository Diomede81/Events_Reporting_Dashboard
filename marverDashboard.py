from flask import Flask,jsonify
from flask import render_template,request
import MySQLdb
from datetime import datetime,date,timedelta
import json
from settings import config
import os



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

db = MySQLdb.connect(host=os.getenv('MYSQL_HOST'),
                     user=os.getenv('MYSQL_USER'),
                     passwd=os.getenv('MYSQL_PASSWORD'),
                     db=os.getenv('MYSQL_DB'))

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
