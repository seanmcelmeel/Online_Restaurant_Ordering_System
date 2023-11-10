const sql = require("./db.js");

const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
  this.full_name = user.full_name;
  this.phone_number = user.phone_number;
  this.address = user.address;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO SJP_db.Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.Users WHERE user_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // User with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.Users", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE SJP_db.Users SET username = ?, password = ?, email = ?, full_name = ?, phone_number = ?, address = ? WHERE user_id = ?",
    [user.username, user.password, user.email, user.full_name, user.phone_number, user.address, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // User with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.Users WHERE user_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // User with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted user with user_id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.Users", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;