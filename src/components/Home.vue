<template>
    <v-flex xs12 sm12 lg12 md12>
        <v-container fluid grid-list-md>
            <h6>Ultimos Visualizados</h6>
            <v-layout darken-2 row wrap>
                <v-flex
                        v-bind="{ [`xs${card.flex}`]: true }"
                        v-for="card in cards"
                        :key="card.title"
                >
                    <v-card>
                        <v-card-media
                                :src="card.src"
                                height="200px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text" v-text="card.title"></span>
                                    </v-flex>
                                </v-layout>

                            </v-container>
                            <v-progress-linear style="position: absolute;bottom: 0;" value="80" color-front="purple"
                                               color-back="blue-grey"></v-progress-linear>

                        </v-card-media>
                    </v-card>
                </v-flex>
            </v-layout>
            <h6>Lançamentos</h6>
            <v-layout darken-2 row wrap>
                <v-flex
                        v-bind="{ [`xs${card.flex}`]: true }"
                        v-for="card in cards"
                        :key="card.title"
                >
                    <v-card>
                        <v-card-media
                                :src="card.src"
                                height="200px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text" v-text="card.title"></span>
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
    </v-flex>
</template>

<script>
  import Api from '../api'

  let tamanho

  function reslize () {

  }

  window.onload = reslize
  window.onresize = reslize

  export default {
    name: 'app',
    mounted () {
      let windowWidth = window.innerWidth
      if (windowWidth <= 520) {
        tamanho = 6
      }
      else if (windowWidth <= 1000) {
        tamanho = 4
      }
      else if (windowWidth > 1000) {
        tamanho = 3
      }
    },
    data: () => ({
      filmes: [],
      series: [],
      filmesAndSeries: [],

    }),
    mounted () {
      this.getFilmes()
      this.getSeries()
      this.mergeFilmesESeries()
    },
    methods: {
      getFilmes: function () {
        this.filmes = this.$http.get(Api.url + '/filme')
      },
      getSeries: function () {
        this.series = this.$http.get(Api.url + '/serie')
      },

      mergeFilmesESeries: function () {
        this.filmesAndSeries = this.filmes.concat(this.series).sort().reverse()
      }
    }
  }
</script>

<style>

</style>