Pyenv is an excellent tool to have in your tool-set, it manages Python versions much like `rbenv` for Ruby, in fact it was forked from it.

> pyenv lets you easily switch between multiple versions of Python. It's simple, unobtrusive, and follows the UNIX tradition of single-purpose tools that do one thing well.

## Installation

The automatic installer [provided in GitHub](https://github.com/pyenv/pyenv-installer) will take care of everything so you don't have to worry about configuring anything.
(pro-tip: triple click to select the whole line).

```bash
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

That's the only thing you have to do, **if you're having issues installing a python version** then you will have to install the development libraries:
```bash
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev
```

## Usage

### Install another version:
```bash
pyenv install 2.7.14
# Output
Downloading Python-3.6.4.tar.xz...
-> https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tar.xz
Installing Python-3.6.4...
Installed Python-3.6.4 to /home/franccesco/.pyenv/versions/3.6.4
```

### Check installed versions
```bash
pyenv versions
# Output
  system
* 2.7.14 (set by /home/franccesco/.pyenv/version)
  3.6.4
```

### Check current version
```bash
pyenv version
# Output
2.7.14 (set by /home/franccesco/.pyenv/version)
```


### Set global version
```bash
pyenv global 3.6.4
# No output; check with version command.
```

### Set python version per directory
```bash
pyenv local 2.7.14
# No output; check with version command.
```

A file named `.python-version` should contain the python version to use uppon entering the folder: `cat .python-version`
```bash
# Output
2.7.14
```

### Uninstall a version
```bash
pyenv uninstall 2.7.14
# Output
pyenv: remove /home/franccesco/.pyenv/versions/2.7.14? yes
```

### Update Pyenv
```bash
pyenv update
# Output
Updating /home/franccesco/.pyenv...
From https://github.com/pyenv/pyenv
 * branch            master     -> FETCH_HEAD
Already up-to-date.
-- SNIP --
Updating /home/franccesco/.pyenv/plugins/pyenv-virtualenv...
From https://github.com/yyuu/pyenv-virtualenv
 * branch            master     -> FETCH_HEAD
Already up-to-date.
Updating /home/franccesco/.pyenv/plugins/pyenv-which-ext...
From https://github.com/yyuu/pyenv-which-ext
 * branch            master     -> FETCH_HEAD
Already up-to-date.
```

## Final Words
Pyenv has a great integration with [Pipenv](/2018/02/20/pipenv-development-workflow/) and you can manage Python versions and package versions with both of them at the same time without any hassle, I greatly recommend you to check them out.

[Read more | Pyenv Repository](https://github.com/pyenv/pyenv)
