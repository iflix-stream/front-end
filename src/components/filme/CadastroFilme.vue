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
                    <form>
                        <v-text-field
                                label="Nome"
                                v-model="form.nome"
                                :error-messages="errors.collect('form.nome')"
                                v-validate="'required'"
                                data-vv-name="form.nome"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Sinopse"
                                v-model="form.sinopse"
                                :error-messages="errors.collect('form.sinopse')"
                                v-validate="'required'"
                                data-vv-name="form.sinopse"
                                required
                        ></v-text-field>
                        <v-select
                                label="Gênero"
                                v-model="form.genero"
                                :error-messages="errors.collect('form.genero')"
                                v-validate="'required'"
                                data-vv-name="form.genero"
                                item-value="id"
                                item-text="nome"
                                :items="generos"
                                required
                        ></v-select>
                        <v-select
                                label="Idade recomendada"
                                v-model="form.idade"
                                :items="idadesRecomendadas"
                                :error-messages="errors.collect('form.idade')"
                                v-validate="'required'"
                                data-vv-name="form.idade"
                                item-value="id"
                                item-text="text"
                                required
                        ></v-select>
                        <v-card-actions>
                            <v-btn @click="submit">submit</v-btn>
                            <v-btn @click="clear">clear</v-btn>
                        </v-card-actions>
                    </form>
                    <Upload></Upload>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import {Api} from '../../api'
    import Upload from '../upload.vue'
    export default {
        $validates: true,
        data () {
            return {
                valid: false,
                nome: '',
                sinopse: '',
                form: [],
                generos: [],
                idadesRecomendadas: [
                    {
                        text: "L",
                        id: "L"
                    }, {
                        text: "10",
                        id: "10"
                    }, {
                        text: "12",
                        id: "12"
                    }, {
                        text: "14",
                        id: "14"
                    }, {
                        text: "16",
                        id: "16"
                    }, {
                        text: "18",
                        id: "18"
                    }
                ],
                checkbox: false
            }
        },
        mounted(){
            this.getGeneros();
        },
        components:{
          Upload
        },
        methods: {
            getGeneros: function () {
                this.$http.get(Api.url + '/genero').then(
                    response => {
                        this.generos = response.body;
                    }
                )

            },
            submit () {
                this.$validator.validateAll().then((result)=> {
                    if (result) {
                        console.log("Verificado")
                        return;
                    }
                        console.log("Erro");
                    });
            },
            clear () {
                this.$refs.form.reset()
            }
        }

    }
</script>