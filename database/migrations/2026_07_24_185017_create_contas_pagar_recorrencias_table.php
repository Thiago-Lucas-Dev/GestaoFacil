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
        Schema::create('contas_pagar_recorrencias', function (Blueprint $table) {

            $table->id();

            $table->foreignId('conta_pagar_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->unsignedInteger('intervalo')->default(1);

            $table->enum('periodo', [
                'dias',
                'semanas',
                'meses',
                'anos'
            ]);

            $table->enum('tipo_fim', [
                'indefinido',
                'data',
                'ocorrencias'
            ]);

            $table->date('data_fim')->nullable();

            $table->unsignedInteger('qtd_ocorrencias')->nullable();

            $table->date('ultima_execucao')->nullable();

            $table->boolean('ativa')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contas_pagar_recorrencias');
    }
};
