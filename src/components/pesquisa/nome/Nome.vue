<template>
  <v-layout column>
    <section id="pesquisa">
      <v-container fluid>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
              <v-text-field
                v-on:blur="cadastraPesquisa()"
                v-on:paste="getFilmes(); getSeries()"
                v-on:keyup="pesquisar($event)"
                label="Buscar"
                v-model="busca"
              ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section id="resultados">
      <article id="ultimos-buscados" v-if="busca == ''">
        <v-flex class="text-xs-center">
          <h4>Ultimos buscados</h4>
        </v-flex>
        <v-layout column>
          <v-flex>
            <v-list one-line>
              <template v-for="(item, index) in ultimasBuscas">
                <v-list-tile avatar ripple v-bind:key="index" @click="busca = item.texto; getFilmes(); getSeries()">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.texto }}</v-list-tile-title>

                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < ultimasBuscas"></v-divider>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </article>
      <article id="erro-nenhum-achado" v-if="busca !== '' && filmesAndSeries[0] === undefined">
        <v-flex class="text-xs-center">
          <h4>Oops, parece que não encontramos o que procurava</h4>
        </v-flex>
      </article>
      <article id="melhor-resultado" v-if="busca !== '' && filmesAndSeries[0] !== undefined">
        <v-container fluid>
          <v-layout column>
            <v-flex class="text-xs-center"><h4>Melhor resultado</h4></v-flex>
            <v-flex xs12>
              <v-card v-if="renderizaMelhorResultado" @click="renderizarCinema(filmesAndSeries[0])">
                <v-card-media :src="filmesAndSeries[0].thumbnail" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{filmesAndSeries[0].nome}}</h3>
                    <div>Classificação: {{filmesAndSeries[0].classificacao}}</div>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </article>
      <article id="demais-resultados" v-if="busca !== '' && filmesAndSeries !== undefined && filmesAndSeries.length >1">
        <v-flex class="text-xs-center">
          <h4>Demais resultados</h4>
        </v-flex>
        <v-layout column>
          <v-flex>
            <v-list two-line>
              <template v-for="(item, index) in filmesAndSeries.slice(1)">
                <v-list-tile avatar ripple v-bind:key="index" @click="renderizarCinema(item)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                    <v-list-tile-sub-title>Classificação: {{ item.classificacao}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < filmesAndSeries.slice(1)"></v-divider>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </article>
    </section>
  </v-layout>
</template>

<script>
  /* eslint-disable no-trailing-spaces,padded-blocks,semi */
  import Perfil from '../../usuario/Perfil.vue'
  import { Api } from '../../../api'
  import Cinema from '../../cinema/Cinema.vue'
  import jwtDecode from 'jwt-decode'

  export default {
    name: 'app',
    data: () => ({
      videoSelecionado: '',
      ultimasBuscas: [],
      filmes: [],
      series: [],
      filmesAndSeries: [],
      pag: 1,
      busca: '',
      renderizaMelhorResultado: false
    }),
    created () {
      document.addEventListener('beforeunload', this.handler)
    },
    watch: {
      'this.busca' :function () {
        if(this.busca === ''){
          this.getUltimasBuscas()
        }
      }
    },
    mounted () {
      this.getUltimasBuscas()
    },
    methods: {
      pesquisar: function(event) {
        if(event.keyCode === 13){
          this.getFilmes(); this.getSeries()
        }else{
          this.getFilmes(); this.getSeries()
        }
      },

      cadastraPesquisa: function () {
        if (this.busca !== '' && this.busca !== undefined) {
          this.$http.post(`${Api.url}/pesquisa/`, {
            contexto: 'midias',
            texto: this.busca
          })
        }
      },
      getUltimasBuscas: function () {
        this.$http.get(`${Api.url}/pesquisa/contexto/midias`).then(res => {
          this.ultimasBuscas = res.data
        })
      },
      porcentagemVista: function (video) {
        if (video.tipo === 'filme') {
          return ((video.tempoAssistido / video.duracao) * 100)
        }
        let totalSegEpsAss = 0
        let totalSegEps = 0

        for (let i = 0; i < video.temporadas.length; i++) {
          for (let j = 0; j < video.temporadas[i].episodios.length; j++) {
            totalSegEpsAss += eval(video.temporadas[i].episodios[j].tempoAssistido)
            totalSegEps += eval(video.temporadas[i].episodios[j].duracao)
          }
        }
        return ((totalSegEpsAss / totalSegEps) * 100)
      },

      renderizarCinema: function (video) {
        this.$router.push('/watch/' + video.tipo + '/' + video.id)
      },
      getFilmes: function () {
        let url = Api.url + '/filme'

        if (this.busca !== '') {
          url += '/nome/' + this.busca + '/'
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
              console.log(response)
            }
          }
        )
      },
      getSeries: function () {
        let url = Api.url + '/serie/'
        if (this.busca !== undefined) {
          url += '/nome/' + this.busca + '/'
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
        this.renderizaMelhorResultado = true
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

  @media screen and (max-width: 480px) {
    /*.subtrai-margin-top {*/
    /*margin-top: 0;*/
    /*}*/
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
