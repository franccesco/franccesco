To get the filesize of a download is really easy, servers usually provide a `Content-Length` in its header response that let us know how heavy is the content we are requesting. We can find out this content length opening our shell and requesting a `HEAD` response in linux:

[![HEAD response](/assets/images/misc/head_request.png)](/assets/images/misc/head_request.png)

As you can see, our content length is display in _bytes_. Let's try to get this response with `Requests`

## Display Content-Length with Requests

Let's use an image from [httpbin](https://httpbin.org/image/png). Remember to make a `HEAD` request instead of a `GET` request, this way we don't have to download the entire file
```python
>>> req = requests.head('https://httpbin.org/image/png')
>>> req.headers['Content-Length']
'8090'
```

When we filter the header with the `Content-Length` key we can see how heavy our request will be without having to actually download the file.

## Calculating the file-size without Content-Length

This is a tricky one because, well, not always every web server is going to provide you with a `Content-Length` in its header, this happens sometimes with csv, xml, and other text file-types, luckily they're not that heavy and we can provide a `GET` request to know the download size
```python
>>> req = requests.get('http://data.example.com/attachment_id=12')
>>> len(req.content)
659
```

As we can see here, we can calculate a file size (mostly text files) using the _len()_ method. If you have a better alternative you can show it off in the comments bellow.
