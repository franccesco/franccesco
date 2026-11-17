# TL;DR: Environment Variables
API keys are one example of sensitive information that should remain secret, the problem is that we need to use them in our code to access third-party services like Twitter, Github, DigitalOcean and so on, so how do we manage to use those API keys without hard-coding them into the source code?

> The twelve-factor app stores config in environment variables (often shortened to env vars or env). Env vars are easy to change between deploys without changing any code; unlike config files, there is little chance of them being checked into the code repo accidentally; and unlike custom config files, or other config mechanisms such as Java System Properties, they are a language- and OS-agnostic standard.
— Twelve-Factor App On Configuration

The answer is: _Environment Variables_. This is based on the _[Twelve-Factor App](https://12factor.net/config)_ methodology which I recommend you to read, it is an excellent essay that will teach you the process of Software-as-a-Service (SaaS). Let's dive into it using Python and Ruby as an example.

## Why this matters

Let's put this short and easy, let's say that we have two type of credentials to access certain web service:
* an API id = '846a4da4d06as84d6as84d06'
* and a SECRET id = 'secret_id_so_secret'

If we want to use those credentials we could hard code them into our software like this
```python
# Setting credentials
api_id = '846a4da4d06as84d6as84d06'
secret_id = 'secret_id_so_secret'

# login function
def login(api_key, secret):
    print('Logged with:')
    print('API: ' + api_id)
    print('SECRET: ' + secret_id)

# Logging in to third party app with hard-coded credentials
login(api_id, secret_id)
```

That would be **extremely wrong** because anyone that is able laid eyes on your code will have the power to steal your credentials and access sensitive information about you, your software and even [Personally Identifiable Information](https://en.wikipedia.org/wiki/Personally_identifiable_information) (PII) about your customers, your team, or anybody who uses your software.

But, how do we remove these credentials from our code and use them as environment variables?

# Securely Storing Credentials in Python
`python-dotenv` is a very easy to use package that reads a `key=value` pair from a text file `.env` (hence _dotenv_) and load those variables to your environment variables so you can use your API keys securely in your code. You can install `python-dotenv` with [pipenv](/2018/02/20/pipenv-development-workflow/).

Now let's move the API credentials from our code to a safe `.env` text file:

### Add a Git exclusion for `.env`

First we must add an exclusion to our `.gitignore` in git so they are not uploaded to Github, commit your exclusions and you're ready to fill your `.env` credentials
```bash
echo ".env" >> .gitignore
git commit .gitignore -m "add exclusion for .env"
```

### Install `python-dotenv` with Pipenv

```bash
$ pipenv install python-dotenv
# Output
Installing python-dotenv…
-- SNIP --
Adding python-dotenv to Pipfile's [packages]…
Pipfile.lock not found, creating…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Updated Pipfile.lock (446908)!
Installing dependencies from Pipfile.lock (446908)…
  🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 2/2 — 00:00:00
To activate this project's virtualenv, run the following:
 $ pipenv shell
```

### Adding credentials

Now let's strip our credentials from our code and add them to our _dotenv_ file:
```
# .env file
api_id = '846a4da4d06as84d6as84d06'
secret_id = 'secret_id_so_secret'
```

### Loading credentials to our environment variables

Let's modify our code to add the `python-dotenv` package
```python
# import functionality to find and load dotenv credentials
# and getenv to get environment variables from OS
from os import getenv
from dotenv import load_dotenv, find_dotenv

# load environment keys, it will automatically find and load .env
load_dotenv(find_dotenv())

# login function
def login(api_key, secret):
    print('Logged with:')
    print('API: ' + api_id)
    print('SECRET: ' + secret_id)

# Logging in to third party app with environment variable credentials
api_id = getenv('api_id')
secret_id = getenv('secret_id')
login(api_id, secret_id)
```

Now when we run our code we will successfully access our service with our credentials without compromising our keys
```bash
# Output
Logged with:
API: 846a4da4d06as84d6as84d06
SECRET: secret_id_so_secret
```

## Ruby Example

Add `dotenv` to your `Gemfile` and remember to add your credentials to your `.env` file
```ruby
source 'https://rubygems.org'
gem 'dotenv'
```

Import it and use it in your code as follows
```ruby
require 'dotenv'

# load dotenv credentials
Dotenv.load

api_id = ENV['api_id']
secret_id = ENV['secret_id']

puts "API: #{api_id}"
puts "SECRET: #{secret_id}"
```

Now execute your code
```bash
bundle exec ruby test.rb
# Output
API: 846a4da4d06as84d6as84d06
SECRET: secret_id_so_secret
```
