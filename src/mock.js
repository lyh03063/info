import Mock from 'mockjs'
 
const Random = Mock.Random



// 用户数据
const userData = () => {

  return { a: 1 }
}
Mock.mock('/api/users', userData)
// Mock.mock('/login', function () {
//   let loginList = [
//     { P1: 1, userName: "admin", passWord: "aa" },
//     { P1: 2, userName: "admin", passWord: "aa" },
//   ]
//   return loginList
// })

Mock.mock('/articleList', function (obj) {

  let list_article =
  {
    "code": 0,
    "message": "操作成功",
    "page": {
      "pageIndex": 1,
      "pageSize": 5,
      "allCount": 1,
      "pageCount": 1
    },
    "list": [
      {
        P1: 1, articleTitle: "关于唐球的各项规则说明", articleContent: "这是一篇文章", articleCategory: 3,
      },
      {
        P1: 2, articleTitle: "关于唐球比赛的各项规则说明", articleContent: "这是一篇文章", articleCategory: 2,
      },
      {
        P1: 3, articleTitle: "关于唐球的推广赞助的说明", articleContent: "这是一篇文章", articleCategory: 1,
      },
    ]
  }
  return list_article


})

Mock.mock('/textCategory', function () {
  let textCategoryList = [
    {
      P1: 1, name: "唐球规则", explin: "关于唐球的各项规则说明", articleNumber: "3",
      article: [{ title: "文章分类唐球规则下的文章一", text: "这是一篇文章" },
      { title: "文章分类唐球规则下的文章二", text: "这是一篇文章" },
      { title: "文章分类唐球规则下的文章三", text: "这是一篇文章" },]
    },
    {
      P1: 2, name: "比赛说明", explin: "关于唐球比赛的各项规则说明", articleNumber: "3",
      article: [{ title: "文章分类比赛说明下的文章一", text: "这是一篇文章" },
      { title: "文章分类比赛说明下的文章二", text: "这是一篇文章" },
      { title: "文章分类比赛说明下的文章三", text: "这是一篇文章" },]
    },
    {
      P1: 3, name: "推广赞助", explin: "关于唐球的推广赞助的说明", articleNumber: "3",
      article: [{ title: "文章分类推广赞助下的文章一", text: "这是一篇文章" },
      { title: "文章分类推广赞助下的文章二", text: "这是一篇文章" },
      { title: "文章分类推广赞助下的文章三", text: "这是一篇文章" },]
    },
  ]
  return textCategoryList

})
let sponsor = {
  code: 0,
  message: "操作成功",
  page: {
    pageIndex: -1,
    pageSize: 6,
    allCount: 1,
    pageCount: 1
  },
  list: [
    { P1: 1, name: "蔡徐坤", money: "一亿粉丝", intro: "大家好，我是练习时长两年半的偶像练习生，蔡徐坤，擅长唱跳rap和篮球，来音乐起！鸡你太美！！！" },
    { P1: 2, name: "面筋哥", money: "一份烤面筋", intro: "烤面筋，烤面筋~~我的烤面筋！让你吃得每天都开心~烤面筋，烤面筋~~" },
    { P1: 3, name: "局座", money: "一艘舰艇", intro: "判断一个舰艇好坏，很重要的一点是，你一眼看过去，好看不好看，要是你看的不顺眼，那丑，八成没多大战斗力。" },
    { P1: 4, name: "王境泽", money: "一碗炒饭", intro: "我王境泽就是饿死，死外边，从这跳下去，也不会吃你们一点儿东西。香，真香" },
    { P1: 5, name: "金坷垃三人组", money: "一袋金坷垃", intro: "肥料掺了金坷垃，一袋能顶两袋撒！肥料掺了金坷垃，小麦亩产一千八！美国·圣地亚戈 American Santiago（阿妹你看，上帝压狗）" },
  ]
}
Mock.mock('/list_sponsor', function () {

  return sponsor
})
Mock.mock('/list_sponsor/add', function (obj) {
  let element = JSON.parse(obj.body).data;
  let index = sponsor.list.length - 1
  var newSponsor = {
    P1: sponsor.list[index].P1 + 1,
    name: element.name,
    money: element.money,
    intro: element.intro
  }
  sponsor.list.push(newSponsor);
})
Mock.mock('/list_sponsor/modify', function (obj) {
  let element = JSON.parse(obj.body).modifyJson;
  for (let i = 0; i < sponsor.list.length; i++) {
    if (sponsor.list[i].P1 == element.P1) {
      sponsor.list[i] = element;
    }
  }
})
Mock.mock('/list_sponsor/delete', function (obj) {
  let id = JSON.parse(obj.body).findJson.P1;
  for (let i = 0; i < sponsor.list.length; i++) {
    if (sponsor.list[i].P1 == id) {
      sponsor.list.splice(i, 1)
    }
  }
})

// 报名（订单）接口
Mock.mock('/list_enroll', function () {
      let list_enroll =
      {
        "code": 0,
        "message": "操作成功",
        "page": {
          "pageIndex": 1,
          "pageSize": 5,
          "allCount": 1,
          "pageCount": 1
        },
        "list": [
          {
            "P1": "1",
            "memberId ": "12",
            "matchId": "22",
            "idCard": "441521200003331151",
            "time": "2019-06-26",
            "payStatus": 1,
            "auditStatus ": 3
          },
          {
            "P1": "2",
            "memberId ": "13",
            "matchId": "21",
            "idCard": "441521200003331152 ",
            "time": "2019-06-26",
            "payStatus": 1,
            "auditStatus ": 2
          },
          {
            "P1": "1",
            "memberId ": "14",
            "matchId": "22",
            "idCard": "441521200003331153",
            "time": "2019-06-26",
            "payStatus": 2,
            "auditStatus ": 1
          }
        ]
      }

      return list_enroll

})

// 会员接口
Mock.mock('/list_member', function () {
  let list_enroll =
  {
    "code": 0,
    "message": "操作成功",
    "page": {
      "pageIndex": 1,
      "pageSize": 5,
      "allCount": 1,
      "pageCount": 1
    },
    "list": [
      {
        "P1": "1",
        "unionId  ": "12",
        "name ": "张三",
        "idCard": "441521200003331151",
        "entries": 1,
        "integral  ": 3
      },
      {
        "P1": "2",
        "unionId ": "13",
        "name": "李四",
        "idCard": "441521200003331152 ",
        "entries": 1,
        "integral ": 2
      },
      {
        "P1": "1",
        "unionId ": "14",
        "name": "王五",
        "idCard": "441521200003331153",
        "entries": 2,
        "integral ": 1
      }
    ]
  }

  return list_enroll

})
