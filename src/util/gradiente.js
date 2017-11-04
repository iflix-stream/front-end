import Vue from 'vue'

export const Gradiente = new Vue({

  data () {
    return {
      el: '#app',
      cores: [[111, 94, 229],
        [96, 226, 96],
        [201, 74, 110],
        [79, 128, 210],
        [201, 74, 110],
        [33, 124, 182]],
      passo: 0,
      indiceDeCores: [0, 1, 2, 3],
      velocidadeGradiente: 0.002
    }
  },
  methods: {
    gradiente: function (el) {

      let c0_0 = this.cores[this.indiceDeCores[0]]
      let c0_1 = this.cores[this.indiceDeCores[1]]
      let c1_0 = this.cores[this.indiceDeCores[2]]
      let c1_1 = this.cores[this.indiceDeCores[3]]

      let istep = 1 - this.passo
      let r1 = Math.round(istep * c0_0[0] + this.passo * c0_1[0])
      let g1 = Math.round(istep * c0_0[1] + this.passo * c0_1[1])
      let b1 = Math.round(istep * c0_0[2] + this.passo * c0_1[2])
      let cor1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'

      let r2 = Math.round(istep * c1_0[0] + this.passo * c1_1[0])
      let g2 = Math.round(istep * c1_0[1] + this.passo * c1_1[1])
      let b2 = Math.round(istep * c1_0[2] + this.passo * c1_1[2])
      let cor2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'
      el.style.background = '-webkit-gradient(linear, left top, right top, from(' + cor1 + '), to(' + cor2 + '))'
      el.style.background = '-moz-linear-gradient(left, ' + cor1 + ' 0%, ' + cor2 + ' 100%)'

      this.passo += this.velocidadeGradiente
      if (this.passo >= 1) {
        this.passo %= 1
        this.indiceDeCores[0] = this.indiceDeCores[1]
        this.indiceDeCores[2] = this.indiceDeCores[3]

        //pick two new target color indices
        //do not pick the same as the current one
        this.indiceDeCores[1] = ( this.indiceDeCores[1] + Math.floor(1 + Math.random() * (this.cores.length - 1))) % this.cores.length
        this.indiceDeCores[3] = ( this.indiceDeCores[3] + Math.floor(1 + Math.random() * (this.cores.length - 1))) % this.cores.length

      }
    },

    initGradiente: function (el) {
      setInterval(function(){Gradiente.gradiente(el)}, 500)
    }
  }
})


