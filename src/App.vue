<template>
  <div id="app">
    <!-- Modulo de menu -->
    <MainMenu
      :status="mainMenu"/>
    <!-- Juego -->
    <Game
      :status="!mainMenu"/>
  </div>
</template>

<script>
/* Se importan los modulos de la aplicación */
import MainMenu from './components/MainMenu.vue'
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    /* Se agregan los componentes importados */
    MainMenu,
    Game
  },
  /* Aquí se guardan las variables reactivas */
  data(){
    return {
      /*
        Si esta variable define si esta o no en el menu.
          -> True: Esta en el menu
          -> False: Esta dentro del juego 
      */
      mainMenu: true
    }
  },
  /* 
    Esta función se ejecuta cuando se empieza a crear los modulos
  */
  created(){
    var _this = this //Se guarda el scope
    /* Esta función se ejecuta cuando se suelta una tecla */
    window.addEventListener('keyup', function(e) { // 'e' es el evento que genera el listener
      switch (e.key) {
        /* 
          Si se clickea 'Enter' y si se encuentra en mainMenu se ejecuta init()
        */
        case 'Enter':
          if(_this.mainMenu) _this.init()
          break;
      }
    })
  },
  /* Aquí se guardan todos las funciones del modulo */
  methods: {
    init(){
      /* Invierte la variable mainMenu */
      this.mainMenu=!this.mainMenu
    }
  }
}
</script>

<style lang="scss">

*{
  font-family: 'VT323', monospace;
  padding: 0;
  margin: 0;
  user-select: none;
}

img{
  -webkit-user-drag: none;
}

html{
  height: 100vh;
  width: 100vw;
  background: rgb(37, 37, 37);
  body{
    height: 100vh;
    width: 100vw;
    #app{
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      justify-items: center;
    }
  }
}

</style>
