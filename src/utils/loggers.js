const path = require("path");
const log4js = require("log4js");

module.exports.getLogger = log4js.getLogger;

module.exports = function bootstrapLogger() {
  const date = new Date();
  const strDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  log4js.configure({
    appenders: {
      out: { type: "stdout" },
      app: {
        type: "file",
        filename: path.join(__dirname, "..", "logs", `${strDate}.log`),
      },
    },
    categories: {
      default: { appenders: ["out", "app"], level: "debug" },
    },
  });

  const logger = log4js.getLogger();
  logger.level = "debug";
};
