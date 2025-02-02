# Getting Started

- `touch` a `server.js` file
- `code .` to open in VSCode

```
npm init -y
npm install express
```

## Express Boilerplate

In `server.js`

```js
const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
```

**route**

```js
app.get("/", (req, res) => {
  res.send("You're a wizard, Harry!");
});
```

## Running an Express Server With `nodemon`

`node server.js`. spins up your server _once_.

Use a package called `nodemon` instead.

```
npm install nodemon --save-dev
```

Modify the `scripts` section in the `package.json`

```
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## Dynamic Endpoints

In Express, we can create dynamic endpoints by using the in built in `request` object.

When writing an Express route, you can access the dynamic parts of the path by declaring them as **route parameters**:

```js
app.get("/article/:slug", (req, res) => {
  console.log(req.params);
  // { slug: 'ramen' }
});
```

In the path definition, add a colon before a meaningful name for the parameter. You'll have access to the dynamic value inside of the `req.params` object.

### Params

Example:

```js
app.get("/message/:id", (request, response) => {
  console.log(`Getting a message with the id of ${request.params.id}`);
  response.send({ msg: `Message with an id of ${request.params.id} found` });
});
```

In our example above, we are defining a `/message` endpoint, however, we also add in `/:id`. This is what's known as a request parameter. This parameter dynamically changes whenever some type of information is passed in. We access this parameter by using `request.params.{yourParamName}` inside of our function.
You can name your parameter anything, but it should always be relevant to the kind of information that you are looking for.

### Query

Example:

```js
app.get("/find", (request, response) => {
  console.log(
    `Finding someone with a name of ${request.query.myName} and an age of ${request.query.myAge}`
  );
  response.send({
    msg: `${request.query.myName} is ${request.query.myAge} years old.`
  });
});
```

In this example we are defining a `/find` endpoint. This endpoint utilizes the `request` object and gets information from the `query` object that resides inside of it.

Query's function in different way from `params` because we dont set any placeholders ahead of time. Instead this information is given when constructing the endpoint:

`localhost:3001/find?myName=Bob&myAge=23`

We start a query with the `?` operator and set a variable that will hold some type of value. If any additional information is needed we use the `&` operator to append extra variables and values.

# Express Middleware

```sh
npm install cors
```

- [cors](https://www.npmjs.com/package/cors)
  Once the dependencies finish installing, we'll need to `require` them in our `app.js`.

```js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
// Your Code Here

// Your Code Ends Here
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
```

Express provides us with a `.use()` function that allows us to incorporate 3rd party packages.

Add the following to your `app.js` in the `your code goes here` section.

```js
app.use(cors());
// the following middleware comes out of the box with express...
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

By invoking the `.use()` method, we are telling our Express app to use these packages.

The `cors` package enables cross origin resource sharing for our app.
Feel free to look this up on your own time.

The `json` method allows us to send json information to our server and the `urlEncoded` method allows us to send encoded forms to our server.

We've successfully implemented 3rd party middleware with our app!

![pipeline](https://lockmedown.com/wp-content/uploads/2017/02/request-pipeline.png)

### Building Our Own Middleware

Below our 3rd party middleware, create a `GET` route for a `/middleware` endpoint:

```js
app.get("/middleware");
```

After the url, create a function and pass in 3 parameters, `request`, `response` and `next`.

```js
app.get("/middleware", (request, response, next) => {});
```

`next` is a function that tells express to call or invoke the next function.

Inside of this function let's add a `console.log` and log `this is a middleware function` and invoke the `next` function.

```js
app.get("/middleware", (request, response, next) => {
  console.log("this is middleware");
  next();
});
```

Now let's add the final function in our route. In this function, pass in the `request` and `response` parameters and we'll `send` back a `reponse` with the string `request completed`.

```js
app.get(
  "/middleware",
  (request, response, next) => {
    console.log("this is middleware");
    next();
  },
  (req, res) => {
    res.send("response completed");
  }
);
```

Test this endpoint with ThunderClient and you'll see our `console.log` in the terminal and a response returned to your HTTP client.

You've just built your own middleware!

## Lesson Recap

We were introduced to Express, learned about HTTP requests, and how to set up basic Express server boilerplate. We also got some practice in with setting up routes. All in all, not too bad of a lesson!

![Friends](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd8%2Fd7%2F65%2Fd8d765d9fc0c9bf019f8a76a4a510fc4.gif&f=1&nofb=1)

## Resources

- [Express](http://expressjs.com)
- [Sweet Brown](https://youtu.be/zGxwbhkDjZM)
