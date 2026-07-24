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
        Schema::create('contas_pagar_parcelas', function (Blueprint $table) {

            $table->id();

            $table->foreignId('conta_pagar_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->unsignedInteger('numero');

            $table->unsignedInteger('dias')->default(0);

            $table->decimal('valor', 15, 2);

            $table->decimal('valor_pago', 15, 2)->default(0);

            $table->decimal('valor_aberto', 15, 2);

            $table->date('data_vencimento');

            $table->date('data_pagamento')->nullable();

            $table->enum('status', [
                'PENDENTE',
                'PARCIAL',
                'PAGO',
                'VENCIDO'
            ])->default('PENDENTE');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contas_pagar_parcelas');
    }
};
