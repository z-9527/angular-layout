/**
 * feat 1.支持 mock 文件拆分：mock/ 文件夹下面的所有 js 都会被框架自动加载，因此你可以把接口合理的拆分到多个 mock 文件中
 * feat 2.支持模拟延迟（setTimeout 返回）
 * feat 3.支持 mock 动态数据
 *
 * 当前问题：
 * 1. webpack-dev-server 不能动态修改配置，每次修改配置后需要重启服务才能生效，这对于频繁修改mock数据而言非常的不友好，如何解决？
 */
const Mock = require("mockjs");
// 项目接口 本地 mock 数据
module.exports = {
  // 获取 table 列表数据
  "GET /api/list": (req, res) => {
    setTimeout(() => {
      res.send(
        Mock.mock({
          success: 444,
          content: {
            [`data|${req.query.pageSize}`]: [
              {
                title: "@title",
                "price|1000-4000": 400,
                city: "@city",
                name: "@name",
                "status|+1": ["unpack", "mailed", "sending", "received"],
                purchasePerson: "@csentence",
                time: "@date",
                id: "@id",
              },
            ],
            count: 100,
          },
        })
      );
    }, 1000);
  },
  // 新增数据
  "GET /api/list2": (req, res) => {
    setTimeout(() => {
      res.send(
        Mock.mock({
          success: 222,
          content: {
            [`data|10`]: [
              {
                title: "@title",
                "price|1000-4000": 400,
                city: "@city",
                name: "@name",
                "status|+1": ["unpack", "mailed", "sending", "received"],
                purchasePerson: "@csentence",
                time: "@date",
                id: "@id",
              },
            ],
            count: 100,
          },
        })
      );
    }, 1000);
  },
};
