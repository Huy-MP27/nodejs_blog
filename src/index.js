const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

// Middleware Sort Name
const SortMiddleware = require("./app/middlewares/SortMiddleware");

// http
// app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const route = require("./routes/index");

// Connect to DB
const db = require("./config/db");
db.connect();

// Template Engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        // const icons = {
        //   default: "fas fa-sort",
        //   asc: "fas fa-sort-amount-down-alt",
        //   desc: "fas fa-sort-amount-down",
        // };

        // const types = {
        //   default: "desc",
        //   asc: "desc",
        //   desc: "asc",
        // };

        // const type = types.default;
        // console.log(type);

        // const icon = icons.desc;

        // return `<a href="?_sort&column=${sort.column}&type=${type}">
        //     <i class="${icon}"></i>
        // </a>`;
        // // return `<a href="?_sort&column=name&type=desc">
        // //     <i class="fas fa-sort"></i>
        // // </a>`;
        const iconTypes = {
          default: "fas fa-sort",
          asc: "fas fa-sort-amount-down-alt",
          desc: "fas fa-sort-amount-down",
        };
        const sortTypes = {
          default: "desc",
          asc: "default",
          desc: "asc",
        };
        const keyType = field === sort.column ? sort.type : "default";
        const iconType = iconTypes[keyType];
        const sortType = sortTypes[keyType];

        if (sortType === "default") {
          return `
                <a href="?_sort">
                    <span class="${iconType}"></span>
                </a>
                `;
        } else {
          return `
                <a href="?_sort&column=${field}&type=${sortType}">
                    <span class="${iconType}"></span>
                </a>
                `;
        }
      },
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Custom Middleware
app.use(SortMiddleware);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

// routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
