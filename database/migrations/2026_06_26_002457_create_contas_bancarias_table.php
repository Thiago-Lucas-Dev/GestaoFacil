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
        Schema::create('contas_bancarias', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('banco');
            $table->string('agencia');
            $table->string('conta');
            $table->decimal('saldo_inicial', 12, 2)->default(0);
            $table->string('tipo')->nullable(); // corrente, poupança
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contas_bancarias');
    }
};
