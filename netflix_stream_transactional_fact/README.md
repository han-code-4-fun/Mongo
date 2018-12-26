## A Mongo DB of Netflix Stream (Transactional fact)

## Content: 
- Description
- DB design (graph)
- Mockaroo design (graph)
- Mockaroo custom function (graph)
- One record (graph)
- mLab access
- Queries

### Description: This DB design is to record user activity on Netflix based on each stream

- required to use one collection to implement the Schema
- each record represent an instance of user activity, if user lose connection (e.g. close app/browser, lost internet, log out ...etc.) 
  and reconnect, a new record will be stored in the database

### DB design
![DB](https://github.com/miaonagemide/Mongo/blob/master/netflix_stream_transactional_fact/DB_design.jpg)
### Mockaroo design
![Mockaroo](https://github.com/miaonagemide/Mongo/blob/master/netflix_stream_transactional_fact/mockaroo_design.jpg)
### Mockaroo custom function
- use function make sure customer.id is a subset of membership.id (one Netflix member has five profiles)
- ensure stream_date is always after membership started
- ensure the watch minute is within videos' duration
![Mockaroo_function](https://github.com/miaonagemide/Mongo/blob/master/netflix_stream_transactional_fact/mockaroo_fucntion.jpg)
### One record
![Record](https://github.com/miaonagemide/Mongo/blob/master/netflix_stream_transactional_fact/record.jpg)
### mLab access
- address: ds143594.mlab.com
- port: 43594
- DB name: netflix_project
- User Name: view
- User Pwd: hmdp@9aw

### Queries
Click [here](https://github.com/miaonagemide/Mongo/blob/master/netflix_stream_transactional_fact/querys.js) to see queries related with this design

