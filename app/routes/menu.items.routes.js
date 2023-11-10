module.exports = (app) => {
    const menuItems = require("../controllers/menu-item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new menu item
    router.post("/", menuItems.create);
  
    // Retrieve all menu items
    router.get("/", menuItems.findAll);
  
    // Retrieve a single menu item with id
    router.get("/:id", menuItems.findOne);
  
    // Update a menu item with id
    router.put("/:id", menuItems.update);
  
    // Delete a menu item with id
    router.delete("/:id", menuItems.delete);
  
    // Delete all menu items
    router.delete("/", menuItems.deleteAll);
  
    app.use('/api/menu-items', router);
  };