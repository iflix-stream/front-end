import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://192.168.1.10:8081/iFlix/api',
      shortUrl: 'http://192.168.1.10:8081/iFlix',
      frontUrl: 'http://192.168.1.10:8080'
    }
  }
})
