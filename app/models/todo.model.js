module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.BOOLEAN
        }
    });

    return Todo;
};