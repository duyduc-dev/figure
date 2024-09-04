const expressLayouts = require("express-ejs-layouts");
const path = require("path");

module.exports = (app, dirname) => {
  app.set("views", path.join(dirname, "./src/views"));
  app.set("view engine", "ejs");
  app.use(expressLayouts);
  app.set("layout", "./layout/MainLayout");
};
