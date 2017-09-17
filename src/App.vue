<template>
                <md-layout md-align="center">
                    <md-card>
                        <md-card-header>
                            <div class="md-title">Login</div>
                        </md-card-header>
                        <md-card-content>
                            <md-input-container>
                                <md-icon>person</md-icon>
                                <label>Email</label>
                                <md-input email required  />
                            </md-input-container>

                            <md-input-container md-has-password>
                                <md-icon>lock</md-icon>
                                <label>Senha</label>
                                <md-input type="password" required />
                            </md-input-container>
                        </md-card-content>
                        <md-card-actions>
                            <md-button class="md-raised md-primary">Cadastrar</md-button>
                            <md-button class="md-raised md-accent">Login</md-button>
                        </md-card-actions>
                    </md-card>
            </md-layout>
</template>

<script>
    export default {
      name: 'app'
    }
</script>

<style>

</style>