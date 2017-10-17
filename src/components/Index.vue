<template>
    <v-app toolbar dark>
        <v-toolbar fixed row style="background-color: rgba(20,20,20,0.9);">

            <v-toolbar-title to="home" class="white--text">IFlix</v-toolbar-title>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-menu>
                    <v-btn flat slot="activator">Gêneros</v-btn>
                    <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top:64px">
                        <v-list-tile v-for="genero in menuGeneros" :key="genero.id"
                                     :to="'/genero/'+genero.nome">
                            <v-list-tile-title class="white--text" v-text="genero.nome"></v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu v-if="usuario.permissao === 'admin'">
                    <v-btn flat slot="activator">Cadastros</v-btn>
                    <v-list style="background-color: rgba(20,20,20,0.9);position: fixed;top: 64px">
                        <v-list-tile v-for="cadastro in menuCadastros" :key="cadastro.id"
                                     :to="'/'+cadastro.acao">
                            <v-list-tile-title class="white--text" v-text="cadastro.nome"></v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
            <v-flex style="margin-right: 25px">
                <v-layout align-center row spacer slot="header" style="float: right">
                    <v-flex>
                        <v-menu>
                            <v-list style="background-color: rgba(20,20,20,0.9); position: fixed; top: 64px">
                                <v-list-tile v-for="usuario in menuUsuario" :key="usuario.id" @click="go(usuario.acao)">
                                    <v-list-tile-title class="white--text" v-text="usuario.nome"></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                            <div slot="activator">
                                <v-flex>
                                    <v-avatar size="36px">
                                        <img :src="api.shortUrl +'/assets/avatares/'+ usuario.avatar + '.png'"
                                             alt="Imagem de perfil"/>
                                    </v-avatar>
                                    <strong>{{usuario.nome}}</strong>
                                </v-flex>
                            </div>

                        </v-menu>

                    </v-flex>
                </v-layout>
            </v-flex>
        </v-toolbar>
        <main>
            <v-container fluid>
                <router-view></router-view>
                <v-layout row justify-center>
                    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
                        <v-card>
                            <v-toolbar dark class="primary">
                                <v-btn icon @click.native="dialog = false" dark>
                                    <v-icon>close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Configurações</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            <v-list three-line subheader>
                                <v-subheader>Perfil</v-subheader>
                                <v-list-tile avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Content filtering</v-list-tile-title>
                                        <v-list-tile-sub-title>Set the content filtering level to restrict appts that
                                            can be downloaded
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Password</v-list-tile-title>
                                        <v-list-tile-sub-title>Require password for purchase or use password to restrict
                                            purchase
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list three-line subheader>
                                <v-subheader>General</v-subheader>
                                <v-list-tile avatar>
                                    <v-list-tile-action>
                                        <v-checkbox v-model="notifications"></v-checkbox>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Notifications</v-list-tile-title>
                                        <v-list-tile-sub-title>Notify me about updates to apps or games that I
                                            downloaded
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile avatar>
                                    <v-list-tile-action>
                                        <v-checkbox v-model="sound"></v-checkbox>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Sound</v-list-tile-title>
                                        <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile avatar>
                                    <v-list-tile-action>
                                        <v-checkbox v-model="widgets"></v-checkbox>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                                        <v-list-tile-sub-title>Automatically add home screen widgets
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-container>
        </main>
    </v-app>
</template>
<script>
    import {Api} from '../api'

    export default {
        name: 'app',
        data: () => ({
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            api: Api,
            menuGeneros: [],
            menuCadastros: [
                {
                    id: 0,
                    nome: 'Filmes',
                    acao: 'filme'
                }
            ], menuUsuario: [
                {
                    id: 0,
                    nome: 'Perfil',
                    acao: 'perfil'
                },
                {
                    id: 1,
                    nome: 'Sair',
                    acao: 'sair'
                }
            ],
            permicao: '',
            usuario: {
                id: '',
                nome: '',
                avatar: ''
            }
        }),
        mounted () {
            this.getGeneros()
            this.getUsuario()
        },
        methods: {
            go: function (a) {
                switch (a) {
                    case 'perfil':
                        this.dialog = true
                        break
                    case 'sair':
                        localStorage.removeItem('iflix-user-token')
                        this.$router.go('/login')
                        break
                }
            },
            getUsuario: function () {
                let jwtDecode = require('jwt-decode')
                let token = localStorage.getItem('iflix-user-token')
                let decoded = jwtDecode(token)
                this.usuario = decoded.usuario
                if (decoded.usuario.nome.length > 15) {

                    this.usuario.nome = decoded.usuario.nome.substring(0, 12) + '...'
                }
                else {
                    this.usuario.nome = decoded.usuario.nome
                }
                this.usuario.permissao = decoded.permicao
            },
            getGeneros: function () {
                this.$http.get(Api.url + '/genero').then(response => {
                    this.menuGeneros = response.body.sort().reverse()
                }, response => {
                    console.error(response.body)
                })
            }
        }
    }
</script>

<style>

</style>