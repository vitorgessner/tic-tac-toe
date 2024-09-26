const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.lineWidth = 30;

// borders
// ctx.moveTo(0, 0);
// ctx.lineTo(canvas.width, 0);
// ctx.lineTo(canvas.height, canvas.width);
// ctx.lineTo(0, canvas.height);
// ctx.closePath();
// ctx.stroke();

// vertical
ctx.lineWidth = 5;
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

function place(player, row, collumn) {
    let yCircle
    let move
    let line
    let xCircle
    let first
    let second
    ctx.beginPath();
    ctx.lineWidth = 10;

    if (row === 'top') {
        yCircle = canvas.height / 6
        move = canvas.height / 11.1
        line = canvas.height / 4.1
    } else if (row === 'center') {
        yCircle = canvas.height / 2
        move = canvas.height / 1.71
        line = canvas.height / 2.41
    } else if (row === 'bottom') {
        yCircle = canvas.height / 1.2
        move = canvas.height / 1.09
        line = canvas.height / 1.35
    }

    if (collumn === 'left') {
        xCircle = canvas.width / 6
        first = canvas.width / 11.1
        second = canvas.width / 3.9
    } else if (collumn === 'center') {
        xCircle = canvas.width / 2
        first = canvas.width / 1.71
        second = canvas.width / 2.41
    } else if (collumn === 'right') {
        xCircle = canvas.width / 1.206
        first = canvas.width / 1.09
        second = canvas.width / 1.35
    }

    if (player === 1) {
        ctx.strokeStyle = 'blue';
        ctx.arc(xCircle, yCircle, 50, 0, Math.PI * 2);

    } else {
        ctx.strokeStyle = 'red';
        ctx.moveTo(first, move);
        ctx.lineTo(second, line);
        ctx.moveTo(second, move);
        ctx.lineTo(first, line);
    }
    ctx.stroke();
}

ctx.beginPath();
ctx.strokeStyle = 'purple'
// horizontal cima
// ctx.moveTo(0, canvas.width / 6);
// ctx.lineTo(canvas.width, canvas.width / 6);

// horizontal meio
// ctx.moveTo(0, canvas.width / 2);
// ctx.lineTo(canvas.width, canvas.width / 2);

// horizontal baixo
// ctx.moveTo(0, canvas.width / 1.2);
// ctx.lineTo(canvas.width, canvas.width / 1.2);

// vertical esquerda
// ctx.moveTo(canvas.width / 6, 0);
// ctx.lineTo(canvas.width / 6, canvas.height);

// vertical centro
// ctx.moveTo(canvas.width / 2, 0);
// ctx.lineTo(canvas.width / 2, canvas.height);

// vertical direita
// ctx.moveTo(canvas.width / 1.2, 0);
// ctx.lineTo(canvas.width / 1.2, canvas.height);

// diagonal para direita
// ctx.moveTo(0, 0);
// ctx.lineTo(canvas.width, canvas.height);

// diagonal para esquerda
// ctx.moveTo(canvas.width, 0);
// ctx.lineTo(0, canvas.height);

ctx.stroke();

let player = 1
canvas.addEventListener('click', (e) => {
    console.log(e.offsetX)
    console.log(e.offsetY)

    if (e.offsetX < 200 && e.offsetY < 200){
        place(player, 'top', 'left');
    } else if (e.offsetX < 400 && e.offsetY < 200){
        place(player, 'top', 'center');
    } else if (e.offsetX < 600 && e.offsetY < 200){
        place(player, 'top', 'right');
    } else if (e.offsetX < 200 && e.offsetY < 400){
        place(player, 'center', 'left');
    } else if (e.offsetX < 400 && e.offsetY < 400){
        place(player, 'center', 'center');
    } else if (e.offsetX < 600 && e.offsetY < 400){
        place(player, 'center', 'right');
    } else if (e.offsetX < 200 && e.offsetY < 600){
        place(player, 'bottom', 'left');
    } else if (e.offsetX < 400 && e.offsetY < 600){
        place(player, 'bottom', 'center');
    } else if (e.offsetX < 600 && e.offsetY < 600){
        place(player, 'bottom', 'right');
    }

    player *= -1
});