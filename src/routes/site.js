const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.use("/search", siteController.index);
router.use("/", siteController.search);

module.exports = router;
