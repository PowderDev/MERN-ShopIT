# ShopIT eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

![screenshot](https://prnt.sc/10eee7h)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = DEVELOPMENT
PORT = 4000
DB_URI = mongo_uri
JWT_SECRET = 'JWTSECRET'
JWT_EXPIRES_TIME = '30d'
SENDGRID_API_KEY = sendrig_key,
SITE_URL = 'http://localhost:3000',
EMAIL_FROM = email_from
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:4000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku
