<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>

  import VueRouter from 'vue-router'

  let jwtDecode = require('jwt-decode')
  export default {
    name: 'app',
    data () {
      return {
        e1: false,
      }
    },
    mounted: function () {
        this.protect();
    },
    methods:
      {
        protect: function () {
          let decoded = jwtDecode(localStorage.getItem('iflix-user-token'))
          if ((decoded.exp - Math.round(new Date().getTime() / 1000)) <= 0) {
            localStorage.removeItem("iflix-user-token")
            (new VueRouter()).push("/login")
          }
        }
      }

  }
</script>