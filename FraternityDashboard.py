from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'testLuca'
COLLECTION_NAME = 'fraternity'


@app.route('/')
def donate_project():


    with MongoClient(MONGODB_HOST,MONGODB_PORT) as conn:

        collection = conn[DBS_NAME][COLLECTION_NAME]

        projects = collection.find({'Indicator' : 'Number of infant deaths (thousands)'})

        damp = list(projects)

        print (damp)

        return render_template('statistics.html',info=damp)



if __name__ == '__main__':
    app.run(debug=True)

