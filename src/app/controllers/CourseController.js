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
  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image =
      "https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png";
    const courses = new Course(formData);
    courses
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
    // res.json(req.body);
  }
}

module.exports = new CourseController();
