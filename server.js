const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "Luke",
      email: "luke@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "chips",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "luke.gmail.com",
    },
  ],
};

const findUserById = (req, res) => {
  let found = false;
  database.users.forEach((user) => {
    if (user.id === req) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("Not Found");
  }
};

const addEntryToUser = (req, res) => {
  let found = false;
  database.users.forEach((user) => {
    if (user.id === req) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("Not Found");
  }
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Error logging in...");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  console.log(database);
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  findUserById(req.params.id, res);
}); //:id = params

app.put("/image", (req, res) => {
  addEntryToUser(req.body.id, res);
});

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});

/*
/ --> res = this isworking
/signin  --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
