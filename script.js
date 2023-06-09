axios.defaults.headers.common['Authorization'] = 'jPkEcGwk9mO6MJW5ja4IIlL9';

let usuario = prompt('Digite seu nome:');

function nomeUsuario(){
    
    const nome = document.querySelector('.usuario');
    nome.innerHTML = `Olá, ${usuario}!`;
}
nomeUsuario()

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

function selecionarModelo(seletor){
    modeloEscolhido = seletor.innerHTML;
    const botaoSelecionado = document.querySelector('.container-modelo .selecionado');
    if( botaoSelecionado !== null ){
        botaoSelecionado.classList.remove('selecionado');
    }
    const botao = document.querySelector(`.${seletor}`);
    botao.classList.add('selecionado');
    verificaSeleçao()
}

function selecionarGola(seletor){
    golaEscolhido = seletor.innerHTML;
    const botaoSelecionado = document.querySelector('.container-gola .selecionado');
    if( botaoSelecionado !== null ){
        botaoSelecionado.classList.remove('selecionado');
    }
    const botao = document.querySelector(`.${seletor}`);
    botao.classList.add('selecionado');
    verificaSeleçao()
}

function selecionarTecido(seletor){
    tecidoEscolhido = seletor.innerHTML;
    const botaoSelecionado = document.querySelector('.container-tecido .selecionado');
    if( botaoSelecionado !== null ){
        botaoSelecionado.classList.remove('selecionado');
    }
    const botao = document.querySelector(`.${seletor}`);
    botao.classList.add('selecionado');
    verificaSeleçao()
}

function verificaUrl() {
    const string = document.querySelector('input').value;
    try {
     let url = new URL(string);
     console.log("Valida URL!");
   } catch(err) {
       console.log("Invalida URL!");
   }
   verificaSeleçao()
   isImage(string)
   enviarSelecao()
} 

function isImage(string) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(string);
}

function enviarSelecao(){
    const model = document.querySelector('.container-modelo .selecionado').classList;
    const neck = document.querySelector('.container-gola .selecionado').classList;
    const material = document.querySelector('.container-tecido .selecionado').classList;

    const selecao = {
        "model": model[0],
        "neck": neck[0],
        "material": material[0],
        "image": input.value,
        "owner": usuario,
        "author": usuario
    }

    const resposta = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',selecao);
    resposta.then(renderizarSucesso);
    resposta.catch(erroEnviarPedido);
}

function atualizaPagina(){
    window.location.reload();
}

function renderizarSucesso(){
    const sucesso = document.querySelector('.container-selecionar');
    sucesso.innerHTML = `
    <div class="sucesso">
        Pedido feito com sucesso
    </div>
    <div>
        <img class="imagem-sucesso" src="${input.value}" />
    </div>`;
    setTimeout(atualizaPagina,10000);
}

function erroEnviarPedido(erro){
    if ( erro.response.status === 422){
        const errado = document.querySelector('.container-selecionar');
        errado.innerHTML = `
        <div class="sucesso">
            Algo deu errado!
        </div>
        <div>
            <img class="imagem-sucesso" src="image 1.png" />
        </div>`;
        setTimeout(atualizaPagina,10000);
    }
}

function buscarPedidos(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');

    promise.then(pedidosRecebidos);

    promise.catch(erroBuscarPedidos);
}
buscarPedidos()

function erroBuscarPedidos(erroBusca){

    console.log(erroBusca)

}

let pedidos = [];

function renderizarPedidos(){
    const ultimoPedido = document.querySelector('.pedidos-enviados');

    for(let i = 0 ; i < pedidos.length ; i++){

        let pedido = pedidos[i];

        ultimoPedido.innerHTML += `
            <li class="lista" onclick = "alertCompra('${pedidos[i].model}','${pedidos[i].neck}','${pedidos[i].material}','${pedidos[i].image}','${pedidos[i].owner}','${pedidos[i].author}')">
                <div>
                    <img class="imagem-pedidos" src="${pedido.image}" />
                </div>
                <div class="titulo-imagem-pedido">
                    <strong>Criador:</strong> ${pedido.owner}
                </div>
            </li>
        `;
            
    }

}

function pedidosRecebidos(res){

    pedidos = res.data;

    console.log(pedidos)

    renderizarPedidos()
}

function filtrarModelo(modelo){
    
    const botaoFechar = document.querySelector('.ultimos-pedidos');
    botaoFechar.classList.add('fecharpedido');

    const selecionado = pedidos.filter((ts)=> {
        return ts.model === modelo;
    });

    renderizarSelecionado(selecionado)
}

function renderizarSelecionado(selecionado){

    console.log(selecionado)
    const ultimoPedido = document.querySelector('.pedidos-enviados');
    ultimoPedido.innerHTML = '';

    for(let i = 0 ; i < selecionado.length ; i++){

        let pedido = selecionado[i];

        ultimoPedido.innerHTML += `
            <li class="lista" onclick = "alertCompra('${pedidos[i].model}','${pedidos[i].neck}','${pedidos[i].material}','${pedidos[i].image}','${pedidos[i].owner}','${pedidos[i].author}')">
                <div>
                    <img class="imagem-pedidos" src="${pedido.image}" />
                </div>
                <div class="titulo-imagem-pedido">
                    <strong>Criador:</strong> ${pedido.owner}
                </div>
            </li>
        `;
    }
}

function alertCompra(model,neck,material,image,owner,author){

    const compra = confirm('Deseja comprar essa blusa?');

    if(compra == true){
        alert('Confirmado');
        console.log(pedidos)

        const objeto = {
            "model": model,
            "neck": neck,
            "material": material,
            "image": image,
            "owner": owner,
            "author": owner
        }

        console.log(objeto)

        const resposta = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',objeto);
        resposta.then(renderizarSucesso);
        resposta.catch(erroEnviarPedido);
    }
}

function filtrarTodosModelos(){

    const botaoFechar = document.querySelector('.ultimos-pedidos');
    botaoFechar.classList.add('fecharpedido');

    const categoria = pedidos.filter((ts)=> {
        return  ts.model;
    });

    renderizarTodos(categoria)
}

function renderizarTodos(categoria){

    console.log(categoria)
    const ultimoPedido = document.querySelector('.pedidos-enviados');
    ultimoPedido.innerHTML = '';

    for(let i = 0 ; i < categoria.length ; i++){

        let pedido = categoria[i];

        ultimoPedido.innerHTML += `
            <li class="lista" onclick = "alertCompra('${pedidos[i].model}','${pedidos[i].neck}','${pedidos[i].material}','${pedidos[i].image}','${pedidos[i].owner}','${pedidos[i].author}')">
                <div>
                    <img class="imagem-pedidos" src="${pedido.image}" />
                </div>
                <div class="titulo-imagem-pedido">
                    <strong>Criador:</strong> ${pedido.owner}
                </div>
            </li>
        `;
    }
}

