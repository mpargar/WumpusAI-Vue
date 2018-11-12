/* eslint-disable */
// 'game' obtiene el scope del componente Game (que es un componente instanciado desde vue)
// 'x' y 'y' son las coordenadas actuales del juegador
export default function (game, _x, _y) {
    /* var scope = this */
    var x = _x
    var y = _y
    /* Guarda el camino  */
    var way = []
    var lastWays = []
    this.working = false
    this.alive = true

    this.getX = function () {
        return x
    }

    this.getY = function () {
        return y
    }

    this.nextMove = function () {
        if(!this.working){
            this.working = true
            if(way.length){
                this.action[way[0]]()
                way.shift()
            }else{
                maping()
                console.log('Siguiente movimiento(s) --> ', way);                
            }
        }
        this.working = false
    }

    /* Generar el mapa de movimientos */
    var maping = () => {
        let moveFound = false
        /* Hay wumpus */
        if(game.matriz[x][y].smell){
            console.log('Hay un wumpus! Preparandose para disparar');
            if (y - 1 >= 0) way.push('shootLeft')
            if (y + 1 < game.matriz.length) way.push('shootRight')
            if (x - 1 >= 0) way.push('shootUp')
            if (x + 1 < game.matriz.length) way.push('shootDown')
            moveFound = true
        /* No hay peligros */   
        }else if (!game.matriz[x][y].breeze && !game.matriz[x][y].flutter){
            console.log('No hay peligros, preparando movimiento');
            /* Salvar alrededores */
            game.matriz[x][y].free = true
            if(x + 1 < game.matriz.length) game.matriz[x + 1][y].free = true
            if(x - 1 >= 0) game.matriz[x - 1][y].free = true
            if(y + 1 < game.matriz.length) game.matriz[x][y + 1].free = true
            if(y - 1 >= 0) game.matriz[x][y - 1].free = true
            /* Verificar por visitados */
            if (y - 1 >= 0 && !game.matriz[x][y-1].visited) {
                way.push('left')
                lastWays.push('right')
                moveFound = true
            } else if (y + 1 < game.matriz.length && !game.matriz[x][y+1].visited) {
                way.push('right')
                lastWays.push('left')
                moveFound = true
            } else if (x - 1 >= 0 && !game.matriz[x-1][y].visited) {
                way.push('up')
                lastWays.push('down')
                moveFound = true
            } else if (x + 1 < game.matriz.length && !game.matriz[x+1][y].visited) {
                way.push('down')
                lastWays.push('up')
                moveFound = true
            }
        /* Si hay algun peligro */
        }else {
            console.log('Hay peligros! preparando movimiento seguro');
            /* Si esta la bandera de no peligro y no ha sido visitado*/
            if (y - 1 >= 0 && !game.matriz[x][y-1].visited && game.matriz[x][y-1].free) {
                way.push('left')
                lastWays.push('right')
                moveFound = true
            } else if (y + 1 < game.matriz.length && !game.matriz[x][y+1].visited && game.matriz[x][y+1].free) {
                way.push('right')
                lastWays.push('left')
                moveFound = true
            } else if (x - 1 >= 0 && !game.matriz[x-1][y].visited && game.matriz[x-1][y].free) {
                way.push('up')
                lastWays.push('down')
                moveFound = true
            } else if (x + 1 < game.matriz.length && !game.matriz[x+1][y].visited && game.matriz[x+1][y].free) {
                way.push('down')
                lastWays.push('up')
                moveFound = true
            }
        }
        if(!moveFound){
            if (lastWays.length) {
                console.log('No se ha encontrado un movimiento seguro, rebobinando');
                way.push(lastWays.pop())
            } else {
                console.log('No se ha encontrado un movimiento seguro, no se puede rebobinar. Lanzando dado');
                let rand = Math.floor(Math.random()*(3 - 0 + 1)) + 0
                switch (rand) {
                    case 0:
                        if (y - 1 >= 0) way.push('left')
                        break;
                    case 1:
                        if (y + 1 < game.matriz.length) way.push('right')
                        break;
                    case 2:
                        if (x - 1 >= 0) way.push('up')
                        break;
                    case 3:
                        if (x + 1 < game.matriz.length) way.push('down')
                        break;
                }
            }
        }
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