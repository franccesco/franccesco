Namedtuples are a subclass of _typename_ which allow us to create objects (or classes) with tuple-like attributes, it's easy to create a class with immutable attributes with this library.

## Creating an object
To create a namedtuple we only need the name of the class _first_ and then the attribute list.
```python
>>> from collections import namedtuple
>>> Person = namedtuple('Person', 'name job_position sex married')
>>> john = Person('john', 'developer', 'male', False)
>>> john
Person(name='john', job_position='developer', sex='male', married=False)
```
Be aware that you can pass an argument list as a string (**'att1 att2'**), as an _actual_ list (**['att1', 'att2']**) or a string with comma separated values (**'att1, att2'**).

## Accessing attributes
We can access the person attributes just like any other class.
```python
>>> john.name
'john'
>>> john.job_position
'developer'
>>> john.sex
'male'
>>> john.married
False
```

## Docstring
We can also assign docstring to our attributes.
```python
>>> Person.__doc__ = 'A person attributes'
'A person attributes'
>>> Person.name.__doc__ = "A person's name"
"A person's name"
>>> Person.job_position.__doc__ = "A person's job position"
"A person's job position"
>>> Person.sex.__doc__ = 'Yes'
'Yes'
>>> Person.married.__doc__ = 'Is the person married?'
'Is the person married?'
```

## Changing values
As our attribute are _tuples_ we cannot change these attributes.
```python
>>> john.name = 'Johnny'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: can't set attribute
```

But we can copy the class with the new values.
```python
>>> johnny = john._replace(name='johnny', married=True)
>>> johnny
Person(name='johnny', job_position='developer', sex='male', married=True)
```

## Convert a Dictionary to a Class
Using the same class _Person_ that we defined above.
```python
>>> d = {'name': 'john', 'job_position': 'developer', 'sex': 'male', 'married': False}
>>> john = Person(**d)
>>> john
```

[You can read more about namedtuples here](https://docs.python.org/3.6/library/collections.html#collections.namedtuple)
