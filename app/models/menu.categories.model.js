const sql = require("./db.js");

const MenuCategory = function(menuCategory) {
  this.restaurant_id = menuCategory.restaurant_id;
  this.name = menuCategory.name;
};

MenuCategory.create = (newMenuCategory, result) => {
  sql.query("INSERT INTO SJP_db.MenuCategories SET ?", newMenuCategory, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created menu category: ", { id: res.insertId, ...newMenuCategory });
    result(null, { id: res.insertId, ...newMenuCategory });
  });
};

MenuCategory.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.MenuCategories WHERE category_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found menu category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Menu category with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

MenuCategory.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.MenuCategories", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Menu categories: ", res);
    result(null, res);
  });
};

MenuCategory.updateById = (id, menuCategory, result) => {
  sql.query(
    "UPDATE SJP_db.MenuCategories SET restaurant_id = ?, name = ? WHERE category_id = ?",
    [menuCategory.restaurant_id, menuCategory.name, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Menu category with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated menu category: ", { id: id, ...menuCategory });
      result(null, { id: id, ...menuCategory });
    }
  );
};

MenuCategory.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.MenuCategories WHERE category_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Menu category with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted menu category with category_id: ", id);
    result(null, res);
  });
};

MenuCategory.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.MenuCategories", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} menu categories`);
    result(null, res);
  });
};

module.exports = MenuCategory;