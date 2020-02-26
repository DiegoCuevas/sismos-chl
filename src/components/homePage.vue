<template>
  <ion-page>

    <ion-content padding>
      <ion-list v-for="sismo in sismos" :key="sismo.id">{{
        sismo.reference
      }}</ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import getSismos from "../getSismos";
export default {
  name: "HomePage",
  data() {
    return {
      sismos: []
    };
  },
  mounted() {
    getSismos().then(data => {
      this.sismos = data;
    });
  }
};
</script>

<style></style>
