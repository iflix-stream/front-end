<template style="height: 100%;
         min-height: 100%;">
    <v-flex grey darken-3 style="height: 100%">
        <router-view></router-view>
    </v-flex>

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

