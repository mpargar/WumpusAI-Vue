<!-- eslint-disable -->
<template>
  <div id="mainMenu" :class="status?'true':'false'">
    <!-- Contenedor de la cuadricula -->
    <div v-if="state" class="splashScreen">
        <h1 :class="state">{{state}}</h1>
        <h2 @click="getLog()">Descargar log</h2>
        <a id="downloadAnchorElem" style="display:none"></a>
        <button @click="button()">
            {{
                (state == 'Pause'? 'Play' : 'Play Again')
            }}
        </button>
    </div>
    <button v-if="!state" @click="state='Pause'">
        Pause
    </button>
    <ul>
        <!-- Cada tupla de la cuadricula -->
        <li v-for="(x, i) in matriz" :key="i">
            <ul>
                <!-- Cada columna -->
                <li v-for="(y, j) in x" :class=" y.visited ? 'visitado':''" :key="i+'-'+j">
                    <img v-if="y.bat" src="../assets/bat.svg">
                    <img v-if="y.wumpus" src="../assets/wumpus.svg">
                    <img v-if="y.archer" class="player" src="../assets/player.svg">
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
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
          [this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla(), this.casilla()],
      ],
      player: undefined,
      state: ''
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
            /* Generar archer */
            this.matriz[0][0].archer = true
            this.player = new Player(this, 0, 0)

            let randX
            let randY
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
        this.player.log.matriz = this.matriz /* Rellenar log de la matriz */
        this.$nextTick(function () {
            window.setInterval(() => {
                if(this.matriz[this.player.getX()][this.player.getY()].hole || this.matriz[this.player.getX()][this.player.getY()].wumpus){
                    this.state = 'Game Over'
                    console.log("Te moriste we");
                } else if(this.matriz[this.player.getX()][this.player.getY()].bat){
                    this.player.setXY(this.randPosition(), this.randPosition())
                } 
                if(!this.state){
                    this.player.nextMove()
                }
            }, 500)
        })
      }
  },
  methods: {
      getLog(){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.player.log));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", "wumpus ["+(new Date())+"].json");
        dlAnchorElem.click();
      },
      randPosition(){
          return Math.floor(Math.random() * 10)
      },
      casilla(){
          return {
            archer: false, // Si esta el arquero
            visited: false, // Si el espacio actual fue visitado
            free: false, // Si el espacio esta libre
            wumpus: false, // Si esta el wumpus
            smell: false, // Si Si huele a wumpus
            hole: false, // Si hay un hoyo
            breeze: false, // Si sientes una brisa 
            bat: false, // Si hay Murcielagos
            flutter: false // Si se escucha el aleteo de los murcielagos
          }
      },
      button(){
        if(this.state=='Pause')
            this.state=''
        else
            location.reload()
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
  position: relative;
  button{
      position: absolute;
      bottom: -30px;
      width: 648px;
      left: -15px;
  }
  .splashScreen{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.857);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    >h1{
        text-align: center;
        font-size: 160px;
    }
    >h2{
        color: #CD5D23;
        cursor: pointer;
        &:hover{
            color: rgb(251, 116, 49);
        }
    }
    .Pause{
        color: #5A35FE;
    }
    .Game{
        color: rgb(254, 53, 53);
    }
    .You{
        color: rgb(70, 254, 53);
    }
  }
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
                position: relative;
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
                .player{
                    position: absolute;
                }
            }
            .visitado{
                background: rgba(0, 0, 0, 0.258);
            }
        }
      }
  }
}
</style>
