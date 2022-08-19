import Tetris from "../common/Tetris.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;


//

let game = Tetris.new_game();

document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);



const grid = document.getElementById("grid"); // this is id // 

const next_grid = document.getElementById("grid2"); // makes a link to html elements, so html creates the grid on the website and by writing grid 2 we can access this using javascript (NEXT PIECE)

const held_grid = document.getElementById("grid3"); // makes a link to html elements, so html creates the grid on the website and by writing grid 2 we can access this using javascript (HELD PIECE)

const range = (n) => Array.from({"length": n}, (ignore, k) => k);

const dictionary = {
    "I": Tetris.I_tetromino,
    "J": Tetris.J_tetromino,
    "L": Tetris.L_tetromino,
    "O": Tetris.O_tetromino,
    "S": Tetris.S_tetromino,
    "T": Tetris.T_tetromino,
    "Z": Tetris.Z_tetromino
};

const cells = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";              //each element in cells is now a grid, with the classname, which is an identifier for the div
//cells creates grid, copy this format   //creates empty grid
    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";                 //puts cells on grid

        row.append(cell);

        return cell;                //all code above creates 2d array of the grid (elements are html divs)
    });

    grid.append(row);   //javascript array passed into html grid
    return rows;
});

const next_cells = range(2).map(function () {    //adds 2 rows to the grid
    const row = document.createElement("div");   //same thing for this but for the next piece grid
    row.className = "row";
    const rows = range(4).map(function () {    //adds 4 cells to first rwo and 4 to second row
        const cell = document.createElement("div"); //cell is teh div inside the array inside the array , row is each 1d array in the 2d array
        cell.className = "cell";
        row.append(cell);
        return cell;

    });
    next_grid.append(row);
    return rows;

})

const held_cells = range(2).map(function () {
    const row = document.createElement("div");    //same thing here but for held piece
    row.className = "row";
    const rows = range(4).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";
        row.append(cell);
        return cell;

    });
    held_grid.append(row);
    return rows;

})

const update_grid = function () {
    next_cells.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell2 = next_cells[line_index][column_index];
            cell2.className = "cell" ;
            const cell3 = held_cells[line_index][column_index]; //deletes each element in held and next piece grid each turn by changing classname back to cell
            cell3.className = "cell" ;});});
    game.field.forEach(function (line, line_index) {   //game.field is array of locked in blocks
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];  //sets each cell to the blockname of the tetromino piece for the locked in rows at the bottom
            cell.className = `cell ${block}`;
        });
    });
    if (game.held_tetromino !== null){
        dictionary[game.held_tetromino.block_type].grid.forEach(function (line, line_index) {
            line.forEach(function (block, column_index) {
                const cell2 = held_cells[line_index][column_index];  //put held tet on grid
                cell2.className = `cell ${block}`;   //held_cell array array of divs, cell2 looks at each space in the grid of divs and sets each div element classname to the blocktype
            });                                      //because it sets each div classname to the blocktype this creates the colour
        });                                            // this creates colour because in css file sets the bit after the cell.to the blocktype and in css file this changes the colour
    }
                                                        //     .cell.J
                                                        // {
                                                        //     background-color: var(--palette-secondary2);
                                                        // }

 

    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {                          //coord is equal to cordinates of a part of a tet, so one of the four blocks
            try {
                const cell = cells[coord[1]][coord[0]];             //coord1 is y comp , coordo is x comp
                cell.className = `cell current ${game.current_tetromino.block_type}`     //sets cellname iof current falling tet to blocktype name
            } catch (ignore) {

            }
        }
    );       //while its falling, it puts it on the grid and this is called every 0.5 seconds and sets the current coord to the new oord as soft drop is called every 0.5
 
    game.next_tetromino.grid.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {     ///same thing as code above still gets called every 0.5 but uts puts cells on grid
            const cell2 = next_cells[line_index][column_index];
            cell2.className = `cell ${block}`;   //changes cells classname to new classname, that creates color on html

        });
    });
};

// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function () {
    key_locked = false;
};

document.body.onkeydown = function (event) {
    if (!key_locked && event.key === "ArrowUp") {
        key_locked = true;
        game = Tetris.rotate_ccw(game);
    }
    if (event.key === "ArrowDown") {
        game = Tetris.soft_drop(game);

        // listen to c in same way, instead listen 
        //for c and call tetris.hold(_)
    }
    if (event.key === "ArrowLeft") {
        game = Tetris.left(game);
    }
    if (event.key === "ArrowRight") {
        game = Tetris.right(game);     //listens to key pressed 
    }
    if (event.key === " ") {
        game = Tetris.hard_drop(game);
    }
    if (event.key === "c") {
        game = Tetris.hold(game);
    }
    update_grid();
};

const timer_function = function () {
    game = Tetris.next_turn(game);
    update_grid();
    setTimeout(timer_function, 500); //refrshes every 0.5
};

setTimeout(timer_function, 500);

update_grid();
