<template>
  <v-layout row>
    <v-flex xs12 sm12 lg12 md12>
      <v-container fluid grid-list-md>
        <h6>Lançamentos</h6>
        <v-layout darken-2 row wrap>
          <v-flex xs12 sm6 md4 lg3 xl3
                  v-for="video in filmesAndSeries"
                  :key="video.id"
                  v-on:click="renderizarCinema(video)">
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

    <v-flex >
      <v-layout row style="width: 100%;">
        <v-dialog v-model="dialogAssistir" fullscreen transition="dialog-bottom-transition" :overlay=false persistent>
          <v-toolbar dark color="primary" fixed >

            <v-toolbar-title>Assistindo {{videoSelecionado.nome}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="fecharDialog()" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-layout row wrap class="grey darken-4" :style="calculaAlturaCinema()">

            <v-flex xs12 sm12 md9 lg9 >
              <v-container fluid grid-list-md class="subtrai-paddings-tela"
                           style="">
                <v-layout row ref="playerDeVideo" style="width: 100%; margin: 0">
                  <v-flex style=" margin: 0; padding: 0">
                    <v-card>

                      <video-player class="vjs-custom-skin"
                                    ref="videoPlayer"
                                    :options="playerOptions"
                                    :playsinline="true"
                                    @play="onPlayerPlay($event)"
                                    @pause="onPlayerPause($event)"
                                    @ended="onPlayerEnded($event)"
                                    @loadeddata="onPlayerLoadeddata($event)"
                                    @waiting="onPlayerWaiting($event)"
                                    @playing="onPlayerPlaying($event)"
                                    @timeupdate="onPlayerTimeupdate($event)"
                                    @canplay="onPlayerCanplay($event)"
                                    @canplaythrough="onPlayerCanplaythrough($event)"
                                    @ready="playerReadied"
                                    @statechanged="playerStateChanged($event)">
                      </video-player>
                      <v-card-actions class="primary">
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>bookmark</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>share</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>

            </v-flex>
            <v-flex xs12 sm12 md3 lg3 style="margin: 0">
              <div style="height: 54.5vh; overflow: auto">
                <v-flex>
                  <v-card class="white--text primary">
                    <v-container fluid grid-list-lg class="subtrai-margin-tela">
                      <v-layout row>
                        <v-flex xs5>
                          <v-card-media
                            :src="videoSelecionado.thumbnail"
                            height="125px"

                          ></v-card-media>
                        </v-flex>
                        <v-flex xs7>
                          <v-container>
                            <div class="headline">{{videoSelecionado.nome}}</div>
                            <div>Classificação: {{videoSelecionado.classificacao}}</div>
                          </v-container>
                        </v-flex>

                      </v-layout>
                      <v-flex xs12>
                        <div v-if="!spoilerSinopse && !isMaiorQue183">
                          Sinopse: {{decodeURIComponent(videoSelecionado.sinopse)}}
                        </div>
                        <div v-else-if="!spoilerSinopse && isMaiorQue183">
                          Sinopse: {{decodeURIComponent(videoSelecionado.sinopsePequena)}}
                        </div>
                        <div v-else-if="spoilerSinopse && isMaiorQue183">
                          Sinopse: {{decodeURIComponent(videoSelecionado.sinopseInteira)}}
                        </div>
                        <v-btn outline v-if="!spoilerSinopse && isBotaoSpoilerSinopse"
                               @click.native="spoilerSinopse = true" dark>
                          Mostrar mais
                        </v-btn>
                        <v-btn outline v-else-if="spoilerSinopse == true && isBotaoSpoilerSinopse"
                               @click.native="spoilerSinopse = false" dark>
                          Mostrar menos
                        </v-btn>
                      </v-flex>
                    </v-container>
                  </v-card>
                </v-flex>
                <v-list v-if="videoSelecionado.tipo == 'serie'" style="min-height: 40vh">
                  <v-list-group v-for="temporada in videoSelecionado.temporadas" :value="temporada.active"
                                v-bind:key="temporada.nome">
                    <v-list-tile slot="item" @click="">

                      <v-list-tile-content>
                        <v-list-tile-title>{{ temporada.numero }}º Temporada</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon>keyboard_arrow_down</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile v-for="episodio in temporada.episodios" v-bind:key="episodio.nome"
                                 @click="">
                      <v-list-tile-content @click="setEpisode(episodio)">
                        <v-list-tile-title>{{ episodio.nome }}</v-list-tile-title>
                      </v-list-tile-content>

                    </v-list-tile>
                  </v-list-group>
                </v-list>
              </div>
            </v-flex>
          </v-layout>
        </v-dialog>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { Api } from '../api'

  require('video.js/dist/video-js.css')
  require('../../static/css/iflix-player-theme.css')
  export default {
    name: 'app',
    data: () => ({
      videoSelecionado: '',
      filmes: [],
      series: [],
      spoilerSinopse: false,
      isBotaoSpoilerSinopse: false,
      isMaiorQue183: false,
      diminuir: false,
      filmesAndSeries: [],
      dialogAssistir: false,
      playerOptions: {
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: '',
      }
    }),
    created () {
      document.addEventListener('beforeunload', this.handler)
    },
    mounted () {
      this.getFilmes()
      this.getSeries()
      setTimeout(() => {
        // console.log('dynamic change options', this.player)
        this.player.muted(false)
      }, 2000)
    },
    computed: {
      player () {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      handler: function handler (event) {
        if (this.diminuir) {
          this.$http.post(Api.url + '/contagem', {subtrair: true}, {emulateJSON: true})
        }
        return null
      },
      fecharDialog: function () {
        this.dialogAssistir = false
        if (this.diminuir) {
          this.$http.post(Api.url + '/contagem', {subtrair: true}, {emulateJSON: true})
        }
      },
      renderizarCinema: function (video) {
        this.dialogAssistir = true
        this.videoSelecionado = video
        this.updatePlayerOptionsWithSelectedVideo(video)
        this.formatarSinopse()
//        this.calcularAlturaPlayer()
      },

      calculaAlturaCinema: function () {
        if (this.videoSelecionado.tipo === 'serie'){
          return "margin-top:58px,  width: 100% !important; height: 64vh";
        }
        return "margin-top:58px;  width: 100% !important; height: 91vh"
      },
      updatePlayerOptionsWithSelectedVideo: function (video) {
        this.playerOptions.sources[0].src = Api.url + '/' + video.tipo + '/?stream=true&id=' + video.caminho
        this.playerOptions.poster = video.thumbnail

      },
      setEpisode: function (episodio) {
        this.playerOptions.sources[0].src = Api.url + '/serie/?stream=true&id=' + episodio.caminho
        console.log(episodio)
      },
      formatarSinopse: function () {
        this.isBotaoSpoilerSinopse = false
        this.spoilerSinopse = false
        this.isMaiorQue183 = false
        if (this.videoSelecionado.sinopse.length > 183) {
          this.isBotaoSpoilerSinopse = true
          this.isMaiorQue183 = true
          this.videoSelecionado.sinopseInteira = this.videoSelecionado.sinopse
          this.videoSelecionado.sinopsePequena = this.videoSelecionado.sinopse.substring(0, 183) + '...'
        }
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

      // listen event
      onPlayerPlay (player) {
        this.diminuir = true
        this.$http.post(Api.url + '/contagem', {somar: true}, {emulateJSON: true})
      },
      onPlayerPause (player) {
        this.diminuir = false
        this.$http.post(Api.url + '/contagem', {subtrair: true}, {emulateJSON: true})
      },
      onPlayerEnded (player) {
        this.diminuir = false
        this.$http.post(Api.url + '/contagem', {subtrair: true}, {emulateJSON: true})
      },
      onPlayerLoadeddata (player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting (player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying (player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate (player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay (player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough (player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged (playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied (player) {
        // seek to 10s
        player.currentTime(0)
        // console.log('example 01: the player is readied', player)
      }
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
