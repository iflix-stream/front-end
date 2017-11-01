<template>
  <v-layout column class="subtrai-margin-top">
    <section id="lancamentos">
      <v-flex xs12>
        <h5>Lançamentos</h5>
      </v-flex>
      <v-flex>
        <v-layout row wrap>
          <v-flex v-for="video in filmesAndSeries" xs12 sm6 md4 lg3 xl2
                  :key="video.id">
            <v-card class="card-filmes" v-on:click="renderizarCinema(video)">
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
      </v-flex>
    </section>
    <v-flex>
      <!--<aside>-->
      <!--<cinema></cinema>-->
      <!--</aside>-->
    </v-flex>
  </v-layout>
</template>

<script>
  /* eslint-disable no-trailing-spaces,padded-blocks,semi */
  import Perfil from '../usuario/Perfil.vue'

  import { Api } from '../../api'
  import Cinema from '../cinema/Cinema.vue'
  import jwtDecode from 'jwt-decode'

  require('video.js/dist/video-js.css')
  require('../../../static/css/iflix-player-theme.css')

  export default {
    name: 'app',
    data: () => ({
      videoSelecionado: '',
      filmes: [],
      series: [],
      filmesAndSeries: []
    }),
    watch: {
      '$route.params.nomegenero': function () {
        this.getFilmes()
        this.getSeries()
      }
    },
    created () {
      document.addEventListener('beforeunload', this.handler)
    },
    mounted () {
      this.getFilmes()
      this.getSeries()
      this.routeNameVerify()

    },
    methods: {
      handler: function handler (event) {
        if (this.diminuir) {
          this.$http.post(Api.url + '/contagem', {subtrair: true}, {emulateJSON: true})
        }
        return null
      },

      routeNameVerify: function () {
        switch (this.$route.name) {
          case 'rota-minha-lista':
            this.getMinhaListaSeries()
            this.getMinhaListaFilmes()
            break
        }
      },

      renderizarCinema: function (video) {
        console.log(this.$route)
        this.$router.push('/watch/' + video.tipo + '/' + video.id)
      },

      retornaReferencia: function () {
        let str = this.$route.fullPath.replace(/\//g, '-')
        return str.substring(1)
      },
      getMinhaListaFilmes: function () {
        let token = localStorage.getItem('iflix-user-token')
        this.$http.get(Api.url + '/lista/tipo/filme/usuario/' + jwtDecode(token).usuario.id + '/',
          {
            params: {
              q: 'my'
            }
          }
        ).then(response => {
          this.filmes = response.body

          if (this.filmes !== undefined) {
            for (let i = 0; i < this.filmes.length; i++) {
              this.filmes[i].tipo = 'filme'
            }
            this.mergeFilmesESeries()
          }
        })
      },
      getMinhaListaSeries: function () {
        let token = localStorage.getItem('iflix-user-token')
        this.$http.get(Api.url + '/lista/tipo/serie/usuario/' + jwtDecode(token).usuario.id + '/',
          {
            params: {
              q: 'my'
            }
          }
        ).then(response => {
          this.series = response.body
          if (this.series !== undefined) {
            for (let i = 0; i < this.series.length; i++) {
              this.series[i].tipo = 'serie'
            }
            this.mergeFilmesESeries()
          }
        })
      },
      getFilmes: function (id) {
        let url = Api.url + '/filme/'
        if (this.$route.params.nomegenero !== undefined) {
          url += 'genero/' + this.$route.params.nomegenero + '/'
        }

        if (id !== undefined) {
          url += 'id/' + id
        }
        this.$http.get(url, {
          params: {
            user: jwtDecode(localStorage.getItem('iflix-user-token')).usuario.id
          },
          headers: {
            'Authorization': '\'' + localStorage.getItem('iflix-user-token') + '\''
          }
        }).then(
          response => {
            this.filmes = response.body
            if (this.filmes !== undefined) {
              for (let i = 0; i < this.filmes.length; i++) {
                this.filmes[i].tipo = 'filme'
              }
              this.mergeFilmesESeries()
            }
          }
        )
      },
      getSeries: function () {
        let url = Api.url + '/serie/'
        if (this.$route.params.nomegenero !== undefined) {
          url = Api.url + '/serie/genero/' + this.$route.params.nomegenero + '/'
        }
        this.$http.get(url,
          {
            params: {
              user: jwtDecode(localStorage.getItem('iflix-user-token')).usuario.id
            },
            headers: {
              'Authorization': localStorage.getItem('iflix-user-token')
            }
          }
        ).then(
          response => {
            this.series = response.body
            if (this.series !== undefined) {
              for (let i = 0; i < this.series.length; i++) {
                this.series[i].tipo = 'serie'
              }
              this.mergeFilmesESeries()
            }
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
  .card-filmes {
    cursor: pointer;
    margin: 5px
  }

  .image-card-filme:hover {
    background-color: #000;
    opacity: 0.8;
  }

  .subtrai-margin-top {
    margin-top: 67px;
  }

  @media screen and (max-width: 480px) {
    .subtrai-margin-top {
      margin-top: 0;
    }

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
    .subtrai-margin-top {
      margin-top: 0;
    }

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
