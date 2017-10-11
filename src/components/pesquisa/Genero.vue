<template>
    <v-flex xs12 sm12 lg12 md12>
        <v-container fluid grid-list-md>
            <h6>Lançamentos</h6>
            <v-layout darken-2 row wrap>
                <v-flex xs12 sm6 md4 lg3 xl3
                        v-for="filme in filmesAndSeries"
                        :key="filme.id" @click="setId(filme.caminho,filme.thumbnail)"
                >
                    <v-card>
                        <v-card-media
                                :src="filme.thumbnail"
                                height="200px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text" v-text="filme.nome"></span>
                                    </v-flex>
                                </v-layout>

                            </v-container>
                            <v-progress-linear style="position: absolute;bottom: 0;" value="80" color-front="purple"
                                               color-back="blue-grey"></v-progress-linear>

                        </v-card-media>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent width="50%">
                    <!-- tamanho a ser modificado para ficar responsivo-->
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
                </v-dialog>
            </v-layout>
        </v-container>
    </v-flex>
</template>

<script>
  import { Api } from '../../api'

  require('video.js/dist/video-js.css')
  require('vue-video-player/src/custom-theme.css')

  export default {
    name: 'app',
    data: () => ({
      filmes: [],
      series: [],
      filmesAndSeries: [],
      dialog: false,
      playerOptions: {}
    }),
    watch: {
      '$route.params.nome': function () {
        this.getFilmesByGenero(this.$route.params.nome)
        this.getSeriesByGenero(this.$route.params.nome)

      }
    },

    mounted () {
      this.getFilmesByGenero(this.$route.params.nome)
      this.getSeriesByGenero(this.$route.params.nome)

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
      setId: function (id, foto) {
        this.playerOptions = {
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: Api.url + '/filme/?stream=true&id=' + id
          }],
          poster: foto,
        }
        this.dialog = true
      },

      getFilmesByGenero: function (genero) {
        this.$http.get(Api.url + '/filme/genero/' + genero).then(
          response => {
            this.filmes = response.body
            console.log(this.filmes)
            this.mergeFilmesESeries();
          }
        )
      },
      getSeriesByGenero: function (genero) {
        this.$http.get(Api.url + '/serie/genero/' + genero).then(
          response => {
            this.series = response.body
            this.mergeFilmesESeries();
          }
        )
      },

      mergeFilmesESeries: function () {
        this.filmesAndSeries = this.filmes.concat(this.series).sort().reverse()

      },

      // listen event
      onPlayerPlay (player) {
        // console.log('player play!', player)
      },
      onPlayerPause (player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded (player) {
        // console.log('player ended!', player)

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

</style>