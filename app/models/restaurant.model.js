const sql = require("./db.js");

const Restaurant = function(restaurant) {
  this.name = restaurant.name;
  this.description = restaurant.description;
  this.address = restaurant.address;
  this.phone_number = restaurant.phone_number;
  this.email = restaurant.email;
};

Restaurant.create = (newRestaurant, result) => {
  sql.query("INSERT INTO SJP_db.Restaurants SET ?", newRestaurant, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created restaurant: ", { id: res.insertId, ...newRestaurant });
    result(null, { id: res.insertId, ...newRestaurant });
  });
};

Restaurant.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.Restaurants WHERE restaurant_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found restaurant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Restaurant with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

Restaurant.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.Restaurants", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Restaurants: ", res);
    result(null, res);
  });
};

Restaurant.updateById = (id, restaurant, result) => {
  sql.query(
    "UPDATE SJP_db.Restaurants SET name = ?, description = ?, address = ?, phone_number = ?, email = ? WHERE restaurant_id = ?",
    [restaurant.name, restaurant.description, restaurant.address, restaurant.phone_number, restaurant.email, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Restaurant with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated restaurant: ", { id: id, ...restaurant });
      result(null, { id: id, ...restaurant });
    }
  );
};

Restaurant.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.Restaurants WHERE restaurant_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Restaurant with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted restaurant with restaurant_id: ", id);
    result(null, res);
  });
};

Restaurant.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.Restaurants", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} restaurants`);
    result(null, res);
  });
};

module.exports = Restaurant;