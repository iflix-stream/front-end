import Vue from 'vue'
import { Api } from '../api'

export const Service  = new Vue({
  methods: {
    __get: async function (module, params) {
      return await this.$http.get(`${Api.url}/${module}`, params)
    },
    __post: async function(module, params) {
      return await this.$http.post(`${Api.url}/${module}`, params, {emulateJSON: true})
    },

    __put: async function(module, params) {
      return await this.$http.put(`${Api.url}/${module}`, params)
    },

    __delete: async function(module, params) {
      return await this.$http.delete(`${Api.url}/${module}`, params)
    }
  }

})
