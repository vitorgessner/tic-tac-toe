const testes = document.querySelectorAll(".teste")
const simbolos1 = document.querySelectorAll('[name=simbolo]')
const simbolos2 = document.querySelectorAll('[name=simbolo2]')
const campoJogadores = document.querySelectorAll('input[type=text]')
const botao = document.querySelector("#jogar")

console.log(campoJogadores)

testes[0].addEventListener("change", () => {
    if (simbolos1[0].checked === true) {
        simbolos2[1].checked = true;
    } else if (simbolos1[1].checked === true) {
        simbolos2[0].checked = true;
    }
})

testes[2].addEventListener("change", () => {
    if (simbolos2[0].checked === true) {
        simbolos1[1].checked = true;
    } else if (simbolos2[1].checked === true) {
        simbolos1[0].checked = true;
    }
})

botao.addEventListener("click", () => {
    for (campo of campoJogadores){
        campo.setAttribute("disabled", "")
    }

    for (radio of simbolos1){
        radio.setAttribute("disabled", "")
    }
    for (radio of simbolos2){
        radio.setAttribute("disabled", "")
    }
})
