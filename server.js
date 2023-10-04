const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to Practice app!");
});

app.get("/message/:id", (request, response) => {
    console.log(`Getting a message with the id of ${request.params.id}`);
    response.send({ msg: `Message with an id of ${request.params.id} found` });
  });