<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <title>Login</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @vite("resources/css/login.css")
</head>

<body>

    <div class="login-wrapper">

        <!-- LEFT -->
        <div class="login-left">

            <div class="brand">
                <div class="brand-name fs-1">
                    <span>Gestão</span>Fácil
                </div>

            </div>

            <h1 class="hero-title">
                Gestão financeira moderna para controle completo do seu negócio.
            </h1>

            <p class="hero-description">
                Centralize contas a pagar, contas a receber, fluxo de caixa e relatórios
                financeiros em uma única plataforma simples e intuitiva.
            </p>

            <div class="hero-features">

                <div class="feature-card">
                    <i class="bi bi-wallet2"></i>

                    <strong>Controle de contas</strong>

                    <small>
                        Organize pagamentos e recebimentos com facilidade.
                    </small>
                </div>

                <div class="feature-card">
                    <i class="bi bi-graph-up-arrow"></i>

                    <strong>Fluxo de caixa</strong>

                    <small>
                        Acompanhe entradas e saídas em tempo real.
                    </small>
                </div>

                <div class="feature-card">
                    <i class="bi bi-shield-check"></i>

                    <strong>Dados seguros</strong>

                    <small>
                        Proteção e confiabilidade para suas informações financeiras.
                    </small>
                </div>

            </div>

        </div>

        <!-- RIGHT -->
        <div class="login-right">

            <div class="login-card">

                <div class="login-badge">
                    <i class="bi bi-lock"></i>
                    Ambiente seguro
                </div>

                <h2 class="login-title">
                    Entrar
                </h2>

                <p class="login-subtitle">
                    Acesse sua conta para continuar utilizando o sistema.
                </p>

                <form action="{{ route('login') }}" method="post">
                    @csrf

                    <div class="mb-3">
                        <label class="form-label">
                            E-mail
                        </label>

                        <input
                            type="email"
                            class="form-control"
                            placeholder="seu@email.com"
                            name="email"
                            value="{{ old('email') }}"
                            require>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Senha
                        </label>

                        <input
                            type="password"
                            class="form-control"
                            placeholder="••••••••"
                            name="password"
                            required>
                    </div>

                    <button type="submit" class="btn-login">
                        Entrar no sistema
                    </button>

                </form>

                <div class="login-footer">
                    Finance v1.0
                </div>

            </div>

        </div>

    </div>

</body>

</html>