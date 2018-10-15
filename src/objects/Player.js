/* eslint-disable */
// 'game' obtiene el scope del componente Game (que es un componente instanciado desde vue)
// 'x' y 'y' son las coordenadas actuales del juegador
export default function (game, _x, _y) {
    this.x = _x
    this.y = _y
    
    this.nextMove = function(){
        /*
            Revisar estatus actual
            --> Revisar por el wumpus para disparar
            --> Revisar por peligros para el movimiento
                -Se debe de definir un algoritmo apra definir el barrido
                - Regresar y buscar una mejor ruta
                - El movimiento debe de definir un barrido para ubicar al wumpus
        */
    }
    this.desiciones = {

    }
}