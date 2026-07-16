<?php

namespace App\Http\Controllers\Configuracoes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Configuracoes\StoreCategoriasFinanceirasRequest;
use App\Models\Configuracoes\Categoria;
use Illuminate\Http\Request;
use Exception;

class CategoriasFinanceirasController extends Controller
{
    public function store(StoreCategoriasFinanceirasRequest $request) {

        $data = $request->validated();

        try {

            Categoria::create($data);

            return redirect()->back()->with('success', 'Categoria criada com sucesso');
        
        } catch(Exception $e) {

            dd($e->getMessage());

            return redirect()->back()->with("danger", "Algo deu errado. Tente novamente!");
        
        }

    }
}
