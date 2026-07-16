@php
    $tipos = [
        'success' => [
            'titulo' => 'Sucesso',
            'icone' => 'bi-check-circle-fill',
        ],

        'danger' => [
            'titulo' => 'Erro',
            'icone' => 'bi-x-circle-fill',
        ],

        'warning' => [
            'titulo' => 'Atenção',
            'icone' => 'bi-exclamation-triangle-fill',
        ],
    ];

    $mensagem = null;
    $titulo   = null;
    $icone    = null;
    $tipo     = null;

    foreach ($tipos as $tipo => $dados) {
        if (session()->has($tipo)) {
            $mensagem = session($tipo);

            $titulo = $dados['titulo'];

            $icone = $dados['icone'];

            break;
        }
    }

    if (!$mensagem && $errors->any()) {

        $mensagem = $errors->first();

        $titulo = "Atenção";

        $icone = "bi-exclamation-triangle-fill";

        $tipo = "warning";

    }

@endphp

@if ($mensagem)
    <div class="toast-container-custom">
        <div class="toast-item {{ $tipo }}">

            <i class="bi {{ $icone }} toast-icon"></i>

            <div class="toast-body">
                <div class="toast-title">
                    {{ $titulo }}
                </div>

                <div class="toast-msg">
                    {{ $mensagem }}
                </div>
            </div>

            <button class="toast-close">
                <i class="bi bi-x"></i>
            </button>

            <div class="toast-progress" style="--duration:{{ $duracao ?? 4000 }}ms"></div>
        </div>
    </div>
@endif
