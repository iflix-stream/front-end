<template>
    <div class="wrapper2">
    <v-layout class="wrapper">
        <v-flex xs4>
            <v-card >
                <v-card-title>
                    <div>
                        <h3 class="headline mb-0">Login</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-flex xs10 offset-xs1>
                        <v-text-field
                                label="E-mail"
                                required
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs10 offset-xs1>
                            <v-text-field
                                    name="input-10-1"
                                    label="Enter your password"
                                    hint="At least 8 characters"
                                    min="8"
                                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (e1 = !e1)"
                                    :type="e1 ? 'password' : 'text'"
                                    counter
                            ></v-text-field>
                        </v-flex>
                        <v-container grid-list-x1>
                            <v-flex>
                                <v-btn block secondary dark large class="blue--text">Login</v-btn>
                            </v-flex>
                            <v-flex>
                                <v-btn block secondary dark large class="blue--text">Registrar</v-btn>
                            </v-flex>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
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
    }.wrapper2 {
        height: 100%;
        min-height: 100%;
    }

</style>