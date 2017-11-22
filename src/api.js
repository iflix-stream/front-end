import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://localhost/iflix/api',
      shortUrl: 'http://localhost/iflix',
      frontUrl: 'http://localhost:8080'
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
