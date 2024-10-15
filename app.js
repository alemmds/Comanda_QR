// Função para adicionar um pedido a uma mesa
function adicionarPedido(mesaNumero, nome, preco, quantidade) {
    // Verifica se a mesa já tem pedidos armazenados
    let pedidos = JSON.parse(localStorage.getItem(`mesa-${mesaNumero}`)) || [];
    
    // Adiciona o novo pedido à lista de pedidos da mesa
    pedidos.push({ nome, preco, quantidade });
    
    // Atualiza o localStorage com os pedidos da mesa
    localStorage.setItem(`mesa-${mesaNumero}`, JSON.stringify(pedidos));
    
    // Atualiza o valor total e a lista de pedidos no DOM
    atualizarMesa(mesaNumero);
}

// Função para atualizar a exibição dos pedidos e o total da mesa
function atualizarMesa(mesaNumero) {
    const pedidos = JSON.parse(localStorage.getItem(`mesa-${mesaNumero}`)) || [];
    const listaPedidos = document.getElementById(`lista-pedidos-mesa-${mesaNumero}`);
    const totalElement = document.getElementById(`total-mesa-${mesaNumero}`);
    let total = 0;

    // Limpa a lista atual de pedidos no DOM
    listaPedidos.innerHTML = '';

    // Adiciona cada pedido à lista e soma o valor total
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.innerText = `${pedido.quantidade}x ${pedido.nome} - R$ ${(pedido.preco * pedido.quantidade).toFixed(2)}`;
        listaPedidos.appendChild(li);
        total += pedido.preco * pedido.quantidade;
    });

    // Exibe o valor total no DOM
    totalElement.innerText = `Valor Total: R$ ${total.toFixed(2)}`;

    // Atualiza o QR Code para a mesa
    gerarQRCode(mesaNumero);
}

// Função para gerar o QR Code com o link para o resumo da mesa
function gerarQRCode(mesaNumero) {
    const qrCodeContainer = document.getElementById(`qrcode-mesa-${mesaNumero}`);
    const urlMesa = `${window.location.origin}/resumo.html?mesa=${mesaNumero}`;
    
    // Limpa o conteúdo anterior do QR Code, caso exista
    qrCodeContainer.innerHTML = "";

    // Gerar o QR Code com o link para o resumo da mesa
    new QRCode(qrCodeContainer, {
        text: urlMesa,
        width: 128,
        height: 128,
    });
}

// Função para adicionar os botões de gerar QR Code e listar pedidos para cada mesa
function adicionarBotoesQRCode() {
    for (let mesaNumero = 1; mesaNumero <= 5; mesaNumero++) {
        const botao = document.createElement('button');
        botao.innerText = "Download QR";
        botao.onclick = () => gerarQRCode(mesaNumero);

        // Adicionar o botão ao lado do total da mesa
        const mesaDiv = document.getElementById(`mesa-total-${mesaNumero}`);
        mesaDiv.appendChild(botao);

        // Adicionar um container para exibir o QR Code
        const qrCodeContainer = document.createElement('div');
        qrCodeContainer.id = `qrcode-mesa-${mesaNumero}`;
        mesaDiv.appendChild(qrCodeContainer);
    }
}

// Função para inicializar as mesas ao carregar a página
function inicializarMesas() {
    for (let mesaNumero = 1; mesaNumero <= 5; mesaNumero++) {
        atualizarMesa(mesaNumero);
    }
}

// Chama a função para adicionar os botões e inicializar as mesas quando a página for carregada
window.onload = function() {
    adicionarBotoesQRCode();
    inicializarMesas();
};

// Função para limpar os pedidos de uma mesa
function limparMesa(mesaNumero) {
    localStorage.removeItem(`mesa-${mesaNumero}`);
    atualizarMesa(mesaNumero);
}
