@push('scripts')
    @vite('resources/js/modules/contas_pagar/create')
    @vite('resources/js/modules/contas_pagar/modal_fornecedor')
@endpush

<x-applayout>
    <main class="fp-main">
        <div class="container-xxl py-4">

            <div class="fp-page-header d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div class="d-flex align-items-center gap-3">
                    <a href="#" class="cfr-back-btn">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <div>
                        <h1 class="fp-page-title mb-1">Nova Conta a Pagar</h1>
                        <p class="fp-page-subtitle mb-0">
                            <i class="bi bi-arrow-down-circle me-1"></i>
                            Cadastre um novo título a receber
                        </p>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn fp-btn-outline-secondary btn-sm d-flex align-items-center gap-1">
                        <i class="bi bi-x-lg"></i> Cancelar
                    </button>
                    <button class="btn fp-btn-primary btn-sm d-flex align-items-center gap-1" id="saveReceberBtn">
                        <i class="bi bi-check-lg"></i> Salvar Conta
                    </button>
                </div>
            </div>


            <form id="receberForm">
                <div class="row g-4">

                    <!-- ════════ COLUNA PRINCIPAL ════════ -->
                    <div class="col-12 col-lg-8">

                        <!-- ── Dados do Recebimento ── -->
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="cfr-section-header">
                                    <div class="cfr-section-icon"><i class="bi bi-receipt"></i></div>
                                    <div>
                                        <h5 class="fp-section-title mb-1">Dados da Conta</h5>
                                        <p class="fp-section-sub mb-0">Informações principais da despesa</p>
                                    </div>
                                </div>

                                <div class="row g-3 mt-3">
                                    <div class="col-12">
                                        <label class="fp-label">Descrição <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control fp-input"
                                            placeholder="Ex: Prestação de Serviços — Contrato #1042" required />
                                    </div>

                                    <div class="col-md-8">
                                        <label class="fp-label">Fornecedor <span class="text-danger">*</span></label>
                                        <div class="cfr-client-select">
                                            <select class="form-select fp-input" id="fornecedorInput" required>
                                                <option value="">Selecione o cliente...</option>
                                                <option>Empresa Beta Comércio LTDA</option>
                                                <option>Studio ABC Design</option>
                                                <option>Cliente X — Pessoa Física</option>
                                                <option>Tech Solutions S.A.</option>
                                                <option>Marketplace Z Brasil</option>
                                            </select>
                                            <button type="button" class="cfr-add-client"
                                                title="Cadastrar novo cliente">
                                                <i class="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <label class="fp-label">Categoria <span class="text-danger">*</span></label>
                                        <select id="categoriaInput" class="form-select fp-input" required>
                                            <option value="">Selecione...</option>
                                            <option>Receita de Vendas</option>
                                            <option>Prestação de Serviços</option>
                                            <option>Juros e Correções</option>
                                            <option>Royalties</option>
                                            <option>Outras Receitas</option>
                                        </select>
                                    </div>

                                    <div class="section-divider"></div>

                                    <div class="col-md-6">
                                        <label class="fp-label">Data de Geração</label>
                                        <input type="date" class="form-control fp-input" id="emissaoInput" />
                                    </div>

                                    <div class="col-md-6">
                                        <label class="fp-label">Data de Vencimento <span
                                                class="text-danger">*</span></label>
                                        <input type="date" class="form-control fp-input" id="vencimentoInput"
                                            required />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- ── Recebimento e Recorrência ── -->
                        <div class="fp-card mb-4">
                            <div class="fp-card-body p-4">
                                <div class="cfr-section-header">
                                    <div class="cfr-section-icon"
                                        style="background:var(--fp-success-soft);color:var(--fp-success)"><i
                                            class="bi bi-arrow-repeat"></i></div>
                                    <div>
                                        <h5 class="fp-section-title mb-1">Condições de Pagamento</h5>
                                        <p class="fp-section-sub mb-0">Como e quando este título será pago</p>
                                    </div>
                                </div>

                                <div class="row g-3 mt-2">

                                    <div class="col-md-12">
                                        <label class="fp-label">Valor <span class="text-danger">*</span></label>
                                        <div class="fp-input-prefix-wrap">
                                            <span class="fp-input-prefix">R$</span>
                                            <input id="valorInput" type="text"
                                                class="form-control fp-input fp-input-prefixed" placeholder="0,00"
                                                required />
                                        </div>
                                    </div>

                                    <div class="section-divider"></div>

                                    {{-- <div class="col-md-6">
                                        <label class="fp-label">Forma de Recebimento</label>
                                        <select class="form-select fp-input">
                                            <option>PIX</option>
                                            <option>Boleto Bancário</option>
                                            <option>Cartão de Crédito</option>
                                            <option>Transferência Bancária (TED/DOC)</option>
                                            <option>Dinheiro</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="fp-label">Conta de Destino</label>
                                        <select class="form-select fp-input">
                                            <option>Itaú — C/C 98232-1</option>
                                            <option>Bradesco — C/C 45217-2</option>
                                            <option>Nubank — C/C 38124-1</option>
                                        </select>
                                    </div> --}}

                                    <!-- Recorrência toggle -->
                                    <div class="col-12">
                                        <div class="cfg-toggle-row">
                                            <div>
                                                <div class="cfg-toggle-title">Conta recorrente</div>
                                                <div class="cfg-toggle-sub">Repetir este lançamento automaticamente
                                                </div>
                                            </div>
                                            <div class="form-check form-switch cfg-switch">
                                                <input class="form-check-input" type="checkbox" id="recorrenteSwitch" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Recurrence options (hidden by default) -->
                                    <div class="col-12 d-none" id="recorrenciaOptions">
                                        <div class="cfr-recur-box">
                                            <div class="row g-3 mb-4">
                                                <div class="col-md-12">
                                                    <label class="fp-label">Frequência</label>
                                                    <select class="form-select fp-input">
                                                        <option>Mensal</option>
                                                        <option>Quinzenal</option>
                                                        <option>Semanal</option>
                                                        <option>Anual</option>
                                                    </select>
                                                </div>
                                                {{-- <div class="col-md-4">
                                                    <label class="fp-label">Repetir por</label>
                                                    <div class="cfr-input-suffix-wrap">
                                                        <input type="number" class="form-control fp-input"
                                                            value="12" min="1" />
                                                        <span class="cfr-input-suffix">vezes</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="fp-label">Encerrar em</label>
                                                    <input type="date" class="form-control fp-input" />
                                                </div> --}}
                                            </div>
                                            <div class="row g-3">

                                                <div class="col-12">
                                                    <label class="fp-label">Término da Recorrência</label>

                                                    <div class="d-flex flex-column gap-3 mt-2">

                                                        <!-- Sem término -->
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio"
                                                                name="recorrencia_fim" id="recSemFim"
                                                                value="indefinido" checked>

                                                            <label class="form-check-label" for="recSemFim">
                                                                Sem término
                                                            </label>
                                                        </div>

                                                        <!-- Até uma data -->
                                                        <div>
                                                            <div class="form-check mb-2">
                                                                <input class="form-check-input" type="radio"
                                                                    name="recorrencia_fim" id="recData"
                                                                    value="data">

                                                                <label class="form-check-label" for="recData">
                                                                    Encerrar em uma data
                                                                </label>
                                                            </div>

                                                            <input type="date" class="form-control fp-input"
                                                                id="recDataFim" disabled>
                                                        </div>

                                                        <!-- Após X ocorrências -->
                                                        <div>
                                                            <div class="form-check mb-2">
                                                                <input class="form-check-input" type="radio"
                                                                    name="recorrencia_fim" id="recOcorrencias"
                                                                    value="ocorrencias">

                                                                <label class="form-check-label" for="recOcorrencias">
                                                                    Encerrar após
                                                                </label>
                                                            </div>

                                                            <div class="cfr-input-suffix-wrap">
                                                                <input type="number" class="form-control fp-input"
                                                                    id="recQtdOcorrencias" min="1"
                                                                    value="12" disabled>

                                                                <span class="cfr-input-suffix">ocorrências</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- Parcelamento toggle -->
                                    <div class="col-12">
                                        <div class="cfg-toggle-row">
                                            <div>
                                                <div class="cfg-toggle-title">Receber em parcelas</div>
                                                <div class="cfg-toggle-sub">Dividir o valor total em múltiplos títulos
                                                </div>
                                            </div>
                                            <div class="form-check form-switch cfg-switch">
                                                <input class="form-check-input" type="checkbox" id="parcelaSwitch" />
                                            </div>
                                        </div>
                                    </div>

                                    {{-- <div class="col-12 d-none" id="parcelaOptions">
                                        <div class="cfr-recur-box">
                                            <div class="row g-3 align-items-end">
                                                <div class="col-md-4">
                                                    <label class="fp-label">Nº de Parcelas</label>
                                                    <input type="number" class="form-control fp-input"
                                                        value="3" min="2" max="48"
                                                        id="numParcelas" />
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="fp-label">Intervalo entre Parcelas</label>
                                                    <select class="form-select fp-input">
                                                        <option>30 dias</option>
                                                        <option>15 dias</option>
                                                        <option>60 dias</option>
                                                        <option>90 dias</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-4">
                                                    <button type="button" class="btn fp-btn-outline-secondary w-100"
                                                        id="gerarParcelasBtn">
                                                        <i class="bi bi-magic me-1"></i>Gerar Parcelas
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="mt-3" id="parcelasPreview"></div>
                                        </div>
                                    </div> --}}

                                    <div class="col-12 d-none" id="parcelaOptions">
                                        <div class="cfr-recur-box">

                                            <!-- Controls row -->
                                            <div class="row g-3 align-items-end">
                                                <div class="col-md-8">
                                                    <label class="fp-label">Parcelas</label>
                                                    <input type="text" class="form-control fp-input"
                                                        id="numParcelas" placeholder="Ex: 3x, 5x, 10 20 30 ou 21">
                                                </div>
                                                <div class="col-md-4">
                                                    <button type="button"
                                                        class="btn fp-btn-primary w-100 d-flex align-items-center justify-content-center gap-1"
                                                        id="gerarParcelasBtn" style="padding: 10px">
                                                        <i class="bi bi-calculator"></i> Gerar Parcelas
                                                    </button>

                                                </div>
                                            </div>

                                            <!-- Editable parcelas table -->
                                            <div class="d-none mt-4" id="parcelasWrap">

                                                <!-- Summary bar -->
                                                <div class="cfr-parcelas-summary" id="parcelasSummary"></div>

                                                <!-- Table -->
                                                <div class="cfr-parcelas-table-wrap mt-3">
                                                    <table class="cfr-parcelas-table" id="parcelasTable">
                                                        <thead>
                                                            <tr>
                                                                <th style="width:52px">Parc.</th>
                                                                <th style="width:80px">Dias</th>
                                                                <th>Data de Vencimento</th>
                                                                <th>Valor (R$)</th>
                                                                <th style="width:36px"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="parcelasBody"></tbody>
                                                        <tfoot id="parcelasFoot"></tfoot>
                                                    </table>
                                                </div>

                                                <!-- Actions -->
                                                <div
                                                    class="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
                                                    <span class="cfr-parcelas-hint">
                                                        <i class="bi bi-pencil me-1"></i>
                                                        Edite dias, data ou valor diretamente na tabela — os cálculos
                                                        são feitos na hora.
                                                    </span>
                                                    <button type="button"
                                                        class="btn fp-btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                                                        id="addParcelaBtn">
                                                        <i class="bi bi-plus-lg"></i> Adicionar Parcela
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- ── Anexos e Observações ── -->
                        <div class="fp-card">
                            <div class="fp-card-body p-4">
                                <div class="cfr-section-header">
                                    <div class="cfr-section-icon"
                                        style="background:var(--fp-warning-soft);color:var(--fp-warning)"><i
                                            class="bi bi-paperclip"></i></div>
                                    <div>
                                        <h5 class="fp-section-title mb-1">Observações</h5>
                                        <p class="fp-section-sub mb-0">Observações de apoio ou notas internas</p>
                                    </div>
                                </div>

                                <div class="row g-3 mt-3">
                                    {{-- <div class="col-12">
                                        <label class="fp-label">Anexar Documento</label>
                                        <div class="cfr-dropzone" id="dropzone">
                                            <i class="bi bi-cloud-arrow-up cfr-dropzone-icon"></i>
                                            <p class="cfr-dropzone-title">Arraste o arquivo ou clique para selecionar
                                            </p>
                                            <p class="cfr-dropzone-sub">PDF, JPG, PNG — máx. 10MB</p>
                                            <input type="file" class="d-none" id="fileInput" multiple />
                                        </div>
                                        <div class="d-flex flex-column gap-2 mt-2" id="fileList"></div>
                                    </div> --}}
                                    <div class="col-12">
                                        <label class="fp-label">Observações</label>
                                        <textarea class="form-control fp-input" rows="4"
                                            placeholder="Informações adicionais sobre este recebimento..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- ════════ FIM COLUNA PRINCIPAL ════════ -->


                    <!-- ════════ SIDEBAR ════════ -->
                    <div class="col-12 col-lg-4">

                        <!-- Resumo -->
                        <div class="fp-card mb-4 cfr-summary-sticky">
                            <div class="fp-card-body p-4">
                                <h5 class="fp-section-title mb-3">Resumo do Título</h5>

                                <div class="cfr-summary-amount">
                                    <span class="cfr-summary-label">Valor a Receber</span>
                                    <span class="cfr-summary-value" id="summaryValor">R$ 0,00</span>
                                </div>

                                <div class="cfr-summary-row">
                                    <span class="cfr-summary-key"><i
                                            class="bi bi-calendar-event me-1"></i>Vencimento</span>
                                    <span class="cfr-summary-val" id="summaryVencimento">—</span>
                                </div>
                                <div class="cfr-summary-row">
                                    <span class="cfr-summary-key"><i class="bi bi-person me-1"></i>Fornecedor</span>
                                    <span class="cfr-summary-val" id="summaryCliente">—</span>
                                </div>
                                <div class="cfr-summary-row">
                                    <span class="cfr-summary-key"><i class="bi bi-tag me-1"></i>Categoria</span>
                                    <span class="cfr-summary-val" id="summaryCategoria">—</span>
                                </div>
                                <div class="cfr-summary-row">
                                    <span class="cfr-summary-key"><i class="bi bi-flag me-1"></i>Status</span>
                                    <span class="fp-badge fp-badge-pendente">Pendente</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <!-- ════════ FIM SIDEBAR ════════ -->

                </div>
            </form>

            <!-- Bottom action bar (mobile-friendly sticky) -->
            <div class="cfr-bottom-bar d-lg-none">
                <button class="btn fp-btn-outline-secondary flex-fill">Cancelar</button>
                <button class="btn fp-btn-primary flex-fill d-flex align-items-center justify-content-center gap-1">
                    <i class="bi bi-check-lg"></i> Salvar Conta
                </button>
            </div>

        </div>

        @include('contas_pagar.modals.fornecedor')
        
    </main>
</x-applayout>
