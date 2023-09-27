const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/search", siteController.index);
router.get("/", siteController.search);

module.exports = router;
