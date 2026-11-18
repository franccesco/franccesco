## Why?

Sometimes you don't want output _at all_ to your screen, there are times when I'm writing a function that prints something to the screen, the ideal thing (at least for me) is to use `return` instead of `print()` of course, but let's say that you don't have another option and when it comes to Unit Testing it becomes annoying. How can we suppress [STDOUT](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout))?

## Redirecting STDOUT

We're writing a simple script that greets someone:
```python
def salute(name):
    """Says hi to someone."""
    print('Hi, {}!'.format(name))
```

Let's run this code shall we? We'll import it and use the function `salute(name)`:
```python
>>> from say_hi import salute
>>> salute('Anne')
Hi, Anne!
```

It works great. Now, to suppress the output of `salute(name)` we're going to redirect `sys.stdout` into a [StringIO](https://docs.python.org/3/library/io.html) to capture any text output:
```python
# remember to import io and sys


def salute(name):
    """Says hi to someone."""
    print('Hi, {}!'.format(name))


# create a text trap and redirect stdout
text_trap = io.StringIO()
sys.stdout = text_trap

# execute our now mute function
salute('Anne')

# now restore stdout function
sys.stdout = sys.__stdout__
```

If we execute this python code, no output will be displayed. This is useful when we are Unit Testing and we want to suppress `print()` output. If we want to check the captured test we can do this with `.getvalue()`:

```python
-- SNIP --

# getting trapped print
print('Captured text:')
print(text_trap.getvalue())
```

Result:
```python
Captured text:
Hi, Anne!
```

## Unit Testing print()

If we have a module that prints something to the screen instead of returning a value, we can test that `print()` string with the method above. First, let's remove everything from our previous code, leaving only our `salute` method:
```python
def salute(name):
    """Says hi to someone."""
    print('Hi, {}!'.format(name))
```

Using the code above, what we want to do is to test if the method `salute(name)` always prints a greeting in the following format: `Hi, __name__!` (keep in mind that the function `print()` always insert a new line, or `\n`, at the end)

Let's setup our Unit Test:
```python
from say_hi import salute


class TestSayHi(unittest.TestCase):
    """Tests for say_hi.py"""

    def setUp(self):
        self.name = 'Anne'

    def test_salute(self):
        self.assertEqual(salute(self.name), 'Hi, Anne!\n')


if __name__ == '__main__':
    unittest.main()
```

When we execute our code we obtain the following error:
```bash
$ python test_say_hi.py
Hi, Anne!
F
======================================================================
FAIL: test_salute (__main__.TestSayHi)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_say_hi.py", line 12, in test_salute
    self.assertEqual(salute(self.name), 'Hi, Anne!\n')
AssertionError: None != 'Hi, Anne!\n'

----------------------------------------------------------------------
Ran 1 test in 0.000s
```

Why our assertion didn't work here? `salute('Anne')` returns `'Hi, Anne!\n'`, right? It doesn't. Print doesn't return anything actually, it just _prints_ something to the screen ([to put it mildly](https://docs.python.org/3.5/library/functions.html#print)), but it doesn't _returns_ a string.

But with our previous technique we can capture the string and store it in a value so we can compare our print string:
```python
from say_hi import salute


class TestSayHi(unittest.TestCase):
    """Tests for say_hi.py"""

    def setUp(self):
        self.name = 'Anne'

    def test_salute(self):
        """Test print in salute()."""
        # create a trap
        text_trap = io.StringIO()
        sys.stdout = text_trap

        salute(self.name)

        # restore stdout
        sys.stdout = sys.__stdout__
        self.assertEqual(text_trap.getvalue(), 'Hi, Anne!\n')


if __name__ == '__main__':
    unittest.main()
```

Inspecting `test_salute()` we redirect our print to our `text_trap`, and after restoring `stdout` to its original functionality we can compare the value of `text_trap.getvalue()` with our expected output: `'Hi, Anne!\n'`:

```bash
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

And it works correctly, we can now compare our `print` value with an unit test, plus it doesn't print anything in our tests.

# UPDATE
There's a much nicer and safer way to do this instead of rewriting `stdout`, we can use a _Context Manager_ temporarily redirect `sys.stdout` without touching it.

```python
from contextlib import redirect_stdout


def salute(name):
    """Says hi to someone."""
    print('Hi, {}!'.format(name))


# set a trap and redirect stdout
trap = io.StringIO()
with redirect_stdout(trap):
    salute('Anne')

# getting redirected output
captured_stdout = trap.getvalue()
print(captured_stdout)
```

And if we're going to test `salute(name)`:
```python
from say_hi import salute
from contextlib import redirect_stdout


class TestSayHi(unittest.TestCase):
    """Tests for say_hi.py"""

    def setUp(self):
        self.name = 'Anne'

    def test_salute(self):
        """Test print in salute()."""
        # create a trap
        text_trap = io.StringIO()
        with redirect_stdout(text_trap):
            salute(self.name)
        self.assertEqual(text_trap.getvalue(), 'Hi, Anne!\n')


if __name__ == '__main__':
    unittest.main()
```

This is a much safer and cleaner approach, have fun!
