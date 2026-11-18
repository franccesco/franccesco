# What is pipenv
Essentially **Pipenv** is `pip` **+** `virtualenv` and it's a match made in heaven. It manages dependencies, required python versions (if pyenv is available), generates pipfiles which is more reliable than a `requirements.txt` file and it generates a virtual environment so you don't screw other environments and its requirements.

> It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever–important Pipfile.lock, which is used to produce deterministic builds.
— [From Pipenv Repository](https://github.com/pypa/pipenv)

and it is officially recommended by Python.org:

> While pip alone is often sufficient for personal use, Pipenv is recommended for collaborative projects as it’s a higher-level tool that simplifies dependency management for common use cases.
— [Python.org](https://packaging.python.org/tutorials/managing-dependencies/#installing-pipenv)

## Installation
Using `pip`

```
pip install --user pipenv
```

## Create environment
Use argument `--two` or `--three` to specify the environment's python version.

```
pipenv --three
```
```
Creating a virtualenv for this project…
Using /home/franccesco/.pyenv/versions/3.6.4/bin/python3 to create virtualenv…
⠋Running virtualenv with interpreter /home/franccesco/.pyenv/versions/3.6.4/bin/python3

--SNIP --

Virtualenv location: /home/franccesco/.local/share/virtualenvs/test-PudGTmiz
Creating a Pipfile for this project…
```

## Install Dependencies
Let's install `requests` as an example

```
pipenv install requests
```
```
Installing requests…
Collecting requests

-- SNIP --

Adding requests to Pipfile's [packages]…
  PS: You have excellent taste! ✨ 🍰 ✨
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Updated Pipfile.lock (7b8df8)!
```

## Managing environment
We can execute our python program without activating the virtual environment shell by running `pipenv run python _pythonfile.py_` or accessing the virtual environment with `pipenv shell`
```
pipenv shell
```
```
Spawning environment shell (/usr/bin/fish). Use 'exit' to leave.
source /home/franccesco/.local/share/virtualenvs/test-PudGTmiz/bin/activate.fish
-- SNIP --

~$ 
```

## Display installed packages
Displays package information and versions.
```
pipenv graph
```
```
requests==2.18.4
  - certifi [required: >=2017.4.17, installed: 2018.1.18]
  - chardet [required: >=3.0.2,<3.1.0, installed: 3.0.4]
  - idna [required: <2.7,>=2.5, installed: 2.6]
  - urllib3 [required: <1.23,>=1.21.1, installed: 1.22]
```

## Freezing dependencies
It generates a `json` file with our environment dependencies.

```
pipenv lock
```
```json
{
    "_meta": {
        "hash": {
            "sha256": "33a0ec7c8e3bae6f62dd618f847de92ece20e2bd4efb496927e2524b9c7b8df8"
        },
        "host-environment-markers": {
            "implementation_name": "cpython",
            "implementation_version": "3.6.4",
            "os_name": "posix",
            "platform_machine": "x86_64",
            "platform_python_implementation": "CPython",
            "platform_release": "4.13.0-32-generic",
            "platform_system": "Linux",
            "platform_version": "#35~16.04.1-Ubuntu SMP Thu Jan 25 10:13:43 UTC 2018",
            "python_full_version": "3.6.4",
            "python_version": "3.6",
            "sys_platform": "linux"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.6"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.python.org/simple",
                "verify_ssl": true
            }
        ]
    },

    -- SNIP --

    "develop": {}
}
```

## Delete a Pipenv virtual environment

```
pipenv --rm
```
```
Removing virtualenv (/home/franccesco/.local/share/virtualenvs/test-PudGTmiz)…
```

_You can find more documentation at [Pipenv Guthub repo](https://github.com/pypa/pipenv)_
