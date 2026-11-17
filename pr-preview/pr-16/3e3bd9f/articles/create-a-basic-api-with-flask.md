## What is Flask?
> Flask is a microframework for Python based on Werkzeug, Jinja 2 and good intentions.

Flask is a _microframework_ for Python that you can use to quickly create API's and websites. It's a great and easy to use platform, let's create a simple API, but first we will go through the basics.

## Flask Installation
We're going to install Flask in our virtual environment to later import it into our code.
```shell
pipenv install flask
```

## A basic web server
Ok, now that we have installed Flask in our virtual environment, we will create the main page, let's create a file named `api.py` and input the following code snippet.

```python
"""Flask API."""
from flask import Flask
app = Flask(__name__)


@app.route('/')
def index():
    """Return main page."""
    return 'It Works!'


if __name__ == '__main__':
    app.run()
```

That's enough to lift our API and return **It Works!** in the main page.

![Main Page](/assets/images/flask/Selection_001.png)

## Working with Variables
Let's create a function to our, let's add a `salute(name)` method that accepts one argument as a name and returns `'Hello, {name}!'`

```python
"""Flask API."""
from flask import Flask
app = Flask(__name__)


@app.route('/')
def index():
    """Return main page."""
    return 'It Works!'


@app.route('/<name>')
def salute(name):
    """Salute someone."""
    return f'Hello, {name}!'


if __name__ == '__main__':
    app.run()
```

![salutation](/assets/images/flask/Selection_002.png)

You can also define if a variable should be Integer, String, etc, like this:
```python
@app.route('/<string:name>')
```
Here's a [reference table]:

| Type            | Comment                           |
| :---------------| :---------------------------------|
| string          | Accepts a string without slashes  |
| int             | Accepts integers                  |
| float           | For floating point value          |
| path            | Accept strings with slashe        |
| any             | Accepts one of the provided item  |
| UUID            | Accepts UUID strings              |

## Return a JSON Encoded String
We can **Jsonify** a dictionary and return it to the browser as a JSON serialized data, let's input our dog data into a dictionary and serialize it:

```python
#  -- SNIP --
@app.route('/mydog')
def get_dog():
    """Return JSON data about our dog."""
    doggo = {'name': 'sam', 'food': 'meat', 'hobby': 'sleep'}
    return jsonify(doggo)
```

And when we go to `/mydog` URL we can see our serialized dictionary:

![serialized data](/assets/images/flask/Selection_003.png)

## A Flask Project
Let's create a little Flask project to warm up, shall we? We're going to do an API that scans localhost with Nmap and return its open ports with only one method.

`api.py`
```python
"""An Nmap Scanner and Parser."""

from subprocess import run
from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/')
def index():
    """Return the main page."""
    return "Nmap Scanner, a more sofisticated page is coming soon."


@app.route('/openports')
def scan_localhost():
    """Scan a host with Nmap."""
    # run nmap scan from another proccess
    run(['nmap', '-T5', '--open', '-oX', 'scan.xml', 'localhost'])

    # parse Nmap XML report and covert it to a dictionary
    with open('scan.xml') as raw_xml:
        nmap_scan = xmltodict.parse(raw_xml.read())

    # Jsonify the dictionary and return it
    return jsonify(nmap_scan)


if __name__ == '__main__':
    app.run()
```

So, what are we doing here?

* Firstly, we import the libraries **Flask** for our API of course, we also import **run** from the package **subprocess** which allows us to run subprocesses from Python, the library **xmltodict** to parse XML data and convert it into a dictionary so we can return it later as a **Jsonified** data.
* Now we defined our route `openports`
```python
@app.route('/openports')
def scan_localhost():
    """Scan a host with Nmap."""
```
* Spawn a Nmap subprocess that scan our localhost looking for open ports only, we designate our XML output to `scan.xml`.
```python
# run nmap scan from another proccess
run(['nmap', '-T5', '--open', '-oX', 'scan.xml', 'localhost'])
```
* We open our report `scan.xml`, convert it to a dictionary with `xmltodict.parse(raw_xml.read())` and store it into `nmap_scan`.
```python
# parse Nmap XML report and covert it to a dictionary
with open('scan.xml') as raw_xml:
    nmap_scan = xmltodict.parse(raw_xml.read())
```
* Last, but not least, we return the dictionary into a Jsonified data.
```python
# Jsonify the dictionary and return it
return jsonify(nmap_scan)
```

And when we visit https://localhost/openports we can successfully see our API in action:
![API Nmap](/assets/images/flask/api_nmap.png)

Of course that our code could be way, _waaaaay_ better, but a simple example will suffice.

Remember to checkout the Flask documentation, it is immensely useful and [we only scratched the surface here](http://flask.pocoo.org/docs/0.12/).
