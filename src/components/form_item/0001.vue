<template>
  <div class>
    <input type="text"  name="name" v-model="valueNeed">
  </div>
</template>

<script>
export default {
  mixins: [MIX.form_item],//混入
  data() {
    return {
     
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  methods: {
    change() {
     
    }
  },
  created() {
    
  }
};
</script>

<style scoped>
</style>
