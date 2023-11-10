const sql = require("./db.js");

const Order = function(order) {
  this.user_id = order.user_id;
  this.restaurant_id = order.restaurant_id;
  this.order_date = order.order_date;
  this.total_price = order.total_price;
  this.payment_status = order.payment_status;
};

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO SJP_db.Orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.Orders WHERE order_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Order with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.Orders", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Orders: ", res);
    result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE SJP_db.Orders SET user_id = ?, restaurant_id = ?, order_date = ?, total_price = ?, payment_status = ? WHERE order_id = ?",
    [order.user_id, order.restaurant_id, order.order_date, order.total_price, order.payment_status, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Order with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated order: ", { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.Orders WHERE order_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Order with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted order with order_id: ", id);
    result(null, res);
  });
};

Order.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.Orders", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

module.exports = Order;