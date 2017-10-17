<template>
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
</template>
<script>


    require('video.js/dist/video-js.css')
    require('vue-video-player/src/custom-theme.css')

    export default {
        name: 'app',
        data: () => ({
            playerOptions: {
                muted: false,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: 'video/mp4',
                    src: Api.url + '/filme/?stream=true&id=' + 1
                }],
                poster: 'http://google.com',
            }
        }),
        mounted () {
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