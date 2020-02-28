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
      <div class="select" :value="selectedOption">
        <select interface="popover" v-model="selectedOption">
          <option
            v-for="(item, index) of sismos"
            :key="index"
            :value="[item.longitude, item.latitude]"
          >
            {{ item.reference }}
          </option>
        </select>
      </div>
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center="selectedOption"
        :zoom="5"
      >
        <MglMarker
          v-for="sismo of low"
          :key="sismo.chilean_time"
          :coordinates="[sismo.longitude, sismo.latitude]"
          color="green"
        >
          <MglPopup>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Reference</ion-card-subtitle>
                <ion-card-content>
                  {{ sismo.reference }}
                </ion-card-content>
                <ion-card-subtitle>Magnitude</ion-card-subtitle>
                <ion-card-content>
                  {{ sismo.magnitude }}
                </ion-card-content>
              </ion-card-header>
            </ion-card>

            <!-- <ion-text
              ><ion-note color="dark"></ion-note>----
              <ion-note color="dark">{{ sismo.magnitude }}</ion-note></ion-text
            > -->
          </MglPopup>
        </MglMarker>
        <MglMarker
          v-for="sismo of medium"
          :key="sismo.utc_time"
          :coordinates="[sismo.longitude, sismo.latitude]"
          color="yellow"
        >
          <MglPopup>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Reference</ion-card-subtitle>
                <ion-card-content>
                  {{ sismo.reference }}
                </ion-card-content>
                <ion-card-subtitle>Magnitude</ion-card-subtitle>
                <ion-card-content>
                  {{ sismo.magnitude }}
                </ion-card-content>
              </ion-card-header>
            </ion-card>
          </MglPopup>
        </MglMarker>
        <MglMarker
          v-for="sismo of high"
          :key="sismo.id"
          :coordinates="[sismo.longitude, sismo.latitude]"
          color="red"
        >
          <MglPopup>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Reference</ion-card-subtitle>
                <ion-card-content>
                  {{ sismo.reference }}
                </ion-card-content>
                <ion-card-subtitle>Magnitude</ion-card-subtitle>
                <ion-card-content>
                  {{ sismo.magnitude }}
                </ion-card-content>
              </ion-card-header>
            </ion-card>
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
<style>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #222428;
  background-image: none;
}
select::-ms-expand {
  display: none;
}
/* Custom Select */
.select {
  position: relative;
  display: flex;
  line-height: 3;
  background: #222428;
  overflow: hidden;
  border-radius: 0.25em;
}
select {
  flex: 1;
  padding: 0 0.5em;
  color: #fff;
  cursor: pointer;
}
/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background: #222428;
  cursor: pointer;
  pointer-events: none;
  -webkit-transition: 0.25s all ease;
  -o-transition: 0.25s all ease;
  transition: 0.25s all ease;
}
/* Transition */
.select:hover::after {
  color: #f39c12;
}
</style>
