<template>

    <v-flex>
        <v-parallax src="https://conta.nubank.com.br/images/sunrise.jpg" style="height: 100%">

            <v-container>

                <v-flex offset-sm2 offset-md3 offset-lg4 xs12 sm12 md6 lg4 style="position: relative;">
                    <v-card style="margin-top: 25%">
                        <v-card-text>

                            <h3 style="text-align: center;">iFlix</h3>
                            <v-alert :class="corAlert" :icon="icone" dismissible v-model="alert">
                                {{mensagem}}
                            </v-alert>
                            <v-flex xs12>
                                <v-form>
                                    <v-container grid-list-x1>
                                        <v-text-field
                                                label="Nome"
                                                required
                                                v-model="nome"
                                                :rules="regrasDeNome"
                                        ></v-text-field>
                                        <v-text-field
                                                label="E-mail"
                                                required
                                                :rules="regrasDeEmail"
                                                v-model="email"
                                        ></v-text-field>
                                        <v-text-field
                                                name="input-10-1"
                                                label="Senha"
                                                hint="A senha deve conter ao menos 8 caracteres"
                                                min="3"
                                                :rules="regrasDeSenha"
                                                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                                :append-icon-cb="() => (e1 = !e1)"
                                                :type="e1 ? 'password' : 'text'"
                                                counter
                                                required
                                                v-model="senha"
                                        ></v-text-field>
                                        <v-flex>
                                            <v-dialog
                                                    persistent
                                                    v-model="modalData"
                                                    lazy
                                                    full-width
                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        label="Data de nascimento"
                                                        v-model="data_nascimento"
                                                        readonly
                                                ></v-text-field>
                                                <v-date-picker v-model="data_nascimento" scrollable actions>
                                                    <template scope="{ save, cancel }">
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>
                                                            <v-btn flat color="primary" @click="save">OK</v-btn>
                                                        </v-card-actions>
                                                    </template>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-flex>
                                        <v-flex>
                                            <v-btn block primary large v-on:click="registrar">Registrar</v-btn>
                                            <a href="#/login">Voltar ao login</a>
                                        </v-flex>

                                    </v-container>
                                </v-form>
                            </v-flex>
                        </v-card-text>

                    </v-card>

                </v-flex>
                <!--<v-footer class="pa-3 grey darken-4">-->
                <!--<p class="text&#45;&#45;white text-md-center">Feito com carinho e sem fins lucrativos © {{ new Date().getFullYear() }}</p>-->
                <!--</v-footer>-->

            </v-container>
        </v-parallax>
    </v-flex>
</template>

<script>
  import { Api } from '../api'

  var jwtDecode = require('jwt-decode')
  export default {
    name: 'app',
    data () {
      return {
        e1: true,
        regrasDeNome: [
          (v) => !!v || 'O nome é requirido',
          (v) => v && v.length <= 3 || 'O nome tem que ser maior que 3 caracteres'
        ],
        regrasDeEmail: [
          (v) => !!v || 'O E-mail é requirido',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'O e-mail digitado é inválido'
        ],
        regrasDeSenha: [
          (v) => !!v || 'A senha é requirida',
        ],
        corAlert: '',
        icone: '',
        nome: '',
        modalData: '',
        data_nascimento: '',
        avatar: 1,
        email: '',
        senha: '',
        alert: false,
        mensagem: ''
      }
    },
    methods: {
      registrar: function () {

        const formData = {
          nome: this.nome,
          data_nascimento: this.data_nascimento,
          avatar: this.avatar,
          email: this.email,
          senha: this.senha
        }

        this.$http.post(Api.url + '/usuario', formData, {emulateJSON: true})
          .then(response => {
            if (response.data.type === 'success') {
              this.mensagem = response.data.message
              this.alert = true
              this.icone = 'done'
              this.corAlert = 'green'
            }

            else if (response.data.type === 'error') {
              this.mensagem = response.data.message
              this.alert = true
              this.icone = 'error'
              this.corAlert = 'red'
            }

          }, response => {
            console.error(response.body)
          })
      }
    }
  }
</script>

<style>

</style>