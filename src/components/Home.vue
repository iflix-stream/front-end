<template>
    <v-flex xs12 sm12 lg12 md12>
        <v-container fluid grid-list-md>
            <h6>Lançamentos</h6>
            <v-layout darken-2 row wrap>
                <v-flex xs12 sm6 md4 lg3 xl3
                        v-for="filme in filmesAndSeries"
                        :key="filme.id" v-on:click="dialog=true;">
                    <v-card class="card-filmes">
                        <v-card-media class="image-card-filme"
                                      :src="filme.thumbnail"
                                      height="200px">
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
                <v-dialog v-model="dialog" fullscreen persistent transition="dialog-bottom-transition" :overlay=false>
                    <v-toolbar dark color="primary">
                        <v-btn icon @click.native="dialog = false" dark>
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Settings</v-toolbar-title>
                    </v-toolbar>
                    <v-layout row wrap style="background-color: red;
   -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;">
                        <v-flex xs3>
                            <v-list three-line subheader>
                                <v-subheader>User Controls</v-subheader>
                                <v-list-tile avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Content filtering</v-list-tile-title>
                                        <v-list-tile-sub-title>Set the content filtering level to restrict appts that
                                            can be downloaded
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Content filtering</v-list-tile-title>
                                        <v-list-tile-sub-title>Set the content filtering level to restrict appts that
                                            can be downloaded
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Content filtering</v-list-tile-title>
                                        <v-list-tile-sub-title>Set the content filtering level to restrict appts that
                                            can be downloaded
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Content filtering</v-list-tile-title>
                                        <v-list-tile-sub-title>Set the content filtering level to restrict appts that
                                            can be downloaded
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-flex xs9 style="margin-top: 10%">
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
                    </v-layout>
                </v-dialog>
            </v-layout>
        </v-container>
    </v-flex>
</template>

<script>
    import {Api} from '../api'

    export default {
        name: 'app',
        data: () => ({
            filmes: [],
            series: [],
            filmesAndSeries: [],
            dialog: false,
            playerOptions: {
                muted: false,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: 'video/mp4',
                    src: Api.url + '/filme/?stream=true&id=' + 1
                }],
                poster: 'google.com',
            }
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
            getFilmes: function () {
                this.$http.get(Api.url + '/filme').then(
                    response => {
                        this.filmes = response.body
                        this.mergeFilmesESeries()
                    }
                )

            },
            getSeries: function () {
                this.$http.get(Api.url + '/serie').then(
                    response => {
                        this.series = response.body
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