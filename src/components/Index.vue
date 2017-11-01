<template>
  <v-app dark>
    <header>
      <v-toolbar fixed class="grey darken-4 hidden-sm-and-down">

        <v-toolbar-items>
          <v-btn to="/home" flat>IFlix</v-btn>
          <v-menu>
            <v-btn flat slot="activator" disabled>Gêneros</v-btn>
            <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top:64px">

              <v-list-tile v-for="genero in menuGeneros" :key="genero.id"
                           :to="'/genero/'+genero.nome.toLowerCase()">
                <v-list-tile-title class="white--text" v-text="genero.nome"></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu v-if="usuario.permissao === 'admin'">
            <v-btn flat slot="activator">Cadastros</v-btn>
            <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top: 64px">
              <v-list-tile v-for="cadastro in menuCadastros" :key="cadastro.id"
                           :to="'/'+cadastro.acao">
                <v-list-tile-title class="white--text" v-text="cadastro.nome"></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

        </v-toolbar-items>
        <v-flex style="margin-right: 25px">
          <v-layout align-center row spacer slot="header" style="float: right">
            <v-flex>
              <v-menu>
                <v-list style="background-color: rgba(20,20,20,0.9); position: fixed; top: 64px">
                  <v-list-tile v-for="usuario in menuUsuario" :key="usuario.id" @click="go(usuario.acao)"
                  >
                    <v-list-tile-title class="white--text" v-text="usuario.nome"></v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <div slot="activator">
                  <v-flex>
                    <v-avatar size="36px">
                      <img :src="api.shortUrl +'/assets/avatares/'+ usuario.avatar + '.png'"
                           alt="Imagem de perfil"/>
                    </v-avatar>
                    <strong>{{usuario.nome}}</strong>
                  </v-flex>
                </div>

              </v-menu>

            </v-flex>
          </v-layout>
        </v-flex>
      </v-toolbar>
    </header>
    <v-layout column>
      <v-flex>
        <main>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </main>
      </v-flex>
      <v-flex>
        <aside>
          <v-card class="hidden-md-and-up " style="z-index: 1 ;position: fixed; bottom: 0; right: 0; left: 0;">
            <v-bottom-nav
              absolute
              shift
              :value="true"
              :active.sync="bottomTabs"
              primary
            >
              <v-btn dark :to="'/'+this.formataNomeParaUrl()+'/minha-lista'">
                <span>Favoritos</span>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn dark to="/home">
                <span>Início</span>
                <v-icon>home</v-icon>
              </v-btn>
              <v-btn dark :to="'/perfil'">
                <span>Configurações</span>
                <v-icon>settings</v-icon>
              </v-btn>
            </v-bottom-nav>
          </v-card>
        </aside>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
  import { Api } from '../api'
  import perfil from '../components/usuario/Perfil.vue'
  import bus from '../util/bus'

  export default {
    name: 'app',
    data: () => ({
      bottomTabs: 1,
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
      retornaReferencia: function () {
        let str = this.$route.fullPath.replace(/\//g, '-')
        return str.substring(1)
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

</style>
