module.exports = (app) => {
    const orderItems = require("../controllers/order-item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new order item
    router.post("/", orderItems.create);
  
    // Retrieve all order items
    router.get("/", orderItems.findAll);
  
    // Retrieve a single order item with id
    router.get("/:id", orderItems.findOne);
  
    // Update an order item with id
    router.put("/:id", orderItems.update);
  
    // Delete an order item with id
    router.delete("/:id", orderItems.delete);
  
    // Delete all order items
    router.delete("/", orderItems.deleteAll);
  
    app.use('/api/order-items', router);
  };