const viewConfig = require("./view");
const appConfig = require("./app");

module.exports = (app, dirname) => {
  viewConfig(app, dirname);
  appConfig(app, dirname);
};
