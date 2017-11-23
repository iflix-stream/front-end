<template>
  <v-layout row justify-center>
    <v-toolbar dark primary absolute>
      <v-btn icon @click="fecharDialog()" dark>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>Perfil</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click.native="salvar()">Salvar</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout column style="">
      <v-flex>
        <v-layout column primary lighten-1 style="padding-top: 25px" class="text-xs-center">
          <v-flex xs12 row>
            <v-avatar @click.stop="dialogSelecionaAvatar = true"
                      :tile="false" size="150px" class="white"
            >
              <div class="bg">
                <img :src="`${api.shortUrl}/assets/avatares/${avatarSelecionado}`" ref="imgPerfil">
                <div class="overlay">
                  <v-icon x-large>mode_edit</v-icon>
                </div>
              </div>

            </v-avatar>
          </v-flex>
          <v-container>
            <v-layout row wrap class="text-xs-center">
              <v-flex offset-md1 offset-lg1></v-flex>
              <v-flex xs12 sm3 md3 lg3></v-flex>
              <v-flex xs12 sm4 md4 lg4><h5>{{usuario.nome}}</h5></v-flex>
              <v-flex xs12 sm3 md3 lg3></v-flex>
              <v-flex offset-md1 offset-lg1></v-flex>
            </v-layout>
          </v-container>
          <v-divider></v-divider>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-alert :class="alert.color" :icon="alert.icon" dismissible v-model="alert.value">
          {{alert.message}}
        </v-alert>
        <v-layout row wrap>

          <v-flex offset-md1 offset-lg1></v-flex>
          <v-flex xs12 sm12 md8 lg8>

            <v-card class="grey darken-4 elevation-0">
              <v-card-title primary-title>
                <div>
                  <h5>Informações</h5>
                </div>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-form>
                    <v-layout column>
                      <v-flex xs12>
                        <section>
                          <h5>Pessoais</h5>
                          <v-layout row wrap>
                            <v-flex xs12 sm12 md6 lg6 xl6>
                              <v-text-field
                                v-model="usuario.nome"
                                label="Nome"
                              ></v-text-field>
                              <v-text-field disabled
                                v-model="usuario.email"
                                label="E-mail"
                              ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6 lg6 xl6>
                              <v-text-field
                                v-model="usuario.dataNascimento"
                                label="Nascimento"
                                v-mask="'##/##/####'"
                                readonly
                                disabled
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </section>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-flex xs12>
                        <section>
                          <h5>Segurança</h5>
                          <v-switch color="indigo" v-model="mudaSenha" label="Mudar senha"></v-switch>
                          <v-layout column>
                            <v-flex xs12 sm12 md6 lg6 xl6 v-if="mudaSenha">
                              <v-text-field
                                v-model="usuario.senhaAtual"
                                label="Senha atual"
                                type="password"
                              ></v-text-field>
                              <v-text-field
                                v-model="usuario.novaSenha"
                                label="Nova Senha"
                                type="password"
                              ></v-text-field>
                              <v-text-field
                                v-model="usuario.confirmaSenha"
                                label="Confirmar senha"
                                type="password"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </section>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-flex>
                        <section style="margin-top: 15px">
                          <h5>Configuracionais</h5>
                          <v-layout row wrap>
                            <v-flex xs12 sm12 md6 lg6 xl6>
                              <v-switch color="indigo" v-model="receberEmailsFilmesNovos"
                                        label="Mandar emails de novos filmes/series"></v-switch>

                              <v-switch color="indigo" v-model="mostrarSeEstouOnline"
                                        label="Mostrar que estou online"></v-switch>

                            </v-flex>
                            <v-flex xs12 sm12 md6 lg6 xl6>

                            </v-flex>
                          </v-layout>
                        </section>

                      </v-flex>

                    </v-layout>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex offset-md1 offset-lg1></v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialogSelecionaAvatar" max-width="500px">
      <v-card>
        <v-card-title>
          Selecionando um avatar!
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md text-xs-center>
            <v-layout row justify-space-between wrap>
              <div v-for="avatar in avatares">
                <v-flex xs-6 sm-6 md-4>
                  <v-avatar @click.stop="selecionaAvatar(avatar)"
                            :tile="false" size="110px" class="white"
                  >
                    <div class="bg">
                      <img :src="`${api.shortUrl}/assets/avatares/${avatar.file}`">
                      <div class="overlay">
                        <v-icon x-large>mode_edit</v-icon>
                      </div>
                    </div>
                  </v-avatar>
                </v-flex>
              </div>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialogSelecionaAvatar=false">Fechar</v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

  </v-layout>

