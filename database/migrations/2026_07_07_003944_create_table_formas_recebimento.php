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
        Schema::create('formas_recebimento', function (Blueprint $table) {
            $table->id();

            $table->string('nome', 100);

            // dinheiro, credito, debito, pix...
            $table->string('tipo', 30);

            // Conta bancária vinculada
            $table->foreignId('conta_bancaria_id')
                ->constrained('contas_bancarias')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            // Taxa em porcentagem
            $table->decimal('taxa', 5, 2)->default(0);

            // D+30, D+14...
            $table->unsignedSmallInteger('prazo_repasse')->default(0);

            $table->boolean('ativo')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_formas_recebimento');
    }
};
