You don't need a bunch of _if's_ and _else if's_ to create an array of directories in python, just the good ol' `makedirs`.

![makedirs](/assets/images/thumbnails/makedirs.png)

## Create an array of directories
To create an array of directories you must import the package `os` and import the method `makedirs`
```python
>>> from os import makedirs
>>> makedirs('1/2/3/4/5')
```

You'll see now that your directories are created correctly, let's run the command `tree` outside of python to see if they're were actually created.
```bash
$ tree 1
1
└── 2
    └── 3
        └── 4
            └── 5

4 directories, 0 files
```

You can see that all our directories where created (it says 4 because it is excluding the root directory - 1).

We can create any array of directories as long as the _last_ directory that we want to create is _not_ already created. Let's create the directory number `6`.
```python
>>> makedirs('1/2/3/4/5/6')
```
Python does not complain, usually means it all went well, let's inspect our tree.
```bash
$ tree 1
1
└── 2
    └── 3
        └── 4
            └── 5
                └── 6

5 directories, 0 files
```

Perfect, there are 5 directories created under `1` now. Would `makedirs` complain if we wanted to overwrite the same directory structure?
```python
>>> from os import makedirs
>>> makedirs('1/2/3/4/5/6')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/home/franccesco/.pyenv/versions/3.6.5/lib/python3.6/os.py", line 220, in makedirs
    mkdir(name, mode)
FileExistsError: [Errno 17] File exists: '1/2/3/4/5/6'
```

Yes, this is because `makedirs` couldn't find a single directory to create (because they're already created), but sometimes we don't want `makedirs` to make a rant and exits abruptly if it encounters that the directory structure is already there.

To suppress this behavior we can pass the argument `exist_ok=True` to avoid `makedirs` to raise an exception.
```python
>>> from os import makedirs
>>> makedirs('1/2/3/4/5/6', exist_ok=True)
>>> makedirs('1/2/3/4/5/6', exist_ok=True)
```

See? Now `makedirs` doesn't complain if there's already a directory structure created, our directories are still created, or just ignored if they're already there.

```bash
$ tree 1
1
└── 2
    └── 3
        └── 4
            └── 5
                └── 6

5 directories, 0 files
```
