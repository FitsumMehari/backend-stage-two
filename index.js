const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const booksRoute = require("./routes/books");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log(err);
    });
app.use("/", (req, res) => {
    res.redirect("/books");
})

app.use("/books", booksRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server error!")

})

app.listen(PORT, () => {
    console.log("Server running on: ", PORT);

})