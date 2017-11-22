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
            <v-avatar
              :tile="false" size="150px" class="white"
            >
              <img :src="api.shortUrl+'/assets/avatares/' +usuario.avatar+'.png'" ref="imgPerfil">
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
                              <v-text-field
                                v-model="usuario.email"
                                label="E-mail"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md6 lg6 xl6>
                              <v-text-field
                                v-model="usuario.senha"
                                label="Senha"
                                type="password"
                              ></v-text-field>
                              <v-text-field
                                v-model="usuario.dataNascimento"
                                label="Nascimento"
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
                              <v-switch v-model="receberEmailsFilmesNovos" label="Mandar emails de novos filmes/series"></v-switch>

                              <v-switch v-model="mostrarSeEstouOnline" label="Mostrar que estou online"></v-switch>

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
              <v-card-actions>
                <!--<v-spacer></v-spacer>-->
                <!--<v-btn secondary>Cancelar</v-btn>-->
                <!--<v-btn primary>Enviar</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex offset-md1 offset-lg1></v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
  import { Api } from '../../api'
  import jwtDecode from 'jwt-decode'

  export default {

    data () {
      return {
        userName: '',
        disName: true,
        api: {},
        usuario: {},
        receberEmailsFilmesNovos: true,
        mostrarSeEstouOnline: false
      }
    },
    methods: {
      fecharDialog: function () {
        this.$router.go(-1)

      },
      getUsuario: function () {
        let token = localStorage.getItem('iflix-user-token')
        let decoded = jwtDecode(token)
        this.usuario = decoded.usuario
        if (decoded.usuario.nome.length > 15) {
          this.usuario.nome = decoded.usuario.nome.substring(0, 12) + '...'
        } else {
          this.usuario.nome = decoded.usuario.nome
        }
        this.usuario.permissao = decoded.permicao
        this.userName = this.usuario.nome
      },
      salvar: function () {
        console.log('salvou de mentirinha')
        this.fecharDialog()
      }
    },
    mounted () {
      this.api  = Api
      this.getUsuario()
    }
  }
</script>
