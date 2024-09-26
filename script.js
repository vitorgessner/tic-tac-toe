let matriz;
let jogadorAtual;
let jogador1;
let jogador2;
let ranking = [];

carregarStorage()
if (matriz == null) {
    resetaJogo()
}


function resetaJogo() {
    const inputX1 = document.getElementById('x1');
    const nome1 = document.getElementById('jog1').value;
    const nome2 = document.getElementById('jog2').value;

    if (!nome1) {
        alert('Jogador 1, preencha o seu nome!');
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
}


function clicouNaMatriz(x, y) {
    if (matriz[x][y] == 0) {
        return;
    }

    matriz[x][y] = jogadorAtual.simbolo;

    // TODO: Adaptar função place para receber simbolo 'x' e 'o', e o x e y como coordenadas de 0 a 2
    place(jogadorAtual.simbolo, x, y);

    const ganhador = verificaGanhou();
    if (ganhador) {
        finalizarJogo(ganhador);
    }
    jogadorAtual = jogadorAtual == jogador1 ? jogador2 : jogador1
}

function verificaGanhou() {
    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i][0] != 0 && matriz[i][0] == matriz[i][1] && matriz[i][0] == matriz[i][2]) {
            return matriz[i][0];
        }
        if (matriz[0][i] != 0 && matriz[0][i] == matriz[1][i] && matriz[0][i] == matriz[2][i]) {
            return matriz[0][i];
        }
    }
    if (matriz[0][0] != 0 && matriz[0][0] == matriz[1][1] && matriz[0][0] == matriz[2][2]) {
        return matriz[0][0];
    }
    if (matriz[0][2] != 0 && matriz[0][2] == matriz[1][1] && matriz[0][2] == matriz[2][0]) {
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

    salvarStorage()
    renderizarRanking()

}

function renderizarRanking() {
    // TODO
    const ranking = document.getElementById('Jogadores');
}

function salvarStorage() {
    localStorage.setItem('ranking', JSON.stringify(ranking));
    localStorage.setItem('jogo', JSON.stringify({ matriz, jogadorAtual, jogador1, jogador2 }));
}

function carregarStorage() {
    let dados = localStorage.getItem('jogo');
    let dadosRanking = localStorage.getItem('ranking');
    if (dados) {
        dados = JSON.parse(dados);
        matriz = dados.matriz;
        jogadorAtual = dados.jogadorAtual;
        jogador1 = dados.jogador1;
        jogador2 = dados.jogador2;
    }
    if (dadosRanking) {
        ranking = JSON.parse(dadosRanking);
    }
}

