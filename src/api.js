import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'https://api-iflix.ifapps-morrinhos.com/api',
      shortUrl: 'https://api-iflix.ifapps-morrinhos.com',
      frontUrl: 'https://192.168.1.10:8080'
    }
  }
})
