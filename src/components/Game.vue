<!-- eslint-disable -->
<template>
  <div id="mainMenu" :class="status?'true':'false'">
    <!-- Contenedor de la cuadricula -->
    <ul>
        <!-- Cada tupla de la cuadricula -->
        <li v-for="(r) in matriz">
            <ul>
                <!-- Cada columna -->
                <li v-for="(c) in r">
                    {{ c.name }}
                </li>
            </ul>    
        </li>
    </ul>
  </div>
</template>

<script>
export default {
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
  /* Se ejecuta cuando se crea el modulo Game, antes de ser montado */
  created(){
    /* Se inicializan los valores default de la matriz */
    this.matriz.forEach(function(x) {
        x.forEach(function(y) {
            y.archer = false // Si esta el arquero
            y.wumpus = false // Si esta el wumpus
            y.smell = false // Si Si huele a wumpus
            y.hole = false // Si hay un hoyo
            y.breeze = false // Si sientes una brisa 
            y.bat = false // Si hay Murcielagos
            y.flutter = false // Si se escucha el aleteo de los murcielagos
        })
    })
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
              this.matriz.forEach(function(x, xi) {
                  x.forEach(function(y, yi) {
                      y.name = xi + " " + yi
                  })
              })
          }
      }
  },
  mounted(){
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
            }
        }
      }
  }
}
</style>
