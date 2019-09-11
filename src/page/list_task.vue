<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
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



