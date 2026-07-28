/**
 * RestIA - Modern Landing Page Interactive Logic
 * Handles Giros Tab Switcher, RestIA Pay Simulator, KDS Live Demo, ROI Calculator, and Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. GIROS DE NEGOCIO TAB SWITCHER
     ========================================== */
  const giroData = {
    taqueria: {
      title: "Taquería & Servicio Rápido",
      desc: "Optimizado para velocidad extrema en cobro de mostrador, KDS táctil en comanderas de cocina, emisión instantánea de ticket QR y monitor público de turnos.",
      features: [
        "Cobro ágil en 1 clic sin fricciones ni esperas",
        "KDS con temporizadores de color (Verde/Amarillo/Rojo)",
        "Pantalla pública tipo McDonald's para entrega de órdenes",
        "Envío de recibo por WhatsApp sin consumir papel térmico"
      ],
      mockupBg: "#0d141e",
      badgeText: "Servicio Ultra Rápido"
    },
    restaurante: {
      title: "Restaurante Formal / Casual",
      desc: "Experiencia gastronómica 360° con Mapa de Mesas interactivo, comanderas móviles para meseros, división de cuentas en 1 clic y módulo de reservaciones.",
      features: [
        "Plano interactivo de mesas con estado en tiempo real (Libre/Ocupada/Cuentas)",
        "Dividir cuentas de grupos por comensal o partes iguales",
        "Comanderas en tablet para meseros con envío directo a cocina",
        "Gestión de reservaciones y control de tiempos de mesa"
      ],
      mockupBg: "#190f1d",
      badgeText: "Experiencia 360°"
    },
    cafeteria: {
      title: "Cafetería & Panadería",
      desc: "Punto de Venta veloz con menú de modificadores de receta (leches, siropes, tamaños) y Menú Digital QR autogestionable.",
      features: [
        "Modificadores de productos avanzados (Ej: Deslactosada, Extra shot)",
        "Menú Digital QR para mesas o clientes en fila",
        "Control preciso de insumos de repostería y café por gramaje",
        "Programa de lealtad y tarjetas digitales de regalo"
      ],
      mockupBg: "#1e140d",
      badgeText: "Gestión de Recetas"
    },
    darkkitchen: {
      title: "Dark Kitchen & Solo Delivery",
      desc: "Concentra pedidos de Uber Eats, DiDi, Rappi y canal propio en un solo pantalla KDS con alertas auditivas y control preventivo de insumos.",
      features: [
        "Integración centralizada de apps de delivery",
        "KDS optimizado para empacadores y repartidores",
        "Predicción con IA para evitar desabasto durante picos de venta",
        "Control de costos y margen de utilidad por canal"
      ],
      mockupBg: "#0d1b1c",
      badgeText: "Hub de Delivery"
    },
    foodtruck: {
      title: "Food Truck & Carritos",
      desc: "Operación liviana de alta velocidad en 1 sola pantalla touch o tablet, con cobros RestIA Pay Contactless y modo offline garantizado.",
      features: [
        "Modo compacto para pantalla táctil de 10 pulgadas o laptop",
        "RestIA Pay integrado para aceptar pagos con celular/tarjeta",
        "Funciona al 100% incluso con conexiones intermitentes de internet",
        "Cierre de caja express en menos de 2 minutos"
      ],
      mockupBg: "#1c180d",
      badgeText: "Movilidad Total"
    }
  };

  const tabBtns = document.querySelectorAll('.giro-tab-btn');
  const giroTitle = document.getElementById('giro-title');
  const giroDesc = document.getElementById('giro-desc');
  const giroFeatures = document.getElementById('giro-features');
  const giroBadge = document.getElementById('giro-badge');
  const giroWindow = document.querySelector('.giro-mockup-window');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const giroKey = btn.dataset.giro;
      const data = giroData[giroKey];

      if (data) {
        giroTitle.textContent = data.title;
        giroDesc.textContent = data.desc;
        giroBadge.textContent = data.badgeText;
        giroWindow.style.backgroundColor = data.mockupBg;

        giroFeatures.innerHTML = data.features.map(f => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${f}</span>
          </li>
        `).join('');
      }
    });
  });


  /* ==========================================
     2. RESTIA PAY TERMINAL SIMULATOR
     ========================================== */
  let baseAmount = 250.00;
  let tipPercent = 0.15; // Default 15%

  const amountDisplay = document.getElementById('pos-amount-display');
  const tipBtns = document.querySelectorAll('.tip-btn');
  const payBtn = document.getElementById('pos-pay-btn');
  const posResult = document.getElementById('pos-result-box');

  function updatePosAmount() {
    const tipAmount = baseAmount * tipPercent;
    const total = baseAmount + tipAmount;
    if (amountDisplay) {
      amountDisplay.textContent = `$${total.toFixed(2)} MXN`;
    }
  }

  tipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tipPercent = parseFloat(btn.dataset.tip);
      updatePosAmount();
    });
  });

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      payBtn.disabled = true;
      payBtn.innerHTML = `
        <svg class="spin-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
        </svg> Procesando Contactless...
      `;
      posResult.style.display = 'none';

      setTimeout(() => {
        payBtn.disabled = false;
        payBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          Tap / Acercar Tarjeta o Apple Pay
        `;
        posResult.style.display = 'block';
        const txId = Math.floor(100000 + Math.random() * 900000);
        posResult.innerHTML = `
          <strong><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="color:var(--primary); vertical-align:middle; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg> ¡Pago Aprobado!</strong><br>
          Transacción #${txId} conciliada automáticamente.<br>
          <span style="font-size: 0.8rem; color: #94a3b8;">Ticket QR generado & enviado por WhatsApp</span>
        `;
      }, 1200);
    });
  }


  /* ==========================================
     3. KDS KITCHEN MONITOR LIVE DEMO
     ========================================== */
  const kdsContainer = document.getElementById('kds-container');
  const addOrderBtn = document.getElementById('kds-add-order-btn');

  let orders = [
    { id: 104, table: "Mesa 4", items: ["2x Tacos al Pastor", "1x Gringa Queso"], elapsedSeconds: 240 },
    { id: 105, table: "Mesa 8", items: ["1x Ribeye 400g Termino Medio", "1x Papa Asada"], elapsedSeconds: 580 },
    { id: 106, table: "Mostrador #12", items: ["2x Cappuccino Grande", "1x Croissant"], elapsedSeconds: 930 }
  ];

  function renderKds() {
    if (!kdsContainer) return;
    kdsContainer.innerHTML = orders.map(order => {
      let timerClass = "timer-green";
      let statusLabel = '<span style="color:var(--primary); margin-right:4px;">●</span> Normal';
      const mins = Math.floor(order.elapsedSeconds / 60);

      if (mins >= 15) {
        timerClass = "timer-red";
        statusLabel = '<span style="color:var(--accent-rose); margin-right:4px;">●</span> URGENTE (>15m)';
      } else if (mins >= 8) {
        timerClass = "timer-yellow";
        statusLabel = '<span style="color:var(--accent-amber); margin-right:4px;">●</span> ALERTA (>8m)';
      }

      return `
        <div class="kds-ticket ${timerClass}">
          <div class="kds-ticket-header">
            <span>#${order.id} - ${order.table}</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle; margin-right:2px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${mins}m</span>
          </div>
          <div style="font-size:0.75rem; margin-bottom:0.4rem; font-weight:600; color:var(--text-muted);">${statusLabel}</div>
          <ul class="kds-items">
            ${order.items.map(it => `<li>• ${it}</li>`).join('')}
          </ul>
          <button class="kds-done-btn" onclick="completeKdsOrder(${order.id})">
            ✓ Marcar Listo para Servir
          </button>
        </div>
      `;
    }).join('');
  }

  // Global function for onclick button binding
  window.completeKdsOrder = function(orderId) {
    orders = orders.filter(o => o.id !== orderId);
    renderKds();
  };

  if (addOrderBtn) {
    addOrderBtn.addEventListener('click', () => {
      const nextId = Math.floor(100 + orders.length + Math.random() * 20);
      const tables = ["Mesa 2", "Mesa 15", "Delivery Uber", "Mostrador #05"];
      const randomTable = tables[Math.floor(Math.random() * tables.length)];
      orders.push({
        id: nextId,
        table: randomTable,
        items: ["1x Hamburguesa Especial", "1x Papas Fritas"],
        elapsedSeconds: 0
      });
      renderKds();
    });
  }

  // Increment timer every 5 seconds for realism
  setInterval(() => {
    orders.forEach(o => o.elapsedSeconds += 10);
    renderKds();
  }, 5000);

  renderKds();


  /* ==========================================
     4. ROI SAVINGS CALCULATOR
     ========================================== */
  const ordersSlider = document.getElementById('calc-orders');
  const ticketSlider = document.getElementById('calc-ticket');
  const ordersVal = document.getElementById('calc-orders-val');
  const ticketVal = document.getElementById('calc-ticket-val');
  const monthlyProfitVal = document.getElementById('calc-monthly-profit');
  const hoursSavedVal = document.getElementById('calc-hours-saved');

  function calculateRoi() {
    if (!ordersSlider || !ticketSlider) return;

    const dailyOrders = parseInt(ordersSlider.value);
    const avgTicket = parseInt(ticketSlider.value);

    ordersVal.textContent = `${dailyOrders} ordenes/día`;
    ticketVal.textContent = `$${avgTicket} MXN`;

    const monthlySales = dailyOrders * avgTicket * 30;
    
    // Estimated ROI gains:
    // +15% revenue from turnover speed & customer display upsells
    // -8% cost savings from food waste AI prevention
    const extraProfit = monthlySales * 0.18;
    const hoursSaved = Math.round((dailyOrders * 0.8) * 30 / 60);

    monthlyProfitVal.textContent = `$${Math.round(extraProfit).toLocaleString('es-MX')} MXN/mes`;
    hoursSavedVal.textContent = `+${hoursSaved} horas/mes libres`;
  }

  if (ordersSlider && ticketSlider) {
    ordersSlider.addEventListener('input', calculateRoi);
    ticketSlider.addEventListener('input', calculateRoi);
    calculateRoi();
  }


  /* ==========================================
     5. MOBILE MENU & SMOOTH SCROLLING
     ========================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

});
