<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>Sismos en chile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center="coordinates"
        ><MglMarker  color="green" v-for="sismo of sismos" :key="sismo.id" :coordinates=[sismo.longitude,sismo.latitude]>
          {{sismo}}
        </MglMarker>
        <v-icon slot="marker">mdi-map-marker</v-icon>
      </MglMap>
    </ion-content>
  </ion-page>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import getSismos from "../getSismos";

export default {
  components: {
    MglMap,
    MglMarker
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZGllZ29jdWV2YXM1NzkiLCJhIjoiY2s3M2wxaDkxMGU1OTNvcjlqd2dnbHpodSJ9.yDf53qrKyKQb_oJXbP8T0w",
      //mapStyle: "mapbox://styles/diegocuevas579/ck73olf542ggf1imqn6tcsm2k",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: [-69.2861, -18.8798],
      sismos: []
    };
  },

  created() {
    this.mapbox = Mapbox;
  },
  mounted() {
    getSismos().then(data => {
      this.sismos = data;
    });
  }
};
</script>
