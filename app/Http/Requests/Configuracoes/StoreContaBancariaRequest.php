<?php

namespace App\Http\Requests\Configuracoes;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContaBancariaRequest extends FormRequest
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
            'codigo_banco'         => 'required|in:001,033,104,237,341,260,077,336,748,756',
            'banco'                => 'nullable|string',
            'agencia'              => 'required|string|max:255',
            'conta'                => 'required|string|max:255',
            'tipo'                 => 'required|in:corrente,poupanca,pagamento',
            'saldo_inicial'        => 'nullable|numeric',
            'saldo_conta'          => 'nullable|numeric',
            'data_saldo_inicial'   => 'nullable|date',
            'nome'                 => 'nullable|string|max:255',
        ];
    }

    protected function prepareForValidation()
    {

        $bancos = [
            '001' => 'Banco do Brasil',
            '033' => 'Santander',
            '104' => 'Caixa Econômica Federal',
            '237' => 'Bradesco',
            '341' => 'Itaú Unibanco',
            '260' => 'Nubank',
            '077' => 'Banco Inter',
            '336' => 'C6 Bank',
            '748' => 'Sicredi',
            '756' => 'Sicoob',
        ];

        $saldo = $this->saldo_inicial;

        if ($saldo !== null && $saldo !== "") {

            $saldo = str_replace(".", "", $saldo);
            $saldo = str_replace(",", ".", $saldo);

        }

        $this->merge([
            'data_saldo_inicial' => $this->data_saldo_inicial ?? now()->toDateString(),
            'banco' => $bancos[$this->codigo_banco] ?? 'Desconhecido',
            'nome'  => $this->nome ?? $bancos[$this->codigo_banco],
            'saldo_inicial' => $saldo,
            'saldo_conta' => $saldo,
        ]);
    }

    public function messages(): array
    {

        return [
            'required' => 'O campo :attribute é obrigatório.',
            'numeric'  => 'O campo :attribute deve ser um número.',
            'date'     => 'O campo :attribute deve ser uma data.',
            'in'       => 'O valor selecionado para :attribute é inválido'
        ];
    }

    public function attributes(): array
    {

        return [
            "codigo_banco"       => "Banco",
            "agencia"            => "Agência",
            "conta"              => "Número da conta",
            "tipo"               => "Tipo da conta",
            "saldo_inicial"      => "Saldo inicial",
            "data_saldo_inicial" => "Data do saldo inicial",
            "nome"               => "Nome da conta"
        ];
    }
}
