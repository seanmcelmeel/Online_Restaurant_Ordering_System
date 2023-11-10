module.exports = (app) => {
    const menuCategories = require("../controllers/menu-category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new menu category
    router.post("/", menuCategories.create);
  
    // Retrieve all menu categories
    router.get("/", menuCategories.findAll);
  
    // Retrieve a single menu category with id
    router.get("/:id", menuCategories.findOne);
  
    // Update a menu category with id
    router.put("/:id", menuCategories.update);
  
    // Delete a menu category with id
    router.delete("/:id", menuCategories.delete);
  
    // Delete all menu categories
    router.delete("/", menuCategories.deleteAll);
  
    app.use('/api/menu-categories', router);
  };