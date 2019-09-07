<template>
  <div class>
    <dm_list_data :cf="cfList">
      <!--自定义复选框插槽组件-->
      <template v-slot:slot_form_item_arrid="{formData}">
       <collection_id class="" v-model="formData.arrId" :data-type="formData.dataType"  ></collection_id>
      </template>
 <!--查看分组详情列插槽组件-->
      <template v-slot:slot_column_name="{row}">
       <a  target="_blank"  :href="'/#/group_detail?groupId='+row.P1">{{row.name}}</a>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import collection_id from '@/components/form_item/collection_id.vue'
export default {
  components: {collection_id},
  methods: {},
  data() {
    return {
      cfList: PUB.listCF.info_group
    };
  }
};
</script>



