/* ============================================================
   FINANCEIRO PRO — movimentacoes.js
   ============================================================ */

(function () {

  /* ── Dataset ──────────────────────────────────────────── */
  const allData = [
    { id: 1, date: '08/06/2025', desc: 'Venda de Software — Contrato #1042', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Receita de Vendas', type: 'receita', amount: 28500.00, status: 'pago', doc: 'NF-2451' },
    { id: 2, date: '07/06/2025', desc: 'Pagamento Fornecedor — PrintMax', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Fornecedores', type: 'despesa', amount: 4320.50, status: 'pago', doc: 'NF-1832' },
    { id: 3, date: '06/06/2025', desc: 'Assinatura Cloud AWS — Junho/25', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Infraestrutura', type: 'despesa', amount: 1875.00, status: 'pago', doc: 'REC-0091' },
    { id: 4, date: '05/06/2025', desc: 'Prestação de Serviços — Cliente X', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Serviços', type: 'receita', amount: 12000.00, status: 'pendente', doc: 'NF-2449' },
    { id: 5, date: '04/06/2025', desc: 'Folha de Pagamento — Maio/2025', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Pessoal', type: 'despesa', amount: 34750.00, status: 'pago', doc: '—' },
    { id: 6, date: '03/06/2025', desc: 'Aluguel Escritório — Junho/25', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Imóveis', type: 'despesa', amount: 6500.00, status: 'pago', doc: 'REC-0087' },
    { id: 7, date: '02/06/2025', desc: 'Licença Adobe Creative — Anual', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Software', type: 'despesa', amount: 998.00, status: 'agendado', doc: 'INV-4421' },
    { id: 8, date: '01/06/2025', desc: 'Comissão Parceiros — Maio/2025', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Comercial', type: 'despesa', amount: 3200.00, status: 'pendente', doc: '—' },
    { id: 9, date: '31/05/2025', desc: 'Contrato Recorrente — Empresa Y', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Receita de Vendas', type: 'receita', amount: 9800.00, status: 'pago', doc: 'NF-2440' },
    { id: 10, date: '30/05/2025', desc: 'Nota Fiscal #2238 — Serviço Z', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Serviços', type: 'receita', amount: 5600.00, status: 'vencido', doc: 'NF-2238' },
    { id: 11, date: '29/05/2025', desc: 'DARF — Simples Nacional Maio/25', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Tributário', type: 'despesa', amount: 4218.75, status: 'pago', doc: 'DARF-05' },
    { id: 12, date: '28/05/2025', desc: 'Venda Projeto Design — Studio ABC', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Serviços', type: 'receita', amount: 7200.00, status: 'pago', doc: 'NF-2435' },
    { id: 13, date: '27/05/2025', desc: 'Energia Elétrica — Maio/25', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Infraestrutura', type: 'despesa', amount: 765.40, status: 'pago', doc: 'FAT-0521' },
    { id: 14, date: '26/05/2025', desc: 'Internet Corporativa — Maio/25', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Infraestrutura', type: 'despesa', amount: 890.00, status: 'pago', doc: 'FAT-0429' },
    { id: 15, date: '25/05/2025', desc: 'Consultoria Jurídica — Q2 2025', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Serviços', type: 'despesa', amount: 3500.00, status: 'pago', doc: 'REC-0082' },
    { id: 16, date: '24/05/2025', desc: 'Receita Marketplace — Abril/25', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Receita de Vendas', type: 'receita', amount: 18340.00, status: 'pago', doc: 'NF-2431' },
    { id: 17, date: '23/05/2025', desc: 'Seguro Empresarial — Parcela 5/12', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Seguros', type: 'despesa', amount: 1920.00, status: 'pago', doc: 'SEG-0035' },
    { id: 18, date: '22/05/2025', desc: 'Serviço de Limpeza — Contrato Mensal', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Fornecedores', type: 'despesa', amount: 1200.00, status: 'pago', doc: 'REC-0079' },
    { id: 19, date: '21/05/2025', desc: 'Adiantamento Salarial — Colaborador A', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Pessoal', type: 'despesa', amount: 2500.00, status: 'pago', doc: '—' },
    { id: 20, date: '20/05/2025', desc: 'Licença Microsoft 365 — Anual', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Software', type: 'despesa', amount: 4380.00, status: 'agendado', doc: 'INV-4398' },
    { id: 21, date: '19/05/2025', desc: 'Venda de Curso Online — Lote #08', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Receita de Vendas', type: 'receita', amount: 6450.00, status: 'pago', doc: 'NF-2425' },
    { id: 22, date: '18/05/2025', desc: 'Material de Escritório — Papelaria Max', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Fornecedores', type: 'despesa', amount: 342.80, status: 'pago', doc: 'CUP-0213' },
    { id: 23, date: '17/05/2025', desc: 'Campanha Google Ads — Maio/25', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Comercial', type: 'despesa', amount: 2800.00, status: 'pago', doc: 'INV-GG99' },
    { id: 24, date: '16/05/2025', desc: 'Reembolso Despesas Viagem — Equipe RH', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Pessoal', type: 'despesa', amount: 1870.50, status: 'pendente', doc: '—' },
    { id: 25, date: '15/05/2025', desc: 'Manutenção Servidores — HostPro', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Infraestrutura', type: 'despesa', amount: 960.00, status: 'pago', doc: 'REC-0073' },
    { id: 26, date: '14/05/2025', desc: 'Comissão de Vendas — Canal Parceiro B', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Comercial', type: 'despesa', amount: 1540.00, status: 'pendente', doc: '—' },
    { id: 27, date: '13/05/2025', desc: 'Receita Contrato Anual — Empresa Beta', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Receita de Vendas', type: 'receita', amount: 42000.00, status: 'pago', doc: 'NF-2419' },
    { id: 28, date: '12/05/2025', desc: 'Suporte Técnico Externo — TI Solutions', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Serviços', type: 'despesa', amount: 2200.00, status: 'pago', doc: 'REC-0070' },
    { id: 29, date: '11/05/2025', desc: 'Venda Avulsa — E-commerce Lote #34', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Receita de Vendas', type: 'receita', amount: 3120.00, status: 'pago', doc: 'NF-2414' },
    { id: 30, date: '10/05/2025', desc: 'Conta Telefônica Corporativa', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Infraestrutura', type: 'despesa', amount: 680.00, status: 'pago', doc: 'FAT-0408' },
    { id: 31, date: '09/05/2025', desc: 'Lucro Referência — Fundo Reserva', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Receita de Vendas', type: 'receita', amount: 8200.00, status: 'pago', doc: 'REC-0067' },
    { id: 32, date: '08/05/2025', desc: 'Fornecedor de Embalagens — EmbPack', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Fornecedores', type: 'despesa', amount: 1780.00, status: 'vencido', doc: 'NF-0992' },
    { id: 33, date: '07/05/2025', desc: 'Campanha LinkedIn Ads — Q2', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Comercial', type: 'despesa', amount: 1650.00, status: 'pago', doc: 'INV-LI77' },
    { id: 34, date: '06/05/2025', desc: 'Nota de Débito — Estorno Parcial #12', account: 'Itaú — C/C 9823-2', bank: '#E8A200', category: 'Serviços', type: 'receita', amount: 1200.00, status: 'pago', doc: 'ND-0044' },
    { id: 35, date: '05/05/2025', desc: 'Assinatura Hubspot CRM — Anual', account: 'Nubank — C/C 3812-4', bank: '#6F42C1', category: 'Software', type: 'despesa', amount: 7200.00, status: 'agendado', doc: 'INV-HS55' },
    { id: 36, date: '04/05/2025', desc: 'Receita Royalties — Produto Digital', account: 'Bradesco — C/C 4521-7', bank: '#0D6EFD', category: 'Receita de Vendas', type: 'receita', amount: 4320.00, status: 'pago', doc: 'NF-2408' },
  ];

  /* ── State ────────────────────────────────────────────── */
  let filtered = [...allData];
  let page = 1;
  let perPage = 10;
  let sortCol = 'date';
  let sortDir = 'desc';
  let typeFilter = 'todos';
  let selected = new Set();

  /* ── Helpers ──────────────────────────────────────────── */
  const fmt = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const statusLabel = s => ({ pago: 'Pago', pendente: 'Pendente', vencido: 'Vencido', agendado: 'Agendado' }[s] || s);

  /* ── Render table ─────────────────────────────────────── */
  function render() {
    const tbody = document.getElementById('movBody');
    const start = (page - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);
    tbody.innerHTML = '';

    if (!slice.length) {
      tbody.innerHTML = `<tr><td colspan="9">
        <div class="fp-empty-state">
          <i class="bi bi-inbox"></i>
          <p>Nenhuma movimentação encontrada</p>
        </div>
      </td></tr>`;
      updateMeta(0);
      renderPagination();
      return;
    }

    slice.forEach(tx => {
      const isRec = tx.type === 'receita';
      const tr = document.createElement('tr');
      tr.dataset.id = tx.id;
      if (selected.has(tx.id)) tr.classList.add('fp-tr-selected');

      tr.innerHTML = `
        <td>
          <input type="checkbox" class="fp-check row-check" data-id="${tx.id}" ${selected.has(tx.id) ? 'checked' : ''} />
        </td>
        <td>
          <span style="font-size:.78rem;color:var(--fp-text-sub);white-space:nowrap">${tx.date}</span>
        </td>
        <td>
          <div class="fp-tx-desc">${tx.desc}</div>
          <div class="fp-tx-sub">${tx.doc !== '—' ? '<i class="bi bi-file-earmark me-1"></i>' + tx.doc : ''}</div>
        </td>
        <td class="d-none d-lg-table-cell">
          <span class="fp-account-chip">
            <span class="fp-account-dot" style="background:${tx.bank}"></span>
            ${tx.account}
          </span>
        </td>
        <td class="d-none d-md-table-cell">
          <span class="fp-category">${tx.category}</span>
        </td>
        <td class="d-none d-sm-table-cell">
          <span class="fp-type-badge fp-type-${tx.type}">
            <i class="bi bi-arrow-${isRec ? 'down' : 'up'}-short me-1"></i>
            ${isRec ? 'Entrada' : 'Saída'}
          </span>
        </td>
        <td>
          <span class="${isRec ? 'fp-amount-receita' : 'fp-amount-despesa'}">
            ${isRec ? '+' : '−'} ${fmt(tx.amount)}
          </span>
        </td>
        <td>
          <span class="fp-badge fp-badge-${tx.status}">${statusLabel(tx.status)}</span>
        </td>
        <td>
          <div class="fp-row-actions">
            <button class="fp-icon-btn btn-detail" data-id="${tx.id}" title="Ver detalhes">
              <i class="bi bi-eye"></i>
            </button>
            <button class="fp-icon-btn" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="fp-icon-btn fp-icon-danger" title="Excluir">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    updateMeta(filtered.length);
    renderPagination();
    bindRowEvents();
  }

  function updateMeta(total) {
    const start = (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, total);
    const text = total ? `Exibindo ${start}–${end} de ${total} registros` : 'Nenhum registro encontrado';
    document.getElementById('tableCount').textContent = text;
    document.getElementById('tableCountBottom').textContent = text;
  }

  /* ── Pagination ───────────────────────────────────────── */
  function renderPagination() {
    const pag = document.getElementById('pagination');
    const pages = Math.ceil(filtered.length / perPage);
    pag.innerHTML = '';

    const prev = document.createElement('li');
    prev.className = 'page-item' + (page === 1 ? ' disabled' : '');
    prev.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>`;
    prev.addEventListener('click', e => { e.preventDefault(); if (page > 1) { page--; render(); } });
    pag.appendChild(prev);

    const range = getPageRange(page, pages);
    range.forEach(p => {
      const li = document.createElement('li');
      li.className = 'page-item' + (p === page ? ' active' : '') + (p === '…' ? ' disabled' : '');
      li.innerHTML = `<a class="page-link" href="#">${p}</a>`;
      if (p !== '…') {
        li.addEventListener('click', e => { e.preventDefault(); page = p; render(); });
      }
      pag.appendChild(li);
    });

    const next = document.createElement('li');
    next.className = 'page-item' + (page === pages || pages === 0 ? ' disabled' : '');
    next.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>`;
    next.addEventListener('click', e => { e.preventDefault(); if (page < pages) { page++; render(); } });
    pag.appendChild(next);
  }

  function getPageRange(cur, total) {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (cur <= 3) return [1, 2, 3, 4, '…', total];
    if (cur >= total - 2) return [1, '…', total - 3, total - 2, total - 1, total];
    return [1, '…', cur - 1, cur, cur + 1, '…', total];
  }

  /* ── Filter & Sort ────────────────────────────────────── */
  function applyFilters() {
    const q = (document.getElementById('searchInput').value || '').toLowerCase().trim();
    const cat = document.getElementById('categoryFilter').value;
    const stat = document.getElementById('statusFilter').value;

    filtered = allData.filter(tx => {
      const matchQ = !q || tx.desc.toLowerCase().includes(q) || tx.category.toLowerCase().includes(q) || tx.account.toLowerCase().includes(q);
      const matchType = typeFilter === 'todos' || tx.type === typeFilter;
      const matchCat = !cat || tx.category === cat;
      const matchStat = !stat || tx.status === stat;
      return matchQ && matchType && matchCat && matchStat;
    });

    applySort();
    page = 1;
    render();
  }

  function applySort() {
    filtered.sort((a, b) => {
      let va, vb;
      if (sortCol === 'date') { va = a.date.split('/').reverse().join(''); vb = b.date.split('/').reverse().join(''); }
      else if (sortCol === 'amount') { va = a.amount; vb = b.amount; }
      else if (sortCol === 'desc') { va = a.desc.toLowerCase(); vb = b.desc.toLowerCase(); }
      else if (sortCol === 'category') { va = a.category.toLowerCase(); vb = b.category.toLowerCase(); }
      else { va = a[sortCol]; vb = b[sortCol]; }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /* ── Row events ───────────────────────────────────────── */
  function bindRowEvents() {
    // Detail
    document.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', () => openDetail(parseInt(btn.dataset.id)));
    });

    // Row checkboxes
    document.querySelectorAll('.row-check').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = parseInt(cb.dataset.id);
        cb.checked ? selected.add(id) : selected.delete(id);
        cb.closest('tr').classList.toggle('fp-tr-selected', cb.checked);
        syncBulkActions();
        syncCheckAll();
      });
    });
  }

  /* ── Check all ────────────────────────────────────────── */
  const checkAll = document.getElementById('checkAll');

  if (!checkAll){
    return;
  }

  checkAll.AaddEventListener('change', function () {
    const start = (page - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);
    slice.forEach(tx => this.checked ? selected.add(tx.id) : selected.delete(tx.id));
    render();
    syncBulkActions();
  });

  function syncCheckAll() {
    const start = (page - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);
    const allSel = slice.length > 0 && slice.every(tx => selected.has(tx.id));
    document.getElementById('checkAll').checked = allSel;
  }

  function syncBulkActions() {
    const ba = document.getElementById('bulkActions');
    const sc = document.getElementById('selectedCount');
    if (selected.size > 0) {
      ba.classList.remove('d-none');
      ba.classList.add('d-flex');
      sc.textContent = `${selected.size} selecionado${selected.size > 1 ? 's' : ''}`;
    } else {
      ba.classList.add('d-none');
      ba.classList.remove('d-flex');
    }
  }

  /* ── Detail Offcanvas ─────────────────────────────────── */
  function openDetail(id) {
    const tx = allData.find(t => t.id === id);
    if (!tx) return;
    const isRec = tx.type === 'receita';
    const oc = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('detailCanvas'));

    document.getElementById('canvasSubtitle').textContent = tx.date;
    const icon = document.getElementById('canvasTypeIcon');
    icon.style.background = isRec ? 'var(--fp-success-soft)' : 'var(--fp-danger-soft)';
    icon.style.color = isRec ? 'var(--fp-success)' : 'var(--fp-danger)';
    icon.innerHTML = `<i class="bi bi-arrow-${isRec ? 'down' : 'up'}-circle"></i>`;

    document.getElementById('canvasBody').innerHTML = `
      <div class="fp-detail-card">
        <div class="text-center py-2 mb-3">
          <div class="${isRec ? 'fp-detail-amount-receita' : 'fp-detail-amount-despesa'}">
            ${isRec ? '+' : '−'} ${fmt(tx.amount)}
          </div>
          <div class="mt-2">
            <span class="fp-badge fp-badge-${tx.status}">${statusLabel(tx.status)}</span>
          </div>
        </div>
        <div class="fp-detail-row">
          <span class="fp-detail-key">Descrição</span>
          <span class="fp-detail-val">${tx.desc}</span>
        </div>
        <div class="fp-detail-row">
          <span class="fp-detail-key">Data</span>
          <span class="fp-detail-val">${tx.date}</span>
        </div>
        <div class="fp-detail-row">
          <span class="fp-detail-key">Tipo</span>
          <span class="fp-detail-val">
            <span class="fp-type-badge fp-type-${tx.type}">${isRec ? 'Entrada' : 'Saída'}</span>
          </span>
        </div>
        <div class="fp-detail-row">
          <span class="fp-detail-key">Categoria</span>
          <span class="fp-detail-val">${tx.category}</span>
        </div>
        <div class="fp-detail-row">
          <span class="fp-detail-key">Conta / Banco</span>
          <span class="fp-detail-val d-flex align-items-center gap-2 justify-content-end">
            <span class="fp-account-dot" style="background:${tx.bank}"></span>
            ${tx.account}
          </span>
        </div>
        <div class="fp-detail-row">
          <span class="fp-detail-key">Nº Documento</span>
          <span class="fp-detail-val">${tx.doc}</span>
        </div>
      </div>
      <div class="fp-canvas-actions">
        <button class="btn fp-btn-outline-secondary d-flex align-items-center justify-content-center gap-1">
          <i class="bi bi-pencil"></i> Editar
        </button>
        <button class="btn fp-btn-primary d-flex align-items-center justify-content-center gap-1">
          <i class="bi bi-printer"></i> Imprimir
        </button>
      </div>
      <div class="mt-3">
        <button class="btn fp-btn-danger-outline w-100 d-flex align-items-center justify-content-center gap-1">
          <i class="bi bi-trash3"></i> Excluir Movimentação
        </button>
      </div>
    `;
    oc.show();
  }

  /* ── Sort headers ─────────────────────────────────────── */
  document.querySelectorAll('.fp-th-sort').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      else { sortCol = col; sortDir = 'asc'; }
      applySort();
      render();
    });
  });

  /* ── Type filter chips ────────────────────────────────── */
  document.getElementById('typeFilters').addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    typeFilter = btn.dataset.filter;
    document.querySelectorAll('.fp-filter-chip').forEach(b => b.classList.toggle('fp-chip-active', b === btn));
    applyFilters();
  });

  /* ── Input filters ────────────────────────────────────── */
  ['searchInput', 'categoryFilter', 'statusFilter', 'periodFilter'].forEach(id => {
    document.getElementById(id).addEventListener('input', applyFilters);
    document.getElementById(id).addEventListener('change', applyFilters);
  });

  /* ── Clear filters ────────────────────────────────────── */
  document.getElementById('clearFilters').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('periodFilter').value = '';
    typeFilter = 'todos';
    document.querySelectorAll('.fp-filter-chip').forEach((b, i) => b.classList.toggle('fp-chip-active', i === 0));
    applyFilters();
  });

  /* ── Per page ─────────────────────────────────────────── */
  document.getElementById('perPageSelect').addEventListener('change', function () {
    perPage = parseInt(this.value);
    page = 1;
    render();
  });

  /* ── Modal: type toggle ───────────────────────────────── */
  document.getElementById('typeToggle').addEventListener('click', e => {
    const btn = e.target.closest('[data-type]');
    if (!btn) return;
    document.querySelectorAll('.fp-tt-btn').forEach(b => b.classList.remove('fp-tt-active'));
    btn.classList.add('fp-tt-active');
  });

  /* ── Modal: save feedback ─────────────────────────────── */
  document.getElementById('saveBtn').addEventListener('click', function () {
    const orig = this.innerHTML;
    this.innerHTML = '<i class="bi bi-check2 me-1"></i> Salvo!';
    this.style.background = 'var(--fp-success)';
    setTimeout(() => {
      this.innerHTML = orig;
      this.style.background = '';
      bootstrap.Modal.getInstance(document.getElementById('novaMovModal'))?.hide();
    }, 1200);
  });

  /* ── Date default ─────────────────────────────────────── */
  const di = document.getElementById('dateInput');
  if (di) di.valueAsDate = new Date();

  /* ── Currency mask ────────────────────────────────────── */
  const vi = document.getElementById('valueInput');
  if (vi) {
    vi.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '');
      if (!v) { this.value = ''; return; }
      v = (parseInt(v, 10) / 100).toFixed(2);
      this.value = parseFloat(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    });
  }

  /* ── Dropzone ─────────────────────────────────────────── */
  const dz = document.getElementById('dropzone');
  if (dz) {
    dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
    dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('dragover'); });
  }

  /* ── Init ─────────────────────────────────────────────── */
  applySort();
  render();

})();