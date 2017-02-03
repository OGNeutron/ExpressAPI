var W = 600, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS
var canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');
var colours = [
    'blue', 'darkgreen', 'red', 'navyblue', 'darkblue', 'cyan', 'purple', 'black'
]
var bombIcon = new Image();
bombIcon.src = 'img/minesweeper/fire-bomb.svg';
var flagIcon = new Image();
flagIcon.src = 'img/minesweeper/flying-flag.svg';

function modelToView(x, y) {
    //model x = 0 => view x = 0
    //model x = COLS - 1 => view x = w - BLOCK_W
    return {
        x: x * BLOCK_W,
        y: y * BLOCK_H
    }
}

function renderBomb(x, y) {
    var viewCoordinates = modelToView(x, y);

    ctx.drawImage(bombIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

function renderNumber(x, y) {
    var viewCoordinates = modelToView(x, y);

    ctx.fillStyle = colours[board[y][x] + -1];
    ctx.font = "20pt Verdana";
    var textSizeM = ctx.measureText('M'), textSizeNumber = ctx.measureText(board[y][x]);
    ctx.fillText(board[y][x], viewCoordinates.x + Math.floor(BLOCK_W / 2) - textSizeNumber.width / 2, viewCoordinates.y + Math.floor(BLOCK_H / 2) + textSizeM.width / 2)
}

function renderFlag(x, y) {
    var viewCoordinates = modelToView(x, y);

    ctx.drawImage(flagIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

function viewToModel(x, y) {
    return {
        x: Math.floor(x / BLOCK_W),
        y: Math.floor(y / BLOCK_H)
    }
}

function renderBlock(x, y) {
    var viewCoordinates = modelToView(x, y);
    if (state[y][x] == STATE_OPENED) {
        ctx.fillStyle = '#ddd';
    } else {
        ctx.fillStyle = "#999";

    }
    ctx.strokeStyle = 'block';
    ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);

    if (state[y][x] == STATE_FLAGGED) {
        renderFlag(x, y);
    }

    if (state[y][x] == STATE_OPENED) {
        switch (board[y][x]) {
            case 0:
                break;
            case BLOCK_MINE:
                renderBomb(x, y);
                break;
            //draw bomb
            default:
                renderNumber(x, y);
                break;
        }
    }
}

function render() {
    for (var y = 0; y < COLS; ++y) {
        for (x = 0; x < ROWS; ++x) {
            renderBlock(x, y);
        }
    }
}

render();