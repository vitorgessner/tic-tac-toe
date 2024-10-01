const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const canva = document.querySelector(".canva");

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
    xLineWidth = Math.round(canvasSize * 0.0177);
    circleRadius = Math.round(canvasSize * 0.0886);

    if(needRedraw) {
        redraw();
    }
}

function drawBoard() {
    ctx.beginPath();
    ctx.lineWidth = boardLineWidth;
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
        firstHeight = canvas.height / 12
        secondHeight = canvas.height / 4.1
    } else if (row === 1) {
        yCircle = canvas.height / 2
        firstHeight = canvas.height / 1.75
        secondHeight = canvas.height / 2.35
    } else if (row === 2) {
        yCircle = canvas.height / 1.2
        firstHeight = canvas.height / 1.1
        secondHeight = canvas.height / 1.32
    }

    if (collumn === 0) {
        xCircle = canvas.width / 6
        firstWidth = canvas.width / 9
        secondWidth = canvas.width / 4.5
    } else if (collumn === 1) {
        xCircle = canvas.width / 2
        firstWidth = canvas.width / 1.8
        secondWidth = canvas.width / 2.25
    } else if (collumn === 2) {
        xCircle = canvas.width / 1.206
        firstWidth = canvas.width / 1.13
        secondWidth = canvas.width / 1.29
    }

    if (player === 'o') {
        ctx.arc(xCircle, yCircle, circleRadius, 0, Math.PI * 2);
    } else {
        ctx.moveTo(firstWidth, firstHeight);
        ctx.lineTo(secondWidth, secondHeight);
        ctx.moveTo(secondWidth, firstHeight);
        ctx.lineTo(firstWidth, secondHeight);
    }
    ctx.stroke();
}

function winningLine(direction, place) {
    ctx.beginPath();
    ctx.strokeStyle = 'purple'
    ctx.lineWidth = boardLineWidth;

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

