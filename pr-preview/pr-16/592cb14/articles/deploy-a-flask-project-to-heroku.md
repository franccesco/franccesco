![Flask App](/assets/images/thumbnails/flaskapp.png)

I was suddenly in the need of deploying a very basic Flask API to the cloud, so it can be available to the public.

The thing is, Flask is not made for a production and scalable environment, but if you _only_ need to deploy a very basic web server to Heroku then this guide is for you.

## Initialize a repository

First of all we will need to set up a virtual enviroment with **Pipenv**, a **Flask** app, and **initialize** a repository.

```bash
# create a new folder where we'll initialize our repo.
$ mkdir flask_app

# Install Flask and Gunicorn
$ pipenv install flask gunicorn

# Create the necessary files
$ touch runtime.txt Procfile app.py

# Initialize a repository
$ git init
```

## Create a simple flask app

Open **app.py** and create a very simplistic app that returns a json string to see if it can be run with **gunicorn**:
```python
# app.py
"""Flask App Project."""

from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/')
def index():
    """Return homepage."""
    json_data = {'Hello': 'World!'}
    return jsonify(json_data)


if __name__ == '__main__':
    app.run()
```

## Run your Flask app with gunicorn

Heroku will use **Gunicorn** to act as a web server for our Flask app, we have already installed gunicorn with pipenv, we have to run it with our flask app to make sure it works.

```shell
$ pipenv run gunicorn app:app
[2018-05-11 18:18:13 -0600] [6508] [INFO] Starting gunicorn 19.8.1
[2018-05-11 18:18:13 -0600] [6508] [INFO] Listening at: http://127.0.0.1:8000 (6508)
[2018-05-11 18:18:13 -0600] [6508] [INFO] Using worker: sync
[2018-05-11 18:18:13 -0600] [6561] [INFO] Booting worker with pid: 6561
```

It seems that it works flawlessly, let's visit our project's home page.

![JSON Flask App](/assets/images/heroku-flask/working_homepage.png)

And it is working as it should. Now we have to deploy our project with Heroku.

## Deployment to Heroku

To deploy our project we will need to edit two files:
* **Procfile**
* **runtime.txt**

A [**Procfile**](https://devcenter.heroku.com/articles/procfile) will be used to let Heroku know how to handle our web server.
```
web: gunicorn app:app
```

By default gunicorn bind the service on port 8000, if we wanted to change this port we could do so by appending the argument `--bind ip_address:port`. We can also pass environment variables in case that Heroku have a specific port.

```
web: gunicorn app:app --bind 0.0.0.0:$PORT
```

Now let's open **runtime.txt**, this file let Heroku know what version of python are we using.
```
python-3.6.5
```

We're letting Heroku know that we're using Python 3.6.5 (which at the time is the latest and stable one).

Once we have defined our runtime, we should commit our changes.
```bash
# add files
$ git add -A

# commit them
$ git commit -am "first commit"
```

Once we have a working directory tree, we should be able to create a Heroku app and push our project.

```bash
# create a heroku app, you can leave name_here empty
# if you wish heroku to pick a name for you.
$ heroku create name_here
Creating app... done, ⬢ name_here
https://name_here.herokuapp.com/ | https://git.heroku.com/name_here.git

# now we can push our project to our heroku app
$ git push heroku master
-- SNIP --
remote: -----> Python app detected
remote: -----> Installing python-3.6.5
remote: -----> Installing pip
remote: -----> Installing dependencies with Pipenv 11.8.2…
remote:        Installing dependencies from Pipfile.lock (59a99c)…
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 53.9M
remote: -----> Launching...
remote:        Released v3
remote:        https://floating-badlands-13121.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/floating-badlands-13121.git
 * [new branch]      master -> master
```

And we're done, we can visit our app by executing `heroku open`, it will open a browser tab with your app's domain name.

## flask-heroku-example

I wrote an example repository that already have a runtime and Procfile so you can deploy your flask project to Heroku, [here's the repo](https://github.com/franccesco/flask-heroku-example).

If you have any questions, feel free to comment bellow. Have fun.
