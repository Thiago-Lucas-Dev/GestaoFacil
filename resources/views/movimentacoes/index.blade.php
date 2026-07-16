<x-app-layout>
    <main class="fp-main">
        <div class="container-xxl py-4">

            <!-- Page Header -->
            <div class="fp-page-header d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div>
                    <h1 class="fp-page-title mb-1">Movimentações</h1>
                    <p class="fp-page-subtitle mb-0">
                        <i class="bi bi-calendar3 me-1"></i>
                        Junho 2025 &nbsp;·&nbsp; Todas as entradas e saídas financeiras
                    </p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn fp-btn-outline-secondary btn-sm d-flex align-items-center gap-1">
                        <i class="bi bi-download"></i> Exportar
                    </button>
                    <button class="btn fp-btn-outline-secondary btn-sm d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#importModal">
                        <i class="bi bi-upload"></i> Importar
                    </button>
                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#novaMovModal">
                        <i class="bi bi-plus-lg"></i> Nova Movimentação
                    </button>
                </div>
            </div>


            <!-- ===== SUMMARY CARDS ===== -->
            <div class="row g-3 mb-4">
                <div class="col-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-primary"><i class="bi bi-arrow-left-right"></i></div>
                                <span class="fp-badge-trend fp-trend-up"><i class="bi bi-arrow-up-short"></i> 6,2%</span>
                            </div>
                            <div class="fp-card-label">Total de Movimentações</div>
                            <div class="fp-card-value">248</div>
                            <div class="fp-card-meta"><i class="bi bi-calendar me-1"></i>neste mês</div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-success"><i class="bi bi-arrow-down-circle"></i></div>
                                <span class="fp-badge-trend fp-trend-up"><i class="bi bi-arrow-up-short"></i> 12,1%</span>
                            </div>
                            <div class="fp-card-label">Total de Entradas</div>
                            <div class="fp-card-value">R$ 195.420,00</div>
                            <div class="fp-card-meta"><i class="bi bi-check-circle me-1"></i>108 receitas</div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-danger"><i class="bi bi-arrow-up-circle"></i></div>
                                <span class="fp-badge-trend fp-trend-down"><i class="bi bi-arrow-down-short"></i> 3,4%</span>
                            </div>
                            <div class="fp-card-label">Total de Saídas</div>
                            <div class="fp-card-value">R$ 127.540,00</div>
                            <div class="fp-card-meta"><i class="bi bi-dash-circle me-1"></i>140 despesas</div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-xl-3">
                    <div class="fp-card fp-card-summary h-100">
                        <div class="fp-card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="fp-card-icon fp-icon-warning"><i class="bi bi-bar-chart-line"></i></div>
                                <span class="fp-badge-trend fp-trend-up"><i class="bi bi-arrow-up-short"></i> 9,8%</span>
                            </div>
                            <div class="fp-card-label">Saldo do Período</div>
                            <div class="fp-card-value">R$ 67.880,00</div>
                            <div class="fp-card-meta"><i class="bi bi-graph-up me-1"></i>resultado positivo</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ===== END CARDS ===== -->


            <!-- ===== FILTERS BAR ===== -->
            <div class="fp-card mb-4">
                <div class="fp-card-body py-3 px-4">
                    <div class="d-flex align-items-center gap-3 flex-wrap">

                        <!-- Search -->
                        <div class="fp-search-wrap">
                            <i class="bi bi-search fp-search-icon"></i>
                            <input type="text" class="form-control fp-search" placeholder="Buscar movimentação..." id="searchInput" style="width:220px" />
                        </div>

                        <div class="fp-filter-divider d-none d-md-block"></div>

                        <!-- Type filter -->
                        <div class="d-flex align-items-center gap-1" id="typeFilters">
                            <button class="fp-filter-chip fp-chip-active" data-filter="todos">Todos</button>
                            <button class="fp-filter-chip" data-filter="receita">
                                <i class="bi bi-arrow-down-short text-success"></i> Entradas
                            </button>
                            <button class="fp-filter-chip" data-filter="despesa">
                                <i class="bi bi-arrow-up-short text-danger"></i> Saídas
                            </button>
                        </div>

                        <div class="fp-filter-divider d-none d-md-block"></div>

                        <!-- Period -->
                        <div class="d-flex align-items-center gap-2">
                            <select class="form-select fp-select" id="periodFilter" style="width:140px">
                                <option value="">Todos os meses</option>
                                <option value="6" selected>Junho 2025</option>
                                <option value="5">Maio 2025</option>
                                <option value="4">Abril 2025</option>
                                <option value="3">Março 2025</option>
                            </select>
                            <select class="form-select fp-select" id="categoryFilter" style="width:160px">
                                <option value="">Todas as categorias</option>
                                <option>Receita de Vendas</option>
                                <option>Serviços</option>
                                <option>Pessoal</option>
                                <option>Infraestrutura</option>
                                <option>Fornecedores</option>
                                <option>Imóveis</option>
                                <option>Software</option>
                                <option>Comercial</option>
                                <option>Tributário</option>
                            </select>
                            <select class="form-select fp-select" id="statusFilter" style="width:140px">
                                <option value="">Todos os status</option>
                                <option>pago</option>
                                <option>pendente</option>
                                <option>vencido</option>
                                <option>agendado</option>
                            </select>
                        </div>

                        <button class="btn fp-btn-outline-secondary btn-sm ms-auto d-flex align-items-center gap-1" id="clearFilters">
                            <i class="bi bi-x-circle"></i> Limpar
                        </button>

                    </div>
                </div>
            </div>
            <!-- ===== END FILTERS ===== -->


            <!-- ===== TABLE ===== -->
            <div class="fp-card">
                <div class="fp-card-body p-0">

                    <!-- Table toolbar -->
                    <div class="d-flex align-items-center justify-content-between px-4 py-3 border-bottom fp-table-toolbar flex-wrap gap-2">
                        <div class="d-flex align-items-center gap-3">
                            <p class="fp-table-meta mb-0" id="tableCount">Exibindo 10 de 36 registros</p>
                            <div class="fp-bulk-actions d-none align-items-center gap-2" id="bulkActions">
                                <span class="fp-table-meta" id="selectedCount">0 selecionados</span>
                                <button class="btn fp-btn-outline-secondary btn-sm"><i class="bi bi-check2-all me-1"></i>Confirmar</button>
                                <button class="btn btn-sm fp-btn-danger-outline"><i class="bi bi-trash me-1"></i>Excluir</button>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="fp-table-meta">Linhas por página:</span>
                            <select class="form-select fp-select" id="perPageSelect" style="width:70px">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="table-responsive">
                        <table class="table fp-table mb-0" id="movTable">
                            <thead>
                                <tr>
                                    <th style="width:40px">
                                        <input type="checkbox" class="fp-check" id="checkAll" />
                                    </th>
                                    <th class="fp-th-sort" data-col="date">Data <i class="bi bi-arrow-down-up ms-1 fp-sort-icon"></i></th>
                                    <th class="fp-th-sort" data-col="desc">Descrição <i class="bi bi-arrow-down-up ms-1 fp-sort-icon"></i></th>
                                    <th class="d-none d-lg-table-cell">Conta / Banco</th>
                                    <th class="d-none d-md-table-cell fp-th-sort" data-col="category">Categoria <i class="bi bi-arrow-down-up ms-1 fp-sort-icon"></i></th>
                                    <th class="d-none d-sm-table-cell">Tipo</th>
                                    <th class="fp-th-sort" data-col="amount">Valor <i class="bi bi-arrow-down-up ms-1 fp-sort-icon"></i></th>
                                    <th>Status</th>
                                    <th style="width:48px"></th>
                                </tr>
                            </thead>
                            <tbody id="movBody">
                                <!-- populated by JS -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="d-flex align-items-center justify-content-between px-4 py-3 border-top flex-wrap gap-2">
                        <p class="fp-table-meta mb-0" id="tableCountBottom">Exibindo 1–10 de 36 registros</p>
                        <nav>
                            <ul class="pagination fp-pagination mb-0" id="pagination">
                                <!-- populated by JS -->
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
            <!-- ===== END TABLE ===== -->

        </div>
    </main>
</x-app-layout>