import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            const initial_game_state = Tetris.new_game();
            const initial_piece = initial_game_state.current_tetromino;
            // You'll need to implement Tetris.hold before this works.
            const final_game = Tetris.hold(
                Tetris.hard_drop(
                    Tetris.hold(initial_game_state)
                )
            );
            const final_piece = final_game.current_tetromino;
            if (!R.equals(initial_piece, final_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(
        `The Hold function can only be carried out once, not twice successively:
        In the event when a Tetris Game is running and the hold function is carried out;
        When one more Hold function is performed;
        The game state before and after the second hold is unchanged.`,
        function () {
            const initial_game_state = Tetris.hold(Tetris.new_game());
            const held_game_state = Tetris.hold(initial_game_state);

            if (!R.equals(initial_game_state, held_game_state)) {
                throw new Error(
                    `The inital and final game state do not match
                    Initial: ${JSON.stringify(initial_game_state)}
                    Final: ${JSON.stringify(held_game_state)}`
                );
            }

            // Implement the rest of this function.
        }
    );

    it(
        `If there is no held piece and a hold performed, 
        the **next tetromino** is deployed.
        Given a Tetris game where held piece field is empty 
        When we hold a piece;
        Then the current tetrimino is equal to the previous next piece
        `,
        function () {
            const initial_game_state = Tetris.new_game();
            const initial_piece = initial_game_state.current_tetromino;
            const held_game_state = Tetris.hold(initial_game_state);
            const held__current_tetromino = held_game_state.current_tetromino
            const initial__next_tetromino = initial_game_state.next_tetromino

            // You'll need to implement Tetris.hold before this works.
            //const final_piece = final_game.current_tetromino;
            if (!R.equals(held_game_state.current_tetromino, initial_game_state.next_tetromino)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(held__current_tetromino)}
                    Final:   ${JSON.stringify(initial__next_tetromino)}`
                );
            }
        }
    );
});
