Today I was facing a problem, I didn't know how to change Flask root directory. Flask by default look for templates and static files under the **root** directory (`/`), how can we change that?

![image](/assets/images/thumbnails/flask_root.png)

## Changing the root path

Here's my directory structure:
```
.
├── api_files
│   ├── static
│   │   └── style.css
│   └── templates
│       └── index.html
├── api.py
├── Pipfile
└── Pipfile.lock

3 directories, 5 files
```

I want Flask to be able to process the folders `static` and `templates` _inside_ the `api_files` folder, my main Flask app is `api.py` which is _outside_ the `api_files` folder. Let's open it up and change that behavior so it can process the templates and static files inside that folder.

```python
from flask import Flask, render_template

# here we can set a different root path
app = Flask(__name__, root_path='api_files/')


@app.route('/')
def index():
    """Render home page."""
    return render_template('index.html')  # we can render templates as usual


if __name__ == '__main__':
    app.run()
```

This way, Flask will no longer look for templates and static files under the project root (`/`) path, but inside the folder `api_files` instead.

There's a lot of solutions out there about changing jinja2 configuration, I think this is a way more easier and cleaner approach.

You can read more about variables and the [**Flask API here**](http://flask.pocoo.org/docs/1.0/api/).
