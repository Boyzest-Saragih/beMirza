const { error } = require("console");
const express = require("express");
const mysql2 = require("mysql2");
const router = express.Router();

const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "store_db",
});

router.use(express.json());

conn.connect((err) => {
  if (err) {
    console.error("Database disconnected");
    console.error(err);
  } else {
    console.log("Database connected");
  }
});

router.get("/", (req, res) => {
  const sql = `SELECT * FROM categories`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: 200, error: false, data: result });
    }
  });
});

router.post("/", (req, res) => {
  const x = req.body;
  const sql = `INSERT INTO categories (id, category, color, icon, create_At, update_At) VALUES (NULL, '${x.category}', '${x.color}', '${x.icon}', current_timestamp(), current_timestamp());`;

  conn.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        status: 200,
        error: false,
        data: {
          id: result.insertId,
          category: x.category,
          icon: x.icon,
          color: x.color,
          createAt: new Date().toISOString(),
          updateAt: new Date().toISOString(),
        },
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const category = req.body.category;
  const color = req.body.color;
  const icon = req.body.icon;
  const sql = `UPDATE categories SET category = '${category}', color = '${color}', icon = '${icon}' WHERE categories.id = ${id};`;

  conn.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: 200, error: false, data: result });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM categories WHERE categories.id = ${id}`;

  conn.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: 200, error: false, data: result });
    }
  });
});

router.get("/:category_id", (req, res) => {
  let x = req.params.category_id;
  const sql = `SELECT * FROM notes WHERE category_id = ${x};`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: 200, error: null, data: result });
    }
  });
});

module.exports = router;
