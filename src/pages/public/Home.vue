<style>
div.backgroundLayer {
  background-color: white;
  opacity: 50%;
}
div.backgroundLayerStrong {
  background-color: white;
  opacity: 70%;
}
div.backgroundLayerWithPosition {
  position: absolute;
  bottom: 800px;
  right: 1500px;
  background-color: white;
  opacity: 90%;
}
.body {
  max-width: 2560px;
  max-height: 1440px;
  min-height: 1440px;
  min-width: 2560px;
  overflow: auto;
}
.center {
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
}
.img {
  background-color: blue;
  max-width: 2560px;
  max-height: 1440px;
  min-height: 1440px;
  min-width: 2560px;
  overflow: auto;
}
.v-main {
  max-width: 2560px;
  max-height: 1440px;
  min-height: 1440px;
  min-width: 2560px;
  overflow: auto;
  background-size: cover;
}
.v-label {
  color: darksalmon;
  min-width: 1000px;
}
div.normalText {
  background-color: white;
  opacity: 50%;
  font-size: 20px;
  color: black;
}
div.bigText {
  background-color: white;
  color: black;
  font-size: 40px;
}
div.outbidDiv {
  background-color: white;
  opacity: 50%;
  font-size: 20px;
  color: red;
}
div.winningBidDiv {
  background-color: white;
  opacity: 50%;
  font-size: 20px;
  color: green;
}
div.activeBidDiv {
  background-color: white;
  opacity: 30%;
  font-size: 20px;
  color: gray;
}
</style>
<template>
  <body>
    <v-main v-bind:style="{ backgroundImage: 'url(' + imageSource + ')' }">
      <v-row
        class="backgroundLayerStrong"
        width="1800"
        align="center"
        justify="left"
      >
        <v-col align="center" justify="center" cols="7" md="1" width="255">
          <v-img
            max-width="180"
            max-height="125"
            contain
            src="../../assets/docs.svg"
          ></v-img>
        </v-col>
        <v-spacer />
        <v-col align="center" justify="center" cols="7" md="2" min-width="255">
          <div class="normalText">Own</div>
          <div class="bigText">{{ currentStreet }}</div>
          <div class="normalText">{{ currentCity }}</div>
        </v-col>
        <v-spacer />
        <v-col align="center" justify="center" cols="7" md="1" min-width="255">
          <v-img
            max-width="180"
            max-height="125"
            contain
            src="../../assets/map.svg"
          ></v-img>
        </v-col>
        <v-spacer />
        <v-col align="center" justify="center" cols="7" md="1" min-width="255">
          <div class="normalText">To</div>
          <div class="bigText">START</div>
          <div class="normalText">Place Bid</div>
        </v-col>
        <v-spacer />
        <v-col align="center" justify="center" cols="7" md="1" min-width="255">
          <v-img
            max-width="180"
            max-height="125"
            contain
            src="../../assets/bookmark.webp"
          ></v-img>
        </v-col>
        <v-spacer />
        <v-col align="center" justify="center" cols="7" md="2" min-width="255">
          <div class="normalText">Market Value ${{ propertyPriceDetails }}</div>
          <div class="bigText">${{ minReservationPrice }}</div>
          <div class="normalText">Reserve Price</div>
        </v-col>
        <v-spacer />
        <v-col align="center" justify="center" cols="7" md="1" min-width="255">
          <v-img
            max-width="180"
            max-height="125"
            contain
            src="../../assets/home.png"
          ></v-img>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row class="backgroundLayer" width="1800" align="center" justify="left">
        <v-col align="center" justify="center" cols="7" md="1">
          <div>Outbid:</div>
          <div class="outbidDiv">{{ outbid }}</div>
        </v-col>
        <v-col align="center" justify="center" cols="7" md="1">
          <div>Active:</div>
          <div class="activeBidDiv">{{ activebid }}</div>
        </v-col>
        <v-col align="center" justify="center" cols="7" md="1">
          <div>Winning:</div>
          <div class="winningBidDiv">{{ winbid }}</div>
        </v-col>
        <v-col align="center" justify="center" cols="7" md="6">
          <v-spacer />
          <v-slide-group
            v-model="model"
            class="pa-4"
            mandatory
            show-arrows
            center-active
          >
            <v-slide-item
              v-for="(property, n) in properties"
              :key="n"
              v-slot="{ active, toggle }"
            >
              <v-btn
                :color="active ? 'primary' : 'black lighten-1'"
                text
                class="ma-4"
                height="10"
                width="200"
                v-on:click="loadImage(property)"
                @click="toggle"
              >
                {{ property.streetName }}
                <br />
                ${{ property.maxBid }} ${{ property.lastBid }}
                <v-row align="center" justify="center">
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align="center" justify="center" cols="7" md="1">
          <div>Winning:</div>
          <div class="winningBidDiv">${{ winbidValue }}</div>
        </v-col>
        <v-col align="center" justify="center" cols="7" md="1">
          <div>Active:</div>
          <div class="activeBidDiv">${{ activebidValue }}</div>
        </v-col>
        <v-col align="center" justify="center" cols="7" md="1">
          <div>Outbid:</div>
          <div class="outbidDiv">${{ outbidValue }}</div>
        </v-col>
      </v-row>
      <v-card
        class="backgroundLayerWithPosition"
        align="center"
        elevation="2"
        outlined
        shaped
        height="200"
        width="300"
      >
        <div class="normalText">Market Value: ${{ propertyPriceDetails }}</div>
        <div class="normalText">{{ currentStreet }}</div>
        <div class="normalText">{{ currentCity }}</div>
        <div class="normalText">
          Reserve Bid: ${{ minReservationPrice }}
        </div></v-card
      >
    </v-main>
  </body>
