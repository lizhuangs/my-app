// 用mockjs模拟生成数据
var Mock = require('mockjs');

module.exports = () => {
  var data = Mock.mock({
    'course|50': [//模拟数据总数为50
      {
        // 属性 id 是一个自增数，起始值为 1000，每次增 1
        'id|+1': 1000,
        course_name: '@ctitle(5,10)',
        autor: '@cname',
        college: '@ctitle(6)',
        'category_Id|1-6': 1
      }
    ],
    'course_category|6': [
      {
        "id|+1": 1,
        "pid": -1,
        cName: '@ctitle(4)'
      }
    ]
  });
  // 返回的data会作为json-server的数据
  return data;
};
