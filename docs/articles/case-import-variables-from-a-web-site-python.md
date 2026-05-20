![seafood ramen platter](https://images.unsplash.com/photo-1548943487-a2e4e43b4853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


## Before we start: A short disclaimer
**Don't do this.** Don't go there importing random code you found on the internet into _your_ code because that can be dangerous and code would be injected into your machine or a client's machine and **you don't want that.** Remember to _always_ have your code and modules in a **version control** system and that you have complete knowledge of what you're loading.

---

Today I was talking with some of the guys in a Discord server about python, called [**Python Discord**](https://pythondiscord.com/) (which I definitely recommend you to check out!), and stumbled upon a guy who was requesting assistance.

![Help](/assets/images/import_val_case/conv1.png)
(Yeah... I'm **theinquisitor.**)

What he wanted to do was to **import a variable that contains a list object,** which is perfectly fine, the only issue was that the variable was **in a web page called [dumptext.com](https://dumptext.com/Ai9Ww8j4/raw/).**

![List Snippet](/assets/images/import_val_case/impval1.png)

And to make things worst, when you inspect the web page's source code you find that the text isn't even _raw_ text, I don't know **_why_** would anyone add a _raw_ button that doesn't even return _raw_ text.

![List Snippet](/assets/images/import_val_case/impval2.png)

This is a **bad idea**, but hey: _I like to solve problems_, and we will work with this scenario just for the fun of it, so let's start with **Solution #1.**

## Solution #1: Create a module containing the variable name

The first solution will consist in:
1. **Request** the web page HTML's source code.
2. **Parse** the HTML code with BeautifulSoup
3. **Extract** the contents inside the HTML's `<pre></pre>` tags which contains the list we want.
4. **Save** the list into a module called `wordlist.py` that we can import.
5. **Import** the variable `words` from our newly created `wordlist.py` module.

Before we start, we have to create an empty module first that will hold our data:
`wordlist.py`
```bash
$ touch wordlist.py
```

Now we proceed to create our main python code called:
`solution1.py`
```python
"""Solution 1."""

from bs4 import BeautifulSoup
from importlib import reload

# our module containing the variable with the list object

# request the HTML source and extract the text inside the '<pre></pre>' tags.
dumptext_data = requests.get('https://dumptext.com/Ai9Ww8j4/raw/').text
parsed_dumptext_html = BeautifulSoup(dumptext_data, 'html.parser')
scraped_list = parsed_dumptext_html.pre.text

# save the contents of the scraped_list into a module
with open('wordlist.py', 'w') as wordlist_object:
    wordlist_object.write(scraped_list)

# reload the module to import the variable 'words'
reload(wordlist)

# now we can use the variable words everywhere we want.
words = wordlist.words
print(type(words))
print(words)
```

Now, we are familiar with the packages `requests` and `BeautifulSoup`, but what about `importlib`? Well, `importlib` have a lot of utilities for our _imports_. In this case we imported the module `reload()` from `importlib` that allows us to _reload_ a previous imported module, fresh as new, **including the newly created variable holding our list**. Remember that PEP8 recommends adding your imports at the top of the file, following your docstring, not in the middle of the file.


Let's see if our solution works well:
```bash
$ python solution1.py
<class 'list'>
['aah', 'aal', 'aas', 'aba', 'abo', 'abs', 'aby', 'ace', 'act', 'add', 'ado', 'ads', 'adz', 'aff', 'aft', 'aga', 'age', 'ago', 'ags', 'aha', 'ahi', 'ahs', 'aid', 'ail', 'aim', 'ain', 'air', 'ais', 'ait', 'ala', 'alb', 'ale', 'all', 'alp', 'als', 'alt', 'ama', 'ami', 'amp', 'amu', 'ana', 'and', 'ane', 'ani', 'ant', 'any', ...]
```
**It works!**, we can see that our it is an object from the class _list_ and it prints successfully.

There's only one thing... **_we shouldn't do this_**. Importing random code from the Internet is not a great option, believe me. You could do this in _very_ specific scenario where you absolutely don't have any choice, the file is read only and also _you_ are the owner. If it's a controlled file then good, but realistically I don't see that happening, so please, avoid this solution.

**It was fun to write though.**

## Solution #2: A Regular Expression to Match the List Items

This is a much better (and cleaner) solution, what we'll do is the same scraping as before, but instead of creating and loading a module, we will pick everything inside a pair of single quotes (`''`) from the parsed HTML code with a _regular expression_ and add those results to a list.

Let's jump straight into the code:
`solution2.py`
```python
"""Solution 2."""

from bs4 import BeautifulSoup

# request the HTML source and extract the text inside the '<pre></pre>' tags.
dumptext_data = requests.get('https://dumptext.com/Ai9Ww8j4/raw/').text
parsed_dumptext_html = BeautifulSoup(dumptext_data, 'html.parser')
scraped_list = parsed_dumptext_html.pre.text

# define a pattern that captures everything inside a pair of quotes ('')
pattern = re.compile(r'\'(.*?)\'')

# create a list of items using list comprehension with all the matching items
words = [word for word in re.findall(pattern, scraped_list)]

# now we can use the variable words everywhere we want.
print(type(words))
print(words)
```

Let's see if it works correctly:
```bash
$ python solution2.py
<class 'list'>
['aah', 'aal', 'aas', 'aba', 'abo', 'abs', 'aby', 'ace', 'act', 'add', 'ado', 'ads', 'adz', 'aff', 'aft', 'aga', 'age', 'ago', 'ags', 'aha', 'ahi', 'ahs', 'aid', 'ail', 'aim', 'ain', 'air', 'ais', 'ait', 'ala', 'alb', 'ale', 'all', 'alp', 'als', 'alt', 'ama', 'ami', 'amp', 'amu', 'ana', 'and', 'ane', 'ani', 'ant', 'any', ...]
```

That's it!, no need for stinkin' modules and injecting random code into our code, no importing and no reloading:
1. We imported the library `re` which aid us to search for strings using _regular expression_ (Or _RegEx_).
2. We use the same scraping technique as before.
3. Now we define a RegEx pattern with `re.compile(r'__pattern__')`
4. Create a List of words, where `word` is the result of all the words found in `re.findall(pattern, scraped_list)`

And that all, you can now use your `words` in a **_lot_** more safer way.

# Python Discord
If you're interested in being part of a community, then I cannot recommend you **Python Discord** more. It has helped me to learn so _much_ about Python, people is really helpful and we're are _always growing_.

So please, be my guest and hop in this awesome community, here's your invite: https://pythondiscord.com/invite

**Everyone** is welcome.
