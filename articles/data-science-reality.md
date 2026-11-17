**I'm angry.** Yes, I'm angry at _data science blogs_. Which is weird, because data science is blooming right now and we see a wide variety of knowledge being spread at every corner of the Internet. So, explaining why I am angry at them will be a tough one, but bear with me while I describe my journey through this industry.

## The wrong path to data science
Let me give you some context first. A few years ago I was on the road to data science, I wanted to learn everything about this field, the sole idea of building something _intelligent_ that can help someone predict something amazed me.

Inspired by this idea I decided I wanted to become a data scientist, and like many others, I jumped from engineering to this new landscape. Not knowing where to start I began searching through the Internet to see for myself how data science looks like.

Soon enough, I ended up in the vast sea of blogs, poured with hype and expectations, I was reading titles such as:
* **Data Science for Beginners: FULL COURSE!**
* **Must-read books for Machine Learning and Data Science**
* **How to speed up pandas with one line of code!**
* **10 BEST machine learning courses**

I was ready to read them all. I thought to myself:
> If I'm able to learn the best algorithm, if I build the best model to predict X thing, if I apply bleeding-edge techniques, I will surely stay ahead of the competition, I will be a _good_ data scientist.

**I was about to learn that _skill_ only gets you so far.**

## Hard truths and disappointments
After months of hard study, I was quickly looking for a job in this new and exciting field. I was pretty good at Pandas, and I was able to get my head around scikit-learn. Tensorflow? No problem.

I landed a job as a Data Analyst. I was lucky! And this company was great. I was hyped, I felt awesome, and I wanted to show what could I do. I wanted to help the company grow, and show them how can we apply data analysis and machine learning into their operations.

But in my small mind, **I had no idea how utterly wrong I was,** and let me tell you why.

### 1. Data doesn't appear magically


![person holding wand on top of bowl](https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


Guess what? **Every blog out there will lay its analysis over the foundation that data is already there, waiting to be analyzed.** They run over this assumption, and I, as a rookie, was lied by omission.

As a data analyst, I was tasked to analyze our sales, monthly revenue, cancellations, and everything that is without a doubt important for a SaaS company, and to get a dataset I had to connect to production servers, API's, buckets, etc.

And you could say: **_Well, of course, that's expected!_** The only problem is that **programs do not generate datasets for human consumption.**

Most of the time you will have a SQL table in a production database ridden with a huge number of columns that you don't even understand what they mean. Or JSON files that don't even have a proper structure. Or incomplete datasets that I needed to join from multiple sources to have a working dataset.

Now, imagine doing that over, and over, and over.

> The first lesson I learned was that data doesn't magically appear: Something has to generate it, and someone has to put it together.

### 2. Scalability will be an issue


![white staircase with pink background](https://images.unsplash.com/photo-1487837647815-bbc1f30cd0d2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


I struggled to get data, but I finally knew my way around. I was already building and putting together datasets, and it was about time to fire up Jupyter and start tinkering with it.

My objective was straight, I wanted to know what are the reasons why people cancel their subscription with us. I started my EDA right away. Found some hard truths, cleared up assumptions and built a small model that can predict the probability for someone to churn.

It wasn't the best model, but it was good enough, and I was proud of it. I presented my findings to the stakeholders and they were delighted. They now expect a report of the accounts that most likely are going to cancel every month in their email. The experiment was a success!

**Dear reader, did you just realized what I just said?** If you haven't managed a data science team before you will think there's no issue here. However, for someone who has to deal with the coordination, capacity, and planning of such team you will soon realize that _this strategy is not scalable._

You're having a data analyst (or a data scientist), extracting data by himself, running a report locally, on a Jupyter notebook who only works in his computer, manually delivering a report to stakeholders. **If you don't think this is a recipe for a disaster then I invite you to reconsider your strategy to build scalable teams.**

Moreover, with this approach you're going to burn out, stakeholders will depend on your ability to send them the report on time, and _you're teaching the company that they don't need to learn about data, **they have you.**_

> Soon enough, I learned my second lesson the hard way: Data Science is nothing without the architecture to support it.

### 3. Models with no business case are useless


![person writing on white paper](https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


Even though our processes were not scalable, we kept going, and we were developing model after model, even the same models with different algorithms. We just discovered AI, and we wanted to make it ours!

After all those models I built, I realized that people were asking me for things that seemed to tackle no business problem. Predict revenue? Ok. Cancellations? Here you go. Forecast new accounts? No problem.

Now, let me ask some harsh questions to my past self:
1. _Why someone wanted me to predict the revenue? Was there a plan to execute if our prediction was that we were about to hit a bad month?_
2. _We have a model to predict churn. Do we have an action plan for users at risk?_
3. _Why do you want to forecast new accounts? Is there any reason to do it at all?_

If you layout a myriad of models out there without any business objective, with no execution plan, to only please stakeholders' wonder and amazement, then let me politely tell you that **you're providing nothing of value.**

Having a business objective, and a execution plan, is _paramount_ to building successful AI products that are going to change the way you do business. Let's go even further, **your responsibility as data scientist is to educate your stakeholders!** They trust your expertise and field knowledge to guide them through this AI revolution.

Have them prepare a business case, ask them difficult questions and execution plans, prepare to mitigate failure, clear assumptions around the business risks involved. You'll provide a more clear agenda, better models, and you'll bring more value to the company.

> Yet again, I learned another lesson: To build without a plan is to build nothing at all.

### 4. Data Science is not exclusive for a team


![graphs of performance analytics on a laptop screen](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)


**We are at the Fourth Industrial Revolution, and data is at the front-line.**

That is something that I bet most people don't understand. Data has such a breakthrough, that it transformed businesses in its _entirety!_

Remember how important it was to know how to use a computer? I still remember that having a Microsoft Office learning certificate guarantee you a job somewhere. People were replaced one-by-one by the newer generations who were more adept at computers.

Years later that was not a qualification requirement, it is an _expectation._ Companies now _expect_ you to know how to use a computer, they _expect_ you to know how to use Excel, they _expect_ you to be able to browse the web without an issue.

If you think that data is going to be different, then I beg you to reconsider your priorities. We see companies investing in _data democratization_ like there's no tomorrow. Teaching their employees how to handle data, interpret it, and use it to enhance their operations.

**They have seen the value that data brings to the business.** They _know_ how important it is to make informed decisions, and develop strategies around data is now becoming _the norm._

If you think Data Science is going to be reserved for teams who know how to handle data, then I'm afraid you're wrong. If you want to succeed in your business, whether you are a data analyst, or a Chief Data Officer of an organization, then **you have to push for data democratization.**

> And with this I learned a valuable lesson: If you don't invest data democratization, your strategies will be superseded for a company that does it.

## Conclusion and recommendations
If you see yourself in one of these points, then let me give you some recommendations:
1. **Hire a data engineer first:** This person will lay foundations for analysts and data scientists to scale their operations with ease. It's one of the best single decisions you can make.
2. **Layout your data strategy:** Think about your data strategy, try to find loopholes in it. Think about how you are going to move data (Apache Airflow?), how are you going to analyze data (Deepnote?), how are you going to deploy products (MLFlow?)
3. **Build with a business case:** Make a quick checklist with objectives, risks involved, mitigation plans, what-if's, and so on.
4. **Prepare to scale data:** Invest in people education. Teach them Python or R, SQL is a must these days. These are people who are going to be at the front of your business. Maybe they are in marketing, sales, or other operations, but they _need_ to read and manipulate data.

I hope you liked the entry. **Follow me on Twitter** if you want to read more entries like this 👉🏻 

Also, share this article if you found it interesting. See you soon.
