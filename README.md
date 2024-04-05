# Node Express Boilderplate for OAuth

## Node Version

- Min node version `20`

## Configuration

- Copy `.env.example` to `.env`
- Modify the `MONGO_URL` & `MONGO_DBNAME`
- Custom `APP_KEY` // that will use password encryption
- Custom `AUTH_USERNAME` & `AUTH_PASSWORD` // If application willing to use with `Basic` Username and Password authentication

## Installation Needs

- `npm i`

## Running Project

- `npm run start:dev` with nodemon server

## API endpoints

### API Authentication Types

- Basic
- Bearer

#### Free Middleware

- [POST]http://localhost:3000/register
- [POST]http://localhost:3000/login

#### With Middleware

- [GET]http://localhost:3000/
- [GET]http://localhost:3000/user/all
- [GET]http://localhost:3000/user/:userId

### Feedbacks

- dev.aungkyawhtwe@gmail.com[dev.aungkyawhtwe@gmail.com]
