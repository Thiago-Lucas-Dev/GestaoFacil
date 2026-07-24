export async function consultarCnpj(cnpj) {

    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) {
        throw new Error('CNPJ inválido.');
    }

    const response = await fetch(`/api/consultar-cnpj?cnpj=${cnpj}`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao consultar CNPJ.');
    }

    return data;
}