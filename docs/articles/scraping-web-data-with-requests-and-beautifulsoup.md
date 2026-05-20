Scraping web data is essential if we want to spider web pages for whatever reasons we have, maybe storing posts information (in my case) or monitor a web page, crawl data, etc.

We are going to see how to handle html data with [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) and [Requests](http://docs.python-requests.org/en/master/) using this site as an example.

## What are we going to do?
* Make a `GET` request with the `requests` library to obtain the web page contents
* Parse those contents into HTML so we can analyze and manipulate data using the powerful `BeautifulSoup`
* Learn how to deal with pagination [in part 2]

## BeautifulSoup and Requests Installation

As usual using `pipenv`
```shell
pipenv install bs4 requests
```

## Requesting Site Data with GET method

Using this site as an example, we first have to request the site data before we parse it in HTML
```python

# requesting index page
base_url = requests.get('https://codingdose.info')
```

This way we have stored our `GET` response into base_url, we can analyze the response code with `base_url.status_code`
```python
>>> base_url.status_code
200
```
A `200` response code means that our request was successful.

You can find more information on `HTTP` statuses on [httpstatuses.com](https://httpstatuses.com/), keep this site as a reference guide when working with web data such as http statuses and requests.

## Parsing HTML

Now with `requests` we can parse our HTML data with `requests` using `base_url.text` but it doesn't offer the plethora of information and benefits that BeautifulSoup can offer. Let's import BeautifulSoup and find out what can we do with it.
```python
from bs4 import BeautifulSoup

# requesting index page
base_url = requests.get('https://codingdose.info')

# parse html data
url_contents = BeautifulSoup(base_url.text, 'html.parser')

# printing a pretty version of our HTML data
print(url_contents.prettify())

```

We can see that our output is a prettified version of our HTML requests with proper spacing and new lines
```html
<!DOCTYPE html>
<html>
 <head>
  
   <title>
    CodingDose()
   </title>
   
   <link href="/css/style.css" rel="stylesheet"/ />
   
   <link href="/atom.xml" rel="alternate" title="CodingDose()" type="application/atom+xml" />
   </link>
  </meta>
 </head>

```

Now this is a lot of data, what if we only want to extract the title?
```python
>>> url_contents.title
<title>CodingDose()</title>
```

Ok, what if we want to strip the tags?
```python
>>> url_contents.title.string
'CodingDose()'
```

What about if we want all the the `<p>` tags?
```python
>>> for p in url_contents.find_all('p'):
...    print(p.string)
```

You can find all the documentation and methods in the [BS4 docs](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

## Extracting all posts titles and links
Now, as an example, we are going to scrape this site and extract all posts titles and links, and store them in a dictionary so we can loop around them, store them or do whatever we want with them.

There's a lot of links in this site, so how can we identify only the posts titles and links? We can use the browser inspection tool to identify the _Class_ that holds our links pressing `CTRL + SHIFT + C` and clicking the first post link to inspect information about it:

![Inspection tool](/assets/images/bs4_scraping/inspection_tool.png)

Now we see how the link and title is handled in the HTML source code displayed in the Inspection Tool:

![Source Code](/assets/images/bs4_scraping/source_code.png)

As we can see, our post's link and title is inside a `<li>` (**L**ist **I**tem) tag which is inside an `<ul>` (**U**nordered **L**ist) tag which belongs to the class `post-list`, now we can narrow our search using BeautifulSoup and the method `.find_all(tag)` to identify links and strings that only belongs to this class
```python
from bs4 import BeautifulSoup

# requesting index page
base_url = requests.get('https://codingdose.info')

# parse html data
url_contents = BeautifulSoup(base_url.text, 'html.parser')

# extract contents from class post-list
post_list = url_contents.find(class_='post-list')

# filter and print link tags ('a') from previous list
post_items = post_list.find_all('a')
print(post_items)
```

Now we have a list including all links and titles from our `post-list` class but to be honest, it's quite a mess, so let's order our posts into a `{title}: {link}` format using the method `.get` from each item in our list which extracts the attribute data from our tags, this way if we have:
```html
<a class="" href="/2018/03/01/How-to-send-a-tweet-with-Python-using-Tweepy/">How to Send a Tweet With Python Using Tweepy</a>
```

We can use the method `.get(href)` to extract the attribute content (_/2018/03/01/How-to-send-a-tweet-with-Python-using-Tweepy/_) and of course we would have to attach a our base url to each `href` attribute so it displays a complete URL:

```python
from bs4 import BeautifulSoup

# requesting index page
base_url = requests.get('https://codingdose.info')

# parse html data
url_contents = BeautifulSoup(base_url.text, 'html.parser')

# extract contents from class post-list
post_list = url_contents.find(class_='post-list')

# filter and print link tags ('a') from previous list
post_items = post_list.find_all('a')

# extracting post item and post link from 'post_items'
for post in post_items:

    # extract title with '.string' method
    post_title = post.string

    # attach 'base_url' url to each 'href' attribute content
    post_link = base_url.url + post.get('href')
    print('{}: {}'.format(post_title, post_link))
```

Now we have a formatted list with our titles and links, but we should store that information in a dictionary so we can reuse it later, alright? Let's add a dictionary holding our values in the following format:
`post_dict[post_title] = post_link`
```python
from bs4 import BeautifulSoup

# requesting index page
base_url = requests.get('https://codingdose.info')
url_contents = BeautifulSoup(base_url.text, 'html.parser')

# filter post-list tag
post_list = url_contents.find(class_='post-list')
post_items = post_list.find_all('a')

# hold attributes in a dictionary
post_dict = {}

for post in post_items:
    post_title = post.string
    post_link = base_url.url + post.get('href')
    post_dict[post_title] = post_link

# iterate our dictionary
for title, link in post_dict.items():
    print('{}: {}'.format(title, link))
```

Now that our values (title and link) are attached to our dictionary, we can reuse them in our code, maybe to create a database with posts and links? Share them to twitter? Crawling? Whatever we want to do with them, we can do it easily if we hold our values in a dictionary.

We have only one problem left... _**pagination**_. You see, we only have the links in the index page, how can we make our script go to the second page, and the third one and so on to extract the titles and links on those pages? We'll see this in the second part of this post. _See ya._
