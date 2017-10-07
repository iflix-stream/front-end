<template>
    <v-flex xs12 sm12 lg12 md12>
        <v-container fluid grid-list-md>
            <h6>Ultimos Visualizados</h6>
            <v-layout darken-2 row wrap>
                <v-flex xs12 sm6 lg4 md3
                        v-for="filme in filmesAndSeries"
                        :key="filme.nome"
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
            <h6>Lançamentos</h6>
            <v-layout darken-2 row wrap>
                <v-flex xs12 sm6 lg4 md3
                        v-for="filme in filmesAndSeries"
                        :key="filme.nome"
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
        </v-container>
    </v-flex>
</template>

<script>
    import {Api} from '../api'

    let tamanho

    function reslize() {

    }

    window.onload = reslize
    window.onresize = reslize

    export default {
        name: 'app',
        data: () => ({
            filmes: [],
            series: [],
            filmesAndSeries: [],

        }),
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
            this.getFilmes()
            this.getSeries()
        },
        methods: {
            getFilmes: function () {
                this.$http.get(Api.url + '/filme').then(
                    response => {
                        this.filmes = response.body;
                        this.mergeFilmesESeries()
                    }
                )

            },
            getSeries: function () {
                this.$http.get(Api.url + '/serie').then(
                    response=>{
                        this.series = response.body;
                        this.mergeFilmesESeries()
                    }
                )
            },

            mergeFilmesESeries: function () {
                this.filmesAndSeries = this.filmes.concat(this.series).sort().reverse()
            }
        }
    }
</script>

<style>

</style>