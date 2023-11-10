const sql = require("./db.js");

const MenuItem = function(menuItem) {
  this.category_id = menuItem.category_id;
  this.name = menuItem.name;
  this.description = menuItem.description;
  this.price = menuItem.price;
};

MenuItem.create = (newMenuItem, result) => {
  sql.query("INSERT INTO SJP_db.MenuItems SET ?", newMenuItem, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created menu item: ", { id: res.insertId, ...newMenuItem });
    result(null, { id: res.insertId, ...newMenuItem });
  });
};

MenuItem.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.MenuItems WHERE item_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found menu item: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Menu item with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

MenuItem.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.MenuItems", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Menu items: ", res);
    result(null, res);
  });
};

MenuItem.updateById = (id, menuItem, result) => {
  sql.query(
    "UPDATE SJP_db.MenuItems SET category_id = ?, name = ?, description = ?, price = ? WHERE item_id = ?",
    [menuItem.category_id, menuItem.name, menuItem.description, menuItem.price, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Menu item with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated menu item: ", { id: id, ...menuItem });
      result(null, { id: id, ...menuItem });
    }
  );
};

MenuItem.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.MenuItems WHERE item_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Menu item with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted menu item with item_id: ", id);
    result(null, res);
  });
};

MenuItem.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.MenuItems", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} menu items`);
    result(null, res);
  });
};

module.exports = MenuItem;