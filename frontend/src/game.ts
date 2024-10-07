type Player = 'x' | 'o';
type Cell = 'x'|'o'|'';
type Board = [Cell,Cell,Cell,Cell,Cell,Cell,Cell,Cell,Cell];
type winState = 'win' | 'tie' | 'undecided';
export type boardIdx = 0|1|2|3|4|5|6|7|8;
type VictoryPattern = [boardIdx, boardIdx, boardIdx];

export type Game = {
    currPlayer: Player,
    boardState: Board,
    winState: winState,
    players:string[],
};


const victoryPatterns: VictoryPattern[] = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

function getWinState(board:Board): winState {
    let isWin:boolean = false;

    victoryPatterns.forEach(pattern => {
        if(board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]){
            isWin = true;
        }

    });

    if (isWin){
        return 'win';
    }


    if(board.every(cell=>cell !== '')){
        return 'tie';
    }

    return 'undecided';

}


export function move(game:Game, movePos:boardIdx):Game{
    if (game.boardState[movePos] !== ''){
        return game;
    };

    const boardState = [...game.boardState] as Board;

    boardState[movePos]  = game.currPlayer;

    const winState = getWinState(boardState);

    const currPlayer = game.currPlayer === 'x'?'o':'x';
    const players = game.players;
    return {currPlayer, boardState, winState, players};
};









