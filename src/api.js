import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://iflix-api.ifapps-morrinhos.com/api',
      shortUrl: 'http://iflix-api.ifapps-morrinhos.com/iFlix',
      frontUrl: 'http://192.168.1.10:8080'
    }
  }
})
