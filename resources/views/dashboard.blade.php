<x-app-layout>
    <main class="fp-main">
        <div class="container-xxl py-4">

            <!-- Page Header -->
            <div class="fp-page-header d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div>
                    <h1 class="fp-page-title mb-1">Dashboard</h1>
                    <p class="fp-page-subtitle mb-0">
                        <i class="bi bi-calendar3 me-1"></i>
                        Junho 2025 &nbsp;·&nbsp; Visão geral financeira da empresa
                    </p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn fp-btn-outline-secondary btn-sm d-flex align-items-center gap-1">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1">
                        <i class="bi bi-plus-lg"></i> Nova Transação
                    </button>
                </div>
            </div>


            <!-- ===== SUMMARY CARDS ===== -->
            <div class="row g-3 mb-4">

                <!-- Saldo Atual -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-primary">
                                    <i class="bi bi-wallet2"></i>
                                </div>
                                <span class="fp-badge-trend fp-trend-up">
                                    <i class="bi bi-arrow-up-short"></i> 8,4%
                                </span>
                            </div>
                            <div class="fp-card-label">Saldo Atual</div>
                            <div class="fp-card-value">R$ 284.750,00</div>
                            <div class="fp-card-meta">
                                <i class="bi bi-info-circle me-1"></i>vs. mês anterior
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contas a Receber -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-success">
                                    <i class="bi bi-arrow-down-circle"></i>
                                </div>
                                <span class="fp-badge-trend fp-trend-up">
                                    <i class="bi bi-arrow-up-short"></i> 12,1%
                                </span>
                            </div>
                            <div class="fp-card-label">Contas a Receber</div>
                            <div class="fp-card-value">R$ 157.320,50</div>
                            <div class="fp-card-meta">
                                <i class="bi bi-clock me-1"></i>23 títulos em aberto
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contas a Pagar -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-danger">
                                    <i class="bi bi-arrow-up-circle"></i>
                                </div>
                                <span class="fp-badge-trend fp-trend-down">
                                    <i class="bi bi-arrow-down-short"></i> 3,2%
                                </span>
                            </div>
                            <div class="fp-card-label">Contas a Pagar</div>
                            <div class="fp-card-value">R$ 89.440,00</div>
                            <div class="fp-card-meta">
                                <i class="bi bi-exclamation-circle me-1"></i>7 vencendo esta semana
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fluxo de Caixa -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-warning">
                                    <i class="bi bi-graph-up-arrow"></i>
                                </div>
                                <span class="fp-badge-trend fp-trend-up">
                                    <i class="bi bi-arrow-up-short"></i> 5,7%
                                </span>
                            </div>
                            <div class="fp-card-label">Fluxo de Caixa</div>
                            <div class="fp-card-value">R$ 67.880,50</div>
                            <div class="fp-card-meta">
                                <i class="bi bi-calendar-check me-1"></i>Projeção mensal
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- ===== END SUMMARY CARDS ===== -->


            <!-- ===== MAIN CHART + UPCOMING ===== -->
            <div class="row g-3 mb-4">

                <!-- Chart -->
                <div class="col-12 col-xl-8">
                    <div class="fp-card h-100">
                        <div class="fp-card-body p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                                <div>
                                    <h5 class="fp-section-title mb-1">Receitas vs. Despesas</h5>
                                    <p class="fp-section-sub mb-0">Comparativo dos últimos 12 meses</p>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <span class="fp-legend-dot fp-legend-receitas">Receitas</span>
                                    <span class="fp-legend-dot fp-legend-despesas">Despesas</span>
                                    <div class="dropdown">
                                        <button class="btn fp-btn-outline-secondary btn-sm" type="button" data-bs-toggle="dropdown">
                                            2025 <i class="bi bi-chevron-down ms-1"></i>
                                        </button>
                                        <ul class="dropdown-menu fp-dropdown border-0 shadow-lg">
                                            <li><a class="dropdown-item fp-dropdown-item" href="#">2025</a></li>
                                            <li><a class="dropdown-item fp-dropdown-item" href="#">2024</a></li>
                                            <li><a class="dropdown-item fp-dropdown-item" href="#">2023</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="fp-chart-wrap">
                                <canvas id="mainChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Bills -->
                <div class="col-12 col-xl-4">
                    <div class="fp-card h-100">
                        <div class="fp-card-body p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <h5 class="fp-section-title mb-1">Próximos Vencimentos</h5>
                                    <p class="fp-section-sub mb-0">7 dias à frente</p>
                                </div>
                                <a href="#" class="fp-link-sm">Ver todos</a>
                            </div>
                            <div class="d-flex flex-column gap-3" id="upcomingList">
                                <!-- Populated by JS -->
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- ===== END CHART + UPCOMING ===== -->


            <!-- ===== TRANSACTIONS TABLE ===== -->
            <div class="fp-card">
                <div class="fp-card-body p-4">
                    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                        <div>
                            <h5 class="fp-section-title mb-1">Últimas Movimentações</h5>
                            <p class="fp-section-sub mb-0">Transações recentes da empresa</p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <div class="fp-search-wrap">
                                <i class="bi bi-search fp-search-icon"></i>
                                <input type="text" class="form-control fp-search" placeholder="Buscar..." id="searchInput" />
                            </div>
                            <button class="btn fp-btn-outline-secondary btn-sm d-flex align-items-center gap-1">
                                <i class="bi bi-download"></i> Exportar
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table fp-table mb-0">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th class="d-none d-md-table-cell">Categoria</th>
                                    <th class="d-none d-sm-table-cell">Tipo</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="transactionsBody">
                                <!-- Populated by JS -->
                            </tbody>
                        </table>
                    </div>

                    <div class="d-flex align-items-center justify-content-between mt-4 flex-wrap gap-2">
                        <p class="fp-table-meta mb-0" id="tableCount">Exibindo 10 de 48 registros</p>
                        <nav>
                            <ul class="pagination fp-pagination mb-0">
                                <li class="page-item disabled"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- ===== END TRANSACTIONS TABLE ===== -->

        </div>
    </main>
</x-app-layout>