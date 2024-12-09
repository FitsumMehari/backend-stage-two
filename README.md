# backend-stage-two

**Description:**
A small api that has the following routes: 
- ```bash
    POST /auth/signup

- ```bash
    POST /auth/login

- ```bash
    GET /books/all

- ```bash
    GET /books

- ```bash
    POST /books

- ```bash
    PUT /books/:id
    
- ```bash
    DELETE /books/:id

- ```bash
    GET /books/recommendations


# In request headers you add 
```bash
    key="token",
    value="Bearer {received token}"
 for routes: GET /books/all, GET /books, POST /books, PUT /books/:id, DELETE /books/:id, GET /books/recommendations

# Admin Login Credientials:
    ```bash 
        username = "admin",
        password = "1234"



**Login credientials**
 POST /auth/login
    Have to be sent in JSON format in the request body as follows: 
    ```bash
        'username': '',
        'password': ''
    

**Getting Started**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/FitsumMehari/backend-stage-two

2. **Change the directory:**
    ```bash
    cd backend-stage-two

3. **Add the dependecies:**
    ```bash
    npm install

4. **Add database config:**
    ```bash
    add your mongoDB url in .env file and put it as DB_URL = 'your mongodb url'

5. **Start the server:**
    ```bash
    node index.js


Deployed at https://backend-stage-two-8zwp.onrender.com/