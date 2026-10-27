// ESTUDIO ROER - INTERACTIVE SCRIPTS, GIFT MODAL & SIMULATOR
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    const setMenu = (open) => {
      navMenu.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileToggle.textContent = open ? '✕' : '☰';
    };

    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', () => {
      setMenu(!navMenu.classList.contains('open'));
    });

    // Cierra el menú al tocar un enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });

    // Cierra con Escape o al tocar fuera del menú
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) setMenu(false);
    });

    // Al pasar a pantalla grande, restablece el estado
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1100) setMenu(false);
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Gift Modal Open / Close Logic
  const giftModal = document.getElementById('giftModal');
  const giftModalClose = document.getElementById('giftModalClose');
  const giftForm = document.getElementById('giftLeadForm');
  const giftFormContainer = document.getElementById('giftFormContainer');
  const giftSuccessState = document.getElementById('giftSuccessState');
  const openGiftBtns = document.querySelectorAll('.open-gift-trigger');

  let activeGuideFile = 'assets/docs/guia-regularizacion-roer.html';
  let activeGuideTitle = 'Guía Práctica de Regularización DOM';

  const guideDetailsMap = {
    'assets/docs/guia-regularizacion-roer.html': {
      title: 'Compendio Didáctico: Resumen de Todos los Temas DOM',
      badge: '📖 Compendio Integral 2026-2027',
      subtitle: 'Accede al resumen ejecutivo que sintetiza Ley del Mono, Tasaciones Bancarias y Deslindes en un solo documento.',
      features: [
        '✓ Síntesis práctica de Ley 20.898, Tasaciones y Deslindes.',
        '✓ Matriz comparativa entre vivienda irregular vs recepcionada.',
        '✓ Hoja de ruta en 4 pasos para regularizar con Estudio ROER.'
      ],
      btnText: '👁️ Visualizar Compendio General'
    },
    'assets/docs/guia-ley-del-mono-20898.html': {
      title: 'Guía Ley del Mono 20.898 (Vigencia 2027)',
      badge: '📜 Ley 20.898 Transitoria',
      subtitle: 'Ingresa tus datos para acceder a los requisitos de superficie, avalúo fiscal y trámite simultáneo sin multas.',
      features: [
        '✓ Tramos de 90 m² (1.000 UF) y 140 m² (2.000 UF).',
        '✓ Checklist de documentos exigidos por la DOM comunal.',
        '✓ Vigencia improrrogable confirmada hasta diciembre de 2027.'
      ],
      btnText: '👁️ Visualizar Guía Ley del Mono'
    },
    'assets/docs/guia-recepcion-final-bancos.html': {
      title: 'Por qué los Bancos Exigen Recepción Final para Créditos',
      badge: '🏦 Tasación & Financiamiento',
      subtitle: 'Aprende cómo evitar que el banco rechace el crédito hipotecario o tase a valor cero las ampliaciones de tu propiedad.',
      features: [
        '✓ Por qué el tasador desestima metros sin recepción.',
        '✓ Cómo aumentar el valor comercial entre un +30% y +50%.',
        '✓ Cobertura 100% de pólizas de incendio y sismo.'
      ],
      btnText: '👁️ Visualizar Guía Financiera Bancos'
    },
    'assets/docs/guia-deslinde-vecino-oguc.html': {
      title: 'Construcción en Deslinde: Muros Cortafuego y OGUC',
      badge: '📏 Deslindes & Normativa OGUC',
      subtitle: 'Conoce los márgenes técnicos de adosamiento, alturas permitidas y muros cortafuego para regularizar sin demolición.',
      features: [
        '✓ Exigencias de muro cortafuego F-60 / F-120 y sobrepaso.',
        '✓ Porcentaje máximo de adosamiento (40%) y altura de 3,5 m.',
        '✓ Cómo evitar multas de Policía Local o denuncias de vecinos.'
      ],
      btnText: '👁️ Visualizar Guía de Deslindes'
    }
  };

  function openGiftModal(file, title) {
    activeGuideFile = file || 'assets/docs/guia-regularizacion-roer.html';
    activeGuideTitle = title || 'Guía Práctica de Regularización DOM';

    const info = guideDetailsMap[activeGuideFile] || {
      title: activeGuideTitle,
      badge: '📖 Guía Didáctica Oficial',
      subtitle: 'Ingresa tus datos para acceder inmediatamente al documento técnico interactivo con las respuestas normativas.',
      features: [
        '✓ Criterios de habitabilidad y seguridad estructural.',
        '✓ Checklist de planos y documentos requeridos en la DOM.',
        '✓ Recomendaciones de arquitectos especialistas.'
      ],
      btnText: '👁️ Visualizar Guía en Línea'
    };

    const modalTitleEl = document.querySelector('.gift-modal-title');
    if (modalTitleEl) modalTitleEl.textContent = info.title;

    const modalSubEl = document.querySelector('.gift-modal-subtitle');
    if (modalSubEl) modalSubEl.textContent = info.subtitle;

    const modalBadgeEl = document.querySelector('.gift-modal-header .chip');
    if (modalBadgeEl) modalBadgeEl.textContent = info.badge;

    const modalFeaturesEl = document.querySelector('.gift-modal-features');
    if (modalFeaturesEl && info.features) {
      modalFeaturesEl.innerHTML = info.features.map(f => `<div>${f}</div>`).join('');
    }

    const modalBtnSpan = document.querySelector('.gift-modal-submit-btn span');
    if (modalBtnSpan) modalBtnSpan.textContent = info.btnText;

    if (giftFormContainer && giftSuccessState) {
      giftFormContainer.style.display = 'block';
      giftSuccessState.style.display = 'none';
    }

    if (giftModal) {
      giftModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeGiftModal() {
    if (giftModal) {
      giftModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }



  if (openGiftBtns) {
    openGiftBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      const file = btn.getAttribute('data-guide-file');
      const title = btn.getAttribute('data-guide-title');
      openGiftModal(file, title);
    }));
  }

  if (giftModalClose) {
    giftModalClose.addEventListener('click', closeGiftModal);
  }

  if (giftModal) {
    giftModal.addEventListener('click', (e) => {
      if (e.target === giftModal) {
        closeGiftModal();
      }
    });
  }

  // Handle Gift Form Submission
  if (giftForm) {
    giftForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('giftName').value.trim();
      const phone = document.getElementById('giftPhone').value.trim();
      const email = document.getElementById('giftEmail').value.trim();
      const comuna = document.getElementById('giftComuna').value;

      // Save lead locally
      const leadData = { 
        nombre, 
        phone, 
        email, 
        comuna, 
        guia: activeGuideTitle,
        archivo: activeGuideFile,
        fecha: new Date().toISOString() 
      };
      try {
        localStorage.setItem('roer_lead_guide', JSON.stringify(leadData));
      } catch (err) {}

      // Switch to success view
      if (giftFormContainer && giftSuccessState) {
        giftFormContainer.style.display = 'none';
        giftSuccessState.style.display = 'block';

        const userNameDisplay = document.getElementById('giftUserNameDisplay');
        if (userNameDisplay) userNameDisplay.textContent = nombre;

        // Actualizar botón de descarga directa en modal de éxito
        const directGuideBtn = giftSuccessState.querySelector('a[href*="guia"]');
        if (directGuideBtn) {
          directGuideBtn.href = activeGuideFile;
        }

        // Auto open guide doc after 1s or direct link
        setTimeout(() => {
          window.open(activeGuideFile, '_blank');
        }, 1200);

        // Prepare WhatsApp link
        const wspGuideBtn = document.getElementById('giftWspConfirmBtn');
        if (wspGuideBtn) {
          const msg = encodeURIComponent(`Hola Estudio ROER! Acabo de descargar la "${activeGuideTitle}" en su web. Mi nombre es ${nombre} de la comuna de ${comuna}.`);
          wspGuideBtn.href = `https://wa.me/56950196861?text=${msg}`;
        }
      }
    });
  }

  // Contact Form (Web3Forms)
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactFormStatus');

  function showContactStatus(message, ok) {
    if (!contactStatus) return;
    contactStatus.style.display = 'block';
    contactStatus.textContent = message;
    contactStatus.style.background = ok ? '#f0fdf4' : '#fef2f2';
    contactStatus.style.color = ok ? '#15803d' : '#b91c1c';
    contactStatus.style.border = ok ? '1px solid #bbf7d0' : '1px solid #fecaca';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnLabel = submitBtn ? submitBtn.querySelector('span') : null;
      const originalLabel = btnLabel ? btnLabel.textContent : '';

      if (btnLabel) btnLabel.textContent = 'Enviando...';

      // Si se prueba en local (file://), redirigir directamente a gracias.html para ver la experiencia
      if (window.location.protocol === 'file:') {
        e.preventDefault();
        window.location.href = 'gracias.html';
        return;
      }

      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });
        const result = await response.json();

        if (response.ok && result.success) {
          window.location.href = 'gracias.html';
        } else {
          // Si la API requiere envío nativo, enviar formulario estándar
          contactForm.submit();
        }
      } catch (err) {
        // En caso de bloqueo de fetch o red, fallback a envío estándar
        contactForm.submit();
      }
    });
  }

  // Calculator Logic
  const calcComuna = document.getElementById('calcComuna');
  const calcTipo = document.getElementById('calcTipo');
  const calcM2 = document.getElementById('calcM2');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcTimeDisplay = document.getElementById('calcTimeDisplay');
  const calcWspBtn = document.getElementById('calcWspBtn');

  function updateEstimate() {
    if (!calcM2 || !calcTipo || !calcPriceDisplay) return;
    const m2 = Math.max(1, parseFloat(calcM2.value) || 70);
    const tipo = calcTipo.value;
    const comuna = calcComuna ? calcComuna.value : 'San Bernardo';
    const valorUF_CLP = 39500; // Valor referencial actualizado de la UF

    let baseUF = 13.0;
    let weeks = '4 a 8 semanas';
    let tipoNombre = 'Regularización de Inmueble';

    // Fórmulas directamente proporcionales al m²:
    // El valor sube o baja continuamente con cada m² ingresado.
    if (tipo === 'ley_mono') {
      tipoNombre = 'Regularización Ley del Mono (Ley 20.898)';
      // Tasa directa: 8.5 UF base fija + 0.11 UF por cada m²
      // Ejemplos: 40 m² = 13.0 UF | 70 m² = 16.2 UF | 100 m² = 19.5 UF | 140 m² = 23.9 UF
      baseUF = 8.5 + m2 * 0.11;
      weeks = '4 a 8 semanas';
    } else if (tipo === 'ampliacion') {
      tipoNombre = 'Ampliación / Segundo Piso (Vía General LGUC)';
      // Tasa directa: 9.5 UF base fija + 0.15 UF por cada m²
      // Ejemplos: 30 m² = 14.0 UF | 50 m² = 17.0 UF | 70 m² = 20.0 UF | 100 m² = 24.5 UF
      baseUF = 9.5 + m2 * 0.15;
      weeks = '6 a 10 semanas';
    } else if (tipo === 'recepcion') {
      tipoNombre = 'Recepción Final Municipal';
      // Tasa directa: 9.0 UF base fija + 0.08 UF por cada m²
      // Ejemplos: 50 m² = 13.0 UF | 70 m² = 14.6 UF | 100 m² = 17.0 UF
      baseUF = 9.0 + m2 * 0.08;
      weeks = '4 a 6 semanas';
    } else if (tipo === 'regularizacion_comercial') {
      tipoNombre = 'Regularización Comercial / Patente';
      // Tasa directa: 12.0 UF base fija + 0.18 UF por cada m²
      // Ejemplos: 40 m² = 19.2 UF | 70 m² = 24.6 UF | 100 m² = 30.0 UF
      baseUF = 12.0 + m2 * 0.18;
      weeks = '6 a 10 semanas';
    } else if (tipo === 'obra_nueva') {
      tipoNombre = 'Permiso Obra Nueva (Casa Completa)';
      // Tasa directa: 15.0 UF base fija + 0.22 UF por cada m²
      // Ejemplos: 50 m² = 26.0 UF | 70 m² = 30.4 UF | 100 m² = 37.0 UF | 140 m² = 45.8 UF
      baseUF = 15.0 + m2 * 0.22;
      weeks = '8 a 14 semanas';
    } else if (tipo === 'subdivision') {
      tipoNombre = 'Subdivisión o Fusión de Terreno';
      // Base predial: 18.0 UF + 0.008 UF por cada m² de terreno
      baseUF = 18.0 + m2 * 0.008;
      weeks = '6 a 12 semanas';
    } else if (tipo === 'cambio_destino') {
      tipoNombre = 'Cambio de Destino Inmueble';
      // Tasa directa: 11.0 UF base fija + 0.14 UF por cada m²
      baseUF = 11.0 + m2 * 0.14;
      weeks = '5 a 8 semanas';
    } else if (tipo === 'levantamiento') {
      tipoNombre = 'Levantamiento Planimétrico As-Built';
      // Tasa directa: 8.5 UF base fija + 0.09 UF por cada m²
      baseUF = 8.5 + m2 * 0.09;
      weeks = '2 a 4 semanas';
    }

    const calcPlanos = document.getElementById('calcPlanos');
    const estadoPlanos = calcPlanos ? calcPlanos.value : 'sin_planos';
    let estadoPlanosTxt = 'Sin planos previos (levantamiento completo)';

    if (estadoPlanos === 'con_planos') {
      estadoPlanosTxt = 'Cuenta con planos aprobados previos';
      // Descuento referencial del 10% si ya cuenta con base planimétrica primitiva aprobada
      baseUF = baseUF * 0.90;
    } else if (estadoPlanos === 'duda') {
      estadoPlanosTxt = 'Por confirmar / Búsqueda en archivo DOM';
    }

    // Regla de piso mínimo absoluto: nunca menos de 13.0 UF (~$513.500 CLP)
    if (baseUF < 13.0) baseUF = 13.0;

    const baseUFRedondeado = baseUF.toFixed(1);
    const montoCLP = Math.round(baseUF * valorUF_CLP);
    const montoCLPFormateado = '$' + montoCLP.toLocaleString('es-CL');

    calcPriceDisplay.textContent = `Desde ${baseUFRedondeado} UF (~${montoCLPFormateado} CLP)`;
    if (calcTimeDisplay) {
      calcTimeDisplay.textContent = `Plazo estimado DOM: ${weeks} • Honorarios referenciales certificados en visita`;
    }

    // Actualizar medidor visual y badge de superficie
    const calcM2ValueBadge = document.getElementById('calcM2ValueBadge');
    if (calcM2ValueBadge) {
      calcM2ValueBadge.textContent = `${m2} m²`;
    }

    const calcMeterBar = document.getElementById('calcMeterBar');
    const calcMeterPctLabel = document.getElementById('calcMeterPctLabel');
    if (calcMeterBar) {
      // Escala visual entre 13 UF (mínimo) y 45 UF (máximo referencial)
      const minScaleUF = 13.0;
      const maxScaleUF = 45.0;
      let pct = ((baseUF - minScaleUF) / (maxScaleUF - minScaleUF)) * 100;
      pct = Math.max(10, Math.min(100, Math.round(pct)));
      calcMeterBar.style.width = `${pct}%`;

      if (calcMeterPctLabel) {
        calcMeterPctLabel.textContent = `Nivel de Complejidad: ${pct}%`;
      }
    }
    
    let msgText = `Hola Estudio ROER! Acabo de simular un presupuesto en la web para ${comuna}: ${tipoNombre} de aprox ${m2} m². Antecedentes: ${estadoPlanosTxt}. El simulador estimó honorarios desde ${baseUFRedondeado} UF (~${montoCLPFormateado} CLP). Me gustaría coordinar la visita técnica presencial.`;
    
    const msg = encodeURIComponent(msgText);
    if (calcWspBtn) {
      calcWspBtn.href = `https://wa.me/56950196861?text=${msg}`;
    }
  }

  if (calcComuna && calcTipo && calcM2) {
    const calcM2Range = document.getElementById('calcM2Range');

    // Sincronizar input numérico con slider range
    if (calcM2Range) {
      calcM2Range.addEventListener('input', () => {
        calcM2.value = calcM2Range.value;
        updateEstimate();
      });

      calcM2.addEventListener('input', () => {
        calcM2Range.value = calcM2.value;
        updateEstimate();
      });
    } else {
      calcM2.addEventListener('input', updateEstimate);
    }

    calcComuna.addEventListener('change', updateEstimate);
    calcTipo.addEventListener('change', updateEstimate);
    
    const calcPlanos = document.getElementById('calcPlanos');
    if (calcPlanos) {
      calcPlanos.addEventListener('change', updateEstimate);
    }
    
    updateEstimate();
  }

  // ==========================================================================
  // OFICINA VIRTUAL INTELIGENTE - KUMOSPACE (Mar y Jue · 18:00 a 20:30 Chile)
  // ==========================================================================
  const voCard = document.getElementById('oficina-virtual');
  const voStatusBadge = document.getElementById('voStatusBadge');
  const voStatusTitle = document.getElementById('voStatusTitle');
  const voTitle = document.getElementById('voTitle');
  const voDescription = document.getElementById('voDescription');
  const voActions = document.getElementById('voActions');
  const navOfficeDot = document.getElementById('navOfficeDot');
  const navOfficeText = document.getElementById('navOfficeText');

  function getChileSchedule() {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Santiago',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23'
      });
      const parts = formatter.formatToParts(new Date());
      const map = {};
      parts.forEach(p => map[p.type] = p.value);
      return {
        weekday: map.weekday, // 'Tue', 'Thu', etc.
        hour: parseInt(map.hour, 10),
        minute: parseInt(map.minute, 10)
      };
    } catch (e) {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return {
        weekday: days[now.getDay()],
        hour: now.getHours(),
        minute: now.getMinutes()
      };
    }
  }

  function isVirtualOfficeOpen() {
    // Parámetro de prueba opcional en URL: ?test_office=open o ?test_office=closed
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test_office') === 'open') return true;
    if (urlParams.get('test_office') === 'closed') return false;

    const t = getChileSchedule();
    const isTueOrThu = (t.weekday === 'Tue' || t.weekday === 'Thu');
    const totalMinutes = t.hour * 60 + t.minute;
    // 18:00 hrs = 1080 min | 20:30 hrs = 1230 min
    return isTueOrThu && (totalMinutes >= 1080 && totalMinutes < 1230);
  }

  function updateVirtualOfficeUI() {
    if (!voCard || !voActions) return;

    const isOpen = isVirtualOfficeOpen();

    if (isOpen) {
      // Estado: EN VIVO
      voCard.classList.remove('is-closed');
      if (voStatusBadge) {
        voStatusBadge.className = 'vo-status-badge open';
        voStatusBadge.innerHTML = '<span class="vo-dot"></span><span>🟢 EN VIVO · ARQUITECTO EN LÍNEA</span>';
      }
      if (voTitle) {
        voTitle.textContent = 'El arquitecto está disponible en el despacho';
      }
      if (voDescription) {
        voDescription.textContent = 'Estamos en horario de atención. Ingresa ahora para una consulta técnica preliminar, resolver dudas de permisos o revisar tu propiedad en directo.';
      }
      voActions.innerHTML = `
        <a href="https://www.kumospace.com/estudioroer" target="_blank" rel="noopener noreferrer" class="vo-btn-live">
          <span>🏛️ Entrar a la Oficina Virtual</span>
          <span style="font-size: 1.05rem;">↗</span>
        </a>
        <a href="https://wa.me/56950196861?text=Hola%20Estudio%20ROER,%20los%20veo%20en%20l%C3%ADnea%20en%20su%20oficina%20virtual." target="_blank" rel="noopener noreferrer" class="vo-btn-secondary" style="border-color: #25D366; color: #15803d !important;">
          <span>💬 Avisar por WhatsApp</span>
        </a>
      `;

      if (navOfficeDot) navOfficeDot.classList.add('open');
      if (navOfficeText) navOfficeText.textContent = 'Oficina Virtual (En Vivo 🟢)';
    } else {
      // Estado: FUERA DE HORARIO
      voCard.classList.add('is-closed');
      if (voStatusBadge) {
        voStatusBadge.className = 'vo-status-badge closed';
        voStatusBadge.innerHTML = '<span class="vo-dot"></span><span>⚪ FUERA DE HORARIO EN VIVO</span>';
      }
      if (voTitle) {
        voTitle.textContent = 'Atención en Vivo en el Estudio';
      }
      if (voDescription) {
        voDescription.textContent = 'Nuestra atención directa en el estudio virtual es los Martes y Jueves de 18:00 a 20:30 hrs (hora de Chile). Fuera de este horario, puedes agendar una visita técnica o dejarnos tu consulta.';
      }
      voActions.innerHTML = `
        <a href="https://calendar.app.google/KHPY2PfRjG3rM1SR8" target="_blank" rel="noopener noreferrer" class="vo-btn-secondary">
          <span>📅 Agendar Visita Técnica</span>
        </a>
        <a href="https://wa.me/56950196861?text=Hola%20Estudio%20ROER,%20quisiera%20hacer%20una%20consulta%20con%20el%20arquitecto." target="_blank" rel="noopener noreferrer" class="vo-btn-secondary" style="border-color: #25D366; color: #15803d !important;">
          <span>💬 Escribir al WhatsApp</span>
        </a>
      `;

      if (navOfficeDot) navOfficeDot.classList.remove('open');
      if (navOfficeText) navOfficeText.textContent = 'Oficina Virtual';
    }
  }

  // Inicializar estado y actualizar cada 1 minuto automáticamente
  updateVirtualOfficeUI();
  setInterval(updateVirtualOfficeUI, 60000);
});

