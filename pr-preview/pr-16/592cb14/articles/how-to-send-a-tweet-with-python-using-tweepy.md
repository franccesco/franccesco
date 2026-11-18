# Overview

Here are some simple steps to send a tweet with a Python script to give you an overview on how to authenticate in Twitter using OAuth and simple code snippets to manipulate Twitter data to build a bot.

## Requirements
* python-dotenv
* tweepy

Installation (pipenv)
```bash
pipenv install python-dotenv tweepy
```

## Create an app
First, go to https://apps.twitter.com/ to create and _app_ which we will use to access the Twitter API.

![Create app](/assets/images/twitter_app/create_app.png)

Fill out the bot name, description, and a website (it can be anything if you don't have a website yet.)

![Fill out forms](/assets/images/twitter_app/create_app.png)

Tick the **_Developer Agreement_** check-box and create your twitter application.

![App created](/assets/images/twitter_app/app_created.png)

Now, go to the **_Permissions_** tab and make sure your app has **_Read and Write_** permissions.

![Permissions](/assets/images/twitter_app/read_write.png)

This is the most important part, go to **_Keys and Access Tokens_** and copy your **_Consumer Key_** and your **_Consumer Secret_**

![Consumer Keys](/assets/images/twitter_app/consumer_keys.png)

Scroll down until you see the section **_Your Access Tokens_** and click on **_Create my access token_**

![Access Tokens](/assets/images/twitter_app/copy_tokes.png)

Copy those tokens and save them in a safe place, [remember our `.env` entry?](/2018/02/28/How-to-securely-store-sensitive-configuration-with-dotenv/) don't worry, we'll use it them here anyway.

## Securing your keys

Store your keys in a secure `.env` text file so we can load them as environment variables later
```
consumer_key = JtK10FrJWuAkjtpDSO4lZrhHu
consumer_secret = j32pVGFXGUYqcufMH87Npe7bG2vQqL3DYmKHKd8OD9DMfYe6kY
access_token = 968177792255971328-Oib8WU1WwjvMX6GqcVkxA3cVcbCVs88
access_secret = zcwiPwdOQcJBakxHaN2AVGZrxGrtYIA6DnpXcM0mDo3CG
```

Now let's use our snippet to load environment variables keys into our code without compromising our sensitive data
```python
from os import getenv
from dotenv import load_dotenv, find_dotenv

# load env keys
load_dotenv(find_dotenv())

consumer_key = getenv('consumer_key')
consumer_secret = getenv('consumer_secret')
access_token = getenv('access_token')
access_secret = getenv('access_secret')
```

## Twitter authentication

Access our Twitter app is easy importing `tweepy`, we also want to return an API object to handle requests
```python
# import tweepy first

# authentication with OAuth using our keys
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

# return an API using our previous access
api = tweepy.API(auth)
```

## Sending a test tweet

Once we have access our application we're ready to send tweets through our twitter app with `api.update_status(message)`
```python
from os import getenv
from dotenv import load_dotenv, find_dotenv

# load env keys
load_dotenv(find_dotenv())

consumer_key = getenv('consumer_key')
consumer_secret = getenv('consumer_secret')
access_token = getenv('access_token')
access_secret = getenv('access_secret')

# OAuth authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
api = tweepy.API(auth)

# Send a tweet
api.update_status('Congrats! You did it!')
print('Tweet sent.')
```

Let's check our twitter account to see if it works

![Yup!](/assets/images/twitter_app/test_tweet.png)

Yup! It worked! but of course this is only the beginning, there's a lot more you can do with **tweepy**, check out the API documentation bellow 👇 and some snippets that you can use in your code

Snippets
-----------------

Example snippets extracted from the official documentation

**Follow all**
```python
for follower in tweepy.Cursor(api.followers).items():
    follower.follow()
```

**Pagination**
```python
# Iterate through all of the authenticated user's friends
for friend in tweepy.Cursor(api.friends).items():
    # Process the friend here
    process_friend(friend)

# Iterate through the first 200 statuses in the friends timeline
for status in tweepy.Cursor(api.friends_timeline).items(200):
    # Process the status here
    process_status(status)
```

**Handling Rate Limit**
```python
# In this example, the handler is time.sleep(15 * 60),
# but you can of course handle it in any way you want.

def limit_handled(cursor):
    while True:
        try:
            yield cursor.next()
        except tweepy.RateLimitError:
            time.sleep(15 * 60)

for follower in limit_handled(tweepy.Cursor(api.followers).items()):
    if follower.friends_count < 300:
        print follower.screen_name
```

[Check out the API Reference](http://tweepy.readthedocs.io/en/v3.5.0/api.html)
