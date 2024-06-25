
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
  exibirTextoTela('h1', 'Jogo do Número Secreto');
  exibirTextoTela('p', 'Por favor, escolha um número entre 1 e 10');
  document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector('input').value;

  if (chute == "" || chute == 0) {
    exibirTextoTela('p', 'Erro! Campo vazio ou com valor 0 não permitido.');
    limparCampo();  
  } else {
          if (chute == numeroSecreto) {
            exibirTextoTela('h1', 'Acertou');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
            exibirTextoTela('p', mensagemTentativas);
            document.getElementById('chute').setAttribute('disabled', true);
            document.getElementById('reiniciar').removeAttribute('disabled');
          } else {
            if (chute > numeroSecreto) {
              exibirTextoTela('p', `O número secreto é menor que ${chute}`);
            } else {
              exibirTextoTela('p',`O número secreto é maior que ${chute}`);
            }
            tentativas++;
            limparCampo();
          }
        }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('chute').removeAttribute('disabled');
  document.getElementById('reiniciar').setAttribute('desabled', true);
}
