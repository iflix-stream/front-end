<template>
    <v-flex xs12 sm12 lg12 md12>
        <v-container fluid grid-list-md>
            <h6>Lançamentos</h6>
            <v-layout darken-2 row wrap>
                <v-flex xs12 sm6 md4 lg3 xl3
                        v-for="video in filmesAndSeries"
                        :key="video.id"
                        v-on:click="dialogAssistir=true; videoSelecionado = video; updatePlayerOptionsWithSelectedVideo(video)">
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
                            <v-progress-linear style="position: absolute;bottom: 0;" value="80" color-front="purple"
                                               color-back="blue-grey"></v-progress-linear>

                        </v-card-media>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-layout row>
            <v-dialog v-model="dialogAssistir" fullscreen style="position: absolute; max-height: 100%;" persistent
                      transition="dialog-bottom-transition" :overlay=true>
                <v-toolbar dark color="primary" fixed>

                    <v-toolbar-title>Assistindo {{videoSelecionado.nome}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="dialogAssistir = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-layout row wrap style="background-color: #212121; height: 90.4%; margin-top:64px">

                    <v-flex xs12 sm12 md9 lg9 style="height: 95.5%">

                            <v-flex xs12>
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

                            </v-flex>
                            <v-flex>
                                Adicionar a minha lista, bla bla bla
                            </v-flex>

                    </v-flex>

                    <v-flex xs12 sm12 md3 lg3>
                        <div style="height: 100% !important; overflow: auto">
                            <v-flex>
                                <v-card class="white--text purple darken-2">
                                    <v-container fluid grid-list-lg>
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
                                            <div>Sinopse: {{videoSelecionado.sinopse}}</div>
                                        </v-flex>
                                    </v-container>
                                </v-card>
                            </v-flex >
                            <v-list style="min-height: 67.5%">
                                <v-list-group v-for="temporada in videoSelecionado.temporadas" :value="temporada.active" v-bind:key="temporada.nome">
                                    <v-list-tile slot="item" @click="">

                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ temporada.numero }}º Temporada</v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>keyboard_arrow_down</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                    <v-list-tile v-for="episodio in temporada.episodios" v-bind:key="episodio.nome" @click="">
                                        <v-list-tile-content>
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
</template>

<script>
  import { Api } from '../api'

  export default {
    name: 'app',
    data: () => ({
      videoSelecionado: '',
      filmes: [],
      series: [],
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
      },
      items: [
        {
          action: 'local_activity',
          title: 'Attractions',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'restaurant',
          title: 'Dining',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' }
          ]
        },
        {
          action: 'school',
          title: 'Education',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'directions_run',
          title: 'Family',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'healing',
          title: 'Health',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'content_cut',
          title: 'Office',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'local_offer',
          title: 'Promotions',
          items: [
            { title: 'List Item' }
          ]
        }
      ]
    }),
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
      updatePlayerOptionsWithSelectedVideo: function (video) {
        this.playerOptions.sources[0].src = Api.url + '/' + video.tipo + '/?stream=true&id=' + video.caminho
        this.playerOptions.poster = video.thumbnail
        console.log(videoSelecionado)
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
    .card-filmes {
        cursor: pointer;
    }

    .image-card-filme:hover {
        background-color: #000;
        opacity: 0.8;
    }
</style>