</template>
<script>
  import { Api } from '../../api'
  import jwtDecode from 'jwt-decode'
  import moment from 'moment'

  export default {

    data () {
      return {
        mudaSenha: false,
        dialogSelecionaAvatar: false,
        userName: '',
        disName: true,
        avatares: [],
        avatarSelecionado: '1.png',
        api: {},
        usuario: {},
        receberEmailsFilmesNovos: true,
        mostrarSeEstouOnline: false,
        alert: {}
      }
    },
    methods: {
      getAvatares: function () {
        this.$http.get(`${Api.url}/avatar`).then(response => {
            this.avatares = response.data
          }
        )
      },

      selecionaAvatar: function (avatar) {
        this.avatarSelecionado = avatar.file
        this.dialogSelecionaAvatar = false
      },

      fecharDialog: function () {
        this.$router.go(-1)
      },

      getUsuario: function () {
        let token = localStorage.getItem('iflix-user-token')
        let decoded = jwtDecode(token)
        this.$http.get(`${Api.url}/usuario/id/${decoded.usuario.id}`).then(response =>{
          this.usuario = response.data
          this.configuraUsuarioToDisplay()
        })
      },

      configuraUsuarioToDisplay: function () {
        if (this.usuario.nome.length > 15) {
          this.usuario.nome = this.usuario.nome.substring(0, 12) + '...'
        }
        this.usuario.permissao = this.usuario.permicao
        this.userName = this.usuario.nome
        this.avatarSelecionado = this.usuario.avatar
        this.usuario.dataNascimento = this.formataDataDoServidor()
      },
      verificaSenhas: function () {
        if (this.usuario.novaSenha !== undefined && this.usuario.confirmaSenha !== undefined) {
          return this.usuario.novaSenha === this.usuario.confirmaSenha
        }
        return false
      },

      compilaAlert: function (tipo, mensagem) {
        this.alert.value = false
        let alert = {}
        alert.value = true
        alert.message = mensagem
        switch (tipo) {
          case 'success':
            alert.icon = 'check_circle'
            alert.color = 'green'
            break
          case 'error':
            alert.icon = 'warning'
            alert.color = 'red'
            break
          case 'warning':
            alert.icon = 'priority_high'
            alert.color = 'yellow darken-3'
            break
        }
        this.alert = alert
      },

      salvar: function () {
       this.usuario.dataNascimento = this.formataDataParaOServidor()
        let user = {
          nome: this.usuario.nome,
          avatar: this.avatarSelecionado
        }
        if(this.mudaSenha){
          if (this.verificaSenhas() ) {
            user.senha = this.usuario.senha
            user.novaSenha = this.usuario.novaSenha

          } else {
            this.compilaAlert('warning', 'As senhas devem conferir')
          }
        }
        this.$http.put(`${Api.url}/usuario`, user).then(response => {
          this.compilaAlert(response.data.type, response.data.message)
        }, err =>{
          console.log(err)
        })
//        console.log('salvou de mentirinha')
//        this.fecharDialog()
      },

      formataDataDoServidor () {
        return moment(this.usuario.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')
      },

      formataDataParaOServidor () {
        return moment(this.usuario.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD')
      }
    },
    mounted () {
      moment.locale()
      this.getAvatares()
      this.api = Api
      this.getUsuario()
    }
  }
</script>
<style lang="scss">
  $bg: rgba(0, 0, 0, 0.2);

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .bg,
  .overlay {
    text-align: center;
  }

  img,
  .overlay {
    transition: .3s all;
    border-radius: 100px;
  }

  .bg {
    float: left;
    padding: 1%;
    max-width: 90%;
    position: relative;
    img {
      width: 100%;
      margin-bottom: -4px;
    }
    .overlay {
      position: absolute;
      padding: 40%;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      background: $bg;
      color: #fff;
      opacity: 0;
      h2 {
        padding-top: 20%;
        font-family: 'Droid Serif', serif;
      }
      p {
        font-family: 'Julius Sans One', sans-serif;
      }
    }
    &:hover {
      cursor: pointer;
      .overlay {
        opacity: 1;
      }
      img {
        -webkit-filter: blur(2px);
        filter: blur(2px);
      }
    }
  }

</style>
