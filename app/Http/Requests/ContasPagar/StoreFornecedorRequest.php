<?php

namespace App\Http\Requests\ContasPagar;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class StoreFornecedorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    public function prepareForValidation()
    {
        return parent::prepareForValidation();
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255'],

            'cnpj' => ['nullable', 'digits:14', 'unique:fornecedores,cnpj'],

            'telefone' => ['nullable', 'string', 'max:20'],

            'email' => ['nullable', 'email', 'max:255'],

            'cep' => ['nullable', 'digits:8'],

            'logradouro' => ['nullable', 'string', 'max:255'],

            'numero' => ['nullable', 'string', 'max:20'],

            'complemento' => ['nullable', 'string', 'max:255'],

            'bairro' => ['nullable', 'string', 'max:255'],

            'cidade' => ['nullable', 'string', 'max:255'],

            'uf' => ['nullable', 'size:2'],

            'ativo' => ['boolean'],
        ];
    }
}
