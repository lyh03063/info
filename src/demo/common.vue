<template>
  <div class>


    
    <div class="group">
      <div class="title-bar">ajax_populate组件</div>
      <div class="PT8 PB8">
        ajax_populate组件是用于根据关联数据id进行ajax请求获取关联数据的其他字段值。
        比如商品表的每个商品只保存了分类id，并没有保存商品分类名称，而查看商品详情时又需要展示分类名称，这种情况就可以使用该组件来实现
      </div>
      <table class="n-table WP100">
        <tr>
          <th class="TAL">属性名</th>
          <th class="TAL">说明</th>
        </tr>
        <tr>
          <td>page</td>
          <td>页面别名，如tangball_match</td>
        </tr>
        <tr>
          <td>id</td>
          <td>数据id</td>
        </tr>
        <tr>
          <td>populateKey</td>
          <td>需要填充的字段key(如果启用插槽，则该配置无效)</td>
        </tr>
      </table>
    </div>

    <div class="group">
      <div class="title-bar">ajax_populate读取单个字段</div>
      <dm_ajax_populate id="17" populateKey="matchName" page="tangball_match"></dm_ajax_populate>
    </div>
    <div class="group">
      <div class="title-bar">ajax_populate配置插槽</div>
      <dm_ajax_populate :id="id"  page="mabang-category">
        <template v-slot:default="{doc}">
          <div class v-if="doc && doc.P1">
            <b>{{doc.name}}</b>
            (分类id:{{doc.P1}})
          </div>
        </template>
      </dm_ajax_populate>
    </div>
  </div>
</template>
<script>
//导入自定义复选框组件，注意路径改为自己的


export default {
  components: {  },
  data() {
    return {
      id: 2
    };
  }
};
</script>

<style type="text/css">
.group {
  margin-bottom: 15px;
}
.title-bar {
  font-weight: 700;
  line-height: 26px;
  background-color: #f0f0f0;
  padding: 0 10px;
}
</style>
