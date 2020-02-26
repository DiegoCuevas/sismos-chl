<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>Sismos en chile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list v-for="sismo in sismos" :key="sismo.id">{{sismo.reference}}</ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sismos: []
    };
  },

  mounted() {
    axios
      .get(`https://chilealerta.com/api/query/?user=demo&select=ultimos_sismos`)
      .then(response => response.data)
      .then(data => {
        this.sismos = data.ultimos_sismos;
      });
  }
};
</script>

<style></style>
