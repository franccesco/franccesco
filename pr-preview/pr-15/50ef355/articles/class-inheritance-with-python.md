![brown fountain pen on notebook](https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


These are my study notes on Classes and special methods. As always, if something is wrong then you can always correct me, it would help me and everybody else.

## Class 'Employee' example

This is the example class that we're going to use, a class `Employee` which we will inherit from to create more classes like `Manager` and `Supervisor`:

```python
class Employee(object):
    """Class simulating an Employee with basic attributes."""

    total_employees = 0

    def __init__(self, name, rate, position):
        self.name = name
        self.rate = rate
        self.owed = 0
        self.position = position
        Employee.total_employees += 1
```

Let's break this up a little bit, we're creating the class `Employee` that holds a variable `total_employee` and every time we _initialize_ our class we will add a `+1` to our total employee number. This initialization of this class will require a `name`, `rate` and `position`. Remember that the keyword _self_ refers to the class _itself_, these variables are shared in the whole class. So far, so good.

Save this code as *class_example.py* and import it in python:
```python
>>> from class_example import Employee
>>> employee1 = Employee('Anne', 20, 'manager')
>>> employee1.name
'Anne'
>>> employee1.rate
20
>>> employee1.position
'manager'
>>>
```

Now we can instantiate our class in `employee1` and inspect the employee's name, rate and position.

## Initializing a class with `__init__`
This method let us initialize an _instance_ of our class **Employee** with `x = Class(Args)`. This way, every time we want time instantiate an object then we have to pass parameters that will act as attributes to out class object. you can see en the last line that every time we initialize our class it will bump the number of `total_employees`, let's check this out:

```python
>>> from class_example import Employee
>>> emp1 = Employee('Anne', 20, 'manager')
>>> Employee.total_employees
1
>>> emp2 = Employee('John', 25, 'supervisor')
>>> Employee.total_employees
2
>>> emp3 = Employee('Fran', 30, 'developer')
>>> Employee.total_employees
3
```

See? Every time a new employee is created, the number of employees goes up.

## Changing the String representation with `__repr__`

If we check the string representation of our class then we will have something like this:
```python
>>> emp1
<class_example.Employee object at 0x7f3809baec50>
```

To give a more accurate description of our object, we can change the default representation to a string that describe the initialized class more appropriately re-defining the `__repr__` method:
```python
class Employee(object):
    """Class simulating an Employee with basic attributes."""

    total_employees = 0
    -- SNIP --
    def __repr__(self):
        return 'Employee object with basic attributes'
```

Now we can check again to see how our string representation gets displayed:
```python
>>> emp1
Employee object with basic attributes
>>>
```

## Adding more functionality to our class

Let's add hours worked to our employee and how much do we owe to our employee:

```python
class Employee(object):
    -- SNIP --

    def add_hours_worked(self, total_hours):
        self.owed = total_hours * self.rate
        print('{} work hours where added to {}'.format(total_hours, self.name))

    def pay(self):
        print('Employee {} was paid with {} USD'.format(self.name, self.owed))
        self.owed = 0
```

with `Employee.add_hours_worked(total_hours)` method we calculate how much we have to pay to our employee based on the `total_hours` he has worked. And with the method `pay()` we let our user know that we have payed the owed amount to our employee and now we owe nothing to him until he has completed more working hours.

## Inheritance

Now that we have defined a very generic Employee, we're going to define other classes such as `Developer` and `Manager` that inherits the same properties and methods of the class `Employee` but change a few ones like the string representation and rate, also let's add a bonus to his payment.

We're rewriting `add_working_hours()` to add a bonus system, if this developer has worked more than 150 hours in a month then a bonus will be added, but we're not rewriting the whole method,
```python
class Developer(Employee):
    """Employee in charge of development and bug-crushing activities."""

    def __init__(self, name, rate, position):
        super().__init__(name, rate, position)
        self.bonus = 300

    def __repr__(self):
        return self.__doc__

    def add_working_hours(self, total_hours):
        self.owed = total_hours * self.rate
        if total_hours > 150:
            self.owed += self.bonus
        print('{} work hours were added to {}'.format(total_hours, self.name))
```

This method let us inherits all variables, initializing values and even methods, but what have we changed here exactly? Well, we added a **bonus** of 300 USD as initialization attribute, also we changed the string representation to the special method `__doc__`, this means that whenever we inspect the our object, it will return the _docstring_ as our representation:

```python
>>> dev_emp = Developer('Anne', 20, 'developer')
>>> dev_emp
Employee in charge of development and bug-crushing activities.
```

We also modified `add_hours_worked()` and added a simple control flow
```python
...
        if total_hours > 150:
            self.owed += self.bonus
...
```

As you can see here, if our developer has reached more than 150 hours, he can have a bonification of 300USD to his payment, we can see that in action:
```python
>>> dev_emp = Developer('Anne', 20, 'developer')
>>> dev_emp2 = Developer('Johnny', 20, 'developer')
>>> dev_emp.add_hours_worked(160)
160 work hours where added to Anne
>>> dev_emp2.add_hours_worked(130)
130 work hours where added to Johnny
>>> dev_emp.pay()
Employee Anne was paid with 3500 USD
>>> dev_emp2.pay()
Employee Johnny was paid with 2600 USD
```

The developer 'Anne' and 'Johnny' earn 20 USD per hour of work, as 'Anne' reaches 160 hours of work in her month then she can have a bonification (_160 * 20 + 300 = **3500**_), 'Johnny' instead, worked only 130 hours this month, he cannot have his bonification (_130 * 20 = **2600**_).

But have you realized that we payed our _Developers_ and we didn't set a `pay()` method to our `Developer` class? This is because we inherits the methods found in `Employee` class so we don't need to rewrite them.

## Changing our values directly

We can change our class values directly, for example, if we want to change our employee's names we can do that easily with:
```python
>>> dev_emp = Developer('Anne', 20, 'developer')
>>> dev_emp.name = 'Not Anne'
>>> dev_emp.name
'Not Anne'
```

## Other Special Methods

`Class.__getattrib__(attribute)` to return the attribute of a class, beware though, this is the same as `Class.attribute` which is shorter:
```python
>>> dev_emp.__getattribute__('rate')
20
>>> dev_emp.rate
20
```

`Class.__dict__` to return a dictionary of the Class' attributes:
```python
>>> dev_emp.__dict__
{'name': 'not anne', 'rate': 20, 'owed': 0, 'position': 'developer', 'bonus': 300}
```

`Class.__module__` to return the module that holds that Class:
```python
>>> dev_emp.__module__
'class_example'
```

## Set attributes to a Class

Setting an attribute to our class is easy: `Class.new_attribute = value`.
Let's set the attribute `active` so we can know if our employee `Developer` is currently active:
```python
>>> from class_example import *
>>> dev_emp = Developer('Anne', 20, 'developer')
>>> dev_emp.active = True
>>> dev_emp.active
True
```

These are my study notes for today, any questions feel free to ask.
Here's the full code used in the examples:
```python
class Employee(object):
    """Class simulating an Employee with basic attributes."""
    total_employees = 0

    def __init__(self, name, rate, position):

        self.name = name
        self.rate = rate
        self.owed = 0
        self.position = position
        Employee.total_employees += 1

    def add_working_hours(self, total_hours):
        self.owed = total_hours * self.rate
        print('{} work hours where added to {}'.format(total_hours, self.name))

    def pay(self):
        print('Employee {} was paid with {}USD'.format(self.name, self.owed))

    def __repr__(self):
        return self.__doc__


class Developer(Employee):
    """Employee in charge of development and bug-crushing activities."""

    def __init__(self, name, rate, position):
        super().__init__(name, rate, position)
        self.bonus = 300

    def __repr__(self):
        return self.__doc__

    def add_working_hours(self, total_hours):
        self.owed = total_hours * self.rate
        if total_hours > 150:
            self.owed += self.bonus
        print('{} work hours were added to {}'.format(total_hours, self.name))
```
