<template>
  <div style="padding-top: 50px;">
    <MyBasketsCom />
  </div>
</template>
<script>
import MyBasketsCom from "@/components/global/MyBasketsCom.vue";
export default {
  name: "MyBaskets",
  components: {
    MyBasketsCom
  },
};
</script>
<!-- <template>
  <div>
    <accordionCartCom />
  </div>
</template>
<script>
import accordionCartCom from "@/components/global/accordionCartCom.vue";
export default {
  name: "MyBaskets",
  components: {
    accordionCartCom
  },
};
</script> -->

<style scoped lang="scss">
@import "@/assets/main.scss";

.container-fluid {
  background: $color-global;
  z-index: 1001;
  /* position: sticky;*/
}

.see {
  background: $color-global;
}

.icon-cart {
  color: white; // #ffbf00;
}

.card {
  right: 0;
  z-index: 1000;
  padding: 16px 20px;
}

.close-icon {
  cursor: pointer;
}
</style>