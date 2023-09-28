const express = require("express");
const route = express.Router();

const courseController = require("../app/controllers/CourseController");

// newsController.index;

route.get("/:slug", courseController.show);

module.exports = route;
