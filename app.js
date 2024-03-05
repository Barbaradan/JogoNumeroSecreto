//anotações e comentarios em Notion > progs

//let titulo = document.querySelector('h1'); //h1 do html 
//titulo.innerHTML = 'Jogo do Número Secreto'; 

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = []; //array vazio p guadar os nº já sorteados
let numeroLimite = 10; //linha 51
let numeroSecreto = gerarNumAleatorio(); //var q recebe a function
let tentativas = 1; //nº de tentativas

function exibirTexto(tag, texto) { //evitar repetição do let titulo e paragrafo
    let campo = document.querySelector(tag); //tag pq oq muda nas linhas é só a tag h1 e p, pq a sintaxe é a mesma
    campo.innerHTML = texto; //texto pq o que muda é o txt
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //referente linha 7 html
}

function exibirMsgInicial() { //sempre que reinicar o jogo
    exibirTexto('h1', 'Jogo do Número Secreto'); //executa a function - parametros (tag, texto)
    exibirTexto('p', 'Escolha um número de 1 a 10');
}

    exibirMsgInicial(); 

function verificarChute() { //determina o que o evento onclick faz
    let chute = document.querySelector('input').value; //o valor do input da linha 25 html
    
    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!'); //function (tag, texto)
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; //é > q 1? se sim : se não
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //id do html do btn Novo Jogo - linha 28, remove o disabled "desativa" ele

    } else {
        if (chute > numeroSecreto){
            exibirTexto('p', 'O número secreto é menor');
        } else {
            exibirTexto('p', 'O número secreto é maior');
        }
            tentativas++; //soma o nº de tentativas
            limparCampo(); //limpar o input 
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
        listaDeNumerosSorteados.push(numeroEscolhido); //o push add itme ao final da lista. vai colocar o nº q foi escolhido, já q ele ñ tem incluso na lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() { //pra limpar o input após uma tentativa
    chute = document.querySelector('input'); //pegamos o chute que ta no input
    chute.value = ''; //queremos que o valor do chute seja vazio (limpo)
}

function reiniciarJogo() {
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //pegar o atributo disable do html e ativar dnv (true)
}