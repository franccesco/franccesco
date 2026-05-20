![black and silver fountain pen](https://images.unsplash.com/photo-1473186505569-9c61870c11f9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


I've been trying to publish my packages to [PyPi](http://pypi.org/) so people can access my software more easily. But I have to be honest, Python's publishing system is not the best out there and it has to improve quite a lot.

Wandering around I stumbled upon [**Poetry**](https://poetry.eustace.io/), which is a python packager and dependency manager created by _Sébastien Eustace_ for people that doesn't want to lose their head managing a Python project.

Let's say that we want to make a small command line application that checks the status of a web page, let's call it **checkstat**. So how can we **create**, **develop**, and **publish** our software with Poetry?

--------------------------------

> Courtesy Notice:
This post has been revisited and updated on _2019-06-16 11:20:44_.

--------------------------------

## Installing Poetry
You can install poetry effortlessly with a python script provided by the creator.
```bash
$ curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
```

Now we are able to see Poetry's options.

```bash
$ poetry
Poetry 0.12.14

Usage:
  command [options] [arguments]

Options:
  -h, --help                      Display this help message
  -q, --quiet                     Do not output any message
  -V, --version                   Display this application version
      --ansi                      Force ANSI output
      --no-ansi                   Disable ANSI output
  -n, --no-interaction            Do not ask any interactive question
  -v|vv|vvv, --verbose[=VERBOSE]  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  about          Short information about Poetry.
  add            Add a new dependency to pyproject.toml.
  build          Builds a package, as a tarball and a wheel by default.
  check          Checks the validity of the pyproject.toml file.
  config         Sets/Gets config options.

--- SNIP ---

 debug
  debug:info     Shows debug information.
  debug:resolve  Debugs dependency resolution.
 self
  self:update    Updates poetry to the latest version.
```

## Creating our package and adding dependencies
First we have to create our package with the `new` sub-command, this will create a file structure in which we can work on.

```bash
# Create a new package
$ poetry new checkstat
Created package checkstat in checkstat

# Enter the new package directory
$ cd checkstat

# Prints the directory tree
$ tree
.
├── checkstat
│   └── __init__.py
├── pyproject.toml
├── README.rst
└── tests
    ├── __init__.py
    └── test_checkstat.py

2 directories, 5 files
```

As we can see, we only need the sub-command `new` followed by a name argument to create a directory structure for our little project. This will also generate a configuration file for our project called [**`pyproject.toml`**](https://poetry.eustace.io/docs/pyproject/) which is a much better way to define your project configuration than **`setup.py`**, specially for people who are new to python, you can [read more about this implementation here](https://www.python.org/dev/peps/pep-0518/).

```toml
[tool.poetry]
name = "checkstat"
version = "0.1.0"
description = ""
authors = ["Franccesco Orozco <franccesco@codingdose.info>"]

[tool.poetry.dependencies]
python = "^3.7"

[tool.poetry.dev-dependencies]
pytest = "^3.0"
```

As you can see, it describes basic information about the project, dependencies and development dependencies. We will get back to the TOML file shortly.

What we want to do next is to create the virtual environment of our project and install the development dependencies with the command `install`.

```bash
# Create package isolated virtualenv and install dependencies
$ poetry install
```

<video src="/assets/images/poetry/poetry-install.webm" autoPlay loop controls muted />

Now that we have installed the requirements and initiated the virtual environment let's add more libraries to our project, shall we? Let's add [Click](http://click.pocoo.org/), [Colorama](https://github.com/tartley/colorama) and [Requests](http://docs.python-requests.org/en/master/).

```bash
# Add dependencies
$ poetry add click colorama requests
```

<video src="/assets/images/poetry/poetry-add.webm" autoPlay loop controls muted />

There you go, now if we check the our **`pyproject.toml`** again, you can see that it has the new package dependencies.

```toml
[tool.poetry.dependencies]
python = "^3.7"
click = "^7.0"
colorama = "^0.4.1"
requests = "^2.22"
```

## Developing our module and our CLI
We're ready to develop our _checkstat_ module and command line interface. Let's start by making a test with [Pytest](https://docs.pytest.org/en/latest/). For this, let's open `test_checkstat.py` inside our _tests_ folder.

Here we're going to set an _expectation_. Our module **`checkstat`** should have a method called **`is_up`** which should return **True** if the webpage returns the code [_200_](https://httpstatuses.com/200) for any other HTTP code it should return **False**. Here's the test:

```python


def test_checkstat():
    """Test if checkstat module returns True on 200 code."""
    assert checkstat.is_up('https://codingdose.info')
```

Now if we run this test with pytest it will show red because we haven't build any modules yet, but for the sake of demonstration, let's show the red test first.

--------------------------------

> Remember:
In order to use the packages _inside_ your virtual environment, you have to activate it first. With Poetry, you can either use `poetry run _command_` or simply activate it once using `poetry shell`.

--------------------------------

```bash
# Running our test
$ poetry run pytest
```
![Pytest red test](/assets/images/poetry/pytest_red_1.png)

Now, let's build the module shall we? Let's make a file called **`checkstat.py`** under the _checkstat_ directory and define a **`is_up`** method that returns **`True`** if the webpage is reachable and returns a _200_ HTTP code.

```python
# checkstat/checkstat.py


def is_up(webpage):
    """Return True if 200 code was received, else return False."""
    try:
        req = requests.get(webpage)

    # On connection error, return False.
    except requests.exceptions.ConnectionError:
        return False
    # Connection was successful, return True on 200 code, else return False.
    else:
        if req.status_code == 200:
            return True
        return False
```

Now let's add our module to our initialization package so it gets correctly loaded.

```python
# checkstat/__init__.py
from .checkstat import is_up
```

Let's re-run our test to see if its passing now.

![Pytest green test](/assets/images/poetry/pytest_green_1.png)

Perfect, now that our test is passing we can go ahead and make our command line interface. Let's create a file called **`cli.py`** inside our _checkstat_ folder.

```python
# checkstat/cli.py


@click.command()
@click.argument('host')
def main(host):
    """CLI for checkstat package."""
    print('Status: ', end='')
    if checkstat.is_up(host):
        click.secho('Up and running.', bold=True, fg='green')
    else:
        click.secho('Server is down.', bold=True, fg='red')


if __name__ == '__main__':
    main()
```

Perfect, now we have completed our CLI, but we haven't tried it yet, how do we make it run on the terminal without calling `python x_file.py`? Easy-peasy, let's edit the **`pyproject.toml`** and add a **_script_** section.

```toml
[tool.poetry]
name = "checkstat"
version = "0.1.0"
description = ""
authors = ["Franccesco Orozco <franccesco.orozco@codingdose.info>"]

--- SNIP ---

# New section
[tool.poetry.scripts]
checkstat = "checkstat.cli:main"
```

What does `checkstat.cli:main` means? It means: _Hey python, whenever I type **checkstat** I want you to execute the function **main()** inside of the module **cli.py** in the package **checkstat**_.

Now that we have updated our configuration file, our CLI gets automatically loaded into our virtual environment and we can execute it directly with Poetry. Let's test it ourselves with a working webpage and another one that returns a 500 HTTP status.

```bash
$ poetry run checkstat https://codingdose.info
Status: Up and running.

$ poetry run checkstat https://httpstat.us/500
Status: Server is down.
```

<video src="/assets/images/poetry/checkstat-updown.webm" autoPlay loop controls muted />

Awesome! Our little command line application is ready to be published.

## Publishing our tool

Publishing our tool to the PyPi is really effortless, let's try to do it right now. First of all we have to build our package.

```bash
$ poetry build
Building checkstat (0.1.0)
 - Building sdist
 - Built checkstat-0.1.0.tar.gz

 - Building wheel
 - Built checkstat-0.1.0-py2.py3-none-any.whl
```

Now we have to upload it to the pypi.org repository.

```bash
$ poetry publish
Username: franccesco
Password: **********

 - Uploading checkstat-0.1.0-py2.py3-none-any.whl 100%
 - Uploading checkstat-0.1.0.tar.gz 100%
```

And that's it! Our tools is now available to *anyone* using `pip` to install packages. Let's check it out: https://pypi.org/project/checkstat/

## Installing our tool

Let's go and install our tool to see if it's available now.

```bash
$ pip install checkstat
```

And let's execute it.

<video src="/assets/images/poetry/install-checkstat.webm" autoPlay loop controls muted />

It works!

## Conclusion

I hope you like the entry, today we have learn how to **create, develop and ship** a very basic CLI. Poetry is an incredibly easy to use and flexible tool to create your packages and distribute them. Of course, there's a lot more than I have shown here, remember to check out Poetry's documentation.

## Further reading

* [Poetry](https://poetry.eustace.io/)
* [Poetry's Documentation](https://poetry.eustace.io/docs/)
* [Command Line Applications](https://docs.python-guide.org/scenarios/cli/)
* [Structuring Your Project](https://python-guide-cn.readthedocs.io/en/latest/writing/structure.html)
* [Requests](http://docs.python-requests.org/en/master/)
* [Click](http://click.pocoo.org/)
* [Pytest](https://docs.pytest.org/en/latest/)
