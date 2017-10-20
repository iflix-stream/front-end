<template style="">
    <v-app class="application--light grey lighten-1" >
        <router-view></router-view>
    </v-app>
</template>

<script>
    export default {
      name: 'app',
      data () {
        return {
          e1: false
        }
      }
    }
</script>

<style lang="stylus">
    @require './iflix.styl';
</style>

