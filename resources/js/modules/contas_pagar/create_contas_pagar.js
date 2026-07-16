(function () {

    /* ── Helpers ──────────────────────────────────────────── */
    const fmt = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    function parseValor(str) {
        if (!str) return 0;
        const clean = str.replace(/\./g, '').replace(',', '.');
        return parseFloat(clean) || 0;
    }

    function formatDateBR(dateStr) {
        if (!dateStr) return '—';
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
    }

    /* ── Currency mask ────────────────────────────────────── */
    const valorInput = document.getElementById('valorInput');
    valorInput.addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '');
        if (!v) { this.value = ''; updateSummary(); return; }
        v = (parseInt(v, 10) / 100).toFixed(2);
        this.value = parseFloat(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        updateSummary();
    });

    /* ── Default dates ────────────────────────────────────── */
    const emissaoInput = document.getElementById('emissaoInput');
    const vencimentoInput = document.getElementById('vencimentoInput');
    emissaoInput.valueAsDate = new Date();
    const venc = new Date();
    venc.setDate(venc.getDate() + 30);
    vencimentoInput.valueAsDate = venc;

    /* ── Summary live update ──────────────────────────────── */
    const clienteSelect = document.querySelector('.cfr-client-select select');

    // Simpler approach: bind directly by traversing known fields
    const allSelects = document.querySelectorAll('select.fp-input');

    function refreshSummary() {
        document.getElementById('summaryValor').textContent = fmt(parseValor(valorInput.value));
        document.getElementById('summaryVencimento').textContent = formatDateBR(vencimentoInput.value);
        document.getElementById('summaryCliente').textContent = clienteSelect.value || '—';
        document.getElementById('summaryCategoria').textContent = catSelectEl.value || '—';
    }

    valorInput.addEventListener('input', refreshSummary);
    vencimentoInput.addEventListener('change', refreshSummary);
    clienteSelect.addEventListener('change', refreshSummary);
    catSelectEl.addEventListener('change', refreshSummary);
    refreshSummary();

    /* ── Recorrência toggle ───────────────────────────────── */
    document.getElementById('recorrenteSwitch').addEventListener('change', function () {
        document.getElementById('recorrenciaOptions').classList.toggle('d-none', !this.checked);
    });

    /* ── Parcelamento toggle ──────────────────────────────── */
    document.getElementById('parcelaSwitch').addEventListener('change', function () {
        document.getElementById('parcelaOptions').classList.toggle('d-none', !this.checked);
    });

    /* ────────────────────────────────────────────────────────
 * Parcelamento
 * ──────────────────────────────────────────────────────── */

    const parcelasWrap = document.getElementById('parcelasWrap');
    const parcelasSummary = document.getElementById('parcelasSummary');
    const parcelasBody = document.getElementById('parcelasBody');
    const parcelasFoot = document.getElementById('parcelasFoot');

    let parcelas = [];

    document
        .getElementById('gerarParcelasBtn')
        .addEventListener('click', gerarParcelas);

    function gerarParcelas() {

        const total = parseValor(valorInput.value);

        if (total <= 0) {
            parcelasWrap.classList.add('d-none');
            return;
        }

        parcelas = [];

        const qtd = parseInt(document.getElementById('numParcelas').value) || 1;

        const intervalo =
            parseInt(document.getElementById('intervaloParcelas').value) || 30;

        const dataBase = vencimentoInput.value
            ? new Date(vencimentoInput.value + 'T00:00:00')
            : new Date();

        let restante = total;

        for (let i = 0; i < qtd; i++) {

            const valor = i === qtd - 1
                ? restante
                : +(total / qtd).toFixed(2);

            restante -= valor;

            const dias = intervalo * i;

            const vencimento = new Date(dataBase);
            vencimento.setDate(vencimento.getDate() + dias);

            parcelas.push({

                numero: i + 1,

                dias,

                vencimento: vencimento
                    .toISOString()
                    .substring(0, 10),

                valor

            });

        }

        renderParcelas();

    }

    function renderParcelas() {

        parcelasWrap.classList.remove('d-none');

        parcelasBody.innerHTML = '';

        parcelas.forEach((parcela) => {

            parcelasBody.insertAdjacentHTML('beforeend', `

            <tr>

                <td>${parcela.numero}</td>

                <td>

                    <input
                        type="number"
                        class="form-control fp-input parcela-dias"
                        data-index="${parcela.numero - 1}"
                        value="${parcela.dias}">

                </td>

                <td>

                    <input
                        type="date"
                        class="form-control fp-input parcela-data"
                        data-index="${parcela.numero - 1}"
                        value="${parcela.vencimento}">

                </td>

                <td>

                    <input
                        type="number"
                        class="form-control fp-input parcela-valor"
                        step="0.01"
                        data-index="${parcela.numero - 1}"
                        value="${parcela.valor.toFixed(2)}">

                </td>

                <td>

                    <button
                        type="button"
                        class="btn btn-link text-danger remover-parcela"
                        data-index="${parcela.numero - 1}">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>

        `);

        });

        atualizarResumoParcelas();

        atualizarRodapeParcelas();

    }

    function atualizarResumoParcelas() {

        const total = parcelas.reduce((soma, p) => soma + p.valor, 0);

        parcelasSummary.innerHTML = `

        <div class="d-flex justify-content-between">

            <strong>${parcelas.length} parcelas</strong>

            <strong>${fmt(total)}</strong>

        </div>

    `;

    }

    function atualizarRodapeParcelas() {

        const total = parcelas.reduce((soma, p) => soma + p.valor, 0);

        parcelasFoot.innerHTML = `

        <tr>

            <th colspan="3" class="text-end">

                Total

            </th>

            <th>

                ${fmt(total)}

            </th>

            <th></th>

        </tr>

    `;

    }

    /* ── Status options ───────────────────────────────────── */
    document.getElementById('statusOptions').addEventListener('click', e => {
        const btn = e.target.closest('.cfr-status-opt');
        if (!btn) return;
        document.querySelectorAll('.cfr-status-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });

    /* ── Dropzone + file list ─────────────────────────────── */
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', e => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', () => handleFiles(fileInput.files));

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            const sizeKB = (file.size / 1024).toFixed(0);
            const div = document.createElement('div');
            div.className = 'cfr-file-item';
            div.innerHTML = `
        <div class="cfr-file-icon"><i class="bi bi-file-earmark-pdf"></i></div>
        <span class="cfr-file-name">${file.name}</span>
        <span class="cfr-file-size">${sizeKB} KB</span>
        <button type="button" class="fp-icon-btn fp-icon-danger remove-file"><i class="bi bi-x-lg"></i></button>
      `;
            div.querySelector('.remove-file').addEventListener('click', () => div.remove());
            fileList.appendChild(div);
        });
    }

    /* ── Save actions ─────────────────────────────────────── */
    function showToast() {
        const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('cfrToast'), { delay: 3000 });
        toast.show();
    }

    function feedbackButton(btn, label) {
        const orig = btn.innerHTML;
        btn.innerHTML = `<i class="bi bi-check2 me-1"></i> ${label}`;
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.disabled = false;
        }, 1800);
    }

    document.getElementById('saveReceberBtn').addEventListener('click', () => {
        const btn = document.getElementById('saveReceberBtn');
        feedbackButton(btn, 'Salvo!');
        showToast();
    });

    const radios = document.querySelectorAll('input[name="recorrencia_fim"]');

    const dataFim = document.getElementById('recDataFim');
    const ocorrencias = document.getElementById('recQtdOcorrencias');

    function atualizarRecorrencia() {
        dataFim.disabled = true;
        ocorrencias.disabled = true;

        const selecionado = document.querySelector(
            'input[name="recorrencia_fim"]:checked'
        ).value;

        if (selecionado === 'data') {
            dataFim.disabled = false;
        }

        if (selecionado === 'ocorrencias') {
            ocorrencias.disabled = false;
        }
    }

    radios.forEach(r => r.addEventListener('change', atualizarRecorrencia));

    atualizarRecorrencia();

})();