</template>

<script>
import TasksApi from '@/api/tasks.api.js'

export default {
  data: () => ({
    model: null,
    loading: false,
    properties: [],
    bids: [],
    bidValues: [],
    imageSource:
      'https://images.unsplash.com/photo-1549286942-e6b84b2db18d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471',
    currentAddress: 'n/a',
    currentStreet: 'n/a',
    currentCity: 'n/a',
    outbid: 0,
    winbid: 0,
    activebid: 0,
    outbidValue: 0,
    winbidValue: 0,
    activebidValue: 0,
    propertyPriceDetails: 0,
    minReservationPrice: 0,
  }),
  created() {
    this.loadProperties()
    this.loadBids()
  },
  methods: {
    loadProperties() {
      window.innerWidth
      this.loading = true
      TasksApi.getproperties().then((response) => {
        this.properties = response
        this.loading = false
      })
    },
    loadBids() {
      this.loading = true
      TasksApi.getbids().then((response) => {
        this.bids = response
        this.loading = false
        this.loadBidValues()
      })
    },
    loadBidValues() {
      this.loading = true
      TasksApi.getbidvalue().then((response) => {
        this.bidValues = response
        this.loading = false
        this.mapBidsToVariables()
      })
    },
    loadImage(propertyItem) {
      console.log(propertyItem.imageSource)
      this.imageSource = propertyItem.imageSource
      this.currentAddress =
        propertyItem.streetName + ` ` + propertyItem.cityStateName
      this.currentCity = propertyItem.cityStateName
      this.currentStreet = propertyItem.streetName
      this.propertyPriceDetails = propertyItem.propertyPrice
      this.minReservationPrice = propertyItem.minReservationPrice
    },
    mapBidsToVariables() {
      this.outbid = this.bids.losingBids
      this.winbid = this.bids.winningBids
      this.activebid = this.bids.activeBids
      this.outbidValue = this.bidValues.losingBidValue
      this.winbidValue = this.bidValues.winningBidValue
      this.activebidValue = this.bidValues.activeBidValue
    },
  },
  components: {},
}
</script>

<style lang="scss"></style>
