const mongoose = require("mongoose");

const slug = require("mongoose-slug-generator");

const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videoID: { type: String },
    level: { type: String },
    slug: { type: String, slug: `name`, unique: true },
    time: { type: String },
    text1: { type: String },
    text2: { type: String },
    text3: { type: String },
    sumCourse: { type: String },
    listCourseVideo: { type: String },
    textContent: { type: String },
  },
  {
    timestamps: true,
  }
);

CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidtype = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : "desc",
    });
  }
  return this;
};

// ADD plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model(`Course`, CourseSchema);
