document.addEventListener('DOMContentLoaded', () => {

    const tipoRecebimento = document.getElementById('tipo_recebimento');
    const nomeRecebimento = document.getElementById('nome_recebimento');

    if (!tipoRecebimento || !nomeRecebimento) return;

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

    tipoRecebimento.addEventListener('change', () => {

        const novoNome = nomes[tipoRecebimento.value] ?? '';

        if (
            nomeRecebimento.value.trim() === '' ||
            nomeRecebimento.value === ultimoValorAutomatico
        ) {
            nomeRecebimento.value = novoNome;
            ultimoValorAutomatico = novoNome;
        }
    });

});