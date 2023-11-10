const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8082"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to smcelmeel application." });
});

require("./app/routes/tutorial.routes.js")(app);


const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}.');
});