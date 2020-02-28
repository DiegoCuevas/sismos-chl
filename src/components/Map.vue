<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>
          <ion-router-link href="#/home">Info</ion-router-link></ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <select interface="popover" v-model="selectedOption">
        <option value="" selected disabled>Choose</option>
        <option
          v-for="(item, index) of sismos"
          :key="index"
          :value="[item.longitude, item.latitude]"
        >
          {{ item.reference }}
        </option>
      </select>
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center="selectedOption"
        :zoom="9"
      >
        <MglMarker
          v-for="sismo of low"
          :key="sismo.chilean_time"
          :coordinates="[sismo.longitude, sismo.latitude]"
          color="green"
        >
          <MglPopup>
            <ion-text
              ><ion-note color="dark">{{ sismo.reference }}</ion-note
              >----
              <ion-note color="dark">{{ sismo.magnitude }}</ion-note></ion-text
            >
          </MglPopup>
        </MglMarker>
        <MglMarker
          v-for="sismo of medium"
          :key="sismo.utc_time"
          :coordinates="[sismo.longitude, sismo.latitude]"
          color="yellow"
        >
          <MglPopup>
            <ion-text
              ><ion-note color="dark">{{ sismo.reference }}</ion-note
              >----
              <ion-note color="dark">{{ sismo.magnitude }}</ion-note></ion-text
            >
          </MglPopup>
        </MglMarker>
        <MglMarker
          v-for="sismo of high"
          :key="sismo.id"
          :coordinates="[sismo.longitude, sismo.latitude]"
          color="red"
        >
          <MglPopup>
            <ion-text
              ><ion-note color="dark">{{ sismo.reference }}</ion-note
              >----
              <ion-note color="dark">{{ sismo.magnitude }}</ion-note></ion-text
            >
          </MglPopup>
        </MglMarker>
      </MglMap>
    </ion-content>
  </ion-page>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import getSismos from "../getSismos";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZGllZ29jdWV2YXM1NzkiLCJhIjoiY2s3M2wxaDkxMGU1OTNvcjlqd2dnbHpodSJ9.yDf53qrKyKQb_oJXbP8T0w",
      //mapStyle: "mapbox://styles/diegocuevas579/ck73olf542ggf1imqn6tcsm2k",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      selectedOption: [-71.04, -29.52],
      sismos: []
    };
  },
  computed: {
    low: function() {
      return this.sismos.filter(function(sis) {
        return sis.magnitude <= 4;
      });
    },
    medium: function() {
      return this.sismos.filter(function(sis) {
        return 4 < sis.magnitude;
      });
    },
    high: function() {
      return this.sismos.filter(function(sis) {
        return sis.magnitude >= 5;
      });
    }
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
