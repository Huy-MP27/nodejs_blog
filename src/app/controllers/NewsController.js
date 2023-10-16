const Course = require("../models/Course");

class NewsController {
  // [GET] /news
  index(req, res) {
    res.render("news");
  }

  // pagination(req, res, next) {
  //   const perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
  //   const page = req.params.page || 1;

  //   Course.find({}) // find tất cả các data
  //     .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
  //     .limit(perPage)
  //     .exec((err, courses) => {
  //       Course.countDocuments((err, count) => {
  //         // đếm để tính có bao nhiêu trang
  //         if (err) {
  //           return next(err);
  //         } else {
  //           res.render("me/stored-courses", {
  //             courses,
  //             current: page,
  //             pages: Math.ceil(count / perPage), // Tong so cac page
  //           });
  //         }
  //       });
  //     });
  // }

  show(req, res) {
    res.send("NEWS DETAIL!!!!!");
  }
}

module.exports = new NewsController();
