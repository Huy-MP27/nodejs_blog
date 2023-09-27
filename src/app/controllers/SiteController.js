const Course = require("../../app/models/Course");
const { multipleMongooseToObject } = require("../../until/moogoose");

class SiteController {
  // [GET] /site
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
