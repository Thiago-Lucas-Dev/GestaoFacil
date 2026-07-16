<?php

namespace App\Http\Requests\Configuracoes;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoriasFinanceirasRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation() {

        $this->merge([
            'ativo' => $this->boolean('ativo'),
        ]);

    }
   
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:100',

            'tipo' => 'required|in:R,D',
            
            'ativo' => 'required|boolean'
        ];
    }
}
