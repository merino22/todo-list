module.exports = app => {
    const Todos = require("../controllers/todo.controller.js");

    var router = require("express").Router();

    router.post("/", todos.create);

    router.get("/", todos.findAll);

    router.delete("/:id", todos.findOne);

    router.delete("/", todos.deleteAll);

    router.put("/:id", todos.update);

    app.use('/api/tutorials', router);
};