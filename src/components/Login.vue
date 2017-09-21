<template>
    <div>
        <v-flex>

            <v-container>
                <v-flex offset-sm4 xs12 sm8 md6 lg4 style="margin-top: 110px">
                    <v-card>
                        <v-card-text>
                            <h3 style="text-align: center;">iFlix</h3>
                            <v-flex xs12>
                                <v-form>
                                    <v-container grid-list-x1>
                                        <v-text-field
                                                label="E-mail"
                                                required
                                        ></v-text-field>
                                        <v-text-field
                                                name="input-10-1"
                                                label="Coloque sua senha"
                                                hint="A senha deve conter ao menos 8 caracteres"
                                                min="8"
                                                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                                :append-icon-cb="() => (e1 = !e1)"
                                                :type="e1 ? 'password' : 'text'"
                                                counter
                                        ></v-text-field>

                                        <v-flex class="text-xs-right">
                                            <a href="#">Esqueceu sua senha?</a>
                                        </v-flex>

                                        <v-flex>
                                            <v-btn block large>Login</v-btn>
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
            </v-container>

        </v-flex>
    </div>

</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        e1: false
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