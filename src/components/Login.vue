<template>

    <v-flex>
        <v-parallax src="https://conta.nubank.com.br/images/sunrise.jpg" style="height: 100%">

            <v-container>

                <v-flex offset-sm2 offset-md3 offset-lg4 xs12 sm12 md6 lg4 style="position: relative;">
                    <v-card style="margin-top: 40%">
                        <v-card-text>

                            <h3 style="text-align: center;">iFlix</h3>
                            <v-alert class="red" icon="warning" dismissible v-model="alert">
                                {{mensagem}}
                            </v-alert>
                            <v-flex xs12>
                                <v-form>
                                    <v-container grid-list-x1>
                                        <v-text-field
                                                label="E-mail"
                                                required
                                                v-model="email"
                                        ></v-text-field>
                                        <v-text-field
                                                name="input-10-1"
                                                label="Senha"
                                                hint="A senha deve conter ao menos 8 caracteres"
                                                min="3"
                                                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                                :append-icon-cb="() => (e1 = !e1)"
                                                :type="e1 ? 'password' : 'text'"
                                                counter
                                                required
                                                v-model="senha"
                                        ></v-text-field>

                                        <v-flex class="text-xs-right">
                                            <a href="#">Esqueceu sua senha?</a>
                                        </v-flex>

                                        <v-flex>
                                            <v-btn block accent large v-on:click="login">Login</v-btn>
                                        </v-flex>
                                        <v-flex>
                                            <v-btn block primary large to="registrar">Registrar</v-btn>
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
        email: '',
        senha: '',
        alert: false,
        mensagem: ''
      }
    },

    methods: {
      login: function () {

        const formData = {
          email: this.email,
          senha: this.senha
        }

        this.$http.post(Api.url + '/login', formData, {emulateJSON: true})
          .then(response => {
            if (response.data.code === 500) {
              this.mensagem = response.data.message
              this.alert = true
            }
            if (response.data.token !== undefined) {
              localStorage.setItem('iflix-user-token', response.data.token)
              this.$router.go('/home')
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