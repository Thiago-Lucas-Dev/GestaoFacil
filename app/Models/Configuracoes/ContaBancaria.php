<?php

namespace App\Models\Configuracoes;

use Illuminate\Database\Eloquent\Model;

class ContaBancaria extends Model
{

    public function getDescricaoContaAttribute() {

        return "{$this->nome} | C/C {$this->conta}";

    }

    protected $table = 'contas_bancarias';

    protected $fillable = [
        'nome',
        'banco',
        'codigo_banco',
        'agencia',
        'conta',
        'tipo',
        'saldo_inicial',
        'saldo_conta',
        'data_saldo_inicial',
    ];

    public static function saldoConsolidado()
    {

        return self::sum("saldo_conta");
    }

    public static function quantidadeContas() {

        return self::count();

    }
}
