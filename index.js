const express = require("express");
const notesRouter = require("./public/app/notes.js");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/notes", notesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
