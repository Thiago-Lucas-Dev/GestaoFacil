@push('scripts')
    @vite('resources/js/modules/configuracoes/formas_recebimento.js');
@endpush

<!-- ═══════ MODAL: Forma Recebimento ═══════ -->
<div class="modal fade" id="modalFormaReceb" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="max-width:480px">
        <div class="modal-content fp-modal">
            <div class="fp-modal-header">
                <div class="d-flex align-items-center gap-2">
                    <div class="fp-modal-icon" style="background:var(--fp-success-soft);color:var(--fp-success)">
                        <i class="bi bi-cash-stack"></i>
                    </div>
                    <div>
                        <h5 class="fp-modal-title mb-0">Forma de Recebimento</h5>
                        <p class="fp-modal-sub mb-0">Configure um novo meio de recebimento</p>
                    </div>
                </div>
                <button type="button" class="fp-modal-close" data-bs-dismiss="modal"><i
                        class="bi bi-x-lg"></i></button>
            </div>

            <form action="{{ route('configuracoes.formas-recebimento.store') }}" method="POST">
                @csrf

                <div class="fp-modal-body">
                    <div class="row g-3">

                        <div class="col-12">
                            <label class="fp-label">Nome <span class="text-danger">*</span></label>
                            <input type="text" name="nome" id="nome_recebimento" class="form-control fp-input"
                                placeholder="Ex: Cheque, Transferência..." required>
                        </div>

                        <div class="col-md-6">
                            <label class="fp-label">Tipo <span class="text-danger">*</span></label>
                            <select class="form-select fp-input" name="tipo" id="tipo_recebimento" required>
                                <option value="" disabled selected>Selecione</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="credito">Cartão de crédito</option>
                                <option value="debito">Cartão de débito</option>
                                <option value="pix">PIX</option>
                                <option value="boleto">Boleto</option>
                                <option value="transferencia">Transferência</option>
                                <option value="cheque">Cheque</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="fp-label">Conta vinculada <span class="text-danger">*</span></label>
                            <select class="form-select fp-input" name="conta_bancaria_id" required>
                                <option value="" disabled selected>Selecione</option>

                                @foreach ($contas as $conta)
                                    <option value="{{ $conta->id }}">
                                        {{ $conta->nome }} — C/C {{ $conta->conta }}
                                    </option>
                                @endforeach

                            </select>
                        </div>

                        <div class="col-6">
                            <label class="fp-label">Taxa (%) <span class="text-danger">*</span></label>
                            <input type="number" class="form-select fp-input" name="taxa" placeholder="00,00%" step="0.01" min="0">
                        </div>

                        <div class="col-md-6">
                            <label class="fp-label">Prazo de Repasse <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text">D +</span>
                                <input type="number" name="prazo_repasse" class="form-select fp-input" min="0"
                                    step="1" placeholder="0" required>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="cfg-toggle-row">
                                <div>
                                    <div class="cfg-toggle-title">Ativo</div>
                                    <div class="cfg-toggle-sub">Disponível para seleção em lançamentos</div>
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
            </form>
        </div>
    </div>
</div>
