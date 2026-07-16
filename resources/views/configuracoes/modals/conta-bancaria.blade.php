<!-- ═══════ MODAL: Conta Bancária ═══════ -->
<div class="modal fade" id="modalContaBancaria" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="max-width:540px">
        <div class="modal-content fp-modal">
            <div class="fp-modal-header">
                <div class="d-flex align-items-center gap-2">
                    <div class="fp-modal-icon"><i class="bi bi-bank"></i></div>
                    <div>
                        <h5 class="fp-modal-title mb-0">Conta Bancária</h5>
                        <p class="fp-modal-sub mb-0">Cadastro de nova conta</p>
                    </div>
                </div>
                <button type="button" class="fp-modal-close" data-bs-dismiss="modal"><i
                        class="bi bi-x-lg"></i></button>
            </div>

            <form action="{{ route('configuracoes.contas-bancarias.store') }}" method="POST">
                @csrf


                <div class="fp-modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="fp-label">Banco <span class="text-danger">*</span></label>
                            <select name="codigo_banco" class="form-select fp-input">
                                <option value="" disabled selected>Selecione o banco...</option>
                                <option value="001">001 — Banco do Brasil</option>
                                <option value="033">033 — Santander</option>
                                <option value="104">104 — Caixa Econômica Federal</option>
                                <option value="237">237 — Bradesco</option>
                                <option value="341">341 — Itaú Unibanco</option>
                                <option value="260">260 — Nubank</option>
                                <option value="077">077 — Banco Inter</option>
                                <option value="336">336 — C6 Bank</option>
                                <option value="748">748 — Sicredi</option>
                                <option value="756">756 — Sicoob</option>
                            </select>
                        </div>
                        <div class="col-md-5">
                            <label class="fp-label">Agência <span class="text-danger">*</span></label>
                            <input name="agencia" type="text" class="form-control fp-input" placeholder="0000" />
                        </div>
                        <div class="col-md-7">
                            <label class="fp-label">Número da Conta <span class="text-danger">*</span></label>
                            <input name="conta" type="text" class="form-control fp-input" placeholder="00000-0" />
                        </div>
                        <div class="col-md-12">
                            <label class="fp-label">Tipo de Conta</label>
                            <select name="tipo" class="form-select fp-input">
                                <option value="corrente">Conta Corrente</option>
                                <option value="poupanca">Conta Poupança</option>
                                <option value="pagamento">Conta de Pagamento</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="fp-label">Saldo Inicial</label>
                            <div class="fp-input-prefix-wrap">
                                <span class="fp-input-prefix">R$</span>
                                <input name="saldo_inicial" type="text" class="form-control fp-input fp-input-prefixed"
                                    placeholder="0,00" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="fp-label">Data do Saldo Inicial</label>
                            <input name="data_saldo_inicial" type="date" class="form-control fp-input" />
                        </div>
                        <div class="col-12">
                            <label class="fp-label">Nome de Identificação</label>
                            <input name="nome" type="text" class="form-control fp-input"
                                placeholder="Ex: Conta Principal, Reserva..." />
                        </div>
                        <div class="col-12">
                            <div class="cfg-toggle-row">
                                <div>
                                    <div class="cfg-toggle-title">Conta padrão para lançamentos</div>
                                    <div class="cfg-toggle-sub">Esta conta será pré-selecionada em novos lançamentos
                                    </div>
                                </div>
                                <div class="form-check form-switch cfg-switch">
                                    <input class="form-check-input" type="checkbox" checked />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fp-modal-footer">
                    <button type="button" class="btn fp-btn-outline-secondary"
                        data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn fp-btn-primary d-flex align-items-center gap-1">
                        <i class="bi bi-check-lg"></i> Salvar Conta
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
