<!-- eslint-disable -->
import Player from '../objects/Player';
<template>
  <div id="mainMenu" :class="status?'true':'false'">
    <!-- Contenedor de la cuadricula -->
    <ul>
        <!-- Cada tupla de la cuadricula -->
        <li v-for="(x) in matriz">
            <ul>
                <!-- Cada columna -->
                <li v-for="(y) in x">
                    <img v-if="y.bat" src="../assets/bat.svg">
                    <img v-if="y.wumpus" src="../assets/wumpus.svg">
                    <img v-if="y.archer" src="../assets/player.svg">
                    <img v-if="y.hole" src="../assets/hole.svg">
                </li>
            </ul>    
        </li>
    </ul>
  </div>
</template>

<script>
import Player from '../objects/Player.js'
export default {
  /* eslint-disable */
  name: 'Game',
  /* Son las variables que se pasan como una propiedad del modulo */
  props: [
      /* Status define si se muestra o no el modulo */
      'status'
  ],
  /* Aquí se guardan las variables reactivas */
  data(){
    return {
    /*
        Esta es la matriz representa el juego
        --> Matriz es un arreglo con 6 arreglos dentro
        --> Cada uno de esos areglos contiene 6 JSON (Objetos)
        --> Cada JSON contendrá las caracteristicas de cada cuadro 
    */
      matriz: [
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      ]
    }
  },
  /* WATCH escucha si cambia alguna variable dentro de data o props */
  watch:{
      /* 
        Esta función se ejecuta si cambia status
      */
     status: function() {
         /*
            Si el status es verdadero, es decir, se ejecuta cuando el modulo se muestra
          */
        if(this.status){
        /* Se inicializan los valores default de la matriz */
            this.matriz.forEach(function(x) { // Se mueve por la mariz (x es la tupla)
                x.forEach(function(y) { //Se mueve por la tupla (y es el cuadro)
                    /* Se inicializan las propiedades del cuadro */
                    y.archer = false // Si esta el arquero
                    y.visited = false // Si el espacio actual fue visitado
                    y.wumpus = false // Si esta el wumpus
                    y.smell = false // Si Si huele a wumpus
                    y.hole = false // Si hay un hoyo
                    y.breeze = false // Si sientes una brisa 
                    y.bat = false // Si hay Murcielagos
                    y.flutter = false // Si se escucha el aleteo de los murcielagos
                })
            })
            let randX = this.randPosition()
            let randY = this.randPosition()
            /* Generar archer */
            this.matriz[randX][randY].archer = true
            var player = new Player(this, randX, randY)

            /* Generar wumpus*/
            do{
                randX = this.randPosition()
                randY = this.randPosition()
                if(!this.matriz[randX][randY].archer){ //Si no existe arquero
                    this.matriz[randX][randY].wumpus = true //Agregar wumpus
                    /* Agregar olor a wumpus en todos los ejes */
                    if(randX-1 >= 0) this.matriz[randX-1][randY].smell = true
                    if(randX+1 < this.matriz.length) this.matriz[randX+1][randY].smell = true
                    if(randY-1 >= 0) this.matriz[randX][randY-1].smell = true
                    if(randY+1 < this.matriz[0].length) this.matriz[randX][randY+1].smell = true
                }
            }while(!this.matriz[randX][randY].wumpus)
            
            /* Generar hoyos*/
            for(let i = 0; i < 4; i++){
                do{
                    randX = this.randPosition()
                    randY = this.randPosition()
                    if(!this.matriz[randX][randY].archer && !this.matriz[randX][randY].wumpus && !this.matriz[randX][randY].hole){
                        this.matriz[randX][randY].hole = true //Agregar hoyo
                        /* Se genera la brisa al rededor de los hoyos */
                        if(randX-1 >= 0) this.matriz[randX-1][randY].breeze = true
                        if(randX+1 < this.matriz.length) this.matriz[randX+1][randY].breeze = true
                        if(randY-1 >= 0) this.matriz[randX][randY-1].breeze = true
                        if(randY+1 < this.matriz[0].length) this.matriz[randX][randY+1].breeze = true
                    }
                }while(!this.matriz[randX][randY].hole)
            }

            /* Generar murcielagos*/
            for(let i = 0; i < 4; i++){
                do{
                    randX = this.randPosition()
                    randY = this.randPosition()
                    if(!this.matriz[randX][randY].archer && !this.matriz[randX][randY].wumpus && !this.matriz[randX][randY].hole && !this.matriz[randX][randY].bat){
                        this.matriz[randX][randY].bat = true // Agrega murcielago
                        /* Se genera el sonido de aleteos alrededor de los murcielagos */
                        if(randX-1 >= 0) this.matriz[randX-1][randY].flutter = true
                        if(randX+1 < this.matriz.length) this.matriz[randX+1][randY].flutter = true
                        if(randY-1 >= 0) this.matriz[randX][randY-1].flutter = true
                        if(randY+1 < this.matriz[0].length) this.matriz[randX][randY+1].flutter = true
                    }
                }while(!this.matriz[randX][randY].bat)
            }
        }
      }
  },
  methods: {
      randPosition(){
          return Math.floor(Math.random() * 10)
      }
  }
}
</script>

<style lang="scss" scoped>

*{
    list-style: none;
}

#mainMenu.true{
  display: flex;
}

#mainMenu.false{
  display: none;
}

#mainMenu{
  width: 100%;
  height: 100%;;
  max-width: 618px;
  max-height: 618px;
  background: #E5E5E5;
  border: solid 15px #5A35FE;
  >ul{
      width: 100%;
      height: 100%;
      >li{
        height: 60px;
        width: 100%;
        display: flex;
        border-top: #5A35FE solid 2px;
        &:first-child{
            border-top: 0;
        }
        >ul{
            display: flex;
            flex-direction: row;
            >li{
                height: 100%;
                width: 60px;
                display: inline-flex;
                justify-content: center;
                justify-items: center;
                align-content: center;
                align-items: center;
                border-left: #5A35FE solid 2px;
                &:first-child{
                    border-left: 0;
                }
                >img{
                    max-width: 50px;
                    max-height: 50px;
                }
            }
        }
      }
  }
}
</style>
