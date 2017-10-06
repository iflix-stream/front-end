<template>
    <v-app tollbar dark>
        <v-toolbar fixed style="background-color: rgba(20,20,20,0.95);">
            <v-toolbar-title class="white--text">IFlix</v-toolbar-title>

            <v-menu>
                <v-btn flat>Gêneros</v-btn>
                <v-btn flat slot="activator">Gêneros</v-btn>
                <v-list style="background-color: rgba(20,20,20,0.9);">
                    <v-list-tile v-for="item in items" :key="item.id" @click="">
                        <v-list-tile-title class="white--text" v-text="item.nome"></v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>
    </v-app>
</template>
<script>
  import { Api } from '../api'

  export default {
    name: 'app',
    data: () => ({
      items: []
    }),
    mounted () {
      this.getGeneros()
    },
    methods: {
      getGeneros: function () {
        this.items = this.$http.get(Api.url + '/genero').then(response => {
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