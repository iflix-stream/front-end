<template>
  <v-layout row>
    <v-flex xs12 sm12 lg12 md12 style="margin-top: 68px">
      <v-container fluid grid-list-md>
        <h6>Lançamentos</h6>
        <v-layout darken-2 row wrap>
          <v-flex xs12 sm6 md4 lg3 xl3 v-for="video in filmesAndSeries" :key="video.id" v-on:click="renderizarCinema(video)">
            <v-card class="card-filmes">
              <v-card-media class="image-card-filme"
                            :src="video.thumbnail"
                            height="200px">
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="video.nome"></span>
                    </v-flex>
                  </v-layout>

                </v-container>
                <v-progress-linear style="position: absolute;bottom: 0;" value="80" color-front="primary"
                                   color-back="blue-grey"></v-progress-linear>

              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>

    <cinema></cinema>
  </v-layout>
</template>

<script>
  import bus from '../eventBus/bus'
  import { Api } from '../../api'

  import Cinema from './Cinema.vue'

  require('video.js/dist/video-js.css')
  require('../../../static/css/iflix-player-theme.css')
  export default {
    name: 'app',
    data: () => ({
      videoSelecionado: '',
      filmes: [],
      series: [],
      filmesAndSeries: [],
    }),
    components:{
      Cinema,
    },
    created () {
      document.addEventListener('beforeunload', this.handler)
    },
    mounted () {
      this.getFilmes()
      this.getSeries()

    },

    methods: {
      handler: function handler (event) {
        if (this.diminuir) {
          this.$http.post(Api.url + '/contagem', {subtrair: true}, {emulateJSON: true})
        }
        return null
      },
      fecharDialog: function () {
//        this.dialogAssistir = false
//        if (this.diminuir) {
//          this.$http.post(Api.url + '/contagem', {subtrair: true}, {emulateJSON: true})
//        }

        bus.$emit('fecharCinema');

      },
      renderizarCinema: function (video) {
//        this.dialogAssistir = true
//        this.videoSelecionado = video
//        this.updatePlayerOptionsWithSelectedVideo(video)
//        this.formatarSinopse()
//        this.calcularAlturaPlayer()

        bus.$emit('renderizarCinema', video)

      },

      getFilmes: function () {
        this.$http.get(Api.url + '/filme').then(
          response => {
            this.filmes = response.body
            for (let i = 0; i < this.filmes.length; i++) {
              this.filmes[i].tipo = 'filme'
            }
            this.mergeFilmesESeries()
          }
        )
      },
      getSeries: function () {
        this.$http.get(Api.url + '/serie').then(
          response => {
            this.series = response.body
            for (let i = 0; i < this.series.length; i++) {
              this.series[i].tipo = 'serie'
            }
            this.mergeFilmesESeries()
          }
        )
      },
      mergeFilmesESeries: function () {
        this.filmesAndSeries = this.filmes.concat(this.series).sort().reverse()
      },
    }
  }
</script>

<style>
  .card-filmes {
    cursor: pointer;
  }

  .image-card-filme:hover {
    background-color: #000;
    opacity: 0.8;
  }

  @media screen and (max-width: 480px) {
    .video-js {
      /*position: inherit !important;*/
      width: 100% !important;
      height: 180px !important;
    }

    .subtrai-paddings-tela {
      padding: 0 !important;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 600px) and (min-width: 481px) {
    .video-js {
      /*position: inherit !important;*/
      width: 100% !important;
      height: 260px !important;
    }

    .subtrai-paddings-tela {
      padding: 0 !important;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 720px) and (min-width: 601px) {
    .video-js {
      /*position: inherit !important;*/
      width: 100% !important;
      height: 260px !important;
    }

    .subtrai-paddings-tela {
      padding: 0 !important;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 960px) and (min-width: 601px) {
    .video-js {
      /*position: inherit !important;*/
      width: 100% !important;
      height: 260px !important;
    }

    .subtrai-paddings-tela {
      padding: 0 !important;
      margin: 0 auto;
    }
  }

  @media screen and (min-width: 961px) {
    .video-js {
      /*position: inherit !important;*/
      width: 100% !important;
      height: calc(100vh - 20vh);
    }

  }

  .vjs-poster {
    /*position: absolute !important;*/
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
