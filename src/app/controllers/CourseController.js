const Course = require("../../app/models/Course");
const { mongooseToObject } = require("../../until/moogoose");

class CourseController {
  // [GET] /course/:slug/nodejs
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((courses) => {
        res.render("courses/show", { courses: mongooseToObject(courses) });
      })
      .catch(next);
  }
}

module.exports = new CourseController();
