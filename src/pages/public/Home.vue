<style>
.body {
  height: 2560px;
  width: 1440px;
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
}
</style>
<template>
  <body>
    <v-main class="overflow-hidden">
      <app-bar @OnAdd="loadProperties"></app-bar>
      <v-toolbar dense elevation="4" flat outlined>
        <v-toolbar-items>
          <v-label height="100" width="100" :color="'red'">
            Outbids: {{ outbid }} | Outbid $$ Value: ${{ outbidValue }}<br />
            Active Bids: {{ activebid }} | Active Bid $$ Value: ${{
              activebidValue
            }}
            <br />
            Winning Bids: {{ winbid }} | Winning Bid $$ Value: ${{
              winbidValue
            }}
          </v-label>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
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
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-4"
              height="100"
              width="200"
              v-on:click="loadImage(property)"
              @click="toggle"
            >
              {{ property.streetName }}
              <br />
              Max Bid: ${{ property.maxBid }}
              <br />
              Last Bid: ${{ property.lastBid }}
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    color="white"
                    v-text="'mdi-close-circle-outline'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        <div v-if="imageSource">
          <img height="1440" width="2560" v-bind:src="imageSource" />
          <div class="center">
            {{ currentAddress }} <br />
            ${{ propertyPriceDetails }}
          </div>
        </div>
      </v-container>
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
    outbid: 0,
    winbid: 0,
    activebid: 0,
    outbidValue: 0,
    winbidValue: 0,
    activebidValue: 0,
    propertyPriceDetails: 0,
  }),
  created() {
    this.loadProperties()
    this.loadBids()
  },
  methods: {
    loadProperties() {
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
      this.propertyPriceDetails = propertyItem.propertyPrice
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
