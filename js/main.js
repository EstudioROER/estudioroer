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
  const floatingGiftBtn = document.getElementById('floatingGiftBtn');
  const giftModal = document.getElementById('giftModal');
  const giftModalClose = document.getElementById('giftModalClose');
  const giftForm = document.getElementById('giftLeadForm');
  const giftFormContainer = document.getElementById('giftFormContainer');
  const giftSuccessState = document.getElementById('giftSuccessState');
  const openGiftBtns = document.querySelectorAll('.open-gift-trigger');

  function openGiftModal() {
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

  if (floatingGiftBtn) {
    floatingGiftBtn.addEventListener('click', openGiftModal);
  }

  if (openGiftBtns) {
    openGiftBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openGiftModal();
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
      const leadData = { nombre, phone, email, comuna, fecha: new Date().toISOString() };
      try {
        localStorage.setItem('roer_lead_guide', JSON.stringify(leadData));
      } catch (err) {}

      // Switch to success view
      if (giftFormContainer && giftSuccessState) {
        giftFormContainer.style.display = 'none';
        giftSuccessState.style.display = 'block';

        const userNameDisplay = document.getElementById('giftUserNameDisplay');
        if (userNameDisplay) userNameDisplay.textContent = nombre;

        // Auto open guide doc after 1s or direct link
        setTimeout(() => {
          window.open('assets/docs/guia-regularizacion-roer.html', '_blank');
        }, 1200);

        // Prepare WhatsApp link
        const wspGuideBtn = document.getElementById('giftWspConfirmBtn');
        if (wspGuideBtn) {
          const msg = encodeURIComponent(`Hola Estudio ROER! Acabo de descargar la Guía de Regularización en su web. Mi nombre es ${nombre} de la comuna de ${comuna}.`);
          wspGuideBtn.href = `https://wa.me/56950196861?text=${msg}`;
        }
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
    const m2 = parseFloat(calcM2.value) || 70;
    const tipo = calcTipo.value;
    const comuna = calcComuna ? calcComuna.value : 'San Bernardo';

    let baseUF = 8.5;
    let weeks = '4 a 6 semanas';

    if (tipo === 'ley_mono') {
      if (m2 <= 90) {
        baseUF = 10.0;
      } else if (m2 <= 140) {
        baseUF = 15.0;
      } else {
        baseUF = 20.0;
      }
      weeks = '4 a 8 semanas';
    } else if (tipo === 'ampliacion') {
      baseUF = (m2 * 0.25).toFixed(1);
      if (baseUF < 15.0) baseUF = 15.0;
      weeks = '5 a 8 semanas';
    } else if (tipo === 'obra_nueva') {
      baseUF = (m2 * 0.35).toFixed(1);
      if (baseUF < 20.0) baseUF = 20.0;
      weeks = '8 a 12 semanas';
    } else if (tipo === 'recepcion') {
      baseUF = 12.0;
      weeks = '3 a 5 semanas';
    }

    calcPriceDisplay.textContent = `Desde ${baseUF} UF (Referencial)`;
    if (calcTimeDisplay) {
      calcTimeDisplay.textContent = `Plazo estimado DOM: ${weeks} • Precio final certificado en visita`;
    }

    const calcM2Recepcion = document.getElementById('calcM2Recepcion');
    const m2Rec = calcM2Recepcion && calcM2Recepcion.value ? parseFloat(calcM2Recepcion.value) : 0;
    
    let msgText = `Hola Estudio ROER! Acabo de generar un presupuesto estimado en la web para ${comuna}: ${tipo.replace('_', ' ').toUpperCase()} de aprox ${m2} m² a regularizar.`;
    if (m2Rec > 0) {
      msgText += ` (La propiedad ya cuenta con ${m2Rec} m² con recepción definitiva).`;
    }
    msgText += ` El simulador me indicó honorarios desde ${baseUF} UF. Me gustaría iniciar el contacto a partir de este presupuesto para evaluar mi caso y agendar la visita.`;
    
    const msg = encodeURIComponent(msgText);
    if (calcWspBtn) {
      calcWspBtn.href = `https://wa.me/56950196861?text=${msg}`;
    }
  }

  if (calcComuna && calcTipo && calcM2) {
    calcComuna.addEventListener('change', updateEstimate);
    calcTipo.addEventListener('change', updateEstimate);
    calcM2.addEventListener('input', updateEstimate);
    
    const calcM2Recepcion = document.getElementById('calcM2Recepcion');
    if (calcM2Recepcion) {
      calcM2Recepcion.addEventListener('input', updateEstimate);
    }
    
    updateEstimate();
  }
});
