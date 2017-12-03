# Events Attendance and Usage Reporting Dashboard

This Project has been built as an enhancement of the Marver Webcasting On-Demand Platform and provides data that
helps the users in charge of producing video content to better understand final users population, device used, and preferences

You can access a demo on this [link](https://events-dashboard.herokuapp.com/)


## Features

#### Existing Features

- Ability to visualize data in an easy-to-understand format
- Ability to take a tour of the application via a simple interface that explains every feature in a clear and concise manner
- Ability to "slice and dice" data via direct interaction with the various graphs

## Getting Started

##### This project has been built on Python version 2.7 however certain adjustments have been applied to make sure is compatible with Python 3.6 due to Heroku Deployment

1. Firstly you will need to clone this repository by running the ```git clone https://github.com/Diomede81/Events_Reporting_Dashboard.git``` command
2. After the cloning process has ended please make sure that(if you are using a Windows Environment) you have **python** and **pip(which comes pre-installed with Python)** installed - Python comes pre-installed with Linux and MacOS

    1. You can get **Python** by the download page [here](https://www.python.org/downloads/)
    2. Once you've installed Python you'll need to run the following command to install the Virtual Environment package:

       `pip install virtualenv # this may require sudo on Mac/Linux`
    3. After the successfull installation of virtualenv please activate the environment by following this
        [guide](https://virtualenv.pypa.io/en/stable/userguide/#usage)
    4. To complete the packages installation, type the following command in order to install all the necessary
        dependencies for this application, these are stored in the provided requirements.txt file
        please ensure that you are located in the root project folder when running this command
        `pip install -r requirements.txt`
3. You will now need to install bower dependencies
    1. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
    2. Once you've successfully installed npm you will need to execute the following command line: `npm install -g bower # this may require sudo on Mac/Linux`
    3. Once **bower** are installed, you'll need to install all of the dependencies in *package.json* and *bower.json*
          ```
          bower install
          ```
          this will install all the dependencies that are listed in the bower.json file in the root folder

2. Within the Settings folder, open the file named config.py and add the information related to your project(Database details)
before you go further as the project will not work without at least a database configured(you can utilize MySQL lite which can be downloaded [here](https://www.sqlite.org/)
3. Once all of the dependency packages have been installed and the config file have been populated with all the necessary information, please test the Flask  by typing the following command(ensure you are in the project root folder before running it)
    1. `export FLASK_APP=marverDashboard.py` this will set the Flask environment variable to the app that will be launched using the next command
    2. `flask run` this will start the development server on [localhost](http://127.0.0.1:5000)

7. Make changes to the code and if you think it belongs in here then just submit a pull request


## Running the tests

The Application has been extensively tested with multiple Operative Systems and multiple browser types

**Javascript Testing**:

 Javascript testing has been performed manually via testing of different scenarios in multiple browsers, the utilization of
 a testing suite has not been used as most of the Javascript functions are utilized to modify DOM elements and could be tested manually

**Flask Testing**:

  Django integrated testing suite has been utilized to test that each view would successfully connect to a database and provide back the correct information and HTTP objects

  Each Application's view has been tested using the above method and successfully provide the required information and HTTP objects when different scenarios are simulated


### Tests

The below example of view test will receive an image and ensure that the necessary information are saved into the database for later retrieval

An Example:

```

    def test_thumbnail_upload(self):
        img = BytesIO(b'myImage')
        img.name = 'webcast.jpg'

        thumbnail_upload_test = self.client.post('/thumbnail_upload/',data={
            'webcast_id' : 1,
            'webcast_image' : img
        })

        self.assertEqual(thumbnail_upload_test.status_code,200)
```


## Deployment



The application has been deployed using the following:

 - Heroku to manage the Flask Application

For deployment instruction on Heroku please visit [Here](https://devcenter.heroku.com/categories/python)


## Built With


* HTML5/CSS3 - The languages used for the pages design
* [Bootstrap 3.3](https://getbootstrap.com/docs/3.3/) - The responsive design development Framework Used
* JAVASCRIPT - The language used to build the interactivity of the web page elements
* [JQuery](https://jquery.com/) - The Library used to enhance the interactivity of the web page elements for cross-browser successful implementation
* [D3.js](https://d3js.org/) - The base library for the graph creations
* [Crossfilter.js](http://square.github.io/crossfilter/) - The library used to manipulate the data for usage with graph
* [DC.js](https://dc-js.github.io/dc.js/) - The library that enable the simple creation of graphs connecting the power of D3.js with the speed of Crossfilter.js
* [Intro.js](https://introjs.com/) - The library utilized for the creation of a clear and easy feature that would guide the user through the application's components
* [PYTHON](https://www.python.org/) - The Language utilized to manage the Server Side connections with Database and relevant services
* [Flask](http://flask.pocoo.org) - The Python Micro-Framework utilized to create a structured, stable and efficient application based on the Python language
* [JetBrains PyCharm](https://www.jetbrains.com/pycharm/) - The IDE used to develop and test the application

### More Information about build libraries

The following libraries has been also used to enhance the user experience:

#### [D3-queue](https://github.com/d3/d3-queue):
- This library has been utilized to asynchronously download the data from the Flask application


## Versioning

I have used [Git](https://git-scm.com/) & [GitHub](https://github.com/) for version control.

## Author

* **Luca Licata** - [GitHub](https://github.com/Diomede81) - [Linkedin](www.linkedin.com/in/luca-licata-26637641
)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Many Thanks to my Mentor **Theo Despoudis** [GitHub](https://github.com/theodesp) for all the support with ensuring that this application's code would be up to high standards