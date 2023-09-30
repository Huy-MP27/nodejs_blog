const Course = require("../../app/models/Course");
const { mongooseToObject } = require("../../until/moogoose");

class CourseController {
  // [GET] /course/:slug/nodejs
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((courses) =>
        res.render("courses/show", { courses: mongooseToObject(courses) })
      )
      .catch(next);
  }
  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /courses/store
  store(req, res, next) {
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoID}/maxresdefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect(`/`))
      .catch((error) => {});
    // res.json(req.body);
  }
}

module.exports = new CourseController();
