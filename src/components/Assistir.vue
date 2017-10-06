<template>
    <v-app tollbar dark>
        <v-toolbar fixed style="background-color: rgba(20,20,20,0.95);">
            <v-toolbar-title class="white--text">IFlix</v-toolbar-title>

            <v-btn flat to="/home">
            Voltar a navegação
            </v-btn>
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