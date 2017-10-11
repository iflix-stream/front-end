import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://localhost/iFlix/api',
      shortUrl: 'http://localhost/iFlix'
    }
  }
})