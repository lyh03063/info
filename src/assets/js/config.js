import lodash from 'lodash'//导入lodash方法库


window.PUB = {}

PUB.domain = "http://localhost:3000"
//PUB.domain='http://test.dmagic.cn'
// PUB.domain="http://e6234kn.hn3.mofasuidao.cn"//魔法隧道地址
//PUB.domain="http://120.76.160.41:3000"

PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=dmagic`


//#region PUB.objDictArr/PUB.dict公共字典对象

PUB.objDictArr = {
  taskType: [
    { value: 1, label: "新需求" },
    { value: 2, label: "bug" },
    { value: 3, label: "其他" }
  ],
  difficulty: [
    { value: 1, label: "简单" },
    { value: 2, label: "一般" },
    { value: 3, label: "困难" },
    { value: 4, label: "很难" }
  ],
  prior: [
    { value: 1, label: "很高" },
    { value: 2, label: "高" },
    { value: 3, label: "中" },
    { value: 4, label: "低" }
  ],
  complete: [
    { value: 0, label: "0%" },
    { value: 0.1, label: "10%" },
    { value: 0.2, label: "20%" },
    { value: 0.3, label: "30%" },
    { value: 0.4, label: "40%" },
    { value: 0.5, label: "50%" },
    { value: 0.6, label: "60%" },
    { value: 0.7, label: "70%" },
    { value: 0.8, label: "80%" },
    { value: 0.9, label: "90%" },
    { value: 1, label: "100%" },
  ],

}





PUB.dict = {};//公共数据字典对象，里面会有多个子数据字典对象

//for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
console.log("Object.keys结果", Object.keys(PUB.objDictArr));
for (var key of Object.keys(PUB.objDictArr)) {
  console.log(key + ": " + PUB.objDictArr[key]);

  PUB.dict[key] = {}
  let arrOpt = PUB.objDictArr[key];
  arrOpt.forEach(itemEach => {//循环：{000数组}
    PUB.dict[key][itemEach.value] = itemEach
  })



}

console.log("PUB.dict#####", PUB.dict);
/**
    * @name 获取数据字典值函数
    * @param dictName字典名，value值
    */

PUB.formatterDict = function (dictName, value) {
  return lodash.get(PUB.dict, `${dictName}.${value}.label`);
}



//#endregion




PUB.listCF = {}

let arrPageName = ["info_group", "info_file", "info_url", "info_piece", "info_task","info_member","info_relation",]

//页面对应的集合列表类型
PUB.collectionType={
  "info_group":"",
  "info_file":"",
  "info_url":"",
  "info_piece":"table",
  "info_task":"table",

}


//#region info_relation
PUB.listCF.info_relation = {
  listIndex: "list_relation", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "基础",
  threeTitle: "片段",
  flag: true,
  url: {
    list: "/crossList?page=info_relation", //列表接口
    add: "/crossAdd?page=info_relation", //新增接口
    modify: "/crossModify?page=info_relation", //修改接口
    detail: "/crossDetail?page=info_relation", //详情接口
    delete: "/crossDelete?page=info_relation" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 70
    },
    {
      label: "分组id",
      prop: "groupId",
      width: 80
    },
    {
      label: "数据id",
      prop: "dataId",
      width: 80
    },
    {
      label: "数据类型",
      prop: "dataType",
      width: 110
    },
    {
      label: "序号",
      prop: "sort",
      width: 80
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },
    {
      label: "分组id",
      prop: "groupId",
    },
    {
      label: "数据id",
      prop: "dataId",
    },
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1"
    },
    {
      label: "分组id",
      prop: "groupId",
    },
    {
      label: "数据id",
      prop: "dataId",
    },
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "标题",
      prop: "name",
      type: "input"
    },
    {
      label: "分组id",
      prop: "groupId",
    },
    {
      label: "数据id",
      prop: "dataId",
    },

    {
      label: "数据类型",
      prop: "dataType",
    },
    {
      label: "序号",
      prop: "sort",
    }
  ]
};
//#endregion




//#region info_group
PUB.listCF.info_group = {
  listIndex: "list_group", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "基础",
  threeTitle: "分组",
  flag: true,
  url: {
    list: "/crossList?page=info_group", //列表接口
    add: "/crossAdd?page=info_group", //新增接口
    modify: "/crossModify?page=info_group", //修改接口
    detail: "/crossDetail?page=info_group", //详情接口
    delete: "/crossDelete?page=info_group" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 100
    },
    {
      label: "组名",
      prop: "name",
      width: 220,
      slot: "slot_column_name",
      // formatter:function(row){
      //   return `<a  target="_blank"  href="/#/group_detail?groupId=${row.P1}">${row.name}</a>`
      // }
    },
    {
      label: "数据类型",
      prop: "dataType",
      width: 120
    },
    {
      label: "说明",
      prop: "desc",
      width: 250
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },
    {
      label: "组名",
      prop: "name",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1"
    },
    {
      label: "组名",
      prop: "name"
    },
    {
      label: "说明",
      prop: "desc",
      type: "html"
    },
    {
      label: "数据类型",
      prop: "page"
    },
    {
      label: "数据id数组",
      prop: "arrId"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "标题",
      prop: "name",
      type: "input"
    },
    {
      label: "数据类型",
      prop: "dataType",
      type: "select",
      default: "info_piece",
      options: [
        { value: "info_piece", label: "片段" },
        { value: "info_group", label: "组" },
        { value: "info_file", label: "文件" },
        { value: "info_url", label: "网址" },
        { value: "info_task", label: "任务" }
      ]
    },
    {
      label: "说明",
      prop: "desc",
      type: "textarea"
    },
    {
      label: "数据id",
      prop: "desc",
      type: "textarea",
      slot: "slot_form_item_arrid"
    },

  ]
};
//#endregion

//#region info_file
PUB.listCF.info_file = {
  listIndex: "list_file", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "基础",
  threeTitle: "文件",
  flag: true,
  url: {
    list: "/crossList?page=info_file", //列表接口
    add: "/crossAdd?page=info_file", //新增接口
    modify: "/crossModify?page=info_file", //修改接口
    detail: "/crossDetail?page=info_file", //详情接口
    delete: "/crossDelete?page=info_file" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 70
    },
    {
      label: "标题",
      prop: "name",
      width: 320
    },
    {
      label: "说明",
      prop: "desc",
      width: 250
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },
    {
      label: "标题",
      prop: "name",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1"
    },
    {
      label: "标题",
      prop: "name"
    },
    {
      label: "说明",
      prop: "desc",
    },
    {
      label: "文件上传",
      prop: "url",
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "标题",
      prop: "name",
      type: "input"
    },
 
    {
      label: "说明",
      prop: "desc",
      type: "html"
    },
    {
      label: "文件上传",
      prop: "url",
      type: "upload"
    }
  ]
};
//#endregion



//#region info_url
PUB.listCF.info_url = {
  listIndex: "list_url", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "基础",
  threeTitle: "网址",
  flag: true,
  url: {
    list: "/crossList?page=info_url", //列表接口
    add: "/crossAdd?page=info_url", //新增接口
    modify: "/crossModify?page=info_url", //修改接口
    detail: "/crossDetail?page=info_url", //详情接口
    delete: "/crossDelete?page=info_url" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 100
    },
    {
      label: "标题",
      prop: "name",
      width: 120
    },
    {
      label: "网址",
      prop: "url",
      width: 250
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },
    {
      label: "标题",
      prop: "name",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1"
    },
    {
      label: "标题",
      prop: "name"
    },
    {
      label: "网址",
      prop: "url",
      type: "html"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "标题",
      prop: "name",
      type: "input"
    },
    {
      label: "网址",
      prop: "url",
      type: "input"
    }
  ]
};
//#endregion



//#region info_piece
PUB.listCF.info_piece = {
  listIndex: "list_piece", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "基础",
  threeTitle: "片段",
  flag: true,
  url: {
    list: "/crossList?page=info_piece", //列表接口
    add: "/crossAdd?page=info_piece", //新增接口
    modify: "/crossModify?page=info_piece", //修改接口
    detail: "/crossDetail?page=info_piece", //详情接口
    delete: "/crossDelete?page=info_piece" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 100
    },
    {
      label: "标题",
      prop: "name",
      width: 320
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },
    {
      label: "标题",
      prop: "name",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1"
    },
    {
      label: "标题",
      prop: "name"
    },
    {
      label: "内容",
      prop: "content",
      type: "html"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "标题",
      prop: "name",
      type: "input"
    },
    {
      label: "内容",
      prop: "content",
      type: "editor"
    },
    {
      label: "相册",
      prop: "album",
      type: "upload"
    }
  ]
};
//#endregion


//#region info_task
PUB.listCF.info_task = {
  listIndex: "list_task", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "基础",
  threeTitle: "片段",
  flag: true,
  url: {
    list: "/crossList?page=info_task", //列表接口
    add: "/crossAdd?page=info_task", //新增接口
    modify: "/crossModify?page=info_task", //修改接口
    detail: "/crossDetail?page=info_task", //详情接口
    delete: "/crossDelete?page=info_task" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 70
    },
    {
      label: "标题",
      prop: "name",
      width: 330
    },
    {
      label: "类型",
      prop: "taskType",
      width: 80,
      formatter: function (row) {
        return PUB.formatterDict("taskType", row.taskType);//调用：{获取数据字典值函数}
      }

    },
    {

      label: "负责人",
      prop: "person",
      width: 75
    },
    

    {
      label: "完成度",
      prop: "complete",
      width: 80,
      formatter: function (row) {
        return PUB.formatterDict("complete", row.complete);//调用：{获取数据字典值函数}
      }
    },

    {
      label: "预耗时",
      prop: "predictTime",
      width: 80
    },
    {
      label: "实耗时",
      prop: "actualTime",
      width: 80
    },
    {

      label: "难度",
      prop: "difficulty",
      width: 65,
      formatter: function (row) {
        return PUB.formatterDict("difficulty", row.difficulty);//调用：{获取数据字典值函数}
      }
    },

    {
      label: "优先级",
      prop: "prior",
      width: 80,
      formatter: function (row) {
        return PUB.formatterDict("prior", row.prior);//调用：{获取数据字典值函数}
      }
    },
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },
    {
      label: "标题",
      prop: "name",
      type: "input"
    },
    {
      label: "优先级",
      prop: "prior",
      type: "select",
      options: PUB.objDictArr.prior
    },
    {

      label: "难度",
      prop: "difficulty",
      type: "select",
      options: PUB.objDictArr.difficulty
    },
    {
      label: "类型",
      prop: "taskType",
      type: "select",
      options: PUB.objDictArr.taskType
    },
    {
      label: "完成度",
      prop: "complete",
      type: "select",

      options: PUB.objDictArr.complete

    },
    {
      label: "负责人",
      prop: "person",
      type: "select",
      ajax: {
        url: "/crossList?page=info_member",
        keyLabel: "name",
        keyValue: "user"
      }
    },
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1"
    },
    {
      label: "标题",
      prop: "name"
    },
    {
      label: "类型",
      prop: "taskType",
      formatter: function (row) {
        return PUB.formatterDict("taskType", row.taskType);//调用：{获取数据字典值函数}
      },
    },
    {

      label: "负责人",
      prop: "person",
    },

    {
      label: "完成度",
      prop: "complete",
      formatter: function (row) {
        return PUB.formatterDict("complete", row.complete);//调用：{获取数据字典值函数}
      },
    },

    {
      label: "预耗时",
      prop: "predictTime",
    },
    {
      label: "实耗时",
      prop: "actualTime",

    },
    {

      label: "难度",
      prop: "difficulty",
      formatter: function (row) {
        return PUB.formatterDict("difficulty", row.difficulty);//调用：{获取数据字典值函数}
      },
    },

    {
      label: "优先级",
      prop: "prior",
      formatter: function (row) {
        return PUB.formatterDict("prior", row.prior);//调用：{获取数据字典值函数}
      },
    },
    {
      label: "内容",
      prop: "content",
      type: "html"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "标题",
      prop: "name",
      type: "input"
    },

    {
      label: "类型",
      prop: "taskType",
      type: "radio",
      default: 1,
      options: PUB.objDictArr.taskType
    },
    // {

    //   label: "负责人",
    //   prop: "person",
    //   type: "input"
    // },
    {
      label: "负责人",
      prop: "person",
      type: "select",
      ajax: {
        url: "/crossList?page=info_member",
        keyLabel: "name",
        keyValue: "user"
      }
    },
    {
      label: "完成度",
      prop: "complete",
      type: "radio",
      default: 0,
      options: PUB.objDictArr.complete

    },

    {
      label: "预估耗时",
      prop: "predictTime",
      type: "input"
    },
    {
      label: "实耗时",
      prop: "actualTime",
      type: "input"
    },
    {

      label: "难度",
      prop: "difficulty",
      type: "radio",
      options: PUB.objDictArr.difficulty
    },

    {
      label: "优先级",
      prop: "prior",
      type: "radio",
      options: PUB.objDictArr.prior
    },
    {
      label: "内容",
      prop: "content",
      type: "editor"
    }
  ]
};
//#endregion



//#region info_member
PUB.listCF.info_member = {
  listIndex: "list_piece", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "基础",
  threeTitle: "片段",
  flag: true,
  url: {
    list: "/crossList?page=info_member", //列表接口
    add: "/crossAdd?page=info_member", //新增接口
    modify: "/crossModify?page=info_member", //修改接口
    detail: "/crossDetail?page=info_member", //详情接口
    delete: "/crossDelete?page=info_member" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "会员id",
      prop: "P1",
      width: 80
    },
    {
      label: "用户名",
      prop: "user",
      width: 100
    },
    {
      label: "姓名",
      prop: "name",
      width: 100
    },
    //  {
    //   label: "密码",
    //   prop: "password",
    //   width: 120
    // },
    // {
    //   label: "案件数",
    //   prop: "caseCount",
    //   width: 100
    // },
    // {
    //   label: "附件数",
    //   prop: "fileCount",
    //   width: 150,
    // },
    // {
    //   label: "发送消息数量",
    //   prop: "msgCount",
    //   width: 150,
    // },       
    // {
    //   label: "备注数量",
    //   prop: "remarkCount",
    //   width: 100
    // },
    {
      label: "角色",
      prop: "role",
      width: 120,
      formatter: (rowData)=>{
        switch (rowData.role) {
          case 1:
            return "超级管理员"
            break;
          case 2:
             return "普通律师会员"
            break;
          default:
            return "无"
            break;
        }
      }
    },
  ],
  searchFormItems: [
    {
      label: "会员id",
      prop: "P1",
      type: "input"
    },
    {
      label: "用户名",
      prop: "user",
      type: "input_find_vague"
    },
    {
      label: "姓名",
      prop: "name",
      type: "input_find_vague"
    },
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "会员id",
      prop: "P1",
      width: 80
    },
    {
      label: "用户名",
      prop: "user",
      width: 100
    },
    {
      label: "姓名",
      prop: "name",
      width: 100
    },
     {
      label: "密码",
      prop: "password",
      width: 120
    },
    {
      label: "案件数量",
      prop: "caseCount",
      width: 100
    },
    {
      label: "上传附件数量",
      prop: "fileCount",
      width: 65,
    },
    {
      label: "发送消息数量",
      prop: "msgCount",
      width: 65
    },       
    {
      label: "备注数量",
      prop: "remarkCount",
      width: 65
    },
    {
      label: "角色",
      prop: "role",
      width: 120,
      formatter: (rowData)=>{
        switch (rowData.role) {
          case 1:
            return "超级管理员"
            break;
          case 2:
             return "普通律师会员"
            break;
          default:
            return "无"
            break;
        }
      }
    },  
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
   {
      label: "用户名",
      prop: "user",
      type:"input",
      rules: [{ required: true, message: "用户名不能为空" }]
    },
    {
      label: "姓名",
      prop: "name",
      type:"input",
      rules: [{ required: true, message: "姓名不能为空" }]
    },
    {
      label: "密码",
      prop: "password",
      type:"input",
      rules: [{ required: true, message: "密码不能为空" }]
    },
    {
      label: "角色",
      prop: "role",
      type: "select",
      options: [
        { label: "超级管理员", value: 1 },
        { label: "普通律师会员", value: 2 }
      ],
      rules: [{ required: true, message: "角色未选" }]
    }, 
  ]

};
//#endregion





//#region 批量拼装简化版的列表配置，用于collection




arrPageName.forEach(page => {//循环：{页面数组}
  PUB.listCF[page].pageSize=100;//每页显示100条

  let keySimple = `${page}_simple`;
  PUB.listCF[keySimple] = lodash.cloneDeep(PUB.listCF[page])//深拷贝常规版配置
  Object.assign(PUB.listCF[keySimple], {
    "isShowBreadcrumb": false,
    "isShowToolBar": true,
    "isRefreshAfterCUD": false//住址增删改操作后自动刷新页面，需要手动处理
  });//合并对象
  //lodash删除查询表单的编号查询数据
  lodash.remove(PUB.listCF[keySimple].searchFormItems, (item) => item.prop == "P1");

})


//#region info_relation_simple处理
PUB.listCF.info_relation_simple.columns= [
  {
    label: "编号",
    prop: "P1",
    width: 70
  },
  
  {
    label: "数据id",
    prop: "dataId",
    width: 80
  },
  {
    label: "标题1",
    prop: "doc",
    width: 320,
    slot: "slot_column_name"
  },
  // {
  //   label: "数据类型",
  //   prop: "dataType",
  //   width: 110
  // },
  {
    label: "序号",
    prop: "sort",
    width: 80
  },
  {
    label: "操作实体数据",
    prop: "abc",
    slot: "slot_column_operate"
  },
]





//#endregion







//#endregion


export default {}