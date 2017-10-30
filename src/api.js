import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://localhost/iflix/api',
      shortUrl: 'http://localhost/iflix',
      frontUrl: 'http://localhost:8080'
    }
  }
})
