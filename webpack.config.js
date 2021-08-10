const fs = require('fs');
const path = require('path');
const multer = require('multer');

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
    console.log('error: ', error);
  }
}

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    before(app) {
      const apiMap = {};
      getFilesSync('mock', apiMap);
      for (const [key, handle] of Object.entries(apiMap)) {
        const method = key.split(' ')[0].toLowerCase();
        const api = key.split(' ')[1];
        app[method](api, handle);
      }

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './static/upload');
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });

      let upload = multer({ storage: storage });
      app.post('/upload', upload.single('file'), function (req, res, next) {
        res.send({
          error: 0,
          data: {
            ...req.file,
            url: req.file.path.replace('static', ''),
          },
          msg: '上传成功',
        });
      });
    },
  },
};
