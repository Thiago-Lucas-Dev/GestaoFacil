<?php

namespace App\Http\Requests\Configuracoes;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreFormasPagamentoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome'                       => 'required|max:100',
            'tipo'                       => 'required|in:dinheiro,pix,credito,debito,boleto,transferencia,cheque,outro',
            'prazo_compensacao_padrao'   => 'required|numeric',
            'ativo'                      => 'required|boolean',
            'observacoes'                => 'nullable|max:255',
            
        ];
    }
}
