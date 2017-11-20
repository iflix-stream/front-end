<template>
  <v-flex>
    <v-layout row>
      <v-toolbar dark color="primary" absolute>
        <v-btn icon @click.native="fecharDialog()" dark>
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-toolbar-title>Assistindo {{videoSelecionado.nome}}</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap class="grey darken-4" :style="calculaAlturaCinema()" style="margin-top: 58px">
        <v-flex xs12 sm12 md9 lg9>
          <v-container fluid grid-list-md class="subtrai-paddings-tela"
                       style="">
            <v-layout row ref="playerDeVideo" style="width: 100%; margin: 0">
              <v-flex style="padding: 0">
                <v-card>
                  <video-player class="vjs-custom-skin" v-if="playerPronto"
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
                    <v-btn icon @click.native="adicionarMinhaLista()"
                           :style="isAdicionadoStyle">
                      <v-icon>favorite</v-icon>
                    </v-btn>

                    <v-btn icon disabled>
                      <v-icon>share</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>

        </v-flex>
        <v-flex xs12 sm12 md3 lg3 style="">
          <div style="">
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
    </v-layout>
    <v-snackbar
      :timeout="3000"
      :bottom="'bottom'"
      v-model="snackbar.show"
    >
      {{ snackbar.text}}
      <v-btn flat primary @click.native="snackbar.show = false">Fechar</v-btn>
    </v-snackbar>
  </v-flex>
</template>
<script>
  import { Api } from '../../api'
  import jwtDecode from 'jwt-decode'

  export default {
    data () {
      return {
        snackbar: {
          text: '',
          show: false
        },
        playerPronto: false,
        videoSelecionado: '',
        dialogAssistir: true,
        diminuir: false,
        spoilerSinopse: false,
        isBotaoSpoilerSinopse: false,
        isMaiorQue183: false,
        isAdicionadoStyle: '',
        ativadorDialog: false,
        podeSalvarDe15Em15: true,
        playerOptions: {
          muted: false,
          language: 'pt',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: ''
          }],
          poster: '',
        }

      }
    },

    mounted () {
      this.buscaVideo()
      let vm = this
      this.dialogAssistir = true
      if (this.$route.path.indexOf('/watch') !== -1) {
        window.addEventListener('beforeunload', function (e) {
          if (vm.diminuir) {
            vm.$http.delete(Api.url + '/contagem')
          }
          e.returnValue = undefined
          return undefined
        })
      }
//      bus.$on('configurarCinema', (video) => this.configurarCinema(video))

//      bus.$on('fecharCinema', this.fecharDialog())

    },

    computed: {},
    methods: {
      defineTipo: function () {
        this.videoSelecionado.tipo = this.$route.params.tipo
      },

      buscaVideo: function () {
        this.$http.get(Api.url + '/' + this.$route.params.tipo + '/id/' + this.$route.params.id + '/', {
          params: {
            user: jwtDecode(localStorage.getItem('iflix-user-token')).usuario.id
          }
        }).then(res => {
          this.videoSelecionado = res.body[0]
          this.configurarCinema()
          this.playerPronto = true
        })
      },

      configurarCinema: function () {
        this.defineTipo()
        this.ativadorDialog = true
        this.dialogAssistir = true
        this.isAdicionado()
        this.updatePlayerOptionsWithSelectedVideo(this.videoSelecionado)
        this.formatarSinopse()
//        this.calcularAlturaPlayer()
      },

      fecharDialog: function () {
        this.dialogAssistir = false
        this.AtivadorDialog = false
        this.$router.go(-1)
        if (this.diminuir) {
          this.$http.delete(Api.url + '/contagem')
        }
      },

      calculaAlturaCinema: function () {

        if (this.videoSelecionado.tipo === 'serie') {
//          return 'margin-top:58px;  width: 100% !important; height: 64vh'
        }
//        return 'margin-top:58px;  width: 100% !important; height: 91vh'
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

      updatePlayerOptionsWithSelectedVideo: function (video) {
        this.playerOptions.sources[0].src = Api.url + '/' + video.tipo + '/?stream=true&id=' + video.caminho
        if (video.tipo === 'serie') {
          this.setEpisode(video.primeiro_episodio)
          this.playerOptions.sources[0].src = Api.url + '/' + video.tipo + '/?stream=true&id=' + video.primeiro_episodio.caminho
          if (video.ultimo_ep_assistido !== 0) {
            this.setEpisode(video.ultimo_ep_assistido)
            this.playerOptions.sources[0].src = Api.url + '/' + video.tipo + '/?stream=true&id=' + video.ultimo_ep_assistido.caminho
          }

        }

        this.playerOptions.poster = video.thumbnail

      },

      setEpisode: function (episodio) {
        this.podeSalvarDe15Em15 = false
        this.episodioSelecionado = episodio
        this.playerOptions.sources[0].src = Api.url + '/serie/?stream=true&id=' + episodio.caminho
      },

      adicionarMinhaLista: function () {
        let token = localStorage.getItem('iflix-user-token')
        LoginService.post(Api.url + '/lista/?q=my',
          {
            tipo: this.videoSelecionado.tipo,
            usuario: jwtDecode(token).usuario.id,
            id: this.videoSelecionado.id
          },
          {emulateJSON: true}
        ).then(response => {
          this.snackbar.show = true
          this.snackbar.text = response.body.message
          this.isAdicionado()
        })
      },
      isAdicionado: function () {
        let token = localStorage.getItem('iflix-user-token')
        this.$http.get(Api.url + '/lista/tipo/' + this.videoSelecionado.tipo + '/usuario/' + jwtDecode(token).usuario.id +
          '/id/' + this.videoSelecionado.id,
          {
            params: {
              q: 'is-added'
            }
          }
        ).then(response => {

          if (response.body.isAdicionado === true) {
            this.isAdicionadoStyle = 'color: #EEEEEE'
          } else {
            this.isAdicionadoStyle = ''
          }
        })
      },
      salvarTempo: function (player) {
        let params = {
          usuario: jwtDecode(localStorage.getItem('iflix-user-token')).usuario.id,
          id: this.videoSelecionado.id,
          tipo: this.videoSelecionado.tipo,
          tempo: player.currentTime(),
        }
        if (this.videoSelecionado.tipo === 'serie') {
          params.id = this.episodioSelecionado.id
        }
        LoginService.post(Api.url + '/tempo',
          params,
          {
            emulateJSON: true
          }).then(res => {
        })
      },

      onPlayerPlay (player) {
        this.diminuir = true
        let params = {
          tipo: this.videoSelecionado.tipo,
          id: this.videoSelecionado.id
        }
        LoginService.post(Api.url + '/contagem',
          params, {emulateJSON: true}).then(res => {
        })
        if (this.podeSalvarDe15Em15) {
          setInterval(function () {
            this.salvarTempo(player)
          }.bind(this), 15000)

        }
      },
      onPlayerPause (player) {
        this.podeSalvarDe15Em15 = false
        this.diminuir = false
        this.$http.delete(Api.url + '/contagem')
        this.salvarTempo(player)

      },
      onPlayerEnded (player) {
        this.diminuir = false
        this.$http.delete(Api.url + '/contagem')
        this.salvarTempo(player)
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
        let tempoAssistido = this.videoSelecionado.tempoAssistido
        if (this.videoSelecionado.tipo === 'serie' && this.episodioSelecionado !== undefined) {
          tempoAssistido = this.episodioSelecionado.tempoAssistido
        }
        if (tempoAssistido !== null) {
          player.currentTime(tempoAssistido)
        }
        // console.log('example 01: the player is readied', player)
      }

    }
  }

</script>
<style>
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
