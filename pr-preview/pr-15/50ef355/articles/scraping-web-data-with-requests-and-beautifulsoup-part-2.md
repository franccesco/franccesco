A quick recap of the last post:
* First we requested content using `requests` library and parsed the response's contents using BeautifulSoup library.
* We learned that we can manipulate HTML tags, get its contents and attributes (like `href` from an `a` tag).
* We found that the _Class_ `post-list` is holding an unordered list containing the website's post titles and links so we proceeded to get the `a` tag's content on each list item as well as their `href` attribute.
* We also store that data into a dictionary in a `{post_title: post_link}` format to be able to iterate over them and reuse them when needed.

Now we only have one problem left, and it is **_pagination_**. Now as you can see, this is our current source file:
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

When we execute our file it gives every post title and link from the main page:
```shell
$ pipenv run python extract_links.py
Scraping Web Data With Requests and Beautifulsoup [Part 1]: https://codingdose.info//2018/03/05/scraping-web-data-with-requests-and-beautifulsoup/
How to Send a Tweet With Python Using Tweepy: https://codingdose.info//2018/03/01/
-- SNIP --
Migrate From Ghost Blog to Jekyll: https://codingdose.info//2018/02/19/migrate-from-ghost-blog-to-jekyll/
```

The thing is, the first post from this web page is **_[Hello All!](/2018/02/18/Hello-all/)_** and not **_[Migrate From blabla to blabla](/2018/02/19/migrate-from-ghost-blog-to-jekyll/)_**, and chances are that (hopefully) this blog is updated regularly and you're not even getting the same results! So how do we get to page 2, 3, 4, and so on?

## Looping over pages

Most blogs have `/page/1` or `/index.php?page=1` or any kind of pagination mechanism to show you more content in an ordered manner. If we wanted to iterate over pages we would first _request_ **/page/1**, and then **/page/2** and so on.

But there's a catch: _This site doesn't have page 1._ It has `/page/2` in its URL (`https://codingdose.info/page/2/`) but page 1 it's the _Index_ page (`https://codingdose.info/`). But let's not get ahead ourselves now, we're going to get through this bit by bit.

## Finding our the number of pages

If we want to iterate over a number of pages, we first have to know how many pages there are in this little blog. If we go to the main page and scroll down we can see the number of pages in this blog: _Page 1 of X_

If we inspect the string with the developer tools in our browser (Remember: `CTRL+SHIFT+C`) we find out that the string _Page 1 of X_ is under the class **page-number**

![Inspection Tool](/assets/images/bs4_scraping/pagination.png)

Use the last number of this string to use it as the total pages this blog has and iterate over the total of those pages. At the time of writing, there are only 2 pages on this blog, so we are going to extract that number and convert it to a _Integer_:
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

# get the total number of pages
class_pages = url_contents.find(class_='page-number')
pages_found = class_pages.get_text()
total_pages = int(pages_found[-1])
print('Total Pages Found: ' + str(total_pages))
-- SNIP --
```

What we are doing here is filtering the class `page-number` to narrow our search and extract the text that it holds with `.get_text()` to store _'Page 1 of X'_ in the variable `total_pages`, now we _slice_ the last character of this string which is '2' with `[-1]`. Now that we have the total number of pages we convert the string into an _integer_ to be able to iterate over the pages.

But how we deal with the problem that I have no `/page/1`? Well, we will first extract the contents from the index page and _then_ we will start iterating over the pages starting from page **number 2**. Remember that this is very unlikely to happen in most blogging systems but programming is all about problem solving, right?

```python
from bs4 import BeautifulSoup

base_url = requests.get('https://codingdose.info')
url_contents = BeautifulSoup(base_url.text, 'html.parser')

# get the total number of pages
class_pages = url_contents.find(class_='page-number')
pages_found = class_pages.get_text()
total_pages = int(pages_found[-1])
print('Total Pages: ' + str(total_pages))

for page in range(1, total_pages + 1):
    if page == 1:
        # requesting index page (page 1)
        base_url = requests.get('https://codingdose.info')
    elif page > 1:
        # after requesting index page, go directly to page 2/3/4...
        base_url = requests.get(
            'https://codingdose.info/page/{}/'.format(page))

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

Now, there are a number of changes that we have to take into consideration, first we enclosed most of our code in a `for` control flow using our `total_pages` Integer as a guide, if you look closely we can see a `+ 1` at the end of the `for` line, why is this? Remember that when you are looping with a range of numbers (let's say from 0 to 9) in a `for` loop the control flow will stop at **8**, not **9**. This is because the `for` loop is _exclusive_ not _inclusive_ when looping over numbers, in this case, if we want the `for` loop to stop at **2** (inclusively, which is our current number of pages) we will have to add a number to our range.

If we are currently on _Page 1_, our base URL will be _'https://codingdose.info'_, and if we are on _Page 2_ then our base URL is going to be _'https://codingdose.info/page/2/'_, and so on.

Currently our code it's starting to [_smell_](https://en.wikipedia.org/wiki/Code_smell), it needs to be refactored to prevent duplication and it could be a lot faster if we integrate concurrency and handle threads, but I will leave that to you, because this is _by far_ not perfect... and it's getting late here. I'll end this post here and if you happen to clean the code and come up with a better idea then let me know in the comments bellow, thanks for reading.
