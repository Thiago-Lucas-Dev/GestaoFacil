/* ============================================================
   FINANCEIRO PRO — app.js
   ============================================================ */

import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {

    /* ── Data ─────────────────────────────────────────────── */
    const transactions = [
        { date: '08/06/2025', desc: 'Venda de Software — Contrato #1042', category: 'Receita de Vendas', type: 'receita', amount: 28500.00, status: 'pago' },
        { date: '07/06/2025', desc: 'Pagamento Fornecedor — PrintMax', category: 'Fornecedores', type: 'despesa', amount: 4320.50, status: 'pago' },
        { date: '06/06/2025', desc: 'Assinatura Cloud AWS — Junho/25', category: 'Infraestrutura', type: 'despesa', amount: 1875.00, status: 'pago' },
        { date: '05/06/2025', desc: 'Prestação de Serviços — Cliente X', category: 'Serviços', type: 'receita', amount: 12000.00, status: 'pendente' },
        { date: '04/06/2025', desc: 'Folha de Pagamento — Maio/2025', category: 'Pessoal', type: 'despesa', amount: 34750.00, status: 'pago' },
        { date: '03/06/2025', desc: 'Aluguel Escritório — Junho/25', category: 'Imóveis', type: 'despesa', amount: 6500.00, status: 'pago' },
        { date: '02/06/2025', desc: 'Licença Adobe Creative — Anual', category: 'Software', type: 'despesa', amount: 998.00, status: 'agendado' },
        { date: '01/06/2025', desc: 'Comissão Parceiros — Maio/2025', category: 'Comercial', type: 'despesa', amount: 3200.00, status: 'pendente' },
        { date: '31/05/2025', desc: 'Contrato Recorrente — Empresa Y', category: 'Receita de Vendas', type: 'receita', amount: 9800.00, status: 'pago' },
        { date: '30/05/2025', desc: 'Nota Fiscal #2238 — Serviço Z', category: 'Serviços', type: 'receita', amount: 5600.00, status: 'vencido' },
    ];

    const upcomingBills = [
        { name: 'DARF — Simples Nacional', date: '10/06/2025', amount: 4218.75, urgency: 'high' },
        { name: 'Internet Corporativa', date: '12/06/2025', amount: 890.00, urgency: 'high' },
        { name: 'Seguro Empresarial', date: '14/06/2025', amount: 2340.00, urgency: 'medium' },
        { name: 'Manutenção Equipamentos', date: '15/06/2025', amount: 1200.00, urgency: 'medium' },
        { name: 'Conta de Energia', date: '18/06/2025', amount: 765.40, urgency: 'low' },
    ];

    /* ── Render Transactions ──────────────────────────────── */
    const tbody = document.getElementById('transactionsBody');

    if (!tbody) {
        return;
    }

    function renderTransactions(data) {
        tbody.innerHTML = '';
        data.forEach(tx => {
            const tr = document.createElement('tr');
            const isReceita = tx.type === 'receita';
            const amountFmt = tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            tr.innerHTML = `
        <td>
          <span style="color:var(--fp-text-sub);font-size:0.78rem;white-space:nowrap">
            ${tx.date}
          </span>
        </td>
        <td>
          <div class="fp-tx-desc">${tx.desc}</div>
        </td>
        <td class="d-none d-md-table-cell">
          <span class="fp-category">${tx.category}</span>
        </td>
        <td class="d-none d-sm-table-cell">
          <span class="fp-type-badge fp-type-${tx.type}">
            <i class="bi bi-arrow-${isReceita ? 'down' : 'up'}-short me-1"></i>
            ${isReceita ? 'Receita' : 'Despesa'}
          </span>
        </td>
        <td>
          <span class="${isReceita ? 'fp-amount-receita' : 'fp-amount-despesa'}">
            ${isReceita ? '+' : '-'} ${amountFmt}
          </span>
        </td>
        <td>
          <span class="fp-badge fp-badge-${tx.status}">
            ${statusLabel(tx.status)}
          </span>
        </td>
      `;
            tbody.appendChild(tr);
        });
    }

    function statusLabel(s) {
        const map = { pago: 'Pago', pendente: 'Pendente', vencido: 'Vencido', agendado: 'Agendado' };
        return map[s] || s;
    }

    renderTransactions(transactions);

    /* ── Search Filter ────────────────────────────────────── */
    document.getElementById('searchInput').addEventListener('input', function () {
        const q = this.value.toLowerCase().trim();
        const filtered = transactions.filter(tx =>
            tx.desc.toLowerCase().includes(q) ||
            tx.category.toLowerCase().includes(q) ||
            tx.type.toLowerCase().includes(q) ||
            tx.status.toLowerCase().includes(q)
        );
        renderTransactions(filtered);
        document.getElementById('tableCount').textContent =
            `Exibindo ${filtered.length} de ${transactions.length} registros`;
    });

    /* ── Render Upcoming Bills ────────────────────────────── */
    const upcomingList = document.getElementById('upcomingList');

    upcomingBills.forEach(bill => {
        const valueFmt = bill.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const div = document.createElement('div');
        div.className = 'fp-bill-item';
        div.innerHTML = `
      <div class="fp-bill-urgency fp-urgency-${bill.urgency}"></div>
      <div class="flex-1 min-w-0">
        <div class="fp-bill-name">${bill.name}</div>
        <div class="fp-bill-date"><i class="bi bi-calendar2 me-1"></i>${bill.date}</div>
      </div>
      <div class="fp-bill-value">${valueFmt}</div>
    `;
        upcomingList.appendChild(div);
    });

    /* ── Chart.js ─────────────────────────────────────────── */
    const ctx = document.getElementById('mainChart').getContext('2d');

    const months = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const receitas = [128000, 142000, 135000, 158000, 147000, 162000, 145000, 170000, 155000, 182000, 168000, 195000];
    const despesas = [98000, 108000, 103000, 112000, 118000, 125000, 99000, 132000, 115000, 138000, 122000, 127000];

    // Gradient fills
    const gradRec = ctx.createLinearGradient(0, 0, 0, 300);
    gradRec.addColorStop(0, 'rgba(13, 110, 253, 0.18)');
    gradRec.addColorStop(1, 'rgba(13, 110, 253, 0)');

    const gradDesp = ctx.createLinearGradient(0, 0, 0, 300);
    gradDesp.addColorStop(0, 'rgba(220, 53, 69, 0.14)');
    gradDesp.addColorStop(1, 'rgba(220, 53, 69, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Receitas',
                    data: receitas,
                    borderColor: '#0D6EFD',
                    backgroundColor: gradRec,
                    borderWidth: 2.5,
                    pointBackgroundColor: '#0D6EFD',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Despesas',
                    data: despesas,
                    borderColor: '#DC3545',
                    backgroundColor: gradDesp,
                    borderWidth: 2.5,
                    pointBackgroundColor: '#DC3545',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A202C',
                    titleFont: { family: 'Sora', size: 12, weight: '600' },
                    bodyFont: { family: 'Sora', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: ctx => {
                            const val = ctx.raw.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                            return `  ${ctx.dataset.label}: ${val}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: {
                        font: { family: 'Sora', size: 11 },
                        color: '#6C757D',
                    }
                },
                y: {
                    grid: {
                        color: '#F1F3F5',
                        drawBorder: false,
                    },
                    border: { display: false, dash: [4, 4] },
                    ticks: {
                        font: { family: 'Sora', size: 11 },
                        color: '#6C757D',
                        callback: val => {
                            if (val >= 1000) return 'R$ ' + (val / 1000).toFixed(0) + 'k';
                            return 'R$ ' + val;
                        }
                    }
                }
            }
        }
    });

});