const inputsRadio = document.querySelectorAll(".inputs")
const simbolos1 = document.querySelectorAll('[name=simbolo]')
const simbolos2 = document.querySelectorAll('[name=simbolo2]')
const campoJogadores = document.querySelectorAll('input[type=text]')
const erro = document.querySelectorAll(".erro")
const botao = document.querySelector("#jogar")

inputsRadio[0].addEventListener("change", () => {
    if (simbolos1[0].checked === true) {
        simbolos2[1].checked = true;
    } else if (simbolos1[1].checked === true) {
        simbolos2[0].checked = true;
    }
})

inputsRadio[1].addEventListener("change", () => {
    if (simbolos2[0].checked === true) {
        simbolos1[1].checked = true;
    } else if (simbolos2[1].checked === true) {
        simbolos1[0].checked = true;
    }
})

botao.addEventListener("click", () => {
    document.getElementById("jogar").setAttribute("disabled", "")
    for (let i = 0; i < campoJogadores.length; i++) {
        if (campoJogadores[i].value === "") {
            erro[i].textContent = "Precisa de nome";
            erro[i].style.display = "block";
        } else if (campoJogadores[0].value === campoJogadores[1].value) {
            erro[i].style.display = "block";
            erro[i].textContent = "Nomes precisam ser diferentes";
        } else {
            erro[i].style.display = "none";
            campoJogadores[i].setAttribute("disabled", "")

            for (radio of simbolos1) {
                radio.setAttribute("disabled", "")
            }
            for (radio of simbolos2) {
                radio.setAttribute("disabled", "")
            }
            resetaJogo();
        }
    }
})

function liberaInputs() {
    for (campo of campoJogadores){
        campo.removeAttribute("disabled");
    }

    for (radio of simbolos1) {
        radio.removeAttribute("disabled")
    }
    for (radio of simbolos2) {
        radio.removeAttribute("disabled")
    }
}

function trancaTopBar(){
    document.getElementById("jogar").setAttribute("disabled", "");
    let inputsJogador = document.querySelectorAll('[id^=jog]')
    let inputsRadio = document.querySelectorAll("[name^=simbolo]")

    for (input of inputsJogador){
        input.setAttribute("disabled", "");
    }

    for (input of inputsRadio){
        input.setAttribute("disabled", "");
    }
}