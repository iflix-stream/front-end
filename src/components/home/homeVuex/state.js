
export default {
  videoSelecionado: '',
  filmes: [],
  series: [],
  spoilerSinopse: false,
  isBotaoSpoilerSinopse: false,
  isMaiorQue183: false,
  diminuir: false,
  filmesAndSeries: [],
  dialogAssistir: false,
  playerOptions: {
    muted: false,
    language: 'en',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [{
      type: 'video/mp4',
      src: ''
    }],
    poster: '',
  }
}
