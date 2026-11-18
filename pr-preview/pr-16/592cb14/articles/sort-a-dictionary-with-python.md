## Dicionary Example:

```python
dictionary = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

## Sorting methods

### Sort keys
```python
sorted(dictionary)
>> ['five', 'four', 'one', 'three', 'two']
```

### Sort keys by value

```python
sorted(dictionary, key=dictionary.__getitem__)
>> ['one', 'two', 'three', 'four', 'five']
```

### Sort values

```python
sorted(dictionary.values())
>> [1, 2, 3, 4, 5]
```

### Reverse sorting with `reverse=True`

```python
sorted(dictionary, key=dictionary.__getitem__, reverse=True)
>> ['one', 'two', 'three', 'four', 'five']
```
