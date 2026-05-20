![image](/assets/images/thumbnails/sha1.png)

## Basic usage
Where `FILENAME` is the filename that you want to calculate

```ruby
require 'digest/sha1'
Digest::SHA1.hexdigest(FILENAME)
```

## More advanced usage
Save this code as `checkhash.rb`, usage: `checkhash.rb <filename>`.

```ruby
require 'digest/sha1'

# Usage: checkhash.rb <filename>
filename = ARGV.pop
if filename.nil? # if no filename specified then prints help
  puts 'Please specify the filename to calculate the hash'
  puts "Usage: #{File.basename($PROGRAM_NAME)} FILENAME"
  exit
end

# calculating SHA1 hash
def calculate_hash(file)
  Digest::SHA1.hexdigest(file)
end

file_hash = calculate_hash(filename)

puts "#{filename}: #{file_hash}"

```
