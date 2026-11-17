>I encourage developers to see the value of unit testing; I urge them to get into the habit of writing structured tests alongside their code.
— [CodingHorror](https://blog.codinghorror.com/i-pity-the-fool-who-doesnt-write-unit-tests/)

I was reading about Unit Testing and found a blog entry in CodingHorror called _[I Pity The Fool Who Doesn't Write Unit Tests](https://blog.codinghorror.com/i-pity-the-fool-who-doesnt-write-unit-tests/)_, and guess what, **he's right**.

Sadly, I've encountered a lot of people who doesn't write tests for their code, and have a [CI System](https://www.agilealliance.org/glossary/continuous-integration) (Travis, Jenkins, Gitlab, etc.) only to test the syntax of the code with flake8 or pycodestyle, or the result of calling the software without returning an exception... this is **_wrong_**, you're not testing anything there.

You should be able to test your code to ensure that you're getting the expected output and then have the confidence to refactor or write new functions without the fear of breaking anything.

There is _value_ in testing, and **I'm not talking about religiously test _first_ code _later_**, for me that's a personal matter, all that I'm saying is that **your code won't have the quality it needs without testing.** So stop neglecting Unit Testing and I invite you to read the CodingHorror blog post.

Let's jump right into it with a primer for python.

## Unit Testing a Method

Honestly, you should **_write a failing test_** first, then **_write just the necessary code_** to make it work, and lastly **_refactor_**, from now on just rinse and repeat. But as we're still learning how to code I'll write the code first and let's test it later.

We're going to write a module called `say_hi.pi` that has a function called `salute(name)` which takes a `name` as a single argument and returns `Hello, <name>!`. Here's our code for `say_hi.py`:

```python
def salute(name):
    return 'Hello, {}!'.format(name)
```

Now let's write a test called `test_say_hi.py` for this module to ensure that our code always return the desired string:
```python
from say_hi import salute


class TestSayHi(unittest.TestCase):
    """Class for testing say_hi.py"""

    def test_salute(self):
        """Test salute() function."""
        self.assertEqual(salute('Anne'), 'Hello, Anne!')


if __name__ == '__main__':
    unittest.main()
```

Seems a bit long, huh? We'll break it later, for now let's see if our code works:
```bash
$ python test_say_hi.py
```
Aaand guess what?:
```
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

It works correctly, so what is happening in that test? Let's break it down.

## Inspecting the Test

1. First we import the **unittest** module that will let us write tests for our code:
```python
```

2. Now we import the function `salute` from the python file `say_hi.py` that we just wrote.
```python
from say_hi import salute
```

3. We create a new class that inherits from `unittest.TestCase`, we're are making a new test case class that will hold our methods to test our `say_hi.py` functions.
```python
class TestSayHi(unittest.TestCase):
    """Class for testing say_hi.py"""
```

4. Now we define our first class method, this method will test our function `salute`, and this is the important part, what are we doing with `self.assertEqual`? We are making a comparison here, we are asking our test: _The function `salute('Anne')` **should** return exactly: `Hello, Anne!`, if it's not the same, then complain!_
```python
def test_salute(self):
    """Test salute() function."""
    self.assertEqual(salute('Anne'), 'Hello, Anne!')
```

5. Lastly this line here is in charge of executing or Unit Tests if it's called directly as a standalone program.
```python
if __name__ == '__main__':
    unittest.main()
```

## Testing a Class
Now that we have the hang of it, let's create our own class, it shouldn't be hard at all.

Let's create a `Raccoon` class with a name (because, _why not?_) and a `rabid` status of `False`... because we don't want a rabid raccoon.

Tha _only_ thing that is going to change is that we are making things the _"right way"_ now. We're making a _Test first_, then we _write code_, and finally we _refactor_, so let's dive directly into the unit test.

`test_raccoon.py`
```python
from raccoon import Raccoon


class TestRabidRaccoon(unittest.TestCase):
    """Test if raccoon class."""

    def test_raccoon_health(self):
        """Test if the raccoon is rabid or not."""

        # let's name our favorite raccoon 'Helga'
        helga = Raccoon('helga')
        self.assertEqual(helga.rabid, False)


if __name__ == '__main__':
    unittest.main()
```

Now let's execute our test and let's see how our tests _guide us_ to write our code:
```bash
$ python test_raccoon.py
Traceback (most recent call last):
  File "test_raccoon.py", line 2, in <module>
    from raccoon import Raccoon
ImportError: cannot import name 'Raccoon'
```
Our test complains that there's no such module called `Raccoon`, of course there isn't one because we haven't created one, so let's do it:

`racoon.py`
```python
class Raccoon(object):
    def __init__(self, name):
        self.name = name
        self.rabid = False
```

Now, we execute our test again:
```bash
$ python test_raccoon.py
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

And we find out that it's all alright, now it's time to refactor, as we haven't written almost anything, we should add at least documentation to our class without the fear of breaking anything, **unit tests got our backs.**

`racoon.py`
```python
"""Module holding Raccoon class."""


class Raccoon(object):
    """Class simulating a rabid Raccoon."""

    def __init__(self, name):
        """Initialize attributes."""
        self.name = name
        self.rabid = False
```

We added simple docstrings to our module, let's see if we didn't break anything:
```bash
$ python test_raccoon.py
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

## Refactoring our Unit Test

Our test could've been better and we need to refactor it, because there are minor details that we should implement, let's introduce the **setUp** method.

First of all, if our test is going to use the name `Helga` multiple times, then we should define a **setUp** method so we can define our name only one time to avoid repetition, we do this _inside_ our _Test Case_ class `TestRabidRaccoon`. Also we're changing `assertEqual` for a more appropriate a shorter way to check for `False` which is `assertFalse`:
```python
from raccoon import Raccoon


class TestRabidRaccoon(unittest.TestCase):
    """Test if raccoon class."""

    def setUp(self):
      """Setup variables that we're going to use across our class"""
        self.name = 'Helga'

    def test_raccoon_health(self):
        """Test if the raccoon is rabid or not."""
        # let's pass the previously defined name in setUp
        helga = Raccoon(self.name)

        # change assertEqual for a more proper method to check False
        self.assertFalse(helga.rabid)


if __name__ == '__main__':
    unittest.main()

```
```
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
[Finished in 0.167s]
```
It runs as expected. There are other assertion methods that you can use to test your code, here's a short list:

| Method                          | Description                         |
| :-------------                  | :-------------                      |
| **assertEqual(A, B)**           | Check if A is equal to B            |
| **assertNotEqual(A, B)**        | Check if A is _not_ equal to B      |
| **assertTrue(A)**               | Check if A is returns **True**      |
| **assertFalse(A)**              | Check if A returns **False**        |
| **assertIn(_item_, _list_)**    | Check if _item_ is in _list_        |
| **assertNotIn(_item_, _list_)** | Check if _item_ is _not_ in _list_  |

## Conclusion

This is enough to get you started, there's a _lot_ of value in testing, and you should do it, you'll become a better developer and you'll also adopt good practices, if you're barely starting coding then you will be able to **use your test as a guidance** because you will be _forced_ to think _what_ you want your code to do _first_ before actually code it.

If you are an experienced developer  then **you will catch bugs easier**, you'll have **confidence when you're refactoring** your code, **things are less likely to break**, and you will be able to **implement new features exactly as you want them**.

So, code first and test later, or test first and code later, that's **OK** for me, _as long as you are testing it._
