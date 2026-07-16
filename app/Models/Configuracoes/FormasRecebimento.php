<?php

namespace App\Models\Configuracoes;

use Illuminate\Database\Eloquent\Model;
use App\Models\Configuracoes\ContaBancaria;

class FormasRecebimento extends Model
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

    public function getStatusAttribute() {

        return $this->ativo ? "Ativo" : "Inativo";

    }

    public function getStatusBadgeClassAttribute() {

        return $this->ativo
            ? "fp-badge-pago"
            : "fp-badge-vencido";
    }

    public function getTaxaFormatadaAttribute() {

        return $this->taxa == 0 
            ? "Insento"
            : number_format($this->taxa, 2, ",", ".") . "%";

    }

    public function contaBancaria() {

        return $this->belongsTo(ContaBancaria::class, "conta_bancaria_id");

    }

    protected $table = 'formas_recebimento';

    protected $fillable = [
        "nome",
        "tipo",
        "conta_bancaria_id",
        "taxa",
        "prazo_repasse",
        "ativo",
    ];
}
