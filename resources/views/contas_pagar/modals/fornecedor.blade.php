<!-- ===========================================================
 Modal Lateral - Cadastro Rápido de Fornecedor
=========================================================== -->

<div class="cfr-drawer-backdrop" id="fornecedorBackdrop"></div>

<aside class="cfr-drawer" id="fornecedorDrawer">

    <form action="{{ route('contas-pagar.fornecedores.store') }}" id="formFornecedor" method="POST">
        @csrf

        <div class="cfr-drawer-header">

            <div class="d-flex align-items-center gap-3">
                <div class="cfr-drawer-icon">
                    <i class="bi bi-building"></i>
                </div>

                <div>
                    <h5 class="fp-page-title mb-1">Novo Fornecedor</h5>
                    <small class="fp-page-subtitle">
                        Cadastro rápido para lançamento financeiro
                    </small>
                </div>
            </div>

            <button type="button" class="cfr-drawer-close" id="closeFornecedorDrawer">

                <i class="bi bi-x-lg"></i>

            </button>

        </div>

        <div class="cfr-drawer-body">

            {{-- <div class="alert alert-light border mb-4">
            Caso o fornecedor ainda não exista,
            informe apenas o nome para identificação
            ou digite o CNPJ para buscar automaticamente.
        </div> --}}

            <!-- Dica -->
            <div class="cfr-tip-box mb-4">
                <i class="bi bi-lightbulb"></i>
                <div>
                    <div class="cfr-tip-title">Dica</div>
                    <div class="cfr-tip-text">Caso o fornecedor ainda não exista,
                        informe apenas o nome para identificação
                        ou digite o CNPJ para buscar automaticamente.</div>
                </div>
            </div>

            <div class="mb-3">

                <label class="fp-label">
                    Nome do fornecedor
                </label>

                <input type="text" name="nome" class="form-control fp-input" placeholder="Ex: CPFL, Semae, Imobiliária">

            </div>

            <div class="mb-3">

                <label class="fp-label">
                    CNPJ
                </label>

                <div class="input-group">

                    <input type="text" name="cnpj" class="form-control fp-input" placeholder="00.000.000/0000-00">

                    <button id="btnBuscarCnpj" class="btn fp-btn-outline-secondary" type="button">

                        <i class="bi bi-search"></i>

                    </button>

                </div>

                <small class="text-muted">
                    Caso informado, será realizada consulta automática.
                </small>

            </div>

        </div>

        <div class="cfr-drawer-footer">

            <button type="button" class="btn fp-btn-outline-secondary" id="cancelFornecedor">

                Cancelar

            </button>

            <button type="submit" class="btn fp-btn-primary">

                Salvar Fornecedor

            </button>

        </div>

    </form>

</aside>
