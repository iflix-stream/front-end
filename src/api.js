import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://api-iflix.ifapps-morrinhos.com/api',
      shortUrl: 'http://api-iflix.ifapps-morrinhos.com',
      frontUrl: 'http://192.168.1.10:8080'
    }
  }
})
