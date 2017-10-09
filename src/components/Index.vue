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
                                <v-list-tile v-for="usuario in usuarios" :key="usuario.id" @click="go(usuario.acao)">
                                    <v-list-tile-title class="white--text" v-text="usuario.nome"></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-flex>
                    <v-flex style="padding-left: 10px">
                        <strong>{{usuario}}</strong>
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
                                <v-toolbar-title>Settings</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            <v-list three-line subheader>
                                <v-subheader>User Controls</v-subheader>
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
            items: [],
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
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
            usuario: {}
        }),
        mounted () {
            this.getGeneros();
            this.getPermicao();
        },
        methods: {
            go: function (a) {
                switch (a) {
                    case 'perfil':
                        this.dialog = true;
                        break;
                    case 'sair':
                        localStorage.removeItem('iflix-user-token');
                        this.$router.go('/login');
                        break;
                }
            },
            getPermicao: function () {
                let jwtDecode = require('jwt-decode');
                let token = localStorage.getItem('iflix-user-token');
                let decoded = jwtDecode(token);
                if (decoded.usuario.nome.length > 15) {
                    this.usuario = decoded.usuario.nome.substring(0, 12) + '...';
                }
                else {
                    this.usuario = decoded.usuario.nome;
                }
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