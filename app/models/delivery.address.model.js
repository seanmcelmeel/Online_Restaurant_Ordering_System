const sql = require("./db.js");

const DeliveryAddress = function(deliveryAddress) {
  this.user_id = deliveryAddress.user_id;
  this.address = deliveryAddress.address;
  this.city = deliveryAddress.city;
  this.state = deliveryAddress.state;
  this.zip_code = deliveryAddress.zip_code;
};

DeliveryAddress.create = (newDeliveryAddress, result) => {
  sql.query("INSERT INTO SJP_db.DeliveryAddresses SET ?", newDeliveryAddress, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created delivery address: ", { id: res.insertId, ...newDeliveryAddress });
    result(null, { id: res.insertId, ...newDeliveryAddress });
  });
};

DeliveryAddress.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.DeliveryAddresses WHERE address_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found delivery address: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Delivery address with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

DeliveryAddress.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.DeliveryAddresses", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Delivery addresses: ", res);
    result(null, res);
  });
};

DeliveryAddress.updateById = (id, deliveryAddress, result) => {
  sql.query(
    "UPDATE SJP_db.DeliveryAddresses SET user_id = ?, address = ?, city = ?, state = ?, zip_code = ? WHERE address_id = ?",
    [deliveryAddress.user_id, deliveryAddress.address, deliveryAddress.city, deliveryAddress.state, deliveryAddress.zip_code, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Delivery address with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated delivery address: ", { id: id, ...deliveryAddress });
      result(null, { id: id, ...deliveryAddress });
    }
  );
};

DeliveryAddress.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.DeliveryAddresses WHERE address_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Delivery address with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted delivery address with address_id: ", id);
    result(null, res);
  });
};

DeliveryAddress.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.DeliveryAddresses", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} delivery addresses`);
    result(null, res);
  });
};

module.exports = DeliveryAddress;