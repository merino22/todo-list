const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const todo = {
        title: req.body.title,
        state: req.body.state,
        createdAt: 0,
        updatedAt: 0
    };

    console.log(todo)

    Todo.create(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating todo."
            });
            console.log('err')
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: {[Op.like]: `%${title}%`}} : null;

    Todo.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving todos."
            })
        })
};

exports.update = (req, res) => {
    const id = req.params.id;

    Todo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Todo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update todo with id=${id}. Maybe todo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500),send({
                message: "Error updating Todo with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.destroy({
        where: { id: id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Todo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Couldn't delete Todo with id=${id}. Maybe Todo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Couldn't delete Todo with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Todo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Todo were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while removing all Todos."
            });
        });
};