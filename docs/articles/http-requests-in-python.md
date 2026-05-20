# Before starting
lets try HTTP requests with [httpbin.org](https://httpbin.org/) to test multiple HTTP methods with `requests` and `JSON` data. We'll see how to extract data from a JSON-encoded response (e.g. \{'key': 'value'\})

## Install requests library
With `pipenv` ([recommended](https://codingdose.info/2018/02/20/pipenv-development-workflow/)):
```
pipenv install requests
```

With `pip`:
```
pip install requests
```

## GET request
Check our IP address:
```python

# get request, response is JSON-encoded
myIP = requests.get('https://httpbin.org/ip')

# extract value from JSON key 'origin'
# {'origin': '38.132.120.4'}
print(myIP.json()['origin'])
```

User agent:
```python

user_agent = requests.get('https://httpbin.org/user-agent')
print(user_agent.json()['user-agent'])
```

Time:
```python

time = requests.get('https://now.httpbin.org/')
print(time.json()['now']['rfc2822'])
```

Passing URL parameters:
```python

parameters = {'param1': 'value2', 'param2': 'value2'}
get_params = requests.get('https://httpbin.org/get', params=parameters)
```

## POST request
Post Request:
```python

post_data = requests.post('https://httpbin.org/post', data = {'hello': 'world'})
print(post_data)
```

## Method Status Code
```python

req = requests.get('https://httpbin.org/')
req.status_code()
```

## Authentication
```python

auth = requests.get('https://httpbin.org/basic-auth/user/passwd', auth=('user', 'passwd'))
```

## Custom HTTP Headers
```python

my_headers = {
    'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Referer': 'google.com',
    'Cookies': 'AmA=Cookie!',
}
req = requests.get('https://httpbin.org/anything', headers=my_headers)
```

## Putting everything together

A script that reports an IP address geolocation, hostname and country:
```python
from requests import get as GET

# argparse to enable passing command line arguments
# this is totally optional, it adds functionality
parser = argparse.ArgumentParser(description='Get IP information.')
parser.add_argument('host', help='host to analize.')
args = parser.parse_args()

# remote IP information
ip_remote = GET('http://ipinfo.io/' + args.host).json()

# storing information in a dictionary for iteration
ip_info = {
    'Hosname': ip_remote['hostname'],
    'Location': '{}, {}'.format(ip_remote['region'], ip_remote['country']),
    'Coordinates': ip_remote['loc'],
    'Organization': ip_remote['org']
}

# print information about remote IP
print('Information for: {}'.format(ip_remote['ip']))

for key, value in ip_info.items():
    print('{}: {}'.format(key, value))
```
