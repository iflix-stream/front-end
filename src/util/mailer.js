import Vue from 'vue'
import {Api} from '../api'

export const IflixMailer = new Vue({
  data () {
    return {
      formData: {
        assunto: '',
        para: {
          email: '',
          nome: ''
        },
        template: '',
        variaveisTemplates: {
          nomepessoa: '',
          url: ''
        }
      }
    }
  },
  methods: {
    send: function () {
      LoginService.post(Api.url + '/email', this.formData, {emulateJson:true});
    }
  }
})


