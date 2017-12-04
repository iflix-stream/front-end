import Vue from 'vue'

export const Api = new Vue({
  data () {
    return {
      url: 'http://ifapps-morrinhos.com/iflix/api',
      shortUrl: 'http://ifapps-morrinhos.com/apis',
      frontUrl: 'http://ifapps-morrinhos.com/iflix'
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
