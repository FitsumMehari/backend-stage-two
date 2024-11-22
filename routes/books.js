const router = require("express").Router();
const Book = require("../models/Book");

router.get("/", async(req, res, next) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
});
router.post("/", async(req, res, next) => {
    if (!req.body.title ||
        !req.body.author ||
        !req.body.isbn ||
        !req.body.publishedYear
    ) {
        res.status(400).send("Values are missing!");
    } else {
        try {
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                publishedYear: req.body.publishedYear,
            });

            const savedBook = await newBook.save();

            res.status(201).json({ message: "Book Saved!", savedBook });
        } catch (error) {
            next(error);
        }
    }
});
router.put("/:id", async(req, res, next) => {
    if (!req.body.title ||
        !req.body.author ||
        !req.body.isbn ||
        !req.body.publishedYear
    ) {
        res.status(400).send("Values are missing!");
    } else {
        try {
            const book = await Book.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                publishedYear: req.body.publishedYear,
            });

            res.status(201).json({ message: "Book Updated!" });
        } catch (error) {
            next(error);
        }
    }
});
router.delete("/:id", async(req, res, next) => {
    const id = req.params.id
    try {
        const book = await Book.findById(id);
        if (!book) {
            res.status(400).json({ message: "Invalid ID" });
        } else {
            await Book.findByIdAndDelete(id);
            res.status(200).json({ message: "Book Deleted" });

        }
    } catch (error) {
        next(error);
    }
});
router.get("/recommendations", async(req, res, next) => {
    try {
        const books = await Book.find({});
        const booksLength = books.length;
        const randomBookNumber = Math.floor((Math.random() * booksLength));

        const randomBook = await Book.findById(books[randomBookNumber]._id)
        res.status(200).json(randomBook);
    } catch (error) {
        next(error);
    }
});

module.exports = router;