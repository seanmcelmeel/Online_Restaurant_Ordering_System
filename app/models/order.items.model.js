const sql = require("./db.js");

const OrderItem = function(orderItem) {
  this.order_id = orderItem.order_id;
  this.menu_item_id = orderItem.menu_item_id;
  this.quantity = orderItem.quantity;
  this.total_price = orderItem.total_price;
};

OrderItem.create = (newOrderItem, result) => {
  sql.query("INSERT INTO SJP_db.OrderItems SET ?", newOrderItem, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created order item: ", { id: res.insertId, ...newOrderItem });
    result(null, { id: res.insertId, ...newOrderItem });
  });
};

OrderItem.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.OrderItems WHERE order_item_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found order item: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Order item with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

OrderItem.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.OrderItems", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Order items: ", res);
    result(null, res);
  });
};

OrderItem.updateById = (id, orderItem, result) => {
  sql.query(
    "UPDATE SJP_db.OrderItems SET order_id = ?, menu_item_id = ?, quantity = ?, total_price = ? WHERE order_item_id = ?",
    [orderItem.order_id, orderItem.menu_item_id, orderItem.quantity, orderItem.total_price, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Order item with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated order item: ", { id: id, ...orderItem });
      result(null, { id: id, ...orderItem });
    }
  );
};

OrderItem.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.OrderItems WHERE order_item_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Order item with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted order item with order_item_id: ", id);
    result(null, res);
  });
};

OrderItem.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.OrderItems", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} order items`);
    result(null, res);
  });
};

module.exports = OrderItem;