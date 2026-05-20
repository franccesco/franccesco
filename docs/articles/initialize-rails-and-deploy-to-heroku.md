## Install Rails

Install the gem:
* `gem install rails`

## Create New Rails Project

Create a new project and `cd` into it:
* `rails new ProjectTest`
* `cd ProjectTest`

## Change Gemfile to add PostgreSQL
Heroku works with PostgreSQL as backend database as it doesn't support **SQLite3**, so you'll have to add the `pg` gem in the Gemfile in a `production` group:

```ruby
group :production do
  gem 'pg'
end
```

**IMPORTANT:** After adding PostgreSQL to the production group in the Gemfile **you'll have to move the SQLite3 gem to a development group or delete it**, if you work with PostgreSQL just delete it entirely but if you would like to keep SQLite3 for local development then move the gem to a dev group like this:

```ruby
group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
end
```

This way Heroku won't touch the SQLite3 gem.

## Update Bundler
Lets update Bundler and install the gems excluding the production group:
* `bundle update`
* `bundle install --without production`

## Install Heroku CLI

Open the terminal and proceed with the installation script:
* `wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh`

After that, enter your **Heroku** credentials:
* `heroku login`

And add you `ssh` keys:
* `heroku keys:add`

We'll get back to Heroku later, we have to make some changes to our code first.

## Changing the Index page
Heroku doesn't support the default index page of Rails, so let's write a _Hello World!_ as our index page to confirm it's deploying correctly to Heroku.

Generate a controller with our index page:
* `rails generate controller Welcome index`

Now open **_app/views/welcome/index.html.erb_** and change your index page as you like, for example:
```html
<h1>Hello world!</h1>
<p>Yup! The deployment is working. Checkout <a href="https://codingodse.info">CodingDose()</a></p>
```

## Setting the Root Page
Open the routes file in **_config/routes.rb_** and change the line:
* `get 'welcome/index'`

For:
* `root 'welcome#index'`

This is how the file should look:
```ruby
Rails.application.routes.draw do
  root 'welcome#index'
end
```

## Test it Locally
Fire up the server with (`s` stands for `server`):
* `rails s`

Go to http://localhost:3000/ and your index should be displaying

## Add and Commit files

Newer versions of **Rails** add a git repository, unless there's no repository initialized you will have to do it yourself with `git init`, then add the files and commit them:
* `git add .`
* `git commit -am "initialize repository"`

## Deploy to Heroku
First, create a domain on heroku:
* `heroku create`

And lets push the new repo to heroku's servers:
* `git push heroku master`

## Final words
There you go, you setup a new Rails project, version control and a succesful deployment to Heroku :)
