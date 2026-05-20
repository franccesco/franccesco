![gray and black film projector](https://images.unsplash.com/photo-1526708286628-e9e0b57f84fa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


If you find yourself having troubles debugging your code, or wondering what went wrong, then you should start logging events in your python code.

Using the `logging` library you can basically record what actions is your code doing, i.e making a web request, reading a file, monitoring something, etc. It can help you to narrow down your faulty code for debugging.

Moreover, logging is not only helpful for debugging, but it is also helpful for collaboration, and many platforms use the logging module in your code so you navigate between events easily. It will not only help you on your projects, but also in professional environments.

## The logging module
You can start by importing the `logging` library in your python shell and after importing it you can log different event levels such as `INFO`, `WARNING` and `ERROR`.

```python
In [1]: import logging

In [2]: logging.info('Hello')

In [3]: logging.warning('Something might happen...')
WARNING:root:Something might happen...

In [4]: logging.error('Something BAD happened!')
ERROR:root:Something BAD happened!
```

I assume you noticed that our `info` event wasn't logged. This is because the default logging level is set to record events equals to warnings and above. There are 4 types of levels you should know about.

| Level    | Attribute        | Code |
|----------|------------------|------|
| Debug    | logging.DEBUG    | 10   |
| Info     | logging.INFO     | 20   |
| Warning  | logging.WARNING  | 30   |
| Error    | logging.ERROR    | 40   |
| Critical | logging.CRITICAL | 50   |
| Fatal    | logging.FATAL    | 50   |

We can allow the logging module to log `info` records using the `setLevel()` function.

```python
In [9]: logging.getLogger().setLevel(logging.INFO)
In [10]: logging.info('info!')
INFO:root:info!
```

However, what we should be doing, is to instantiate a _logger_ class. This will allow us to set up the format, a handler and the logging level without having to call it from the main module.

> _Loggers have the following attributes and methods.  Note that Loggers should NEVER be instantiated directly, but always through the module-level function `logging.getLogger(name)`.  Multiple calls to `getLogger()` with the same name will always return a reference to the same Logger object._
>
> _— Python 3 Docs_

## Loading a logger

We can instantiate logger using the method `getLogger()`, we just have to provide a name for that logger.

Usually what you will want to do is to provide a name to the `getLogger()` function, this name can be the special variable `__name__`. This way you can identify from which module is the log coming from.

```python
In [1]: import logging
In [2]: logger = logging.getLogger(__name__)
```

After you have instantiated your logger class, you have to define a handler. Now, a handler is what tells the logger where it should store the logs. The two most common options are the `FileHandler` and the `StreamHandler`, but there are [other options](https://docs.python.org/3.8/library/logging.handlers.html#module-logging.handlers) as well.

```python
In [1]: import logging

In [2]: logger = logging.getLogger(__name__)
In [3]: logger.setLevel(logging.INFO)

In [4]: stream_handler = logging.StreamHandler()
In [5]: logger.addHandler(stream_handler)

In [6]: logger.info('I\'m displaying info!')
I'm displaying info!
```

## Changing logger format

However, I would like to add more formatting to the logs,  in this case, a time, a level name, and a message will suffice. Luckily, this is fairly easy using the `Formatter` class.

```python
In [7]: log_format = logging.Formatter("%(asctime)s - %(levelname)s: %(message)s")

In [8]: stream_handler.setFormatter(log_format)

In [9]: logger.info('I\'m displaying info!')
2020-05-25 20:18:25,322 - INFO: I'm displaying info!
```

You can see a list of attribute names in the python documentation [here](https://docs.python.org/3.8/library/logging.html#logrecord-attributes).

## Putting it all together

Let's gather our thoughts and put this scenario. Let's say we have a `TXT` file in which we have some Urls and we have build a script that goes through each one of them to test if they are up and running, throwing error codes (HTTP 5xx) or maybe completely down.

We also want to log everything into a file, more specifically `INFO` levels and up, but we also want to log only `WARNING` events into our terminal so we don't fill it up with information we don't care about.

To do this we are going to split our script into 2 modules. Is not necessary but I don't want to cramp it up everything into a single file. Let's first create a `TXT` file and fill it out with Urls:

```
https://httpstat.us/
https://httpstat.us/500
https://httpstat.us/400
https://localhost/
```

Now, let's create a python script and call it `load_logger.py`. Here we'll define our logger instance, the formatter, and handlers appended to it with their respective logging level.

```python


def load_logger() -> logging.Logger:
    """Return a logger instance."""

    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)

    file_handler = logging.FileHandler("status.log")
    stream_handler = logging.StreamHandler()

    file_handler.setLevel(logging.INFO)
    stream_handler.setLevel(logging.WARNING)

    log_format = logging.Formatter("%(asctime)s - %(levelname)s: %(message)s")

    file_handler.setFormatter(log_format)
    stream_handler.setFormatter(log_format)

    logger.addHandler(file_handler)
    logger.addHandler(stream_handler)

    return logger
```

Now that we have defined our logger, let's create our main script `site_monitor.py`. What this file will do is:
1. Load the event logger
2. Read our file domains.txt
3. Test the status code of each destination
4. Log the event of the status code

```python
from sys import argv
from sys import exit
from load_logger import load_logger


def main(domains_file: str) -> None:
    """Check for a number of HTTP codes and log them."""

    logger = load_logger()

    with open(domains_file, "r") as file:
        logger.info(f"Reading file: {domains_file}")
        domains = file.read().splitlines()

    for url in domains:
        logger.info(f"Sending get request to: {url}")

        try:
            req = requests.get(url)
        except Exception as e:
            logger.error(f"Destination unreachable for url: {url}")
            exit(1)
        else:
            if req.ok:
                logger.info(f"Status OK for url: {url}")
            else:
                logger.warning(f"Received status code: {req.status_code}")


if __name__ == "__main__":
    main(argv[1])
```

To run our script you can call it using the command line:

```bash
$ python site_monitor.py domains.txt
```

After that you will see that only `WARNING` events are being recorded in the console, but in our `status.log` file you will see `INFO` logs and up.

In this example, I'm executing code and I'm using the command `tail` with the flag `-f` to see what's being recorded in that file.

<video src="/assets/images/logging/logging_tail.webm" autoPlay loop controls muted />

As you can see, in our example we only log `WARNING` events in our terminal, but we are able to dump everything in our `status.log` file.

If you want to take a closer look at the code, I've set up a sample repository at: https://github.com/franccesco/status_monitor_example

Feel free to reach out if you have any doubts.
