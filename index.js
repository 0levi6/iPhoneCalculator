//DECLARAÇÃO DE VARIÁVEIS

let operadorOn = false; 
let operadorValue = "";
let resultadoOn = false;

let displayAtual = [];

//Função que transforma o que foi digitado em tela em uma única String.
let displayText = () => displayAtual.join('');

let operacaoGeral = [];

//Funcão que transforma os elementos da operação em uma única String.
let operacaoGeralText = () => operacaoGeral.join('');

let resultadoGeral = "";

const btnMais = document.querySelector("#mais");
const btnMenos = document.querySelector("#menos");
const btnVezes = document.querySelector("#vezes");
const btnDivisao = document.querySelector("#divisao");

//---------------------------------------------------------------------------------
//DECLARAÇÃO DAS FUNÇÕES


//Zera o display e muda o texto do botão 'AC' para 'C'.
const zerarTela = () => {
    displayAtual = ["0"];
    operacaoGeral = [];
    document.querySelector("div.display").innerText = displayText();
    document.querySelector("input#zerador").value = "C";
}

//Inverte o sinal do número digitado.
const trocarSinal = () => {
    if (displayAtual[0] == "-") {
        displayAtual.shift();
    } else {
        displayAtual.unshift("-");
    };
    document.querySelector("div.display").innerText = displayText();
};

//Função principal para digitação da calculadora.
const escreveNaTela = (value) => {
    if (displayAtual[0] == "0") {
        displayAtual = [];
    } else if (displayAtual[0] == ".") {
        displayAtual = ["0."]
    } else if (operadorOn === true && resultadoOn == false) {
        guardaNumero();
        displayAtual = [];
    } else if (operadorOn === true && resultadoOn == true) {
        guardaNumero();
        displayAtual = [];
    } else if (operadorOn === false && resultadoOn == true) {
        operacaoGeral = [];
        displayAtual = [];
    };

    //Muda o texto do botão 'C' para 'AC';
    document.querySelector("input#zerador").value = "AC";

    //Chama a funcção que muda a cor do botão de operador selecionado.
    mudaCorBotao(operadorValue);

    //Zera as seguintes variáveis globais.
    operadorOn = false;
    resultadoOn = false;
    operadorValue = "";

    //Insere o valor digitado no array.
    displayAtual.push(value);

    //Atualiza o display mostrando os números digitados.
    document.querySelector("div.display").innerText = displayText();
};

//Função que indica que operação será realizada.
const realizaOperacao = (value) => {
    if (operadorOn === true) {
        mudaCorBotao()
    }
    operadorOn = true;
    operadorValue = value;
    mudaCorBotao();
};

//Muda a cor do botão operador selecionado.
const mudaCorBotao = () => {
    switch (operadorValue) {
        case "+":
            btnMais.classList.toggle("pressed");
            break;
        case "-":
            btnMenos.classList.toggle("pressed");
            break;
        case "*":
            btnVezes.classList.toggle("pressed");
            break;
        case "/":
            btnDivisao.classList.toggle("pressed");
            break;
    } 
};

//Guarda o número digitado dentro de um array que armazena todos os elementos da operação.
//Guarda primeiro o número e depois o sinal da operação.
const guardaNumero = () => {
    operacaoGeral.push(displayText());
    operacaoGeral.push(operadorValue);
}

//Guarda o número digitado dentro de um array que armazena todos os elementos da operação.
//Guarda primeiro o sinal da operação e depois o número.
const guardaResultado = () => {
    operacaoGeral.push(operadorValue);
    operacaoGeral.push(displayText());
}

//Realiza a operação mostrando o resultado no display.
const resultado = () => {
    operacaoGeral.push(displayText());
    resultadoGeral = eval(operacaoGeralText());
    displayAtual = [resultadoGeral.toString()];
    console.log(operacaoGeral);
    operacaoGeral = [];
    document.querySelector("div.display").innerText = displayText();
    resultadoOn = true;
    operadorOn = false;
    mudaCorBotao();
};

//-------------------------------------------------------------

