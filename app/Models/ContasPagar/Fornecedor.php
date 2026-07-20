<?php

namespace App\Models\ContasPagar;

use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    
    protected $table = 'fornecedores';

    protected $fillable = [
        'nome',
        'cnpj',
        'telefone',
        'email',
        'cep',
        'logradouro',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'uf',
        'ativo'
    ];

}
