<template>
    <div>
        <h1>Dashboard de admin</h1>
        <router-view></router-view>
    </div>
</template>
<script>
  let jwtDecode = require('jwt-decode')
  export default {
    name: 'app',
    mounted: function () {
      this.protect()
    },
    methods:
      {
        protect: function () {
          let decoded = jwtDecode(localStorage.getItem('iflix-user-token'))
          if ((decoded.exp - Math.round(new Date().getTime() / 1000)) <= 0) {
            localStorage.removeItem('iflix-user-token')
            (new VueRouter()).push('/login')
          }

          if (decoded.permicao !== 'admin') {
            localStorage.removeItem('iflix-user-token')
            (new VueRouter()).push('/login')
          }
        }
      }

  }
</script>

<style>

</style>