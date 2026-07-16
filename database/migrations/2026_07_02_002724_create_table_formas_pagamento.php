<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('formas_pagamento', function (Blueprint $table) {
            $table->id();

            $table->string('nome', 100);

            $table->enum('tipo', [
                'dinheiro',
                'pix',
                'cartao_credito',
                'cartao_debito',
                'boleto',
                'transferencia',
                'cheque',
                'outro'
            ]);

            $table->unsignedInteger('prazo_compensacao_padrao')->default(0);

            $table->boolean('permite_parcelamento')->default(false);

            $table->boolean('ativo')->default(true);

            $table->text('observacoes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_formas_pagamento');
    }
};
