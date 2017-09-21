<template>

    <v-flex>
        <v-toolbar class="grey darken-4">
            <v-container>
                <v-toolbar-title class="white--text">iFlix</v-toolbar-title>
            </v-container>

        </v-toolbar>
        <v-parallax src="./static/login-background.jpg" style="max-height: 400px">
        </v-parallax>
        <v-container>
            <v-flex offset-sm2 offset-md3 offset-lg4 xs12 sm8 md6 lg4 style="position: relative;">
                <v-card style="margin-top: -320px">
                    <v-card-text>
                        <h3 style="text-align: center;">iFlix</h3>
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
                                        <v-btn block primary large>Registrar</v-btn>
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
  import Vue from 'vue'

  export default {
    name: 'app',
    data () {
      return {
        e1: false,
        email: '',
        senha: ''
      }
    },
    methods:
      {
        login: function () {
          const formData = {
            email: this.email,
            senha: this.senha
          };

          this.$http.post(Vue.prototype.$apiUrl + "/login", formData, {emulateJSON: true})
            .then(response => {
                localStorage.setItem("token", response.data.token)
            }, response => {
              console.error(response.body);
            });
        }
      }
  }
</script>

<style>
    .wrapper {
        height: 100%;
        min-height: 100%;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
    }

</style>