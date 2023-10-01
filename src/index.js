const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
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
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

// routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
