<?php

namespace App\Http\Controllers\Configuracoes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Configuracoes\StoreFormasPagamentoRequest;
use App\Models\Configuracoes\FormasPagamento;
use Exception;

class FormasPagamentoController extends Controller
{
    public function store(StoreFormasPagamentoRequest $request)
    {

        $data = $request->validated();

        try {

            FormasPagamento::create($data);

            return redirect()->back()->with("success", "Forma de pagamento cadastrada com suceso!");

        } catch (Exception $e) {

            dd($e->getMessage());

            return redirect()->back()->with("danger", "Algo deu errado. Tente novamente!");

        }
    }
}
