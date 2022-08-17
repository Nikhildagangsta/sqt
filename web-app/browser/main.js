import Tetris from "../common/Tetris.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;


//

let game = Tetris.new_game();

document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);



const grid = document.getElementById("grid"); // this is id

const grid2 = document.getElementById("grid2"); // this is id //

const range = (n) => Array.from({"length": n}, (ignore, k) => k);

const cells = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";
//cells creates grid, copy this format
    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";

        row.append(cell);

        return cell;
    });

    grid.append(row);
    return rows;
});

const cells2 = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";
    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";
        row.append(cell);
        return cell;

    });
    grid2.append(row);
    return rows;

})

const update_grid = function () {
    cells2.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell2 = cells2[line_index][column_index];
            cell2.className = "cell" ;});});
    game.field.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];
            cell.className = `cell ${block}`;
            //const cell2 = cells2[line_index][column_index];
           // cell2.className = `cell ${block}`;
        });
    });
    try {
        if (game.held_tetromino.grid !== null){
            game.held_tetromino.grid.forEach(function (line, line_index) {
                line.forEach(function (block, column_index) {
                    const cell2 = cells2[line_index + 4][column_index + 4];
                    cell2.className = `cell ${block}`;
                });
            });
        }
      }
      catch(ignore) {

      }


    //         //loooks at grid of next tetrimno loks at grid of short array
    //         //e.g 3x2 tetromino array
    //         // change line 69 (maybe 68 or 67) to have it so it gets displayed lower down on the board

    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell current ${game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );

    
    game.next_tetromino.grid.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell2 = cells2[line_index][column_index];
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
        game = Tetris.right(game);
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
    setTimeout(timer_function, 500);
};

setTimeout(timer_function, 500);

update_grid();
