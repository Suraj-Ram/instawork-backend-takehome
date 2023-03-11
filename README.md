# Instawork Backend Take-home Assignment
Suraj Ramchandran

I developed this API in NodeJS using Express and Prisma.

# Setup and Installation

Docker is needed to run the MySQL database.

1. Clone the repo and install all dependencies:
```
npm install
```
2. Create the database container and run it:
```
docker compose up --build
```
3. Generate the Prisma client:
```
npx prisma migrate dev --name init
```
4. Seed the database with example data (uses data defined in `prisma/seed.ts`):
```
npx prisma db seed
```

# Running the Server
```
npm run serve
```
This runs `app.ts` using nodemon.

# How to Test the Project
## Listing Users
**Request:**
```
curl -X GET localhost:3000/users
```
**Response:**
```
[{"id":1,"firstName":"Suraj","lastName":"Ramchandran","phone":"8572778814","email":"ramchandran.s@northeastern.edu","role":"ADMIN"},{"id":2,"firstName":"Bob","lastName":"Rogers","phone":"7298374989","email":"rogers.b@gmail.com","role":"REGULAR"},{"id":3,"firstName":"Dave","lastName":"Brown","phone":"6173737000","email":"dave.br@outlook.com","role":"REGULAR"}]
```

## Adding a User
**Request:**
```
curl -X POST -H "Content-Type:application/json" localhost:3000/users -d '{ 
    "firstName": "John",
    "lastName": "Doe",
    "phone": "8572778814",
    "email": "john.doe@gmail.com",
    "role": "ADMIN"
    }'
```
**Response:**
```
{"id":10,"firstName":"John","lastName":"Doe","phone":"8572778814","email":"rs@northeastern.com","role":"ADMIN"}
```

`404` error will be returned if email already exists, all fields are not given or they are in the wrong type.

## Editing a User
**Request:**

General Structure:
```
curl -X PUT -H "Content-Type:application/json" localhost:3000/users/<id> -d '{...data to edit...}'
```
Example:
```
curl -X PUT -H "Content-Type:application/json" localhost:3000/users/3 -d '{
    "email": "brown.dave@northeastern.com",
    "phone": "8572778815"
}'
```
**Response:**
```
{"id":3,"firstName":"Dave","lastName":"Brown","phone":"8572778815","email":"brown.dave@northeastern.com","role":"REGULAR"}
```

`404` error will be returned if requested user ID does not exist.

## Deleting a User
**Request:**

General Structure:
```
curl -X DELETE -H "Content-Type:application/json" localhost:3000/users/<id>
```
Example:
```
curl -X DELETE -H "Content-Type:application/json" localhost:3000/users/2
```

`404` error will be returned if requested user ID does not exist.
