import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex);

import homeVuex from '../components/home/homeVuex/store'

const store = new Vuex.Store({

  modulos:{
    home: homeVuex,

  }
});
