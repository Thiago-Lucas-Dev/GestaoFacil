<?php

namespace App\Http\Controllers\ContasPagar;

use App\Http\Controllers\Controller;

use App\Models\ContasPagar\Fornecedor;

use App\Http\Requests\ContasPagar\StoreFornecedorRequest;
use Illuminate\Http\Request;

class FornecedorController extends Controller
{

    public function store(StoreFornecedorRequest $request)
    {

        try {

            $data = $request->validated();

            $fornecedor = Fornecedor::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Fornecedor cadastrado com sucesso',
                'fornecedor' => [
                    'id' => $fornecedor->id,
                    'nome' => $fornecedor->nome,
                ]
            ]);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Erro ao cadastrar fonrecedor'
            ], 500);
        }
    }
}
