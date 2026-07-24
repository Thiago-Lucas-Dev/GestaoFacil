<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ReceitaService;
use Illuminate\Http\Request;
use Throwable;

class ConsultaCnpjController extends Controller
{
    public function __construct(
        private ReceitaService $receitaService
    ) {}

    public function __invoke(Request $request) {
        
        $dados = $request->validate([
            'cnpj' => ['required', 'string']
        ]);

        try {

            return response()->json(
                $this->receitaService->consultar($dados['cnpj'])
            );
            
        } catch (Throwable $e) {

            return response()->json([
                'message' => $e->getMessage()
            ], 422);

        }


    }
}
