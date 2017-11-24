<template>
  <v-app dark>
    <header>
      <v-toolbar class="primary">
        <v-toolbar-items>
          <v-btn to="/home" flat>IFlix</v-btn>
          <v-menu>
            <v-btn flat slot="activator">Gêneros</v-btn>
            <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top:64px">

              <v-list-tile v-for="genero in menuGeneros" :key="genero.id"
                           :to="'/genero/'+genero.nome.toLowerCase()">
                <v-list-tile-title class="white--text" v-text="genero.nome"></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar-items>
        <v-spacer></v-spacer>

        <v-flex style="margin-right: 25px">
          <v-layout align-center row spacer slot="header" style="float: right">
            <v-flex style="margin-right: 25px;">
              <v-form>
                <v-text-field class="pesquisa hidden-sm-and-down"
                              label="Pesquisar"
                              prepend-icon="search"
                ></v-text-field>
              </v-form>
            </v-flex>

            <v-flex>
              <v-menu>
                <div slot="activator">
                  <v-flex class="hidden-sm-and-up">
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex class="hidden-sm-and-down">
                    <v-avatar size="36px">
                      <img :src="`${api.shortUrl}/assets/avatares/${usuario.avatar}`"
                           alt="Imagem de perfil"/>
                    </v-avatar>
                    <strong>{{usuario.nome}}</strong>
                  </v-flex>
                </div>
                <v-list style="background-color: rgba(20,20,20,0.9); position: fixed; top: 64px">
                  <v-list-tile v-for="usuario in menuUsuario" :key="usuario.id" @click="go(usuario.acao)"
                  >
                    <v-list-tile-title class="white--text" v-text="usuario.nome"></v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

            </v-flex>
          </v-layout>
        </v-flex>
      </v-toolbar>
    </header>
    <v-layout column>
      <v-flex>
        <main>
          <router-view style="overflow: auto; height: 84.5vh;"
                       class="grey darken-4 fazer-margins"></router-view>
        </main>
      </v-flex>
      <v-flex>
        <v-bottom-nav class="hidden-md-and-up"
                      color="transparent"
                      shift
                      :value="isShowTabs"
                      :active.sync="bottomTabs"
        >
          <v-btn dark :to="'/'+this.formataNomeParaUrl()+'/minha-lista'">
            <span>Favoritos</span>
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn dark to="/search">
            <span>Pesquisar</span>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn dark to="/home">
            <span>Início</span>
            <v-icon>home</v-icon>
          </v-btn>
          <v-btn dark :to="'/perfil'">
            <span>Perfil</span>
            <v-icon>account_circle</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-flex>
      <v-flex>
        <v-footer class="pa-3 blue-grey darken-4 hidden-md-and-down">
          iFlix Streaming
          <v-spacer></v-spacer>
          <div>© {{ new Date().getFullYear() }}</div>
        </v-footer>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
  import { Api } from '../api'
  import perfil from '../components/usuario/Perfil.vue'

  export default {
    name: 'app',
    data: () => ({
      bottomTabs: 1,
      isShowTabs: true,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      dial: perfil.dialog,
      api: Api,
      menuGeneros: [],
      menuCadastros: [
        {
          id: 0,
          nome: 'Filmes',
          acao: 'filme'
        }
      ],
      menuUsuario: [
        {
          id: 0,
          nome: 'Perfil',
          acao: 'perfil',
          path: '/perfil'
        },
        {
          id: 1,
          nome: 'Sair',
          acao: 'sair',
          path: ''
        }
      ],
      permicao: '',
      usuario: {
        id: '',
        nome: '',
        avatar: ''
      }
    }),
    mounted () {
      this.getGeneros()
      this.getUsuario()
    },
    components: {
      perfil
    },
    watch: {
      '$route': function () {
        this.isShowTabs = this.$route.name !== 'cinema';
      }
    },
    methods: {
      go: function (a) {
        switch (a) {
          case 'perfil':
//            perfil.dialog = true
//            alert(perfil.dialog);
//            bus.$emit('abreperfil', this.dial)
            this.$router.push(this.menuUsuario[0].path)
            break
          case 'sair':
            localStorage.removeItem('iflix-user-token')
            this.$router.go('/login')
            break
        }
      },
      formataNomeParaUrl: function () {
        let jwtDecode = require('jwt-decode')
        let string = jwtDecode(localStorage.getItem('iflix-user-token')).usuario.nome
        let mapaAcentosHex = {
          a: /[\xE0-\xE6]/g,
          e: /[\xE8-\xEB]/g,
          i: /[\xEC-\xEF]/g,
          o: /[\xF2-\xF6]/g,
          u: /[\xF9-\xFC]/g,
          c: /\xE7/g,
          n: /\xF1/g
        }

        for (var letra in mapaAcentosHex) {
          var expressaoRegular = mapaAcentosHex[letra]
          string = string.replace(expressaoRegular, letra).replace(' ', '-')
        }
        return string.toLowerCase()
      },

      getUsuario: function () {
        let jwtDecode = require('jwt-decode')
        let token = localStorage.getItem('iflix-user-token')
        let decoded = jwtDecode(token)
        this.usuario = decoded.usuario
        this.$http.get(`${Api.url}/usuario/id/${decoded.usuario.id}`).then(res => {
          this.usuario = res.data
        })
        if (decoded.usuario.nome.length > 15) {

          this.usuario.nome = decoded.usuario.nome.substring(0, 12) + '...'
        }
        else {
          this.usuario.nome = decoded.usuario.nome
        }
        this.usuario.permissao = decoded.permicao
      },
      getGeneros: function () {
        this.$http.get(Api.url + '/genero').then(response => {
          this.menuGeneros = response.body.sort().reverse()
        }, response => {
          console.error(response.body)
        })
      }
    }
  }
</script>

<style>
  .pesquisa .input-group__details:after {
    background: #f4f4f4;
  }

  .pesquisa.input-group.input-group--focused .input-group__prepend-icon {
    color: #f4f4f4;
  }

  @media screen and (max-width: 600px) {
    .fazer-margins {
      padding-bottom: 500px;
    }
  }

</style>
