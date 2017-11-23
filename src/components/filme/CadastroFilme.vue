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
          <form enctype="multipart/form-data">
            <v-text-field
              label="Nome"
              v-model="form.nome"
              v-validate="'required'"
              data-vv-name="form.nome"
              required
            ></v-text-field>
            <v-text-field
              label="Sinopse"
              v-model="form.sinopse"
              v-validate="'required'"
              data-vv-name="form.sinopse"
              required
            ></v-text-field>

            <v-text-field
              label="Thumbnail"
              v-model="form.thumbnail"
              v-validate="'required'"
              data-vv-name="form.thumbnail"
              required
            ></v-text-field>
            <v-text-field
              label="Caminho do filme"
              v-model="form.caminho"
              v-validate="'required'"
              data-vv-name="form.caminho"
              required
            ></v-text-field>
            <v-select
              label="Gênero"
              v-model="form.genero"
              v-validate="'required'"
              data-vv-name="form.genero"
              item-value="id"
              item-text="nome"
              :items="generos"
              required
            ></v-select>
            <v-select
              label="Idade recomendada"
              v-model="form.idadeRecomendada"
              :items="idadesRecomendadas"
              v-validate="'required'"
              data-vv-name="form.idadeRecomendada"
              item-value="value"
              item-text="text"
              required
            ></v-select>
            <span>{{porcentagemUpload}}% completado</span>
            <v-progress-linear v-model="porcentagemUpload"></v-progress-linear>
            <input type="file" @change="upload" ref="inputUpload" id="inputUpload">
            <v-card-actions>
              <v-btn @click="submit">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { Api } from '../../api'
  import { UploadService } from '../../services/UploadService'

  export default {
    data () {
      return {
        valid: false,
        nome: '',
        sinopse: '',
        file: '',
        porcentagemUpload: 0,
        form: {},
        generos: [],
        idadesRecomendadas: [
          {
            text: 'L',
            value: '-1'
          }, {
            text: '10',
            value: '10'
          }, {
            text: '12',
            value: '12'
          }, {
            text: '14',
            value: '14'
          }, {
            text: '16',
            value: '16'
          }, {
            text: '18',
            value: '18'
          }
        ],
        checkbox: false
      }
    },
    mounted () {
      this.getGeneros()
    },
    methods: {
      getGeneros: function () {
        this.$http.get(Api.url + '/genero').then(
          response => {
            this.generos = response.body
          }
        )

      },
      upload: function(e) {
        e.preventDefault()
        let files = e.target.files
        if(files[0] !== undefined) {
          this.setDuration(files[0]);
        }
      },
      setDuration: function(file){
        let video = document.createElement('video')
        video.src = URL.createObjectURL(file)
        video.ondurationchange = () => {
          this.form.duracao = video.duration
        }
      },
      submit () {
        this.$http.post(Api.url + '/filme', this.form, {emulateJSON: true})
          .then(response => {
            if (response.data.id !== undefined) {
              let data = new FormData()
              data.append('file', this.$refs.inputUpload.files[0])
              data.append('id', response.data.id)
              data.append('tipo', 'filme')
              let vm = this
              UploadService.post(data, {
                progress (e) {
                  if (e.lengthComputable) {
                    vm.porcentagemUpload = Math.round((e.loaded / e.total ) * 100)
                  }
                }
              }).then(function (response) {
              })
            }
          }, response => {
            console.error(response.body)
          })

      },
      clear () {
        this.form = {}
      }
    }

  }
</script>
