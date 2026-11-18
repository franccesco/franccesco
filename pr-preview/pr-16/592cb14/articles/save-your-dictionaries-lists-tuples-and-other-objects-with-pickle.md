![image](/assets/images/pickle/carbon.png)

Sometimes you just want to save a dictionary, a list, a string, or anything into a file so you can use it later. This can be easily achieved with the module **Pickle.**

>_**Warning:**_
The pickle module is not secure against erroneous or maliciously constructed data. Never unpickle data received from an untrusted or unauthenticated source. **_— [Pickle Documentation](https://docs.python.org/3.7/library/pickle.html)_**

## What is Pickle

Pickle is a module in Python that can be implemented to serialize or de-serialize a Python object, meaning that it can be used to save an **object** into a **file**; Just have in mind that this is not the same as saving a **configuration** file, there are other data structures that we can use to achieve that task such as JSON, CSV, YAML/TOML, etc.

## How to save an dictionary with Pickle

Saving an object with Pickle is really easy, all you need to do is to save the object into a file providing the **object** and the **filename**, here's a quick snippet:

```python

dictionary = {'string_1': 1, 'string_2': 2.2, 'string_3': True}

# Pickling (serializing) a dictionary into a file
with open('saved_object.pickle', 'wb') as filename:
    pickle.dump(dictionary, filename)
```

And there you go! You have saved the contents of an object into a file. Just remember to always save the file as _binary_ providing the arguments `w` (_writing_) and `b` (_binary_)

## Loading a dictionary

If you have used JSON before then you can find the syntax to be very familiar. We can load a previously pickled object using the `.load()` method and providing a filename:

```python

# Unpickling (de-serializing) a dictionary
with open('saved_object.pickle', 'rb') as filename:
    dictionary = pickle.load(filename)

print(dictionary)

# >>> {'string_1': 1, 'string_2': 2.2, 'string_3': True}
```

As you can see, our dictionary object was loaded correctly. To double-check this, here's a script that compares if the contents of a dictionary and a saved pickle are the same:

```python

dictionary_a = {'string_1': 1, 'string_2': 2.2, 'string_3': True}

# Pickling (serializing) dictionary A into a file
with open('saved_object.pickle', 'wb') as filename:
    pickle.dump(dictionary_a, filename)

# Unpickling (de-serializing) dictionary A into B
with open('saved_object.pickle', 'rb') as filename:
    dictionary_b = pickle.load(filename)

# Dictionaries A and B remaing the same
print(f'Is dictionary_a == dictionary_b?: {dictionary_a == dictionary_b}')

# >>> Is dictionary_a == dictionary_b?: True

# Dictionaries have the same content
print(f'Dictionary A: {dictionary_a}')
print(f'Dictionary B: {dictionary_b}')

# >>> Dictionary A: {'string_1': 1, 'string_2': 2.2, 'string_3': True}
# >>> Dictionary B: {'string_1': 1, 'string_2': 2.2, 'string_3': True}
```

## What kind of data can be Pickled?

According to the official documentation, this is the list of object types that can be pickle/unpickled:

* `None`, `True`, and `False`
* integers, floating point numbers, complex numbers
* strings, bytes, bytearrays
* tuples, lists, sets, and dictionaries containing only picklable objects
* functions defined at the top level of a module (using def, not lambda)
* built-in functions defined at the top level of a module
* classes that are defined at the top level of a module
instances of such classes whose __dict__ or the result of calling __getstate__() is picklable (see section Pickling Class Instances for * details).

This is a very interesting approach if you need to save an object into a file. Just beware that there's a lot of data structures out there than can help you to save a *configuration* file. But if you need to save an **object**, then this seems the right choice!

## Further Reading
* [Pickle — Python object serialization](https://docs.python.org/3.7/library/pickle.html)
