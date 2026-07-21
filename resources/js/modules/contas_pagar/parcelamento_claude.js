/* ============================================================
   FINANCEIRO PRO — conta-receber-form.js
   ============================================================ */

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
  const emissaoInput     = document.getElementById('emissaoInput');
  const vencimentoInput  = document.getElementById('vencimentoInput');
  emissaoInput.valueAsDate = new Date();
  const venc = new Date();
  venc.setDate(venc.getDate() + 30);
  vencimentoInput.valueAsDate = venc;

  /* ── Summary live update ──────────────────────────────── */
  const clienteSelect   = document.querySelector('.cfr-client-select select');
  const categoriaSelect = document.querySelectorAll('select.fp-input')[1]; // categoria select

  function updateSummary() {
    document.getElementById('summaryValor').textContent = fmt(parseValor(valorInput.value));
    document.getElementById('summaryVencimento').textContent = formatDateBR(vencimentoInput.value);

    const clienteVal = clienteSelect ? clienteSelect.value : '';
    document.getElementById('summaryCliente').textContent = clienteVal || '—';

    const catSelects = document.querySelectorAll('.col-12 select.fp-input, .col-md-6 select.fp-input');
  }

  // Simpler approach: bind directly by traversing known fields
  const descInput = document.querySelector('input[placeholder*="Prestação"]');
  const allSelects = document.querySelectorAll('select.fp-input');
  const catSelectEl = allSelects[1]; // 0: cliente, 1: categoria

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

  /* ── PARCELAS — engine completo ────────────────────────── */

  // Estado global das parcelas
  let parcelasData = [];   // [{ dias, data, valor, editedValor }]
  let baseDate = null;     // data base (vencimento do form)

  const parcelasWrap  = document.getElementById('parcelasWrap');
  const parcelasBody  = document.getElementById('parcelasBody');
  const parcelasFoot  = document.getElementById('parcelasFoot');
  const parcelasSumEl = document.getElementById('parcelasSummary');

  // ── Helpers de data ──────────────────────────────────────
  function addDias(dateObj, n) {
    const d = new Date(dateObj);
    d.setDate(d.getDate() + n);
    return d;
  }

  function toInputDate(d) {
    return d.toISOString().slice(0, 10);
  }

  function toBR(d) {
    const [y, m, dd] = d instanceof Date
      ? [d.getFullYear(), String(d.getMonth() + 1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')]
      : d.split('-');
    return `${dd}/${m}/${y}`;
  }

  function fromInputDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  // ── Helpers de valor ─────────────────────────────────────
  function fmtValor(n) {
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function parseValorField(str) {
    return parseFloat(String(str).replace(/\./g, '').replace(',', '.')) || 0;
  }

  // ── Interpretar input de parcelas ────────────────────────
  // Aceita: "3", "3x", "5X", "10 20 30", "10 20 30 45"
  function parseParcelas(raw, intervalo) {
    const str = raw.trim().replace(/x$/i, '');

    // Números separados por espaço → dias individuais
    if (/^[\d\s]+$/.test(str) && str.includes(' ')) {
      return str.split(/\s+/).map(Number).filter(Boolean);
    }

    // Número simples → repetir intervalo
    const n = parseInt(str, 10);
    if (!n || n < 1) return [];
    const iv = parseInt(intervalo, 10) || 30;
    return Array.from({ length: n }, (_, i) => (i + 1) * iv);
  }

  // ── Distribuir valor total nas parcelas ──────────────────
  function distribuirValor(total, n) {
    if (!n) return [];
    const base  = Math.floor((total * 100) / n);      // centavos
    const resto = Math.round(total * 100) - base * n;  // centavos extras
    return Array.from({ length: n }, (_, i) =>
      parseFloat(((i === n - 1 ? base + resto : base) / 100).toFixed(2))
    );
  }

  // ── Recalcular todos os dias a partir das datas ──────────
  function recalcDias() {
    if (!baseDate) return;
    parcelasData.forEach(p => {
      const d = fromInputDate(p.data);
      p.dias = Math.round((d - baseDate) / 86400000);
    });
  }

  // ── Recalcular datas a partir dos dias ───────────────────
  function recalcDatasFromDias() {
    if (!baseDate) return;
    parcelasData.forEach(p => {
      p.data = toInputDate(addDias(baseDate, p.dias));
    });
  }

  // ── Render ───────────────────────────────────────────────
  function renderParcelas() {
    const totalForm   = parseValor(valorInput.value);
    const totalParc   = parcelasData.reduce((s, p) => s + p.valor, 0);
    const diff        = Math.round((totalParc - totalForm) * 100) / 100;
    const n           = parcelasData.length;

    // Corpo
    parcelasBody.innerHTML = '';
    parcelasData.forEach((p, i) => {
      const tr = document.createElement('tr');
      tr.dataset.idx = i;

      tr.innerHTML = `
        <td>
          <span class="cfr-p-num">${i + 1}</span>
        </td>
        <td>
          <input
            type="number"
            class="cfr-cell-input input-dias"
            value="${p.dias}"
            min="1"
            data-field="dias"
            data-idx="${i}"
            title="Dias a partir da data de emissão"
          />
        </td>
        <td>
          <input
            type="date"
            class="cfr-cell-input input-data${p.editedData ? ' edited' : ''}"
            value="${p.data}"
            data-field="data"
            data-idx="${i}"
          />
        </td>
        <td>
          <input
            type="text"
            class="cfr-cell-input input-valor${p.editedValor ? ' edited' : ''}"
            value="${fmtValor(p.valor)}"
            data-field="valor"
            data-idx="${i}"
            inputmode="decimal"
          />
        </td>
        <td>
          <button type="button" class="cfr-rm-btn" data-idx="${i}" title="Remover parcela">
            <i class="bi bi-x-lg"></i>
          </button>
        </td>
      `;
      parcelasBody.appendChild(tr);
    });

    // Rodapé
    let diffBadge = '';
    if (diff === 0) {
      diffBadge = `<span class="cfr-diff-badge cfr-diff-ok"><i class="bi bi-check2"></i> Balanceado</span>`;
    } else if (Math.abs(diff) <= 0.05) {
      diffBadge = `<span class="cfr-diff-badge cfr-diff-warn"><i class="bi bi-exclamation"></i> Dif. R$ ${fmtValor(Math.abs(diff))}</span>`;
    } else {
      const sign = diff > 0 ? '+' : '−';
      diffBadge = `<span class="cfr-diff-badge cfr-diff-err"><i class="bi bi-exclamation-triangle"></i> ${sign} R$ ${fmtValor(Math.abs(diff))}</span>`;
    }

    parcelasFoot.innerHTML = `
      <tr>
        <td colspan="3" class="cfr-foot-label">
          ${n} parcela${n !== 1 ? 's' : ''} no total
        </td>
        <td class="cfr-foot-total">
          R$ ${fmtValor(totalParc)}
          ${diffBadge}
        </td>
        <td></td>
      </tr>
    `;

    // Totalizadores
    parcelasSumEl.innerHTML = `
      <div class="cfr-ps-item">
        <div class="cfr-ps-label">Parcelas</div>
        <div class="cfr-ps-val">${n}x</div>
      </div>
      <div class="cfr-ps-item">
        <div class="cfr-ps-label">Valor total</div>
        <div class="cfr-ps-val">R$ ${fmtValor(totalForm)}</div>
      </div>
      <div class="cfr-ps-item">
        <div class="cfr-ps-label">Por parcela</div>
        <div class="cfr-ps-val">R$ ${n ? fmtValor(totalParc / n) : '0,00'}</div>
      </div>
      <div class="cfr-ps-item">
        <div class="cfr-ps-label">Distribuído</div>
        <div class="cfr-ps-val ${diff === 0 ? 'ok' : Math.abs(diff) <= 0.05 ? 'warn' : 'err'}">
          R$ ${fmtValor(totalParc)}
        </div>
      </div>
    `;

    bindCellEvents();
  }

  // ── Bind eventos nas células ─────────────────────────────
  function bindCellEvents() {

    // ── Dias → recalcula data ─────────────────────────────
    parcelasBody.querySelectorAll('input[data-field="dias"]').forEach(inp => {
      inp.addEventListener('change', function () {
        const i = parseInt(this.dataset.idx, 10);
        const d = parseInt(this.value, 10) || 0;
        parcelasData[i].dias = d;
        parcelasData[i].editedData = false;
        recalcDatasFromDias();
        // só re-render a linha para não perder focus
        const dataInp = parcelasBody.querySelector(`input[data-field="data"][data-idx="${i}"]`);
        if (dataInp) { dataInp.value = parcelasData[i].data; dataInp.classList.remove('edited'); }
        renderSummaryAndFoot();
      });
    });

    // ── Data → recalcula dias ─────────────────────────────
    parcelasBody.querySelectorAll('input[data-field="data"]').forEach(inp => {
      inp.addEventListener('change', function () {
        const i = parseInt(this.dataset.idx, 10);
        parcelasData[i].data = this.value;
        parcelasData[i].editedData = true;
        this.classList.add('edited');
        recalcDias();
        const diasInp = parcelasBody.querySelector(`input[data-field="dias"][data-idx="${i}"]`);
        if (diasInp) diasInp.value = parcelasData[i].dias;
        renderSummaryAndFoot();
      });
    });

    // ── Valor → mask + flag ───────────────────────────────
    parcelasBody.querySelectorAll('input[data-field="valor"]').forEach(inp => {

      inp.addEventListener('input', function () {
        // mascara enquanto digita
        let raw = this.value.replace(/[^\d,]/g, '');
        this.value = raw;
      });

      inp.addEventListener('blur', function () {
        const i  = parseInt(this.dataset.idx, 10);
        // normaliza para número
        let raw = this.value.replace(/\./g, '').replace(',', '.');
        const v = parseFloat(raw) || 0;
        parcelasData[i].valor       = v;
        parcelasData[i].editedValor = true;
        this.value = fmtValor(v);
        this.classList.add('edited');
        renderSummaryAndFoot();
      });
    });

    // ── Remover linha ─────────────────────────────────────
    parcelasBody.querySelectorAll('.cfr-rm-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const i = parseInt(this.dataset.idx, 10);
        parcelasData.splice(i, 1);
        renderParcelas();
      });
    });
  }

  // Atualiza só summary + tfoot sem re-render o body todo
  function renderSummaryAndFoot() {
    const totalForm = parseValor(valorInput.value);
    const totalParc = parcelasData.reduce((s, p) => s + p.valor, 0);
    const diff      = Math.round((totalParc - totalForm) * 100) / 100;
    const n         = parcelasData.length;

    let diffBadge = '';
    if (diff === 0) {
      diffBadge = `<span class="cfr-diff-badge cfr-diff-ok"><i class="bi bi-check2"></i> Balanceado</span>`;
    } else if (Math.abs(diff) <= 0.05) {
      diffBadge = `<span class="cfr-diff-badge cfr-diff-warn">Dif. R$ ${fmtValor(Math.abs(diff))}</span>`;
    } else {
      const sign = diff > 0 ? '+' : '−';
      diffBadge = `<span class="cfr-diff-badge cfr-diff-err">${sign} R$ ${fmtValor(Math.abs(diff))}</span>`;
    }

    parcelasFoot.innerHTML = `
      <tr>
        <td colspan="3" class="cfr-foot-label">${n} parcela${n !== 1 ? 's' : ''}</td>
        <td class="cfr-foot-total">R$ ${fmtValor(totalParc)} ${diffBadge}</td>
        <td></td>
      </tr>`;

    parcelasSumEl.innerHTML = `
      <div class="cfr-ps-item"><div class="cfr-ps-label">Parcelas</div><div class="cfr-ps-val">${n}x</div></div>
      <div class="cfr-ps-item"><div class="cfr-ps-label">Valor total</div><div class="cfr-ps-val">R$ ${fmtValor(totalForm)}</div></div>
      <div class="cfr-ps-item"><div class="cfr-ps-label">Por parcela</div><div class="cfr-ps-val">R$ ${n ? fmtValor(totalParc / n) : '0,00'}</div></div>
      <div class="cfr-ps-item"><div class="cfr-ps-label">Distribuído</div>
        <div class="cfr-ps-val ${diff === 0 ? 'ok' : Math.abs(diff) <= 0.05 ? 'warn' : 'err'}">R$ ${fmtValor(totalParc)}</div>
      </div>`;
  }

  // ── Gerar parcelas ────────────────────────────────────────
  document.getElementById('gerarParcelasBtn').addEventListener('click', () => {
    const raw      = document.getElementById('numParcelas').value.trim();
    const intervalo= document.getElementById('intervaloParcelas').value;
    const total    = parseValor(valorInput.value);

    if (!raw) {
      document.getElementById('numParcelas').focus();
      return;
    }

    const diasArr = parseParcelas(raw, intervalo);
    if (!diasArr.length) {
      document.getElementById('numParcelas').focus();
      return;
    }

    // Data base = vencimento do form ou hoje
    baseDate = vencimentoInput.value
      ? fromInputDate(vencimentoInput.value)
      : new Date();

    const valores = distribuirValor(total || 0, diasArr.length);

    parcelasData = diasArr.map((dias, i) => ({
      dias,
      data       : toInputDate(addDias(baseDate, dias)),
      valor      : valores[i],
      editedValor: false,
      editedData : false,
    }));

    parcelasWrap.classList.remove('d-none');
    renderParcelas();
  });

  // ── Adicionar linha extra ─────────────────────────────────
  document.getElementById('addParcelaBtn').addEventListener('click', () => {
    const last  = parcelasData[parcelasData.length - 1];
    const dias  = last ? last.dias + (parseInt(document.getElementById('intervaloParcelas').value) || 30) : 30;
    parcelasData.push({
      dias,
      data       : baseDate ? toInputDate(addDias(baseDate, dias)) : '',
      valor      : 0,
      editedValor: false,
      editedData : false,
    });
    renderParcelas();
    // scroll para última linha
    const rows = parcelasBody.querySelectorAll('tr');
    if (rows.length) rows[rows.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // ── Quando valor do form muda, redistribuir não-editadas ──
  valorInput.addEventListener('input', () => {
    if (!parcelasData.length) return;
    const total    = parseValor(valorInput.value);
    const naoEdit  = parcelasData.filter(p => !p.editedValor);
    if (!naoEdit.length) { renderSummaryAndFoot(); return; }
    const somaEdit = parcelasData.filter(p => p.editedValor).reduce((s, p) => s + p.valor, 0);
    const restante = total - somaEdit;
    const novas    = distribuirValor(restante, naoEdit.length);
    let ni = 0;
    parcelasData.forEach(p => { if (!p.editedValor) p.valor = novas[ni++]; });
    renderParcelas();
  });

  /* ── Status options ───────────────────────────────────── */
  document.getElementById('statusOptions').addEventListener('click', e => {
    const btn = e.target.closest('.cfr-status-opt');
    if (!btn) return;
    document.querySelectorAll('.cfr-status-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });

  /* ── Juros toggle ──────────────────────────────────────── */
  document.getElementById('jurosSwitch').addEventListener('change', function () {
    document.getElementById('jurosFields').classList.toggle('d-none', !this.checked);
  });

  /* ── Dropzone + file list ─────────────────────────────── */
  const dropzone  = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const fileList  = document.getElementById('fileList');

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

  document.getElementById('saveDraftBtn').addEventListener('click', () => {
    const btn = document.getElementById('saveDraftBtn');
    feedbackButton(btn, 'Rascunho salvo');
  });

})();