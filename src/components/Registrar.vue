<template>

  <v-flex style="height: 100vh;" ref="flexBackground">


    <v-container>

      <v-flex offset-sm2 offset-md3 offset-lg4 xs12 sm12 md6 lg4 style="position: relative; margin-top: 5vh">
        <h3 style="text-align: center;">iFlix</h3>
        <v-card>
          <v-card-text>


            <v-alert :class="corAlert" :icon="icone" dismissible v-model="alert">
              {{mensagem}}
            </v-alert>
            <v-flex xs12>
              <v-form v-model="valido" ref="registerForm" lazy-validation>
                <v-container grid-list-x1>
                  <v-text-field autofocus
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
                  <v-text-field
                    label="Data de nascimento"
                    v-model="dataNascimentoFormatada"
                    v-mask="'##/##/####'"
                  ></v-text-field>
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
  </v-flex>
</template>

<script>
  import {Api} from '../api'
  import {Gradiente} from '../util/gradiente'
  import moment from 'moment'

  export default {
    name: 'app',
    data() {
      return {
        e1: true,
        valido: false,

        regrasDeNome: [
          (v) => !!v || 'O nome é requirido',
          (v) => v && v.length >= 3 || 'O nome tem que ser maior que 3 caracteres'
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
        dataNascimentoFormatada: null,
        avatar: '1.png',
        email: '',
        senha: '',
        alert: false,
        mensagem: ''
      }
    },
    mounted() {
      Gradiente.initGradiente(this.$refs.flexBackground)
    },
    methods: {
      formataDataParaOServidor() {
        return moment(this.dataNascimentoFormatada, 'DD-MM-YYYY').format('YYYY-MM-DD')
      },
      registrar: function () {

        const formData = {
          nome: this.nome,
          data_nascimento: this.formataDataParaOServidor(),
          avatar: this.avatar,
          email: this.email,
          senha: this.senha
        }

        this.$http.post(Api.url + '/usuario', formData, {emulateJSON: true})
          .then(response => {
            console.log(response)
            if (response.data.type === 'success') {
              this.mensagem = response.data.message
              this.alert = true
              this.icone = 'done'
              this.corAlert = 'green'
            } else if (response.data.type === 'error') {
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
