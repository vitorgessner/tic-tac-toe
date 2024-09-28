const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let canva = document.querySelector(".canva");

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

function drawBoard() {
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'black';

    // vertical
    ctx.moveTo(canvas.width / 3, 0);
    ctx.lineTo(canvas.width / 3, canvas.height);
    ctx.moveTo(canvas.width / 1.5, 0);
    ctx.lineTo(canvas.width / 1.5, canvas.height);

    // horizontal
    ctx.moveTo(0, canvas.height / 3);
    ctx.lineTo(canvas.width, canvas.height / 3);
    ctx.moveTo(0, canvas.height / 1.5);
    ctx.lineTo(canvas.width, canvas.height / 1.5);
    ctx.stroke();
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function place(player, row, collumn) {
    let yCircle
    let move
    let line
    let xCircle
    let first
    let second
    ctx.beginPath();
    ctx.lineWidth = 10;

    if (row === 0) {
        yCircle = canvas.height / 6
        move = canvas.height / 12
        line = canvas.height / 4.1
    } else if (row === 1) {
        yCircle = canvas.height / 2
        move = canvas.height / 1.75
        line = canvas.height / 2.35
    } else if (row === 2) {
        yCircle = canvas.height / 1.2
        move = canvas.height / 1.1
        line = canvas.height / 1.32
    }

    if (collumn === 0) {
        xCircle = canvas.width / 6
        first = canvas.width / 9
        second = canvas.width / 4.5
    } else if (collumn === 1) {
        xCircle = canvas.width / 2
        first = canvas.width / 1.8
        second = canvas.width / 2.25
    } else if (collumn === 2) {
        xCircle = canvas.width / 1.206
        first = canvas.width / 1.13
        second = canvas.width / 1.29
    }

    if (player === 'o') {
        ctx.strokeStyle = 'black';
        ctx.arc(xCircle, yCircle, 50, 0, Math.PI * 2);

    } else {
        ctx.strokeStyle = 'black';
        ctx.moveTo(first, move);
        ctx.lineTo(second, line);
        ctx.moveTo(second, move);
        ctx.lineTo(first, line);
    }
    ctx.stroke();
}

function winningLine(direction, place) {
    ctx.beginPath();
    ctx.strokeStyle = 'purple'
    ctx.lineWidth = 15;

    if (direction === 'row') {
        ctx.moveTo(0, canvas.height / place);
        ctx.lineTo(canvas.width, canvas.height / place);
    } else if (direction === 'collumn') {
        ctx.moveTo(canvas.width / place, 0);
        ctx.lineTo(canvas.width / place, canvas.height);
    } else if (direction === 'leftDiagonal') {
        ctx.moveTo(30, 20);
        ctx.lineTo(canvas.width - 30, canvas.height - 20);
    } else {
        ctx.moveTo(canvas.width - 30, 20);
        ctx.lineTo(0 + 30, canvas.height - 20);
    }


    ctx.stroke();
}

// diagonal para direita


// diagonal para esquerda


canvas.addEventListener('click', (e, x, y) => {
    if (canva.hasAttribute("disabled")) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        document.getElementById("jogar").setAttribute("disabled", "")
        x = e.offsetX;
        y = e.offsetY;
        if (x < canvas.width / 3 && y < canvas.height / 3) {
            clicouNaMatriz(0, 0);
        } else if (x < canvas.width / 1.5 && y < canvas.height / 3) {
            clicouNaMatriz(0, 1);
        } else if (x < canvas.width && y < canvas.height / 3) {
            clicouNaMatriz(0, 2);
        } else if (x < canvas.width / 3 && y < canvas.height / 1.5) {
            clicouNaMatriz(1, 0);
        } else if (x < canvas.width / 1.5 && y < canvas.height / 1.5) {
            clicouNaMatriz(1, 1);
        } else if (x < canvas.width && y < canvas.height / 1.5) {
            clicouNaMatriz(1, 2);
        } else if (x < canvas.width / 3 && y < canvas.height) {
            clicouNaMatriz(2, 0);
        } else if (x < canvas.width / 1.5 && y < canvas.height) {
            clicouNaMatriz(2, 1);
        } else if (x < canvas.width && y < canvas.height) {
            clicouNaMatriz(2, 2);
        }
    }
});

function trancaCanvas() {
    canva.setAttribute("disabled", "");
    canva.classList.add("noCursor");
}

function destrancaCanvas() {
    canva.removeAttribute("disabled");
    canva.classList.remove("noCursor");
}

