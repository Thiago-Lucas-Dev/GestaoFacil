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
        Schema::create('contas_pagar', function (Blueprint $table) {

            $table->id();

            $table->foreignId('fornecedor_id')->constrained('fornecedores')->cascadeOnDelete();
            $table->foreignId('categoria_id')->constrained('categorias_financeiras');

            $table->string('descricao');

            $table->text('observacoes')->nullable();

            $table->decimal('valor_total', 15, 2);

            $table->decimal('valor_pago', 15, 2)->default(0);

            $table->decimal('valor_aberto', 15, 2);

            $table->date('data_geracao');

            $table->date('data_vencimento');

            $table->boolean('parcelado')->default(false);

            $table->boolean('recorrente')->default(false);

            $table->enum('status', [
                'PENDENTE',
                'PARCIAL',
                'PAGO',
                'VENCIDO',
                'CANCELADO'
            ])->default('PENDENTE');

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contas_pagar');
    }
};
