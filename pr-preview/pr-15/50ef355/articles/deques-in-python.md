Deques are a great way to handle memory efficient appends to a list-like object, it is a special module that allows you to handle list items in a more appropriate way.

![Deque example](/assets/images/thumbnails/deques.png)

## Create a deque

To create a list simply import the `deque` module from `collections` library and call `deque(_items_)` on a variable.

```python
>>> from collections import deque
>>> dq = deque('123')
>>> dq
deque(['1', '2', '3'])
>>> type(dq)
<class 'collections.deque'>
```

Or if you wish to create an empty `deque`.
```python
>>> dq = deque()
>>> dq
deque([])
```

What happens if you want to create a deque of integers?
```python
>>> dq = deque(123)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not iterable
```

You simply can't. Why is that? Because Integers are not iterable in python but String _are_.

This is because Integers, unlike strings, don't have a `__iter__` method and therefore they don't return iterables.
```python
>>> str.__iter__
<slot wrapper '__iter__' of 'str' objects>
>>> int.__iter__
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: type object 'int' has no attribute '__iter__'
```

## Accessing items by index

We can access items in a deque with an index number.

```python
>>> dq[0]
'1'
>>> dq[1]
'2'
>>> dq[2]
'3'
```

## Converting an item to integer

You can convert an item to a item simply by wrapping them around an `int()` method.

```python
>>> one = int(dq[0])
>>> type(one)
<class 'int'>
>>> one
1
```

## Appending items to a deque

We can append new items to our deque, to either left side or right side.

```python
>>> dq.append('4')
>>> dq
deque(['1', '2', '3', '4'])
>>> dq.appendleft('0')
>>> dq
deque(['0', '1', '2', '3', '4'])
```

## Extending our deque

We can also add multiple values at once.

```python
>>> dq.extend('567')
>>> dq
deque(['0', '1', '2', '3', '4', '5', '6', '7'])
>>> dq.extendleft('cba')
>>> dq
deque(['a', 'b', 'c', '0', '1', '2', '3', '4', '5', '6', '7'])
```

## Popping items

We can delete items in both sides.

```python
>>> dq.pop()
'7'
>>> dq
deque(['a', 'b', 'c', '0', '1', '2', '3', '4', '5', '6'])
>>> dq.popleft()
'a'
>>> dq
deque(['b', 'c', '0', '1', '2', '3', '4', '5', '6'])
```

## Rotating items

Or rotate our items if we want.

```python
>>> dq.rotate(-2)
>>> dq
deque(['0', '1', '2', '3', '4', '5', '6', 'b', 'c'])
```

```python
>>> dq.rotate(2)
>>> dq
deque(['b', 'c', '0', '1', '2', '3', '4', '5', '6'])
```

## Slicing deques

We cannot slice our deques, at least not _directly_.

```python
>>> dq[2:]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: sequence index must be integer, not 'slice'
```

You can import `itertools` and return a sliced list (not a deque) of items with `islice()` method.

```python
>>> import itertools
>>> list(itertools.islice(dq, 2, 9))
['0', '1', '2', '3', '4', '5', '6']
```

You can find more information about deques in the official Python documentation: [Deque Objects](https://docs.python.org/3/library/collections.html#collections.deque)
