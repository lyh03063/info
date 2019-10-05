<template>
  <div class>
    <dm_list_data :cf="cfList">
      <!--任务-完成度列插槽组件-->
          <template v-slot:slot_column_complete="{row}">
            <el-progress
              :text-inside="true"
              :stroke-width="16"
              :percentage="(row.complete||0)*100"
              status="success"
            ></el-progress>
          </template>
    </dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
   
  },
  data() {
    return {
      cfList: PUB.listCF.info_task
    };
  }
};
</script>



