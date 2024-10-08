let matriz;
let jogadorAtual;
let jogador1;
let jogador2;
let ranking = [];

const currentPlayer = document.querySelector(".currentPlayer")


carregarStorage();
drawBoard();
renderizarRanking();

if (!matriz || verificaGanhou()) {
    trancaCanvas();
} else {
    trancaTopBar();

}

if (matriz == null) {
    resetaJogo()
}


function resetaJogo() {
    const inputX1 = document.getElementById('x1');
    const nome1 = document.getElementById('jog1').value;
    const nome2 = document.getElementById('jog2').value;




    if (!nome1) {
        return;
    }
    if (!nome2) {
        return;
    }

    matriz = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    jogador1 = {
        nome: nome1,
        simbolo: inputX1.checked ? 'x' : 'o',
    };
    jogador2 = {
        nome: nome2,
        simbolo: inputX1.checked ? 'o' : 'x',
    };
    jogadorAtual = jogador1.simbolo == 'o' ? jogador1 : jogador2;

    currentPlayer.style.display = 'block'
    currentPlayer.innerHTML = `É a vez de <span class="${jogadorAtual == jogador1 ? 'player1' : 'player2'}">${jogadorAtual.nome}<span/>`

    clearBoard();
    drawBoard();
    destrancaCanvas();
}


function clicouNaMatriz(x, y) {

    if (!matriz || matriz[x][y] !== 0) {
        return;
    }

    matriz[x][y] = jogadorAtual.simbolo;

    place(jogadorAtual.simbolo, x, y);

    const ganhador = verificaGanhou();
    if (ganhador) {
        finalizarJogo(ganhador);
    }

    jogadorAtual = jogadorAtual == jogador1 ? jogador2 : jogador1

    currentPlayer.innerHTML = `É a vez de <span class="${jogadorAtual == jogador1 ? 'player1' : 'player2'}">${jogadorAtual.nome}</span>`

    salvarStorage();
}

function verificaGanhou() {
    let line;
    for (let i = 0; i < matriz.length; i++) {
        switch (i) {
            case 0:
                line = 6
                break;
            case 1:
                line = 2
                break;
            case 2:
                line = 1.207
                break;
        }
        if (matriz[i][0] != 0 && matriz[i][0] == matriz[i][1] && matriz[i][0] == matriz[i][2]) {
            winningLine('row', line);
            return matriz[i][0];
        }
        if (matriz[0][i] != 0 && matriz[0][i] == matriz[1][i] && matriz[0][i] == matriz[2][i]) {
            winningLine('collumn', line)
            return matriz[0][i];
        }
    }
    if (matriz[0][0] != 0 && matriz[0][0] == matriz[1][1] && matriz[0][0] == matriz[2][2]) {
        winningLine('leftDiagonal');
        return matriz[0][0];
    }
    if (matriz[0][2] != 0 && matriz[0][2] == matriz[1][1] && matriz[0][2] == matriz[2][0]) {
        winningLine();
        return matriz[0][2];
    }
    const empate = matriz.every(
        (matrizY) => matrizY.every(symbol => symbol != 0)
    );

    if (empate) {
        return 'empate';
    }
}

function finalizarJogo(ganhador) {
    const ganhadores = ganhador == 'empate' ? [jogador1, jogador2] : [jogadorAtual]

    for (let ganhadorAtual of ganhadores) {
        let jogador = ranking.find(jogador => jogador.nome == ganhadorAtual.nome)
        if (jogador == null) {
            jogador = { ...ganhadorAtual }
            ranking.push(jogador)
        }
        if (jogador.pontos) {
            jogador.pontos++
        } else {
            jogador.pontos = 1
        }
    }

    ranking = ranking.sort((a, b) => a.pontos < b.pontos ? 1 : -1)


    const modal = document.querySelector("#myModal");
    const modalClose = document.querySelector(".close")
    const modalMessage = document.querySelector(".message")

    modal.style.display = 'block'

    modalMessage.innerHTML = ganhadores.length > 1 ? `O jogo terminou empatado!` : `Parabéns, <span class="${jogadorAtual == jogador1 ? 'player1' : 'player2'}">${jogadorAtual.nome}</span>! Você venceu!`
    modalClose.addEventListener('click', () => modal.style.display = 'none')
    window.addEventListener('click', (evento) => {
        if (evento.target == modal) {
            modal.style.display = 'none'
        }
    })

    salvarStorage()
    renderizarRanking()
    liberaInputs();
    trancaCanvas();

    document.getElementById("jogar").removeAttribute("disabled", "")
}



function renderizarRanking() {
    let jogadores = document.getElementById('jogadores');
    jogadores.innerHTML = "";

    for (let i = 0; i < ranking.length; i++) {
        let li = document.createElement("li");
        li.classList.add("enchanting");
        li.innerHTML = `<div><img src="./images/xp.png" width="20px"> <span class="xp sm">${i + 1}</span> ${ranking[i].nome}:</div> <span class="xp">${ranking[i].pontos}</span>`
        jogadores.appendChild(li)
    }
}

function salvarStorage() {
    localStorage.setItem('ranking', JSON.stringify(ranking));
    localStorage.setItem('jogo', JSON.stringify({ matriz, nomeJogadorAtual: jogadorAtual.nome, jogador1, jogador2 }));
}

function carregarStorage() {
    let dados = localStorage.getItem('jogo');
    let dadosRanking = localStorage.getItem('ranking');
    if (dados) {
        dados = JSON.parse(dados);
        matriz = dados.matriz;
        jogador1 = dados.jogador1;
        jogador2 = dados.jogador2;
        jogadorAtual = jogador1.nome == dados.nomeJogadorAtual ? jogador1 : jogador2;

        // Redesenhando no jogo os dados antes de serem fechados
        redraw()

        // Repondo nome dos jogadores
        document.getElementById("jog1").value = jogador1.nome;
        document.getElementById("jog2").value = jogador2.nome;
    }
    if (dadosRanking) {
        ranking = JSON.parse(dadosRanking);
    }
    currentPlayer.style.display = 'block'
    currentPlayer.innerHTML = `É a vez do <span class="${jogadorAtual == jogador1 ? 'player1' : 'player2'}">${jogadorAtual.nome}</span>`
}

function redraw() {
    drawBoard();
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {
            if (matriz[i][j] !== 0) {
                matriz[i][j] == 'x' ? place('x', i, j) : place('o', i, j);
            }
        }
    }
    verificaGanhou();
}