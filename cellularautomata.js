class CellularAutomata{
    constructor(size, ctx, cells){ 
        this.size=size;
        this.ctx=ctx;
        this.cells= cells ? cells : [];
    }
    //patrón aleatorio
    create(){
        //false: celula muerta
        //true: celula viva
        for(let x=0; x<this.size; x++){
            let row=[]; //fila
            for(let y=0; y<this.size; y++){
                const alive= Math.random()<0.5; //si es menor a 0,5 va a ser true, sino false
                row.push(alive); //agregamos el resultado a la fila
            }
            this.cells.push(row); //agregamos la fila al vector cells (tenemos un arreglo bidimensional)
        }
    }
    next(){
        this.print();
        this.evaluate();
    }
    print(){
        this.ctx.clearRect(0,0,this.size,this.size); //borramos todos los pixeles
        for(let x=0; x<this.size; x++){
            for(let y=0; y<this.size; y++){
                if(this.cells[x][y]){ //si es true, le da un color negro, sino es blanca
                    this.ctx.fillStyle="black";
                }else{
                    this.ctx.fillStyle="white";
                }
                this.ctx.fillRect(x,y,1,1); //con esto lo pinta con el color que le pusimos 

            }
        }
    }
    evaluate(){
        let cellsAux= 
            new Array(100).fill("").map(()=> new Array(100).fill(false)) //array de 100 posiciones, con string vacio dentro, se hace un mapeo,
            // con el cual en cada elemento se hace un nuevo arreglo con 100 elementos, y cada uno va a valer false
        for(let x=0; x<this.size; x++){
            for(let y=0; y<this.size; y++){
                //REGLAS
                let livingNeighbor=0; //vecinos vivos
                // recordar que al size del vector, hay que restarle 1 por los bordes, ya que el vector empieza en 0
                //1
                if(x>0 && y>0) //si no es el pixel de la esquina superior izquierda
                if(this.cells[x-1][y-1]) //evalua si el vecino sup. izq. esta vivo
                    livingNeighbor++;  //lo suma
                //2
                if(y>0) //si el pixel no esta en la fila superior(en la primera) 
                if(this.cells[x][y-1]) //evalua si el vecino de arriba esta vivo
                    livingNeighbor++; //lo suma
                //3
                if(x<(this.size-1)&& y>0) //si no es el pixel de la esquina superior derecha
                if(this.cells[x+1][y-1]) //evalua si el vecino sup. der. esta vivo
                    livingNeighbor++; //lo suma
                //4
                if(x>0) //si el pixel no esta en la columna de la izquierda (la primera)
                if(this.cells[x-1][y]) //evalua si el vecino izquierdo esta vivo
                    livingNeighbor++; //lo suma
                //5
                if(x<(this.size-1)) //si el pixel no esta en la columna de la derecha (la ultima)
                if(this.cells[x+1][y]) //evalua si el vecino derecho esta vivo
                    livingNeighbor++; //lo suma
                //6
                if(x>0&&y<(this.size-1)) //si el pixel no esta en la esquina inferior izquierda
                if(this.cells[x-1][y+1]) //evalua si el vecino inf. izq. esta vivo
                    livingNeighbor++; //lo suma
                //7
                if(y<(this.size-1)) //si el pixel no esta en la fila inferior (la ultima)
                if(this.cells[x][y+1]) //evalua si el vecino de abajo esta vivo
                    livingNeighbor++; //lo suma
                //8
                if(x<(this.size-1)&&y<(this.size-1)) //si el pixel no es el que esta en la esquina inferior derecha
                if(this.cells[x+1][y+1]) //evalua si el vecino inf. der. esta vivo
                    livingNeighbor++;   
                
                if(this.cells[x][y]) //si la celula esta viva
                    cellsAux[x][y] = livingNeighbor == 2 || livingNeighbor ==3 ? true : false; //si la celula esta viva y tiene 2 o 3 vecinos, sigue viva, sino muere
                else
                    cellsAux[x][y] = livingNeighbor == 3 ? true : false; //si la celula esta muerta, pero tiene 3 vecinos, nace.
            }
        }
        this.cells=cellsAux;
    }
}
//patrón (aca se puede poner cualquier patron)

//patrón "Cañón planeador de Gosper"
/*const cells= new Array(100).fill("").map(()=> new Array(100).fill(false));
cells[0][4] = true;
cells[0][5] = true;
cells[1][4] = true;
cells[1][5] = true;
cells[10][4] = true;
cells[10][5] = true;
cells[10][6] = true;
cells[11][3] = true;
cells[11][7] = true;
cells[12][2] = true;
cells[12][8] = true;
cells[13][2] = true;
cells[13][8] = true;
cells[14][5] = true;
cells[15][3] = true;
cells[15][7] = true;
cells[16][4] = true;
cells[16][5] = true;
cells[16][6] = true;
cells[17][5] = true;
cells[20][2] = true;
cells[20][3] = true;
cells[20][4] = true;
cells[21][2] = true;
cells[21][3] = true;
cells[21][4] = true;
cells[22][1] = true;
cells[22][5] = true;
cells[24][0] = true;
cells[24][1] = true;
cells[24][5] = true;
cells[24][6] = true;
cells[34][2] = true;
cells[34][3] = true;
cells[35][2] = true;
cells[35][3] = true;
*/
//si no ponemos un patrón, se hace uno aleatorio
const ctx= canvas.getContext('2d'); 
//si usamos un patrón, descomentar línea 133 y comentar línea 134
//const cellularAutomata= new CellularAutomata(100,ctx,cells); 
const cellularAutomata= new CellularAutomata(100,ctx); //100 pixeles, y tambien mandamos contexto
cellularAutomata.create();
setInterval(()=> cellularAutomata.next(),1000); //cada segundo se ejecuta next
