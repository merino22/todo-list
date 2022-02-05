const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081",
    credentials: true,
    optionSuccessStatus: 200,
};

const db = require("./app/models");
db.sequelize.sync();

// In case we need to re-sync db while in development
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "App Here"});
});

require("./app/routes/tutorial.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

