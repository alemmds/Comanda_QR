document.getElementById('adicionar-btn').addEventListener('click', function() {
    const mesa = document.getElementById('mesa-selecao').value;
    const nomeLanche = document.getElementById('nome-lanche').value;
    const precoLanche = parseFloat(document.getElementById('preco-lanche').value);
    const quantidadeLanche = parseInt(document.getElementById('quantidade-lanche').value);

    if (!nomeLanche || isNaN(precoLanche) || isNaN(quantidadeLanche)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const listaPedidos = document.getElementById(`lista-pedidos-mesa-${mesa}`);
    const novoPedido = document.createElement('li');
    novoPedido.textContent = `${nomeLanche} - R$${(precoLanche * quantidadeLanche).toFixed(2)} (${quantidadeLanche})`;
    listaPedidos.appendChild(novoPedido);

    // Atualizar total da mesa
    const totalMesa = document.getElementById(`total-mesa-${mesa}`);
    const valorAtual = parseFloat(totalMesa.textContent.replace('Valor Total: R$', ''));
    const novoTotal = valorAtual + (precoLanche * quantidadeLanche);
    totalMesa.textContent = `Valor Total: R$ ${novoTotal.toFixed(2)}`;

    // Habilitar botão de Download QR e gerar QR Code
    const qrButton = document.getElementById(`download-qr-mesa-${mesa}`);
    qrButton.disabled = false;

    const qrcodeDiv = document.getElementById(`qrcode-mesa-${mesa}`);
    qrcodeDiv.innerHTML = ''; // Limpar QR Code anterior
    const qr = new QRCode(qrcodeDiv, {
        text: `Resumo da Mesa ${mesa} - Total: R$${novoTotal.toFixed(2)}`,
        width: 128,
        height: 128,
    });
});
