/* eslint-disable */
// 'game' obtiene el scope del componente Game (que es un componente instanciado desde vue)
// 'x' y 'y' son las coordenadas actuales del juegador
export default function (game, _x, _y) {
    /* var scope = this */
    var x = _x
    var y = _y


    this.nextMove = function () {
        /********************
        ** Si huele a wumpus
        *********************/
        if(game.matriz[x][y].smell){ 
             /* Si la casilla existe y no se ha disparado ahi ni es un lugar visitado */
            if(x-1 >= 0 && !game.matriz[x - 1][y].arrow && !game.matriz[x - 1][y].visited) {
                this.action.shootUp()
            } else if (x + 1 < game.matriz.length && !game.matriz[x + 1][y].arrow && !game.matriz[x + 1][y].visited) {
                this.action.shootDown()
            } else if (y - 1 >= 0 && !game.matriz[x][y - 1].arrow && !game.matriz[x][y - 1].visited) {
                this.action.shootLeft()
            } else if (y + 1 < game.matriz.length && !game.matriz[x][y + 1].arrow && !game.matriz[x][y + 1].visited) {
                this.action.shootRight()
            }
        /********************
        ** Si hay peligro 
        ********************/
        }else if(game.matriz[x][y].breeze || game.matriz[x][y].flutter) { // Si Hay un peligro
            //No visitados y libres
            if (y + 1 < game.matriz.length && !game.matriz[x][y + 1].visited && game.matriz[x][y + 1].free) {
                this.action.right()
            } else if (y - 1 >= 0 && !game.matriz[x][y - 1].visited && game.matriz[x][y - 1].free) {
                this.action.left()
            } else if (x + 1 < game.matriz.length && !game.matriz[x + 1][y].visited && game.matriz[x + 1][y].free) {
                this.action.down()
            } else if (x - 1 >= 0 && !game.matriz[x - 1][y].visited && game.matriz[x - 1][y].free) {
                this.action.up()
            }
            /* Busca espacios libres */
            else if (y + 1 < game.matriz.length && game.matriz[x][y + 1].free) {
                this.action.right()
            } else if (y - 1 >= 0 && game.matriz[x][y - 1].free) {
                this.action.left()
            } else if (x + 1 < game.matriz.length && game.matriz[x + 1][y].free) {
                this.action.down()
            } else if (x - 1 >= 0 && game.matriz[x - 1][y].free) {
                this.action.up()
            }
            /* Busca espacios no visitados */
            else if (y + 1 < game.matriz.length && game.matriz[x][y + 1].visited) {
                this.action.right()
            } else if (y - 1 >= 0 && game.matriz[x][y - 1].visited) {
                this.action.left()
            } else if (x + 1 < game.matriz.length && game.matriz[x + 1][y].visited) {
                this.action.down()
            } else if (x - 1 >= 0 && game.matriz[x - 1][y].visited) {
                this.action.up()
            }
        }else{
        /***********************
        ** Si todo anda al cien 
        ***********************/
            if(y + 1 < game.matriz.length  && !game.matriz[x][y+1].visited){
                this.action.right()
            } else if (y - 1 >= 0 && !game.matriz[x][y - 1].visited){
                this.action.left()
            } else if (x + 1 < game.matriz.length && !game.matriz[x + 1][y].visited) {
                this.action.down()
            } else if (x - 1 >= 0 && !game.matriz[x - 1][y].visited) {
                this.action.up()
            }
            /* Busca espacios libres */
            else if (y + 1 < game.matriz.length && game.matriz[x][y + 1].free) {
                this.action.right()
            } else if (y - 1 >= 0 && game.matriz[x][y - 1].free) {
                this.action.left()
            } else if (x + 1 < game.matriz.length && game.matriz[x + 1][y].free) {
                this.action.down()
            } else if (x - 1 >= 0 && game.matriz[x - 1][y].free) {
                this.action.up()
            }
        }
    }

    this.action = {
        up(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x][y].free = true
            if(!game.matriz[x][y].flutter && !game.matriz[x][y].breeze){
                if(x + 1 < game.matriz.length) game.matriz[x + 1][y].free = true
                if(x - 1 >= 0) game.matriz[x - 1][y].free = true
                if(y + 1 < game.matriz.length) game.matriz[x][y + 1].free = true
                if(y - 1 >= 0) game.matriz[x][y - 1].free = true
            }
            game.matriz[x-1][y].archer = true
            x--
        },
        down(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x][y].free = true
            if(!game.matriz[x][y].flutter && !game.matriz[x][y].breeze){
                if(x + 1 < game.matriz.length) game.matriz[x + 1][y].free = true
                if(x - 1 >= 0) game.matriz[x - 1][y].free = true
                if(y + 1 < game.matriz.length) game.matriz[x][y + 1].free = true
                if(y - 1 >= 0) game.matriz[x][y - 1].free = true
            }
            game.matriz[x+1][y].archer = true
            x++
        },
        left(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x][y].free = true
            if(!game.matriz[x][y].flutter && !game.matriz[x][y].breeze){
                if(x + 1 < game.matriz.length) game.matriz[x + 1][y].free = true
                if(x - 1 >= 0) game.matriz[x - 1][y].free = true
                if(y + 1 < game.matriz.length) game.matriz[x][y + 1].free = true
                if(y - 1 >= 0) game.matriz[x][y - 1].free = true
            }
            game.matriz[x][y-1].archer = true
            y--
        },
        right(){
            game.matriz[x][y].archer = false
            game.matriz[x][y].visited = true
            game.matriz[x][y].free = true
            if(!game.matriz[x][y].flutter && !game.matriz[x][y].breeze){
                if(x + 1 < game.matriz.length) game.matriz[x + 1][y].free = true
                if(x - 1 >= 0) game.matriz[x - 1][y].free = true
                if(y + 1 < game.matriz.length) game.matriz[x][y + 1].free = true
                if(y - 1 >= 0) game.matriz[x][y - 1].free = true
            }
            game.matriz[x][y+1].archer = true
            y++
        },
        shootUp() {
            if(game.matriz[x-1][y].wumpus){
                game.matriz[x-1][y].wumpus = false
                location.reload();
            }else{
                game.matriz[x-1][y].arrow = true
                return false
            }
        },
        shootDown(){
            if(game.matriz[x+1][y].wumpus){
                game.matriz[x+1][y].wumpus = false
                location.reload();
            }else{
                game.matriz[x+1][y].arrow = true
                return false
            }
        },
        shootLeft(){
            if(game.matriz[x][y-1].wumpus){
                game.matriz[x][y-1].wumpus = false
                location.reload();
            }else{
                game.matriz[x][y-1].arrow = true
                return false
            }
        },
        shootRight(){
            if(game.matriz[x][y+1].wumpus){
                game.matriz[x][y+1].wumpus = false
                location.reload();
            }else{
                game.matriz[x][y+1].arrow = true
                return false
            }
        },
    }
}