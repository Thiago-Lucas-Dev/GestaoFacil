<?php

namespace App\Http\Controllers\Configuracoes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Configuracoes\StoreContaBancariaRequest;
use App\Models\Configuracoes\ContaBancaria;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class ContaBancariaController extends Controller
{

    public function store(StoreContaBancariaRequest $request)
    {
        $data = $request->validated();

        try {

            ContaBancaria::create($data);

            return redirect()->back()->with('success', 'Conta bancária criada com sucesso');
            
        } catch (\Exception $e) {

            Log::error('Erro ao criar conta bancária', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return redirect()->back()->with('danger', 'Erro ao cadastrar conta bancária, Tente novamente!');
        }
    }
}
