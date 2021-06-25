# 👩‍⚕️ Health Plan Listing

![Build](https://github.com/markkop/health-plan-listing/actions/workflows/main.yml/badge.svg)
[![https://img.shields.io/badge/made%20with-vue-green](https://img.shields.io/badge/made%20with-vue-green)](https://vuejs.org/)
[![https://img.shields.io/badge/made%20with-express-blue](https://img.shields.io/badge/made%20with-express-blue)](https://expressjs.com/)

This project is a fullstack coding challenge which consumes locations and health plans APIs and has a simple login system with password change and account deletion.

Demo: http://health-plan-listing.herokuapp.com/

![demohealth](https://user-images.githubusercontent.com/16388408/123480932-6ab81300-d5d9-11eb-8d5c-4fe79c7533ae.gif)

## Requisites
### Frontend

- Public code hosted on Github/Gitlab
- Demo hosted on Heroku or Netlify
- Frontend JS Framework (preferably Vue.js)
- Any CSS Framework can be used

### Backend

- Users registration with name, email and password
- Two equal emails can't be registered
- Authentication and Authorization
- Made in NodeJS and with MongoDB/Redis/Neo4j
- CRUD

## Features

- States and cities using external API
- JWT Authentication
- Atomic Design for components structure
- Continuous Deploy with Github Actions to Heroku

## How to Run

- Clone this repository
- Run `yarn` or `npm install`
- Run `yarn dev:server` and `yarn dev:client` (or with `npm run <command>`)

## Challenges/Wishlist

### Time

I really like to be proud of my codes and this requires lots of refactoring. I surely could deliver this project sooner, however the code quality would be compromised. The way it is, it's good, but there are lot room for code improvements such as moving some server/index.js functions to other files and refactoring some API Calls in PlansForm.vue, for example.

### More Validations and Better Feedbacks

Would be cool to improve several components props validation and password complexity.  
Also, login error and API loading feedbacks could be more dynamic and responsive.

### A better layout interface

I'm not that good with interface design, so I avoided making more than one page (and therefore Vue Routes) and didn't use CSS Frameworks (altough by the end of the project, using one would make things easier to adjust)

### VueX

At first a state manager such as VueX didn't seemed to be necessary, as event emitting and listening sounded good enough, but after implementing user login it started to be tempting.

### Login

Login is not saved between page refreshes and token is not expired on logout, so yeah, there's room to improve this application

## Notes

- Since this application is hosted on HTTPS, the provided HTTP apis wouldn't work, so I've looked up and found the same API but on HTTPS.
