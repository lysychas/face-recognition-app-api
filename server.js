const express = require("express");

const app = express();

app.use(express.json());

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
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Success!");
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
    password: password,
    entries: 0,
    joined: new Date(),
  });
  console.log(database);
  res.json(database.users[database.users.length - 1]);
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
