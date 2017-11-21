import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://localhost/iflix/api',
      shortUrl: 'http://192.168.1.2/iflix',
      frontUrl: 'http://192.168.1.2:8080'
    }
  },
  mounted () {
    if (localStorage.getItem("urls") !== undefined) {
      let ls = localStorage.getItem("urls");
      this.url = ls.url;
      this.shortUrl = ls.shortUrl;
      this.frontUrl = ls.frontUrl;
    }
  }
})
