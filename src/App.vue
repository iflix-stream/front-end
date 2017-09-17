<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3 pt-5>
            <v-card >
                <v-card-title>
                    <div>
                        <h3 class="headline mb-0">Login</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                                label="Name"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="E-mail"
                                required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat class="orange--text">Share</v-btn>
                    <v-btn flat class="orange--text">Explore</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
      name: 'app'
    }
</script>

<style>

</style>