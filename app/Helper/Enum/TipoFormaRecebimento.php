<?php

namespace App\Helper\Enum;

enum TipoFormaRecebimento: string
{
    case DINHEIRO = 'dinheiro';
    case CREDITO = 'credito';
    case DEBITO = 'debito';
    case PIX = 'pix';
    case BOLETO = 'boleto';
    case TRANSFERENCIA = 'transferencia';
    case CHEQUE = 'cheque';
    case OUTRO = 'outro';
}
