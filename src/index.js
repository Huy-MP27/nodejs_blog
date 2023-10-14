const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const pagination = require("handlebars-paginate");
const Handlebars = require("handlebars");
const port = 3000;
const app = express();

// Middleware Sort Name
const SortMiddleware = require("./app/middlewares/SortMiddleware");

// http
// app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Route
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

// Use Route
// routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Handlebars.registerHelper(
//   "pagination",
//   function (currentPage, totalPage, size, options) {
//     var startPage, endPage, context;

//     if (arguments.length === 3) {
//       options = size;
//       size = 5;
//     }

//     startPage = currentPage - Math.floor(size / 2);
//     endPage = currentPage + Math.floor(size / 2);

//     if (startPage <= 0) {
//       endPage -= startPage - 1;
//       startPage = 1;
//     }

//     if (endPage > totalPage) {
//       endPage = totalPage;
//       if (endPage - size + 1 > 0) {
//         startPage = endPage - size + 1;
//       } else {
//         startPage = 1;
//       }
//     }

//     context = {
//       startFromFirstPage: false,
//       pages: [],
//       endAtLastPage: false,
//     };
//     if (startPage === 1) {
//       context.startFromFirstPage = true;
//     }
//     for (var i = startPage; i <= endPage; i++) {
//       context.pages.push({
//         page: i,
//         isCurrent: i === currentPage,
//       });
//     }
//     if (endPage === totalPage) {
//       context.endAtLastPage = true;
//     }

//     return options.fn(context);
//   }
// );
