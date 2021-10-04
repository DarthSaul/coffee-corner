# coffee-corner

Full-stack web application built for online community of coffee lovers.

## Technologies & Other Tools

-   MERN Stack: MongoDB, Express, React, Node
-   Bootstrap & React-Bootstrap
-   Icons from Font Awesome's React library
-   Utilizes React's Context API
-   JWT Authentication
-   RESTful backend API, data access object (DAO) pattern. Connected to MongoDB through Mongoose.js.
-   Image upload and management through Cloudinary

## Development

Open terminal

```
$ git clone https://github.com/DarthSaul/coffee-corner.git
```

Navigate to project folder, then execute

```
$ npm install
$ npm run dev
```

`run dev` script utilizes `concurrently` to launch frontend and backend simultaneously. Backend server launches on localhost:5000, frontend React client launches on localhost:3000.
