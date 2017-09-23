<template>
        <v-flex xs12 sm12 lg12 md12 >
            <v-container fluid grid-list-md>
                <v-layout darken-2 row wrap>
                    <v-flex
                            v-bind="{ [`xs${card.flex}`]: true }"
                            v-for="card in cards"
                            :key="card.title"
                    >
                        <v-card>
                            <v-card-media
                                    :src="card.src"
                                    height="200px"
                            >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline white--text" v-text="card.title"></span>
                                        </v-flex>
                                    </v-layout>

                                </v-container>
                                <v-progress-linear style="position: absolute;bottom: 0;" value="30" color-front="purple" color-back="blue-grey"></v-progress-linear>

                            </v-card-media>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
</template>

<script>
    export default {
      name: 'app',
        data: () => ({
            // adicionar o tanto de quadros dinamicamente atraves do tamanho da tela
            cards: [
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 },
                { title: 'Esquadrão Suicida', src: 'http://sm.ign.com/t/ign_br/screenshot/a/also-heade/also-headed-our-way-at-some-point-is-an-official-suicide-squ_shv9.640.jpg', flex: 3 }
            ]
        })
    }
</script>

<style>

</style>