<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProfileController;

// MOVIMENTAÇÕES
use App\Http\Controllers\Movimentacoes\MovimentacoesController;

// CONFIGURAÇÕES
use App\Http\Controllers\Configuracoes\ConfiguracoesController;
use App\Http\Controllers\Configuracoes\ContaBancariaController;
use App\Http\Controllers\Configuracoes\FormasPagamentoController;
use App\Http\Controllers\Configuracoes\FormasRecebimentoController;
use App\Http\Controllers\Configuracoes\CategoriasFinanceirasController;

// CONTAS A PAGAR
use App\Http\Controllers\ContasPagar\ContasPagarController;
use App\Http\Controllers\ContasPagar\FornecedorController;

// API
use App\Http\Controllers\Api\ConsultaCnpjController;

// ====================================
// DASHBOARD
// ====================================

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ====================================
// ROTAS AUTENTICADAS
// ====================================

Route::middleware(['auth'])->group(function () {

    // ====================================
    // MOVIMENTAÇÕES
    // ====================================

    Route::prefix('movimentacoes')
        ->name('movimentacoes.')
        ->controller(MovimentacoesController::class)
        ->group(function () {

            Route::get('/', 'index')->name('index');
        });

    // ====================================
    // CONFIGURAÇÕES
    // ====================================

    Route::prefix('configuracoes')
        ->name('configuracoes.')
        ->group(function () {

            Route::controller(ConfiguracoesController::class)->group(function () {

                Route::get('/', 'index')->name('index');
            });

            Route::controller(ContaBancariaController::class)->group(function () {

                Route::post('/contas-bancarias', 'store')
                    ->name('contas-bancarias.store');
            });

            Route::controller(FormasPagamentoController::class)->group(function () {

                Route::post('/formas-pagamento', 'store')
                    ->name('formas-pagamento.store');
            });

            Route::controller(FormasRecebimentoController::class)->group(function () {

                Route::post('/formas-recebimento', 'store')
                    ->name('formas-recebimento.store');
            });

            Route::controller(CategoriasFinanceirasController::class)->group(function () {

                Route::post('/categorias-financeiras', 'store')
                    ->name('categorias.store');
            });
        });

    // ====================================
    // CONTAS A PAGAR
    // ====================================

    Route::prefix('contas-pagar')
        ->name('contas-pagar.')
        ->group(function () {

            Route::controller(ContasPagarController::class)->group(function () {

                Route::get('/', 'index')->name('index');

                Route::get('/create', 'create')->name('create');
            });

            Route::prefix('fornecedores')
                ->name('fornecedores.')
                ->controller(FornecedorController::class)
                ->group(function () {

                    Route::post('/', 'store')->name('store');
                
                });
        });

    // <!--================================
    //      API
    // =================================-->

    Route::prefix('api')
        ->name('api.')
        ->group(function () {

            Route::get('/consultar-cnpj', ConsultaCnpjController::class)
                ->name('consultar-cnpj');

        });

    // ====================================
    // PERFIL
    // ====================================

    Route::controller(ProfileController::class)->group(function () {

        Route::get('/profile', 'edit')->name('profile.edit');

        Route::patch('/profile', 'update')->name('profile.update');

        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
