const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id }) // ES6 sugar, both the property and value are the same
    .then((user) => {
      if (user.length) {
        // 0 is false
        res.json(user[0]);
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch(() => res.status(400).json("Error getting user"));
};

module.exports = {
  handleProfileGet, // ES6 does not need value
};
