const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to Practice app!");
});