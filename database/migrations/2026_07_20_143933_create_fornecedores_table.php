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
        Schema::create('fornecedores', function (Blueprint $table) {

            $table->id();

            // Dados principais
            $table->string('nome');
            $table->string('cnpj', 14)->nullable();

            // Contato (opcional)
            $table->string('telefone')->nullable();
            $table->string('email')->nullable();

            // Endereço (preenchido caso venha da API)
            $table->string('cep', 8)->nullable();
            $table->string('logradouro')->nullable();
            $table->string('numero')->nullable();
            $table->string('complemento')->nullable();
            $table->string('bairro')->nullable();
            $table->string('cidade')->nullable();
            $table->char('uf', 2)->nullable();

            // Controle
            $table->boolean('ativo')->default(true);

            $table->timestamps();

            $table->unique(['cnpj']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fornecedores');
    }
};
