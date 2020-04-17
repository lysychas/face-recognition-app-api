const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "postgresql-encircled-12325", //localhost
    user: "postgres",
    password: "test",
    database: "facebox",
  },
});

app.use(express.json());
app.use(cors());

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

app.get("/", (req, res) => {
  res.send("Hello! FaceBox server is working!");
});

app.post("/signin", signIn.handleSignIn(db, bcrypt)); // ES6 shorter way of passing (req, res) through callback function

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
}); //:id = params

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}!`);
});

/*
/ --> res = this is working
/signin  --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
