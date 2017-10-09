<template>
    <v-app tollbar dark>
        <v-toolbar fixed style="background-color: rgba(20,20,20,0.9);">
            <v-toolbar-title to="home" class="white--text">IFlix</v-toolbar-title>
            <v-flex>
                <v-menu>
                    <v-btn flat slot="activator">Gêneros</v-btn>
                    <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top: 11%">
                        <v-list-tile v-for="item in items" :key="item.id" @click="">
                            <v-list-tile-title class="white--text" v-text="item.nome"></v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu v-if="permicao === 'admin'">
                    <v-btn flat slot="activator">Cadastro</v-btn>
                    <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top: 64px">
                        <v-list-tile v-for="cadastro in cadastros" :key="cadastro.id" :to="cadastro.acao">
                            <v-list-tile-title class="white--text" v-text="cadastro.nome"></v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-flex>
            <v-flex>
                <v-layout align-center row spacer slot="header" style="float: right">
                    <v-flex>
                        <v-menu>
                            <v-avatar size="36px" slot="activator">
                                <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="">
                            </v-avatar>
                            <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top: 64px">
                                <v-list-tile v-for="usuario in usuarios" :key="usuario.id" :to="usuario.acao">
                                    <v-list-tile-title class="white--text" v-text="usuario.nome"></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-flex>
                    <v-flex style="padding-left: 10px">
                        <strong>{{usuario.nome}}</strong>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-toolbar>
        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>
    </v-app>
</template>
<script>
    import {Api} from '../api'

    export default {
        name: 'app',
        data: () => ({
            items: [],
            cadastros: [
                {
                    id: 0,
                    nome: "Cadastro de Filme",
                    acao: "filme"
                }
            ], usuarios: [
                {
                    id: 0,
                    nome: "Perfil",
                    acao: "perfil"
                },
                {
                    id: 1,
                    nome: "Sair",
                    acao: "sair"
                }
            ],
            permicao: '',
            usuario:{}
        }),
        mounted () {
            this.getGeneros();
            this.getPermicao();
        },
        methods: {
            getPermicao: function () {
                let jwtDecode = require('jwt-decode');
                let token = localStorage.getItem('iflix-user-token');
                let decoded = jwtDecode(token);
                this.usuario = decoded.usuario;
                this.permicao = decoded.permicao;
            },
            getGeneros: function () {
                this.$http.get(Api.url + '/genero').then(response => {
                    this.items = response.body.sort().reverse()

                }, response => {
                    console.error(response.body)
                })
            }
        }
    }
</script>

<style>

</style>