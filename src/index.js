const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

// http
// app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const route = require("./routes/index");

// Connect to DB
const db = require("./config/db");
db.connect();

app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

// routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
