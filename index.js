const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const booksRoute = require("./routes/books");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3300;

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log(err);
    });
// app.use("/", (req, res) => {
//     res.redirect("books");
// })

app.use("/books", booksRoute);
app.use("/auth", authRoute);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Server error!");
});

app.listen(PORT, () => {
    console.log("Server running on: ", PORT);
});