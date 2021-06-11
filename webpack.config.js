const fs = require("fs");
const path = require("path");

function getFilesSync(filePath, result) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      const filePaths = fs.readdirSync(filePath);
      filePaths.forEach((item) => {
        const itemFilePath = path.join(filePath, item);
        getFilesSync(itemFilePath, result);
      });
    } else {
      const file = require(`./${filePath}`);
      Object.assign(result, file);
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = {
  devServer: {
    before(app) {
      const apiMap = {};
      getFilesSync("mock", apiMap);
      for (const [key, handle] of Object.entries(apiMap)) {
        const method = key.split(" ")[0].toLowerCase();
        const api = key.split(" ")[1];
        app[method](api, handle);
      }
    },
  },
};
