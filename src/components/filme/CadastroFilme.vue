<template>
    <v-layout>
        <v-flex xs12 lg12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Cadastro de filme</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <v-text-field
                                label="Nome"
                                v-model="nome"
                                :counter="10"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Sinopse"
                                v-model="sinopse"
                                required
                        ></v-text-field>
                        <v-select
                                label="Gênero"
                                v-model="genero"
                                item-value="id"
                                item-text="nome"
                                :items="generos"
                                required
                        ></v-select>
                        <v-select
                                label="Idade recomendada"
                                v-model="idadesRecomendadas"
                                :items="idadesRecomendadas"

                                required
                        ></v-select>
                        <v-card-actions>
                            <v-btn @click="submit" :class="{ green: valid, red: !valid }">submit</v-btn>
                            <v-btn @click="clear">clear</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        nome: '',
        sinopse: '',
        genero: null,
        generos: [
          {
            id: 1,
            nome: 'Ação'
          },
          {
            id: 2,
            nome: 'Animação'
          },
          {
            id: 3,
            nome: 'Terror'
          },

        ],
        idadesRecomendadas: [
          'L',
          '10',
          '12',
          '14',
          '16',
          '18'
        ],
        checkbox: false
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$refs.form.$el.submit()
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }

  }
</script>