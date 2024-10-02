const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const canva = document.querySelector(".canva");
const diamante = document.getElementById("diamante");
const redstone = document.getElementById("redstone");

let canvasSize, boardLineWidth, circleRadius, xLineWidth;

updateCanvasResponsiveSize();

window.addEventListener('resize', () => updateCanvasResponsiveSize(true))

function updateCanvasResponsiveSize(needRedraw) {
    canvasSize = Math.min(canva.offsetWidth, canva.offsetHeight);

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    boardLineWidth = Math.round(canvasSize * 0.0265);
    diamondSize = Math.round(canvasSize * 0.157);
    redstoneSize = Math.round(canvasSize * 0.207);

    if (needRedraw) {
        redraw();
    }
}

function drawBoard() {
    ctx.beginPath();
    ctx.lineWidth = boardLineWidth;
    ctx.strokeStyle = '#ffffff70';
    // vertical
    ctx.moveTo(canvas.width / 3, 0);
    ctx.lineTo(canvas.width / 3, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = boardLineWidth / 2;
    ctx.strokeStyle = '#373737e0';
    ctx.moveTo(canvas.width / 2.9, 0);
    ctx.lineTo(canvas.width / 2.9, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = boardLineWidth;
    ctx.strokeStyle = '#ffffff70';
    ctx.moveTo(canvas.width / 1.5, 0);
    ctx.lineTo(canvas.width / 1.5, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = boardLineWidth / 2;
    ctx.strokeStyle = '#373737e0';
    ctx.moveTo(canvas.width / 1.475, 0);
    ctx.lineTo(canvas.width / 1.475, canvas.height);
    ctx.stroke();

    // horizontal
    ctx.beginPath();
    ctx.lineWidth = boardLineWidth;
    ctx.strokeStyle = '#ffffff70';
    ctx.moveTo(0, canvas.height / 3);
    ctx.lineTo(canvas.width, canvas.height / 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = boardLineWidth / 2;
    ctx.strokeStyle = '#373737e0';
    ctx.moveTo(0, canvas.height / 2.94);
    ctx.lineTo(canvas.width, canvas.height / 2.94);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = boardLineWidth;
    ctx.strokeStyle = '#ffffff70';
    ctx.moveTo(0, canvas.height / 1.5);
    ctx.lineTo(canvas.width, canvas.height / 1.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = boardLineWidth / 2;
    ctx.strokeStyle = '#373737e0';
    ctx.moveTo(0, canvas.height / 1.485);
    ctx.lineTo(canvas.width, canvas.height / 1.485);
    ctx.stroke();
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function place(player, row, collumn) {
    let yCircle
    let firstHeight
    let secondHeight
    let xCircle
    let firstWidth
    let secondWidth
    ctx.beginPath();
    ctx.lineWidth = xLineWidth;
    ctx.strokeStyle = 'black';

    if (row === 0) {
        yCircle = canvas.height / 6
    } else if (row === 1) {
        yCircle = canvas.height / 2
    } else if (row === 2) {
        yCircle = canvas.height / 1.2
    }

    if (collumn === 0) {
        xCircle = canvas.width / 6
    } else if (collumn === 1) {
        xCircle = canvas.width / 2
    } else if (collumn === 2) {
        xCircle = canvas.width / 1.206
    }

    if (player === 'o') {
        ctx.drawImage(diamante, xCircle - diamondSize / 2, yCircle - diamondSize / 2, diamondSize, diamondSize);
    } else {
        ctx.drawImage(redstone, xCircle - redstoneSize / 2, yCircle - redstoneSize / 2, redstoneSize, redstoneSize);
    }
    ctx.stroke();
}

function winningLine(direction, place) {
    ctx.beginPath();
    ctx.strokeStyle = '#37373770';
    ctx.lineWidth = boardLineWidth / 1.2;

    if (direction === 'row') {
        ctx.moveTo(0, canvas.height / place);
        ctx.lineTo(canvas.width, canvas.height / place);
    } else if (direction === 'collumn') {
        ctx.moveTo(canvas.width / place, 0);
        ctx.lineTo(canvas.width / place, canvas.height);
    } else if (direction === 'leftDiagonal') {
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
    } else {
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.height);
    }


    ctx.stroke();
}

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
