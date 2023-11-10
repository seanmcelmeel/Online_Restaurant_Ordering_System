module.exports = (app) => {
    const deliveryAddresses = require("../controllers/delivery-address.controller.js");
  
    var router = require("express").Router();
  
    // Create a new delivery address
    router.post("/", deliveryAddresses.create);
  
    // Retrieve all delivery addresses
    router.get("/", deliveryAddresses.findAll);
  
    // Retrieve a single delivery address with id
    router.get("/:id", deliveryAddresses.findOne);
  
    // Update a delivery address with id
    router.put("/:id", deliveryAddresses.update);
  
    // Delete a delivery address with id
    router.delete("/:id", deliveryAddresses.delete);
  
    // Delete all delivery addresses
    router.delete("/", deliveryAddresses.deleteAll);
  
    app.use('/api/delivery-addresses', router);
  };