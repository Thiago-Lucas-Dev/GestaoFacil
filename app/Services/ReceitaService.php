<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Exception;

class ReceitaService
{
    public function consultar(string $cnpj): array
    {
        // Remove qualquer máscara
        $cnpj = preg_replace('/\D/', '', $cnpj);

        if (strlen($cnpj) !== 14) {
            throw new Exception('CNPJ inválido.');
        }

        $response = Http::timeout(10)
            ->acceptJson()
            ->get("https://brasilapi.com.br/api/cnpj/v1/{$cnpj}");

        if ($response->failed()) {
            throw new Exception('Não foi possível consultar o CNPJ.');
        }

        $dados = $response->json();

        return [
            'cnpj'            => $dados['cnpj'] ?? null,
            'razao_social'    => $dados['razao_social'] ?? null,
            'nome_fantasia'   => $dados['nome_fantasia'] ?? null,
            'email'           => $dados['email'] ?? null,
            'telefone'        => $dados['ddd_telefone_1'] ?? null,

            'cep'             => $dados['cep'] ?? null,
            'logradouro'      => $dados['logradouro'] ?? null,
            'numero'          => $dados['numero'] ?? null,
            'bairro'          => $dados['bairro'] ?? null,
            'municipio'       => $dados['municipio'] ?? null,
            'uf'              => $dados['uf'] ?? null,

            'situacao'        => $dados['descricao_situacao_cadastral'] ?? null,
            'natureza_juridica' => $dados['natureza_juridica'] ?? null,
        ];
    }
}