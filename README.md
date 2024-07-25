# FINTECH PROJECT
* The project is based on a deposit-withdrawl system with a landing page and a signin system
* In this project we used GraphQL API with HASURA and set it up with PostgreSQL database.
* We used NODE JS as the backend and wrote frontend in plain HTML, CSS, JavaScript.

### Steps to setup the Project Backend:-

* Step 1:- clone the repository locally
* Step 2:- open the fintech_backend folder in your terminal
* Step 3:- run 'npm install' in your terminal

### Steps to setup the Project Database:-
* Step 1:- make a postgreSQL database with NEON
* Step 2:- setup HASURA CLOUD with NEON
* Step 3:- make 2 tables users and transactions
* Step 4:- users should have an id,name,username,password,balance coloumn
* Step 5:- transactions should have id, user-id (relational to users id),amount,type,created-at coloumn
* Step 6:- add some demo users in your database

## Steps to test the Project:- 
* Open fintech_backend folder in your terminal run 'node index.js' to boot up your server
* Navigate to fintech_frontend folder -> websites ->index.html
* Click on signin
* Input username, password of demo user
* Select amount and type of deposit
* Press Submit


* ### You need to have NODE already setup in your system