<?php

namespace App\Models\Configuracoes;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{

    protected $table = 'categorias_financeiras';

    protected $fillable = [
        'nome',
        'tipo',
        'ativo'
    ];

}
