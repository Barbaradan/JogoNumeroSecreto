let listaDeNumerosSorteados = []; //guada os nº já sorteados
let numeroLimite = 10; 
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1; 

function exibirTexto(tag, texto) { 
    let campo = document.querySelector(tag); 
    campo.innerHTML = texto; //oq muda é o txt
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //referente script html 
}

function exibirMsgInicial() { 
    exibirTexto('h1', 'Jogo do Número Secreto'); //executa a function, parametros (tag, texto)
    exibirTexto('p', 'Escolha um número de 1 a 10');
}

    exibirMsgInicial(); 

function verificarChute() { //onclick
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!'); //function (tag, texto)
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; //é > q 1? se sim : se não
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //id btn Novo Jogo desativa disabled

    } else {
        if (chute > numeroSecreto){
            exibirTexto('p', 'O número secreto é menor');
        } else {
            exibirTexto('p', 'O número secreto é maior');
        }
            tentativas++; 
            limparCampo(); //limpa input 
    }
}

function gerarNumAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; 

    if(quantidadeDeElementosNaLista == numeroLimite){ //se a qtd for == a x, a lista limpa os nº inclusos
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //verifica se na lista já tem o nº escolhido
        return gerarNumAleatorio(); //vai retornar o gerar n° (p gerar outro nº caso já tiver incluso o nº escolhido)
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); 
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() { 
    chute = document.querySelector('input'); 
    chute.value = ''; 
}

function reiniciarJogo() {
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //pegar o atributo disable do html e ativar dnv (true)
}
