There's a great library added in Python 3.5 that lets you return a list of filenames and folders called `glob`, here's how to use it.

## Return files and folders in current folder.

```python
>>> glob('**')
['scaffolds', 'node_modules', 'yarn.lock', '_config.yml', 'source', 'db.json', 'themes', 'package.json', 'package-lock.json']
```

## Return files and folders recursively
```python
>>> glob('**', recursive=True)
['scaffolds', 'scaffolds/post.md', 'scaffolds/page.md', 'scaffolds/draft.md', 'node_modules', '...']
```

## Return only specific type of files
* **recursively**
```python
>>> glob('*.json', recursive=True)
['db.json', 'package.json', 'package-lock.json']
```
* **non-recursively**
```python
>>> glob('**/*.md', recursive=True)
['scaffolds/post.md', 'scaffolds/page.md', 'scaffolds/draft.md', '...']
```

* **recursively from another folder**
```python
>>> glob('source/**/*.md', recursive=True)
['source/README.md', 'source/about/index.md', 'source/_posts/class-inheritance-with-python.md', 'source/_posts/How-to-securely-store-sensitive-configuration-with-dotenv.md', '...']
```

# Print a list of filenames:
* **Relative path**
```python
>>> for file in glob('source/**/*.md', recursive=True):
...     print(file)
...
'source/README.md'
'source/about/index.md'
'source/_posts/class-inheritance-with-python.md'
'source/_posts/How-to-securely-store-sensitive-configuration-with-dotenv.md'
'source/_posts/Hello-all.md'
'source/_posts/return-a-list-of-files-and-absolute-path-with-python.md'
'source/_posts/scraping-web-data-with-requests-and-beautifulsoup-part-2.md'
```

* **Absolute path**
```python
>>> import os
>>> from glob import glob
>>> for file in glob('source/**/*.md', recursive=True):
...     print(os.path.abspath(file))
...
'/home/franccesco/workspace/codingdose.info/source/README.md'
'/home/franccesco/workspace/codingdose.info/source/about/index.md'
'/home/franccesco/workspace/codingdose.info/source/_posts/class-inheritance-with-python.md'
'/home/franccesco/workspace/codingdose.info/source/_posts/How-to-securely-store-sensitive-configuration-with-dotenv.md'
'/home/franccesco/workspace/codingdose.info/source/_posts/Hello-all.md'
'/home/franccesco/workspace/codingdose.info/source/_posts/return-a-list-of-files-and-absolute-path-with-python.md'
'/home/franccesco/workspace/codingdose.info/source/_posts/scraping-web-data-with-requests-and-beautifulsoup-part-2.md'
```

Have fun.
