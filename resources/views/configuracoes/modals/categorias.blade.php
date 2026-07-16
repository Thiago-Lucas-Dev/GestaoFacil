<!-- ═══════ MODAL: Categoria ═══════ -->
<div class="modal fade" id="modalCategoria" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="max-width:420px">

        <form action="{{ route('configuracoes.categorias.store') }}" method="POST">
            @csrf

            <div class="modal-content fp-modal">
                <div class="fp-modal-header">
                    <div class="d-flex align-items-center gap-2">
                        <div class="fp-modal-icon"><i class="bi bi-tag"></i></div>
                        <div>
                            <h5 class="fp-modal-title mb-0">Nova Categoria</h5>
                            <p class="fp-modal-sub mb-0">Categorize receitas e despesas</p>
                        </div>
                    </div>
                    <button type="button" class="fp-modal-close" data-bs-dismiss="modal"><i
                            class="bi bi-x-lg"></i></button>
                </div>

                <div class="fp-modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="fp-label">Nome da Categoria <span class="text-danger">*</span></label>
                            <input type="text" name="nome" class="form-control fp-input"
                                placeholder="Ex: Aluguel, Luz, Orçamentos..." />
                        </div>
                        <div class="col-md-12">
                            <label class="fp-label">Tipo</label>
                            <select class="form-select fp-input" name="tipo">
                                <option value="R">Receita</option>
                                <option value="D">Despesa</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <div class="cfg-toggle-row">
                                <div>
                                    <div class="cfg-toggle-title">Ativo</div>
                                    <div class="cfg-toggle-sub">Disponível para seleção</div>
                                </div>
                                <div class="form-check form-switch cfg-switch">

                                    <input type="hidden" name="ativo" value="0">

                                    <input name="ativo" value="1" class="form-check-input" type="checkbox"
                                        checked>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fp-modal-footer">
                    <button type="button" class="btn fp-btn-outline-secondary"
                        data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn fp-btn-primary"><i class="bi bi-check-lg me-1"></i>Salvar</button>
                </div>
            </div>
        </form>
    </div>
</div>
