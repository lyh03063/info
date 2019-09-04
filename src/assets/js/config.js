window.PUB = {}

PUB.domain = "http://localhost:3000"
//PUB.domain='http://test.dmagic.cn'
// PUB.domain="http://e6234kn.hn3.mofasuidao.cn"//魔法隧道地址
//PUB.domain="http://120.76.160.41:3000"

PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=dmagic`


PUB.listCF = {
  piece: {
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
        width: 120
      },
      {
        label: "内容",
        prop: "content",
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
  }




};

export default {
 
}