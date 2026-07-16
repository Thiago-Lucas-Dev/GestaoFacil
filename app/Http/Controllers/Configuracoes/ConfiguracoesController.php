<?php

namespace App\Http\Controllers\Configuracoes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Configuracoes\ContaBancaria;
use App\Models\Configuracoes\FormasPagamento;
use App\Models\Configuracoes\FormasRecebimento;
use App\Models\Configuracoes\Categoria;

class ConfiguracoesController extends Controller
{
    public function index()
    {

        // ============================
        //      CONTAS BANCARIAS
        // ============================

        $contas = ContaBancaria::all();

        $saldoConsolidado = ContaBancaria::saldoConsolidado();

        $quantidadeContas = ContaBancaria::quantidadeContas();

        // ============================
        //    FORMAS DE PAGAMENTOS
        // ============================

        $formasPagamento = FormasPagamento::all();

        // ============================
        //    FORMAS DE RECEBIMENTO
        // ============================

        $formasRecebimento = FormasRecebimento::with('contaBancaria')->get();

        // <!--================================
        //     CATEGORIAS FINANCEIRAS
        // =================================-->

        $categorias = Categoria::all();

        return view("configuracoes.index", compact(
            "contas",
            "formasPagamento",
            "formasRecebimento",
            "categorias",
            "saldoConsolidado",
            "quantidadeContas"
        ));
    }
}
