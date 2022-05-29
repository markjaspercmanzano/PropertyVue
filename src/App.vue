<style>
.v-application--wrap {
  max-height: 1440px;
  max-width: 2560px;
  overflow: auto;
}
</style>
<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({}),
}
</script>
