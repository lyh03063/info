<template>
  <div class>
   绑定数据 {{objCityVanue}}
    <select_city_venue v-model="objCityVanue"></select_city_venue>
  </div>
</template>
<script>

import select_city_venue from "@/components/form_item/select_city_venue.vue";

export default {
  components: { select_city_venue },
  data() {
    return {
      objCityVanue:{"cityId":"4401","cityName":"广州","venueId":15,"venueName":"场馆名称"}
    };
  },
  methods: {
    
  },
  async created() {
    //this.venueOp = await this.ajaxGetVenue("4401");
  }
};
</script>

