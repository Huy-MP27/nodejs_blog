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
      .then(() => res.redirect(`/me/stored/courses`))
      .catch(next);
    // res.json(req.body);
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((courses) =>
        res.render("courses/edit", {
          courses: mongooseToObject(courses),
        })
      )
      .catch(next);
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[POST] /courses/handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid!" });
    }
  }

  //[POST] /courses/:page
  pagination(req, res, next) {}

  //[GET] /courses/search
  search(req, res, next) {}
}

module.exports = new CourseController();
