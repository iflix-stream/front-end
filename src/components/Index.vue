<template>
    <v-app tollbar dark>
        <v-toolbar fixed style="background-color: rgba(20,20,20,0.95);">
            <v-toolbar-title class="white--text">IFlix</v-toolbar-title>

            <v-menu offset-y>
                <v-btn flat>Categorias</v-btn>
                <v-btn flat slot="activator" >Categorias</v-btn>
                <v-list style="background-color: rgba(20,20,20,0.9);">
                    <v-list-tile  v-for="item in items" :key="item" @click="">
                        <v-list-tile-title class="white--text" v-text="item"></v-list-tile-title>
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
    export default {
      name: 'app',
        data: () => ({
            items: [
                'Ação', 'Aventura', 'Comedia', 'Drama'
            ]
        })
    }
</script>

<style>

</style>