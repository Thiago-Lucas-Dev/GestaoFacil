/* ============================================================
   FINANCEIRO PRO — configuracoes.js
   ============================================================ */

(function () {

  /* ── Sidebar navigation ───────────────────────────────── */
  document.querySelectorAll('.cfg-nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const tab = item.dataset.tab;
      if (!tab) return;

      document.querySelectorAll('.cfg-nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.cfg-tab').forEach(t => t.classList.remove('active'));

      item.classList.add('active');
      const el = document.getElementById('tab-' + tab);
      if (el) el.classList.add('active');
    });
  });

  // /* ── Centros de custo ─────────────────────────────────── */
  // const centros = [
  //   { nome: 'Comercial',       cod: 'COM-01', resp: 'Carlos Lima',    orcamento: 25000, usado: 18420 },
  //   { nome: 'Tecnologia',      cod: 'TEC-01', resp: 'Pedro Alves',    orcamento: 45000, usado: 38900 },
  //   { nome: 'Administrativo',  cod: 'ADM-01', resp: 'Ana Moreira',    orcamento: 18000, usado: 12350 },
  //   { nome: 'Recursos Humanos',cod: 'RH-01',  resp: 'Juliana Costa',  orcamento: 35000, usado: 34750 },
  //   { nome: 'Marketing',       cod: 'MKT-01', resp: 'Rafael Souza',   orcamento: 15000, usado: 9200  },
  // ];

  // const ccBody = document.getElementById('ccBody');
  // centros.forEach(c => {
  //   const pct  = Math.round((c.usado / c.orcamento) * 100);
  //   const over = pct >= 95;
  //   const warn = pct >= 75 && pct < 95;
  //   const barColor = over ? 'var(--fp-danger)' : warn ? 'var(--fp-warning)' : 'var(--fp-primary)';
  //   const status   = over ? '<span class="fp-badge fp-badge-vencido">Crítico</span>'
  //                  : warn ? '<span class="fp-badge fp-badge-pendente">Atenção</span>'
  //                          : '<span class="fp-badge fp-badge-pago">Normal</span>';

  //   const tr = document.createElement('tr');
  //   tr.innerHTML = `
  //     <td><span class="fp-tx-desc">${c.nome}</span></td>
  //     <td><span class="fp-category">${c.cod}</span></td>
  //     <td style="font-size:.8rem;color:var(--fp-text-sub)">${c.resp}</td>
  //     <td style="font-weight:600">${fmt(c.orcamento)}</td>
  //     <td>
  //       <div class="d-flex align-items-center gap-2">
  //         <div style="flex:1;height:6px;background:var(--fp-border);border-radius:3px;min-width:60px">
  //           <div style="height:100%;width:${pct}%;background:${barColor};border-radius:3px;transition:width .4s"></div>
  //         </div>
  //         <span style="font-size:.75rem;font-weight:600;color:${barColor};white-space:nowrap">${pct}%</span>
  //       </div>
  //       <div style="font-size:.72rem;color:var(--fp-text-muted);margin-top:.2rem">${fmt(c.usado)}</div>
  //     </td>
  //     <td>${status}</td>
  //     <td>
  //       <div class="d-flex gap-1">
  //         <button class="fp-icon-btn" title="Editar"><i class="bi bi-pencil"></i></button>
  //         <button class="fp-icon-btn fp-icon-danger"><i class="bi bi-trash3"></i></button>
  //       </div>
  //     </td>
  //   `;
  //   ccBody.appendChild(tr);
  // });

  // /* ── Usuários ─────────────────────────────────────────── */
  // const users = [
  //   { name: 'Ana Moreira',    email: 'ana@empresa.com.br',    role: 'admin',   initials: 'AM', color: '#0D6EFD', status: 'pago',    last: 'Agora'         },
  //   { name: 'Carlos Lima',    email: 'carlos@empresa.com.br', role: 'manager', initials: 'CL', color: '#198754', status: 'pago',    last: 'Há 2 horas'    },
  //   { name: 'Juliana Costa',  email: 'juliana@empresa.com.br',role: 'manager', initials: 'JC', color: '#6F42C1', status: 'pago',    last: 'Ontem'         },
  //   { name: 'Pedro Alves',    email: 'pedro@empresa.com.br',  role: 'viewer',  initials: 'PA', color: '#E8A200', status: 'pago',    last: 'Há 3 dias'     },
  //   { name: 'Rafael Souza',   email: 'rafael@empresa.com.br', role: 'viewer',  initials: 'RS', color: '#DC3545', status: 'pendente',last: 'Convite enviado'},
  // ];

  // const roleLabel = { admin: 'Administrador', manager: 'Gerente', viewer: 'Visualizador' };
  // const roleClass = { admin: 'cfg-role-admin', manager: 'cfg-role-manager', viewer: 'cfg-role-viewer' };

  // const userList = document.getElementById('userList');
  // users.forEach(u => {
  //   const div = document.createElement('div');
  //   div.className = 'cfg-user-card';
  //   div.innerHTML = `
  //     <div class="cfg-user-avatar" style="background:${u.color}">${u.initials}</div>
  //     <div class="cfg-user-info">
  //       <div class="cfg-user-name">${u.name}</div>
  //       <div class="cfg-user-email">${u.email}</div>
  //     </div>
  //     <span class="cfg-role-badge ${roleClass[u.role]}">${roleLabel[u.role]}</span>
  //     <span class="fp-badge fp-badge-${u.status}">${u.status === 'pago' ? 'Ativo' : 'Pendente'}</span>
  //     <div style="font-size:.72rem;color:var(--fp-text-muted);white-space:nowrap">${u.last}</div>
  //     <div class="d-flex gap-1">
  //       <button class="fp-icon-btn" title="Editar permissões"><i class="bi bi-shield-check"></i></button>
  //       <button class="fp-icon-btn fp-icon-danger" title="Remover acesso"><i class="bi bi-person-x"></i></button>
  //     </div>
  //   `;
  //   userList.appendChild(div);
  // });

  // /* ── Notificações ─────────────────────────────────────── */
  // const notifs = [
  //   { icon: 'bi-exclamation-circle', bg: '#FDECEA', color: '#DC3545', title: 'Contas vencidas',          sub: 'Avisar quando houver títulos em atraso',            channels: ['E-mail', 'Push'] },
  //   { icon: 'bi-clock-history',      bg: '#FFF8E1', color: '#E8A200', title: 'Vencimento próximo',        sub: 'Alertar 3 dias antes do vencimento',                channels: ['E-mail', 'Push'] },
  //   { icon: 'bi-arrow-down-circle',  bg: '#E8F5EE', color: '#198754', title: 'Nova receita lançada',      sub: 'Notificar ao receber um novo pagamento',            channels: ['Push']           },
  //   { icon: 'bi-arrow-up-circle',    bg: '#EBF3FF', color: '#0D6EFD', title: 'Nova despesa lançada',      sub: 'Notificar ao registrar um novo gasto',              channels: ['E-mail']         },
  //   { icon: 'bi-graph-down-arrow',   bg: '#FDECEA', color: '#DC3545', title: 'Saldo abaixo do mínimo',    sub: 'Avisar quando o saldo cair abaixo de R$ 5.000',     channels: ['E-mail', 'Push', 'SMS'] },
  //   { icon: 'bi-check2-all',         bg: '#E8F5EE', color: '#198754', title: 'Conciliação bancária',      sub: 'Resumo diário de itens para conciliar',             channels: ['E-mail']         },
  //   { icon: 'bi-person-plus',        bg: '#EBF3FF', color: '#0D6EFD', title: 'Novo usuário no sistema',   sub: 'Notificar quando um convite for aceito',            channels: ['E-mail']         },
  //   { icon: 'bi-file-earmark-text',  bg: '#FFF8E1', color: '#E8A200', title: 'Relatório semanal',         sub: 'Envio automático toda segunda-feira às 08h',        channels: ['E-mail']         },
  // ];

  // const notifList = document.getElementById('notifList');
  // notifs.forEach(n => {
  //   const div = document.createElement('div');
  //   div.className = 'cfg-notif-row';
  //   div.innerHTML = `
  //     <div class="cfg-notif-icon" style="background:${n.bg};color:${n.color}">
  //       <i class="bi ${n.icon}"></i>
  //     </div>
  //     <div class="cfg-notif-info">
  //       <div class="cfg-notif-title">${n.title}</div>
  //       <div class="cfg-notif-sub">${n.sub}</div>
  //     </div>
  //     <div class="cfg-notif-channels">
  //       ${['E-mail','Push','SMS'].map(ch =>
  //         `<span class="cfg-channel-tag ${n.channels.includes(ch) ? 'active' : ''}" 
  //           onclick="this.classList.toggle('active')">${ch}</span>`
  //       ).join('')}
  //     </div>
  //     <div class="form-check form-switch cfg-switch ms-2">
  //       <input class="form-check-input" type="checkbox" ${n.channels.length ? 'checked' : ''} />
  //     </div>
  //   `;
  //   notifList.appendChild(div);
  // });

  // /* ── Integrações ──────────────────────────────────────── */
  // const integrations = [
  //   { name: 'Conta Azul',    desc: 'Sincronize clientes e NF-e',          icon: 'bi-cloud-arrow-up', color: '#2563EB', bg: '#EBF3FF', connected: false },
  //   { name: 'Omie ERP',      desc: 'Integração completa com ERP',         icon: 'bi-diagram-3',      color: '#7C3AED', bg: '#F3F0FF', connected: true  },
  //   { name: 'PagSeguro',     desc: 'Recebimentos por cartão e PIX',       icon: 'bi-credit-card',    color: '#059669', bg: '#E8F5EE', connected: true  },
  //   { name: 'Asaas',         desc: 'Cobranças automatizadas',             icon: 'bi-lightning-charge',color:'#D97706', bg: '#FFF8E1', connected: false },
  //   { name: 'Google Sheets', desc: 'Exportar relatórios em planilha',     icon: 'bi-table',          color: '#198754', bg: '#E8F5EE', connected: false },
  //   { name: 'Slack',         desc: 'Alertas e notificações no canal',     icon: 'bi-slack',          color: '#611f69', bg: '#F3EFF5', connected: false },
  //   { name: 'Zapier',        desc: 'Automatize fluxos de trabalho',       icon: 'bi-robot',          color: '#FF4A00', bg: '#FFF0EB', connected: false },
  //   { name: 'API Própria',   desc: 'Webhook e integração via REST API',   icon: 'bi-code-square',    color: '#1A202C', bg: '#F8F9FA', connected: false },
  // ];

  // const intGrid = document.getElementById('integrationsList');
  // integrations.forEach(int => {
  //   const div = document.createElement('div');
  //   div.className = 'cfg-integration-card' + (int.connected ? ' connected' : '');
  //   div.innerHTML = `
  //     <div class="d-flex align-items-start justify-content-between">
  //       <div class="cfg-int-logo" style="background:${int.bg};color:${int.color}">
  //         <i class="bi ${int.icon}"></i>
  //       </div>
  //       ${int.connected
  //         ? '<span class="fp-badge fp-badge-pago">Conectado</span>'
  //         : '<span class="fp-badge fp-badge-agendado" style="opacity:.6">Disponível</span>'}
  //     </div>
  //     <div class="cfg-int-name">${int.name}</div>
  //     <div class="cfg-int-desc">${int.desc}</div>
  //     <div class="cfg-int-footer">
  //       ${int.connected
  //         ? `<button class="btn fp-btn-outline-secondary btn-sm d-flex align-items-center gap-1">
  //              <i class="bi bi-gear"></i> Configurar
  //            </button>
  //            <button class="btn btn-sm" style="color:var(--fp-danger);background:var(--fp-danger-soft);border:none;border-radius:6px;font-size:.75rem;font-weight:600">
  //              Desconectar
  //            </button>`
  //         : `<button class="btn fp-btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-1">
  //              <i class="bi bi-plug"></i> Conectar
  //            </button>`
  //       }
  //     </div>
  //   `;
  //   intGrid.appendChild(div);
  // });

  // /* ── Color picker ─────────────────────────────────────── */
  // document.querySelectorAll('.cfg-color-dot').forEach(dot => {
  //   dot.addEventListener('click', function () {
  //     document.querySelectorAll('.cfg-color-dot').forEach(d => d.classList.remove('selected'));
  //     this.classList.add('selected');
  //   });
  // });

  // /* ── Icon picker ──────────────────────────────────────── */
  // const icons = ['bi-tag','bi-cart','bi-house','bi-person','bi-gear','bi-graph-up',
  //                'bi-cash','bi-briefcase','bi-truck','bi-phone','bi-laptop','bi-tools',
  //                'bi-building','bi-heart','bi-star','bi-lightning'];
  // const iconPicker = document.getElementById('iconPicker');
  // if (iconPicker) {
  //   icons.forEach((ic, i) => {
  //     const span = document.createElement('span');
  //     span.className = 'cfg-icon-opt' + (i === 0 ? ' selected' : '');
  //     span.innerHTML = `<i class="bi ${ic}"></i>`;
  //     span.addEventListener('click', function () {
  //       document.querySelectorAll('.cfg-icon-opt').forEach(s => s.classList.remove('selected'));
  //       this.classList.add('selected');
  //     });
  //     iconPicker.appendChild(span);
  //   });
  // }

  /* ── Helpers ──────────────────────────────────────────── */
  function fmt(n) {
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

})();