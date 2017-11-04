import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://192.168.1.2/iflix/api',
      shortUrl: 'http://192.168.1.2/iflix',
      frontUrl: 'http://192.168.1.2:8080'
    }
  }
})
