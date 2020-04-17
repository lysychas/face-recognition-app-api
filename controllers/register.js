const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("Incorrect form subimssion");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    // create transaction when you have to do more than 2 things
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]); // just in case we submit more than 1 user, it will return the first entered user
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(() => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister,
};
