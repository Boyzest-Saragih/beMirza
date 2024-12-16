const express = require("express");
const mysql2 = require("mysql2");
const router = express.Router();
const bodyParser = require("body-parser");
const Note = require("../../public/model/note");
const Category = require("../../public/model/category");

const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "store_db",
});

router.use(express.json());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

conn.connect((err) => {
  if (err) {
    console.error("Database disconnected");
    console.error(err);
  } else {
    console.log("Database connected");
  }
});

router.get("/", (req, res) => {
  Note.findAll({
    include: [
      {
        model: Category,
        attributes: ["title"],
      },
    ],
  }).then((results) => {
    res.render("index", { notes: results });
  });
});

router.get("/create", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("create", { categories });
  });
});

router.get("/edit/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    const categories = await Category.findAll();

    res.render("edit", { note, categories });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", (req, res) => {
  Note.update(
    {
      title: req.body.title,
      note: req.body.note,
      category_id: req.body.category_id,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      Note.findOne({ where: { id: req.params.id } }).then((updatedNote) => {
        res.json({ status: 200, error: null, Response: updatedNote });
      });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

router.post("/", (req, res) => {
  Note.create({
    title: req.body.title,
    note: req.body.note,
    category_id: req.body.category_id,
  })
    .then(() => {
      Note.findAll({
        include: {
          model: Category,
          attributes: ["title"],
        },
      }).then((results) => {
        res.render("index", { notes: results });
      });
    })
    .catch((err) => {
      res.json({ status: 500, error: err });
    });
});

router.delete("/:id", (req, res) => {
  Note.destroy({ where: { id: req.params.id } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.json({
          status: 200,
          error: null,
          Response: "Record deleted successfully.",
        });
      } else {
        res.json({ status: 404, error: "Record not found." });
      }
    })
    .catch((err) => {
      res.json({ status: 500, error: err, Response: {} });
    });
});

module.exports = router;
