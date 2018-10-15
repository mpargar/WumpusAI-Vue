/* eslint-disable */
// 'game' obtiene el scope del componente Game (que es un componente instanciado desde vue)
// 'x' y 'y' son las coordenadas actuales del juegador
export default function (game, _x, _y) {
    var scope = this
    var x = _x
    var y = _y
    
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

    this.action = {
        up(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x-1][y].archer = true
            x--
        },
        down(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x+1][y].archer = true
            x++
        },
        left(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x][y-1].archer = true
            y--
        },
        right(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x][y+1].archer = true
            y++
        },
        shootUp() {
            if(game.matriz[x-1][y].wumpus){
                game.matriz[x-1][y].wumpus = false
                return true
            }else{
                game.matriz[x-1][y].arrow = true
                return false
            }
        },
        shootDown(){
            if(game.matriz[x+1][y].wumpus){
                game.matriz[x+1][y].wumpus = false
                return true
            }else{
                game.matriz[x+1][y].arrow = true
                return false
            }
        },
        shootLeft(){
            if(game.matriz[x][y-1].wumpus){
                game.matriz[x][y-1].wumpus = false
                return true
            }else{
                game.matriz[x][y-1].arrow = true
                return false
            }
        },
        shootRight(){
            if(game.matriz[x][y+1].wumpus){
                game.matriz[x][y+1].wumpus = false
                return true
            }else{
                game.matriz[x][y+1].arrow = true
                return false
            }
        },
    }
}