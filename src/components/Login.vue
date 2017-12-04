<template>

  <v-flex style="height: 100vh;" ref="flexBackground" v-show="carregou">

    <v-container>

      <v-flex offset-sm2 offset-md3 offset-lg4 xs12 sm12 md6 lg4 style="margin-top: 15vh; color: white">


        <h3 style="text-align: center;">iFlix</h3>
        <v-card class="white" style="opacity: 0.9">
          <v-card-text>
            <v-alert class="red" icon="warning" dismissible v-model="alert">
              {{mensagem}}
            </v-alert>
            <v-flex xs12>
              <v-form v-model="valido" ref="loginForm" lazy-validation>
                <v-container grid-list-x1>
                  <v-text-field autofocus
                                label="E-mail"
                                :rules="emailRules"
                                required
                                v-model="email"
                  ></v-text-field>
                  <v-text-field
                    name="inputSenha"
                    label="Senha"
                    :rules="senhaRules"
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
                    <v-btn block primary large @click="login" @keyup.enter="login" :disabled="!valido">Login
                    </v-btn>
                  </v-flex>
                  <v-flex>
                    <v-btn block outline accent large to="registrar">Registrar</v-btn>
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
  </v-flex>
</template>

<script>
  import { Api } from '../api'
  import { Gradiente } from '../util/gradiente'
  import LoginService from '../services/LoginService'

  export default {
    name: 'app',
    data () {
      return {
        e1: true,
        valido: true,
        carregou: false,
        emailRules: [
          (v) => !!v || 'O e-mail é requirido.',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'O e-mail tem que ser válido.'
        ],
        senhaRules: [
          (v) => !!v || 'A senha é requirida',
          (v) => v && v.length >= 3 || 'A senha deve ter ao menos 3 caracteres.'
        ],
        email: '',
        senha: '',
        alert: false,
        mensagem: ''
      }
    },
    mounted () {
      Gradiente.initGradiente(this.$refs.flexBackground)
      this.carregou = true
      this.getGeoIp()
    },

    methods: {
      getGeoIp: function () {
        this.$http.get('http://freegeoip.net/json/').then(r => {
          this.geoIp = r.data
        })
      },

      login: function () {
        const formData = {
          email: this.email,
          senha: this.senha,
          geoInfo: this.geoIp
        }

        if (this.$refs.loginForm.validate()) {
          LoginService.post(formData)
            .then(response => {
              console.log(response)
              if (this.salvaTokenUsuario(response)) {
                this.salvaUrls(response)
                this.redirecionaUsuario()
              }
              if (response.data.code !== null && response.data.code === 500) {
                this.retornaMsgs(response.data.message)
              }
            }, () => {
              this.retornaMsgs('Oops, o servidor parece estar em manutenção')
            })
        }
      },
      retornaMsgs: function (mensagem) {
        this.mensagem = mensagem
        this.alert = true

      },
      salvaTokenUsuario: function (response) {
        if (response.data.token !== undefined) {
          localStorage.setItem('iflix-user-token', response.data.token)
          return true
        }
      },
      salvaUrls: function (response) {
        if (response.data.urls !== undefined) {
          localStorage.setItem('urls', response.data.urls)
        }
      },
      redirecionaUsuario: function () {
        this.$router.go('/home')
      }
    }
  }
</script>

<style>

</style>
