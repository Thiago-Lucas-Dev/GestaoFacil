<!-- ========== TOPBAR ========== -->
<nav class="navbar navbar-expand-lg fp-topbar fixed-top" id="mainNavbar">
    <div class="container-xxl">

        <!-- Brand -->
        <a class="navbar-brand fp-brand d-flex align-items-center gap-2" href="{{ route('dashboard') }}">
            <div class="fp-logo-icon">
                <i class="bi bi-graph-up-arrow"></i>
            </div>
            <span class="fp-brand-name">Gestão<span class="fp-brand-accent">Fácil</span></span>
        </a>

        <!-- Nav Center -->
        <div class="collapse navbar-collapse justify-content-center" id="navbarMain">
            <ul class="navbar-nav fp-nav gap-1">
                <li class="nav-item">
                    <a class="nav-link fp-nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}" href="{{ route('dashboard') }}" data-page="dashboard">
                        <i class="bi bi-grid-1x2"></i> Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fp-nav-link" href="#" data-page="dashboard">
                        <i class="bi bi-receipt"></i> Pedidos
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fp-nav-link {{ request()->routeIs('movimentacoes.*') ? 'active' : '' }}" href="{{ route('movimentacoes.index') }}" data-page="movimentacoes">
                        <i class="bi bi-arrow-left-right"></i> Movimentações
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fp-nav-link {{ request()->routeIs('contas-pagar.*') ? 'active' : '' }} " href="{{ route('contas-pagar.index') }}" data-page="pagar">
                        <i class="bi bi-arrow-up-circle"></i> Contas a Pagar
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fp-nav-link" href="#" data-page="receber">
                        <i class="bi bi-arrow-down-circle"></i> Contas a Receber
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fp-nav-link" href="#" data-page="conciliacoes">
                        <i class="bi bi-intersect"></i> Conciliações
                    </a>
                </li>
            </ul>
        </div>

        <!-- User Area -->
        <div class="fp-user d-none d-lg-flex align-items-center gap-3">
            <div class="dropdown">
                <button class="fp-user-btn d-flex align-items-center gap-2 border-0 bg-transparent" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="fp-avatar">
                        <span>AM</span>
                    </div>
                    <div class="fp-user-info text-start">
                        <div class="fp-user-name">Ana Moreira</div>
                        <div class="fp-user-role">Gerente Financeiro</div>
                    </div>
                    <i class="bi bi-chevron-down fp-chevron ms-1"></i>
                </button>
                <ul class="dropdown-menu fp-dropdown dropdown-menu-end shadow-lg border-0 mt-2">
                    <li>
                        <div class="fp-dropdown-header px-3 py-2">
                            <div class="d-flex align-items-center gap-2">
                                <div class="fp-avatar fp-avatar-sm">
                                    <span>DS</span>
                                </div>
                                <div>
                                    <div class="fw-600 small text-dark">Desenvolvedor</div>
                                    <div class="text-muted" style="font-size:0.72rem">ana@empresa.com.br</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <hr class="dropdown-divider my-1" />
                    </li>

                    <li>
                        <a class="dropdown-item fp-dropdown-item" href="#"><i class="bi bi-person me-2"></i>Meu Perfil</a>
                    </li>

                    <li>
                        <a class="dropdown-item fp-dropdown-item" href="{{ route('configuracoes.index') }}"><i
                                class="bi bi-gear me-2"></i>Configurações</a>
                    </li>

                    <li>
                        <hr class="dropdown-divider my-1" />
                    </li>
                    <li><a class="dropdown-item fp-dropdown-item fp-dropdown-danger" href="{{ route('logout') }}"><i
                                class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
                </ul>
            </div>
        </div>

    </div>
</nav>
<!-- ========== END TOPBAR ========== -->