![child picking strawberries in kitchen](https://images.unsplash.com/photo-1487795924438-a3cb4b7a5556?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


One thing that puzzled me as a newbie (disclaimer: I still am) are **accessors** in Ruby, more commonly known as **setters and getters** or explicitly described as `attr_reader`, `attr_writer` and `attr_accessor`. Now let's dive into the code first and describe the concepts of accessors _after_ we're done with coding.

## Initializing a Class
Let's say we want to create a class to resemble a `Person` with a `name`, and finally let's try to access that name outside the class:

```ruby
# Class definition
class Person
  def initialize(name)
    @name = name
  end

end

# Initialize class and inspect it
p1 = Person.new('Anne')

# Can't access 'name' variable outside class
puts p1.name
```

But it seems that we can't access the variable `@name` even though we initialized right:
```ruby
# Output:
test.rb:13:in `<main>': undefined method `name' for #<Person:0x00000002278100 @name="name"> (NoMethodError)
```

This is because we have to **define a method to access the variable inside the class**.

## Getters and Setters
Let's grab our code and add **two** methods:
* A method to _update_ the person's name
* And a method to _read_ the person's name

```ruby
# Class definition
class Person
  def initialize(name)
    @name = name
  end

  # Update 'name'
  # use =() to make a method behave
  # like an attribute assignment
  def name=(name)
    @name = name
  end

  # Get value of 'name'
  def name
    @name
  end
end

# Initialize class and the value 'name'
p1 = Person.new('Anne')
puts p1.name

# Change 'name'
p1.name = 'Johnson'
puts p1.name

```
```ruby
# Output
Anne
Johnson
```

Now this code works perfectly, but a person doesn't have just one attribute like `name`, they have age, height, eye color, skin color, hair color. Could you imagine writing endless methods about each attribute? Gladly we have `accessors`

## Write and Read Accessor
Before we disclose the technical concept of `accessors` let's first try them, shall we? We're changing our code into a more sophisticated and short one with `attr_accessor`:
```ruby
# Class definition
class Person
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end

# Initialize class and the value 'name'
p1 = Person.new('Anne')
puts p1.name

# Change name
p1.name = 'Johnson'
puts p1.name
```
```ruby
# Output
Anne
Johnson
```

What happened here? We wrote an `accessor` that allow us to read and update the attribute `name` in the class `Person`, this way we can add more attributes like `height` and `weight` in a single line:
```ruby
# Class definition
class Person
  attr_accessor :name, :height, :weight

  def initialize(name)
    @name = name
  end
end

# Initialize class with a name and
# add values outside the class
p1 = Person.new('Anne')
p1.height = '1.80m'
p1.weight = '180lbs'

puts "Name: #{p1.name}"
puts "Height: #{p1.height}"
puts "Weight: #{p1.weight}"
```
```ruby
# Output
Name: Anne
Height: 1.80m
Weight: 180lbs
```

## Write-Only Accessor
Now that's a lot easier than to write and read each method, but what about if want to **set** an attribute but not **read** them? For example, a person can have many thoughts but no one else can read them, let's give this person a `thoughts` attribute and let's try to access this person thoughts outside the class:
```ruby
# Class definition
class Person
  attr_accessor :name, :height, :weight
  attr_writer :thoughts

  def initialize(name)
    @name = name
  end
end

# Initialize class with a name and
# add values outside the class
p1 = Person.new('Anne')
p1.height = '1.80m'
p1.weight = '180lbs'

# Set a thought and inspect the class
p1.thoughts = 'pizza <3'
puts p1.inspect

puts "Name: #{p1.name}"
puts "Height: #{p1.height}"
puts "Weight: #{p1.weight}"

# Try to access that thought
puts "#{p1.name} is thinking about: #{p1.thoughts}"

```
```shell
# Output
#<Person:0x00000000e5f538 @name="Anne", @height="1.80 meters", @weight="180 lbs", @thoughts="pizza <3">
Name: Anne
Height: 1.80 meters
Weight: 180 lbs
test.rb:26:in `<main>': undefined method `thoughts' for #<Person:0x00000000e5f538> (NoMethodError)
```

See? We are able to set a value on the `thought` attribute, but outside the class we are unable to read it (line 26)

## Read-Only Accessor
Now, a person have a lot of things that they can't change... not by conventional means at least. Let's add a _read-only_ attribute to this person with `attr_reader`, like `eye_color` in line 5 and initialize it:

```ruby
# Class definition
class Person
  attr_accessor :name, :height, :weight
  attr_writer :thoughts

  # read-only accessor
  attr_reader :eye_color

  # initialize eye_color
  def initialize(name, eye_color)
    @name = name
    @eye_color = eye_color
  end
end

# Initialize class with a name and
# add values outside the class
p1 = Person.new('Anne', 'Green')
p1.height = '1.80m'
p1.weight = '180lbs'
p1.thoughts = 'pizza <3'

puts "Name: #{p1.name}"
puts "Height: #{p1.height}"
puts "Weight: #{p1.weight}"

# Read eye color
puts "Eye Color: #{p1.eye_color}"
```
```ruby
# Output
Name: Anne
Height: 1.80m
Weight: 180lbs
Eye Color: Green
```

As you can see there's no problem in initializing and accessing the `eye_color` attribute, but as soon as we try to change it with `p1.eye_color = 'red'`, we can expect the following response:
```shell
test.rb:30:in `<main>': undefined method `eye_color=' for #<Person:0x000000019defa8> (NoMethodError)
```

That, of course, is because we set the accessor as read only.

## Conclusion and Technical Definition
I cannot describe better what an accessor is more than the definition found in the official [Ruby user's guide](https://ruby-doc.org/docs/ruby-doc-bundle/UsersGuide/rg/accessors.html):

> An object's instance variables are its attributes, the things that generally distinguish it from other objects of the same class. It is important to be able to write and read these attributes; doing so requires writing methods called attribute accessors.

Basically, `attr_accessor`, `attr_writer` and `attr_reader` is a short way to define and set class variables without having to define the methods to access and read them outside the class, with:
1. `attr_accessor` we are able to _read_ and _write_ values outside the class.
2. `attr_writer` allow us to write values without being able to read them outside the class.
3. and with `attr_reader` we can initialize and read the class attributes without being able to _reassign_ it.

You can read more about accessors and how useful they are in the following documentation:
* [Ruby User's Guide on Accessors](https://ruby-doc.org/docs/ruby-doc-bundle/UsersGuide/rg/accessors.html)
* [The Pragmatic Programmers Guide](http://ruby-doc.com/docs/ProgrammingRuby/html/tut_classes.html#UC)
* [Codecademy - Accessors](https://www.codecademy.com/en/forum_questions/50f0192b102455349200372d)

If I got something wrong, you can correct me in the comments bellow.
