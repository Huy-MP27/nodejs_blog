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
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
mongoose.plugin(slug);

module.exports = mongoose.model(`Course`, CourseSchema);
