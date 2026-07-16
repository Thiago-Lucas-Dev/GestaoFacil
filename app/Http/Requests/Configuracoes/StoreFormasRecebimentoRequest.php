<?php

namespace App\Http\Requests\Configuracoes;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;
use App\Helper\Enum\TipoFormaRecebimento;

class StoreFormasRecebimentoRequest extends FormRequest
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
            'nome' => 'required|max:100',

            'tipo' => [
                'required',
                new Enum(TipoFormaRecebimento::class),
            ],

            'conta_bancaria_id' => [
                'required', 
                'integer',
                Rule::exists('contas_bancarias', 'id'),
            ],
            
            "taxa" => [
                "required",
                "numeric",
                "min:0",
            ],

            "prazo_repasse" => [
                "required",
                "integer",
                "min:0",
            ],

            "ativo" => [
                "required",
                "boolean",
            ],
        ];
    }
}
