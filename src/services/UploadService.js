import { Api } from '../api'
import Vue from 'vue'

export const UploadService = new Vue({
  methods: {
    post: async function (params, progress) {
      return await this.$http.post(`${Api.url}/uploader`, params, progress)
    }
  }

})
