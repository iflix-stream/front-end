<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
            <v-card>
                <v-toolbar dark primary>
                    <v-btn icon @click="fecharDialog()" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Configurações de Perfil</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialog = false">Salvar</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-layout row red lighten-1>
                    <v-flex xs12 offset-xs5 style="padding-top: 60px; padding-bottom: 25px">
                        <v-avatar
                                :tile="false" size="100px" class="grey lighten-4"
                        >
                            <img src="../../assets/logo.png">
                        </v-avatar>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs4 >
                        Email
                    </v-flex>
                    <v-flex xs4 offset-xs1 >


                        <h5>Nome:</h5>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="userName" :disabled="disName"></v-text-field>
                        <v-btn fab dark small color="cyan" @click="disName = true">
                        <v-icon dark>edit</v-icon>
                        </v-btn>



                    </v-flex>
                    <v-flex xs4 offset-xs1> Data Nasc</v-flex>
                </v-layout>
                <v-divider></v-divider>

            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
  import bus from '../../util/bus'


  export default {

    data () {
      return {
        dialog: true,
        userName:'',
        disName: true,
      }
    },
    methods: {
      fecharDialog: function () {
        this.dialog = false
        this.$router.push('/' + this.$route.query.ref.replace(/-/g, '/'))
        if (this.diminuir) {
          this.$http.delete(Api.url + '/contagem')
        }
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
         this.userName = this.usuario.nome
      },

    },
    mounted () {
      this.getUsuario()
//        bus.$on('abreperfil', (dial)=> this.dialog = true)

    }
  }
</script>