<template>
  <div class="main">
    
    <div class="TAC">
      <space height="80"></space>
      <div class="home-box">
        <h1 class="FS24 home-head">欢迎使用信息管理系统</h1>
        <div class="remark-box">
        <ul>
          <li>统一处理，安全高效</li>
          <li>列表展示，快捷方便</li>
          <li>状态变更提醒，及时清晰</li>
        </ul>
        </div>
      </div>
    </div>

   
  </div>
</template>



<style lang="scss" >
@import "@/assets/css/util.scss";//导入公共样式文件
.home-box{
  padding-top:20px;
  margin-top:50px;
  background-color: rgb(230, 230, 230);
  width: 30%;
  margin-left: 30%;
  border-radius: 20px;
  padding-bottom: 1px;
}
.home-box ul li{
  text-align: left;
  list-style-type: disc;
  line-height: 30px;
}
.remark-box{
  margin:20px 30px;
}
</style>