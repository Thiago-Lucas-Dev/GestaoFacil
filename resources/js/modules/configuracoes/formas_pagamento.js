document.addEventListener('DOMContentLoaded', () => {
    const tipo = document.getElementById('tipo');
    const nome = document.getElementById('nome');

    if (!tipo || !nome) return;

    const nomes = {
        dinheiro: 'Dinheiro',
        credito: 'Cartão de crédito',
        debito: 'Cartão de débito',
        pix: 'PIX',
        boleto: 'Boleto',
        transferencia: 'Transferência',
        cheque: 'Cheque',
        outro: 'Outro'
    };

    let ultimoValorAutomatico = '';

    // Preenche inicialmente, caso deseje
    ultimoValorAutomatico = nomes[tipo.value] ?? '';
    nome.value = ultimoValorAutomatico;

    tipo.addEventListener('change', () => {
        const novoNome = nomes[tipo.value] ?? '';

        // Só altera se o usuário não personalizou o campo
        if (
            nome.value.trim() === '' ||
            nome.value === ultimoValorAutomatico
        ) {
            nome.value = novoNome;
            ultimoValorAutomatico = novoNome;
        }
    });
});