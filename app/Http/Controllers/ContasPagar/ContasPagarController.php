<?php

namespace App\Http\Controllers\ContasPagar;

use App\Http\Controllers\Controller;

use App\Models\ContasPagar\Fornecedor;
use App\Models\Configuracoes\Categoria;

use Illuminate\Http\Request;

class ContasPagarController extends Controller
{
    public function index()
    {

        return view('contas_pagar.index');
    }

    public function create()
    {

        $fornecedores = Fornecedor::orderBy('nome')->get();

        $categorias = Categoria::where('tipo', 'D')
            ->orderBy('nome')
            ->get();


        return view('contas_pagar.create', compact(
            'fornecedores',
            'categorias'    
        ));
    }
}
