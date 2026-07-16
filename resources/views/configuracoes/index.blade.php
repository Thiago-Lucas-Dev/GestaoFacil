<x-app-layout>

    <main class="fp-main">
        <div class="container-xxl py-4">

            <!-- Page Header -->
            <div class="fp-page-header d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div>
                    <h1 class="fp-page-title mb-1">Configurações</h1>
                    <p class="fp-page-subtitle mb-0">
                        <i class="bi bi-gear me-1"></i>
                        Gerencie contas bancárias, formas de pagamento e preferências do sistema
                    </p>
                </div>
            </div>


            <!-- Layout: sidebar tabs + content -->
            <div class="row g-4">

                <!-- ── Sidebar nav ── -->
                <div class="col-12 col-lg-3">
                    <div class="fp-card cfg-sidenav">
                        <div class="cfg-sidenav-body">

                            <div class="cfg-nav-group">
                                <div class="cfg-nav-label">Financeiro</div>
                                <a class="cfg-nav-item active" href="#" data-tab="contas-bancarias">
                                    <span class="cfg-nav-icon"><i class="bi bi-bank"></i></span>
                                    Contas Bancárias
                                </a>
                                <a class="cfg-nav-item" href="#" data-tab="formas-pagamento">
                                    <span class="cfg-nav-icon"><i class="bi bi-credit-card-2-front"></i></span>
                                    Formas de Pagamento
                                </a>
                                <a class="cfg-nav-item" href="#" data-tab="formas-recebimento">
                                    <span class="cfg-nav-icon"><i class="bi bi-cash-stack"></i></span>
                                    Formas de Recebimento
                                </a>
                                <a class="cfg-nav-item" href="#" data-tab="categorias">
                                    <span class="cfg-nav-icon"><i class="bi bi-tags"></i></span>
                                    Categorias
                                </a>
                                {{-- <a class="cfg-nav-item" href="#" data-tab="centros-custo">
                                    <span class="cfg-nav-icon"><i class="bi bi-diagram-3"></i></span>
                                    Centros de Custo
                                </a> --}}
                            </div>

                            <div class="cfg-nav-group">
                                <div class="cfg-nav-label">Sistema</div>
                                <a class="cfg-nav-item" href="#" data-tab="empresa">
                                    <span class="cfg-nav-icon"><i class="bi bi-building"></i></span>
                                    Dados da Empresa
                                </a>
                                <a class="cfg-nav-item" href="#" data-tab="usuarios">
                                    <span class="cfg-nav-icon"><i class="bi bi-people"></i></span>
                                    Usuários e Acesso
                                </a>
                                <a class="cfg-nav-item" href="#" data-tab="notificacoes">
                                    <span class="cfg-nav-icon"><i class="bi bi-bell"></i></span>
                                    Notificações
                                </a>
                                <a class="cfg-nav-item" href="#" data-tab="integrações">
                                    <span class="cfg-nav-icon"><i class="bi bi-plug"></i></span>
                                    Integrações
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- ── Content area ── -->
                <div class="col-12 col-lg-9">


                    <!-- ═══════════════════════════════════
               TAB: Contas Bancárias
          ══════════════════════════════════════ -->
                    <div class="cfg-tab active" id="tab-contas-bancarias">

                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                                    <div>
                                        <h5 class="fp-section-title mb-1">Contas Bancárias</h5>
                                        <p class="fp-section-sub mb-0">Gerencie as contas vinculadas ao sistema</p>
                                    </div>
                                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1"
                                        data-bs-toggle="modal" data-bs-target="#modalContaBancaria">
                                        <i class="bi bi-plus-lg"></i> Nova Conta
                                    </button>
                                </div>

                                <!-- Bank account cards -->
                                <div class="d-flex flex-column gap-3" id="bankList">

                                    @foreach ($contas as $conta)
                                        <div class="cfg-bank-card">
                                            <div class="cfg-bank-stripe" style="background:#0052CC"></div>
                                            <div class="cfg-bank-logo">
                                                <i class="bi bi-bank2"></i>
                                            </div>
                                            <div class="cfg-bank-info">
                                                <div class="cfg-bank-name">{{ $conta->nome }}</div>
                                                <div class="cfg-bank-detail">{{ $conta->banco }} | Ag. {{ $conta->agencia }} &nbsp;·&nbsp; C/C
                                                    {{ $conta->conta }}
                                                </div>
                                            </div>
                                            <div class="cfg-bank-balance">
                                                <div class="cfg-bank-balance-label">Saldo atual</div>
                                                <div class="cfg-bank-balance-val">R$
                                                    {{ number_format($conta->saldo_conta, 2, ',', '.') }}
                                                </div>
                                            </div>
                                            <div class="cfg-bank-status">
                                                <span class="fp-badge fp-badge-pago">Ativa</span>
                                            </div>
                                            <div class="cfg-bank-actions">
                                                <button class="fp-icon-btn" title="Editar" data-bs-toggle="modal"
                                                    data-bs-target="#modalContaBancaria"><i
                                                        class="bi bi-pencil"></i></button>
                                                <button class="fp-icon-btn" title="Sincronizar"><i
                                                        class="bi bi-arrow-repeat"></i></button>
                                                <button class="fp-icon-btn fp-icon-danger" title="Remover"><i
                                                        class="bi bi-trash3"></i></button>
                                            </div>
                                        </div>
                                    @endforeach

                                </div>

                                <!-- Saldo consolidado -->
                                <div class="cfg-balance-summary mt-4">
                                    <div class="cfg-balance-item">
                                        <span class="cfg-balance-label"><i class="bi bi-wallet2 me-1"></i>Saldo
                                            Consolidado</span>
                                        <span class="cfg-balance-total">
                                            R$ {{ number_format($saldoConsolidado, 2, ',', '.') }}
                                        </span>
                                    </div>
                                    <div class="cfg-balance-sub">
                                        {{ $quantidadeContas }} contas ativas
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <!-- end tab contas-bancarias -->


                    <!-- ═══════════════════════════════════
               TAB: Formas de Pagamento
          ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-formas-pagamento">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                                    <div>
                                        <h5 class="fp-section-title mb-1">Formas de Pagamento</h5>
                                        <p class="fp-section-sub mb-0">Configure os meios utilizados para quitar
                                            despesas</p>
                                    </div>
                                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1"
                                        data-bs-toggle="modal" data-bs-target="#modalFormaPgto">
                                        <i class="bi bi-plus-lg"></i> Nova Forma de Pagamento
                                    </button>
                                </div>

                                <div class="d-flex flex-column gap-3">

                                    @foreach ($formasPagamento as $forma)
                                        <div class="cfg-receb-card">

                                            <div class="cfg-receb-left">
                                                <div class="cfg-receb-icon" style="background:#EBF3FF;color:#0D6EFD">
                                                    <i class="bi {{ $forma->icone }}"></i>
                                                </div>
                                                <div>
                                                    <div class="cfg-receb-name">{{ $forma->nome }}</div>
                                                </div>
                                            </div>

                                            {{-- <div class="cfg-receb-prazo">
                                                <span class="cfg-taxa-label">Prazo</span>
                                                <span class="cfg-taxa-val">D+{{ $forma->prazo_compensacao_padrao }}</span>
                                    </div> --}}
                                            <span
                                                class="fp-badge {{ $forma->statusBadgeClass }}">{{ $forma->status }}</span>
                                            <div class="cfg-receb-actions">
                                                <button class="fp-icon-btn"><i class="bi bi-pencil"></i></button>
                                                <button class="fp-icon-btn fp-icon-danger"><i
                                                        class="bi bi-trash3"></i></button>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                                {{-- <div class="cfg-method-grid" id="payMethodList">

                                    @foreach ($formasPagamento as $forma)
                                        <div class="cfg-method-card">
                                            <div class="cfg-method-icon" style="background:#EBF3FF;color:#0D6EFD"><i
                                                    class="bi {{ $forma->icone }}"></i>
                        </div>
                        <div class="cfg-method-name">{{ $forma->nome }}</div>
                        <div class="cfg-method-footer">
                            <span
                                class="fp-badge {{ $forma->statusBadgeClass }}">{{ $forma->status }}</span>
                            <div class="d-flex gap-1">
                                <button class="fp-icon-btn"><i class="bi bi-pencil"></i></button>
                                <button class="fp-icon-btn fp-icon-danger"><i
                                        class="bi bi-trash3"></i></button>
                            </div>
                        </div>
                    </div>
                    @endforeach

                </div> --}}
                            </div>
                        </div>
                    </div>
                    <!-- end tab formas-pagamento -->

                    <!-- ═══════════════════════════════════
                        TAB: Formas de Recebimento
                    ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-formas-recebimento">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                                    <div>
                                        <h5 class="fp-section-title mb-1">Formas de Recebimento</h5>
                                        <p class="fp-section-sub mb-0">Configure os meios aceitos para receber receitas
                                        </p>
                                    </div>
                                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1"
                                        data-bs-toggle="modal" data-bs-target="#modalFormaReceb">
                                        <i class="bi bi-plus-lg"></i> Nova Forma de Recebimento
                                    </button>
                                </div>

                                <div class="d-flex flex-column gap-3">

                                    @foreach ($formasRecebimento as $forma)
                                        <div class="cfg-receb-card">

                                            <div class="cfg-receb-left">
                                                <div class="cfg-receb-icon" style="background:#EBF3FF;color:#0D6EFD">
                                                    <i class="bi {{ $forma->icone }}"></i>
                                                </div>
                                                <div>
                                                    <div class="cfg-receb-name">{{ $forma->nome }}</div>
                                                    <div class="cfg-receb-sub">Conta vinculada:
                                                        {{ $forma->contaBancaria?->descricao_conta ?? 'Não vinculada' }}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="cfg-receb-taxa">
                                                <span class="cfg-taxa-label">Taxa</span>
                                                <span
                                                    class="cfg-taxa-val fp-amount-receita">{{ $forma->taxa_formatada }}</span>
                                            </div>
                                            <div class="cfg-receb-prazo">
                                                <span class="cfg-taxa-label">Prazo</span>
                                                <span class="cfg-taxa-val">D+{{ $forma->prazo_repasse }}</span>
                                            </div>
                                            <span
                                                class="fp-badge {{ $forma->statusBadgeClass }}">{{ $forma->status }}</span>
                                            <div class="cfg-receb-actions">
                                                <button class="fp-icon-btn"><i class="bi bi-pencil"></i></button>
                                                <button class="fp-icon-btn fp-icon-danger"><i
                                                        class="bi bi-trash3"></i></button>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end tab formas-recebimento -->


                    <!-- ═══════════════════════════════════
               TAB: Categorias
          ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-categorias">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                                    <div>
                                        <h5 class="fp-section-title mb-1">Categorias Financeiras</h5>
                                        <p class="fp-section-sub mb-0">Organize receitas e despesas por categoria</p>
                                    </div>
                                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1"
                                        data-bs-toggle="modal" data-bs-target="#modalCategoria">
                                        <i class="bi bi-plus-lg"></i> Nova Categoria
                                    </button>
                                </div>

                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="cfg-cat-group">
                                            <div class="cfg-cat-group-header">
                                                <span class="fp-type-badge fp-type-receita"><i
                                                        class="bi bi-arrow-down-short me-1"></i>Receitas</span>
                                            </div>
                                            <div class="d-flex flex-column gap-2 mt-3" id="catReceitas">
                                                @foreach ($categorias->where('tipo', 'R') as $categoria)
                                                    <div class="cfg-cat-item">
                                                        <span class="cfg-cat-dot" style="background:#198754"></span>
                                                        <span class="cfg-cat-label">{{ $categoria->nome }}</span>
                                                        <button class="fp-icon-btn ms-1" title="Editar"><i
                                                                class="bi bi-pencil"></i></button>
                                                        <button class="fp-icon-btn fp-icon-danger" title="Excluir"><i
                                                                class="bi bi-trash3"></i></button>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="cfg-cat-group">
                                            <div class="cfg-cat-group-header">
                                                <span class="fp-type-badge fp-type-despesa"><i
                                                        class="bi bi-arrow-up-short me-1"></i>Despesas</span>
                                            </div>
                                            <div class="d-flex flex-column gap-2 mt-3" id="catDespesas">
                                                @foreach ($categorias->where('tipo', 'D') as $categoria)
                                                    <div class="cfg-cat-item">
                                                        <span class="cfg-cat-dot" style="background:#DC3545"></span>
                                                        <span class="cfg-cat-label">{{ $categoria->nome }}</span>
                                                        <button class="fp-icon-btn ms-1" title="Editar"><i
                                                                class="bi bi-pencil"></i></button>
                                                        <button class="fp-icon-btn fp-icon-danger" title="Excluir"><i
                                                                class="bi bi-trash3"></i></button>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- end tab categorias -->


                    <!-- ═══════════════════════════════════
               TAB: Centros de Custo
          ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-centros-custo">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                                    <div>
                                        <h5 class="fp-section-title mb-1">Centros de Custo</h5>
                                        <p class="fp-section-sub mb-0">Distribua despesas por departamento ou projeto
                                        </p>
                                    </div>
                                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1">
                                        <i class="bi bi-plus-lg"></i> Novo Centro
                                    </button>
                                </div>
                                <div class="table-responsive">
                                    <table class="table fp-table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Código</th>
                                                <th>Responsável</th>
                                                <th>Orçamento Mensal</th>
                                                <th>Utilizado</th>
                                                <th>Status</th>
                                                <th style="width:60px"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="ccBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end tab centros-custo -->


                    <!-- ═══════════════════════════════════
               TAB: Dados da Empresa
          ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-empresa">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <h5 class="fp-section-title mb-1">Dados da Empresa</h5>
                                <p class="fp-section-sub mb-4">Informações cadastrais e fiscais utilizadas no sistema
                                </p>

                                <div class="row g-3">
                                    <div class="col-12 text-center mb-2">
                                        <div class="cfg-logo-upload">
                                            <div class="cfg-logo-preview">
                                                <i class="bi bi-layers-fill"></i>
                                            </div>
                                            <button class="btn fp-btn-outline-secondary btn-sm mt-2">
                                                <i class="bi bi-camera me-1"></i>Alterar Logo
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <label class="fp-label">Razão Social <span
                                                class="text-danger">*</span></label>
                                        <input type="text" class="form-control fp-input"
                                            value="Empresa Tecnologia LTDA" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="fp-label">CNPJ <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control fp-input"
                                            value="12.345.678/0001-99" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="fp-label">Nome Fantasia</label>
                                        <input type="text" class="form-control fp-input" value="FinanceiroPro" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="fp-label">Inscrição Estadual</label>
                                        <input type="text" class="form-control fp-input"
                                            value="123.456.789.000" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="fp-label">E-mail Financeiro</label>
                                        <input type="email" class="form-control fp-input"
                                            value="financeiro@empresa.com.br" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="fp-label">Telefone</label>
                                        <input type="text" class="form-control fp-input" value="(11) 3456-7890" />
                                    </div>
                                    <div class="col-md-8">
                                        <label class="fp-label">Endereço</label>
                                        <input type="text" class="form-control fp-input"
                                            value="Av. Paulista, 1000 — Bela Vista" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="fp-label">CEP</label>
                                        <input type="text" class="form-control fp-input" value="01310-100" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="fp-label">Regime Tributário</label>
                                        <select class="form-select fp-input">
                                            <option selected>Simples Nacional</option>
                                            <option>Lucro Presumido</option>
                                            <option>Lucro Real</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="fp-label">Moeda Padrão</label>
                                        <select class="form-select fp-input">
                                            <option selected>BRL — Real Brasileiro</option>
                                            <option>USD — Dólar Americano</option>
                                            <option>EUR — Euro</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- end tab empresa -->


                    <!-- ═══════════════════════════════════
               TAB: Usuários
          ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-usuarios">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                                    <div>
                                        <h5 class="fp-section-title mb-1">Usuários e Acesso</h5>
                                        <p class="fp-section-sub mb-0">Gerencie quem pode acessar o sistema e suas
                                            permissões</p>
                                    </div>
                                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1">
                                        <i class="bi bi-person-plus"></i> Convidar Usuário
                                    </button>
                                </div>
                                <div class="d-flex flex-column gap-3" id="userList"></div>
                            </div>
                        </div>
                    </div>


                    <!-- ═══════════════════════════════════
               TAB: Notificações
          ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-notificacoes">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <h5 class="fp-section-title mb-1">Notificações</h5>
                                <p class="fp-section-sub mb-4">Escolha quando e como deseja ser alertado</p>

                                <div class="d-flex flex-column gap-1" id="notifList"></div>

                            </div>
                        </div>
                    </div>


                    <!-- ═══════════════════════════════════
               TAB: Integrações
          ══════════════════════════════════════ -->
                    <div class="cfg-tab" id="tab-integrações">
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <h5 class="fp-section-title mb-1">Integrações</h5>
                                <p class="fp-section-sub mb-4">Conecte o sistema a outras plataformas</p>
                                <div class="cfg-integrations-grid" id="integrationsList"></div>
                            </div>
                        </div>
                    </div>


                </div>
                <!-- end content col -->
            </div>
            <!-- end row -->

        </div>
    </main>


    @include('configuracoes.modals.conta-bancaria')

    @include('configuracoes.modals.forma-pagamento')

    @include('configuracoes.modals.forma-recebimento')

    @include('configuracoes.modals.categorias')


</x-app-layout>
