<template>
    <router-view></router-view>
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

<style>
    .wrapper {
        height: 100%;
        min-height: 100%;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
    }.wrapper2 {
        height: 100%;
        min-height: 100%;
    }

</style>