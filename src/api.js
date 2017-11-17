import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://10.1.6.23/iflix/api',
      shortUrl: 'http://10.1.6.23/iflix',
      frontUrl: 'http://10.1.6.23:8080'
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
