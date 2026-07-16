<?php

namespace App\Models\Configuracoes;

use Illuminate\Database\Eloquent\Model;

class FormasPagamento extends Model
{
    public function getIconeAttribute()
    {
        return [
            'dinheiro' => 'bi-cash-coin',
            'credito' => 'bi-credit-card',
            'debito' => 'bi-credit-card-2-back',
            'pix' => 'bi-qr-code',
            'boleto' => 'bi-file-earmark-text',
            'transferencia' => 'bi-arrow-left-right',
            'cheque' => 'bi-check',
            'outro' => 'bi-check-circle-fill',
        ][$this->tipo] ?? 'bi-question-circle';
    }

    public function getStatusAttribute(){

        return $this->ativo ? "Ativo" : "Inativo";

    }

    public function getStatusBadgeClassAttribute() {

        return $this->ativo
            ? "fp-badge-pago"
            : "fp-badge-vencido";

    }

    protected $table = "formas_pagamento";

    protected $fillable = [
        'nome',
        'tipo',
        'prazo_compensacao_padrao',
        'ativo',
        'observacoes',
    ];
}
