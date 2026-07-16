<?php

namespace App\Http\Controllers\Configuracoes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Configuracoes\StoreFormasRecebimentoRequest;
use App\Models\Configuracoes\FormasRecebimento;
use Exception;
use Illuminate\Http\Request;

class FormasRecebimentoController extends Controller
{
    public function store(StoreFormasRecebimentoRequest $request)
    {

        $data = $request->validated();

        try {

            FormasRecebimento::create($data);

            return redirect()->back()->with("success", "Forma de recebimento cadastrada com suceso!");
            
        } catch (Exception $e) {

            dd($e->getMessage());

            return redirect()->back()->with("danger", "Algo deu errado. Tente novamente!");
        }
    }
}
