
function nomeUsuario(){
    let usuario = prompt('Digite seu nome:');
    const nome = document.querySelector('.usuario');
    nome.innerHTML = `Olá, ${usuario}!`;
}
nomeUsuario()
function digita(){
    const i = document.querySelector('input');
    i.classList.add('selecionado');
}
let modeloEscolhido = '';
let golaEscolhido = '';
let tecidoEscolhido = '';
const input = document.querySelector('input');

function verificaSeleçao(){
    
    if( modeloEscolhido !== ''){
        if( golaEscolhido !== ''){
            if( tecidoEscolhido !== ''){
                if( input.value !== '' || input.value === null){
                    const botaoFechar = document.querySelector('.confirmar-pedido');
                    botaoFechar.classList.add('fecharpedido');
                    botaoFechar.removeAttribute('disabled');
                }
            }
        }
    }
}
    
function verificaUrl() {
    const string = document.querySelector('input').value;
    try {
     let url = new URL(string);
     console.log("Valid URL!");
   } catch(err) {
       console.log("Invalid URL!");
   }
   verificaSeleçao()
   isImage(string)
   console.log(isImage());
   console.log(isImage(string));
} 

function isImage(string) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(string);
  }


function selecionarModelo(seletor){
    modeloEscolhido = seletor.innerHTML;
    const botaoSelecionado = document.querySelector('.container-modelo .selecionado');
    if( botaoSelecionado !== null ){
        botaoSelecionado.classList.remove('selecionado');
    }
    const botao = document.querySelector(seletor);
    botao.classList.add('selecionado');
    verificaSeleçao()
}

function selecionarGola(seletor){
    golaEscolhido = seletor.innerHTML;
    const botaoSelecionado = document.querySelector('.container-gola .selecionado');
    if( botaoSelecionado !== null ){
        botaoSelecionado.classList.remove('selecionado');
    }
    const botao = document.querySelector(seletor);
    botao.classList.add('selecionado');
    verificaSeleçao()
}

function selecionarTecido(seletor){
    tecidoEscolhido = seletor.innerHTML;
    const botaoSelecionado = document.querySelector('.container-tecido .selecionado');
    if( botaoSelecionado !== null ){
        botaoSelecionado.classList.remove('selecionado');
    }
    const botao = document.querySelector(seletor);
    botao.classList.add('selecionado');
    verificaSeleçao()
}