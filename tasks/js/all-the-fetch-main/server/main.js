const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; /// http://127.0.0.1:3000/ksldjflkjsd

// make sure you have nodeJS installed from https://nodejs.org/
//cd server
//npm install
//npm run dev

app.use(cors());

// Endpoints which are HTTP methods that interact with the server
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Thanks for adding something");
});

app.put("/:id", (req, res) => {
  res.status(200).send("Thanks for updating something");
});

app.patch("/:id", (req, res) => {
  res.status(200).send("Thanks for updating something");
});

app.delete("/:id", (req, res) => {
  res.status(200).send("Thanks for deleting something");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
