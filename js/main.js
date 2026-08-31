// ESTUDIO ROER - INTERACTIVE SCRIPTS
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '58px';
        navMenu.style.left = '1.25rem';
        navMenu.style.right = '1.25rem';
        navMenu.style.background = '#ffffff';
        navMenu.style.padding = '1.25rem';
        navMenu.style.borderRadius = '14px';
        navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
        navMenu.style.border = '1px solid #e5e7eb';
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
        baseUF = 9.5;
      } else if (m2 <= 140) {
        baseUF = 12.0;
      } else {
        baseUF = 15.0;
      }
      weeks = '4 a 8 semanas';
    } else if (tipo === 'ampliacion') {
      baseUF = (m2 * 0.14).toFixed(1);
      if (baseUF < 10.0) baseUF = 10.0;
      weeks = '5 a 8 semanas';
    } else if (tipo === 'obra_nueva') {
      baseUF = (m2 * 0.18).toFixed(1);
      if (baseUF < 14.0) baseUF = 14.0;
      weeks = '8 a 12 semanas';
    } else if (tipo === 'recepcion') {
      baseUF = 8.5;
      weeks = '3 a 5 semanas';
    }

    calcPriceDisplay.textContent = `Desde ${baseUF} UF (Referencial)`;
    if (calcTimeDisplay) {
      calcTimeDisplay.textContent = `Plazo estimado DOM: ${weeks} • Precio final certificado en visita`;
    }

    const msg = encodeURIComponent(`Hola Estudio ROER! Acabo de simular en la web para ${comuna}: ${tipo.replace('_', ' ').toUpperCase()} de aprox ${m2} m². Me gustaría agendar la visita técnica en terreno para certificar el presupuesto final.`);
    if (calcWspBtn) {
      calcWspBtn.href = `https://wa.me/56950196861?text=${msg}`;
    }
  }

  if (calcComuna && calcTipo && calcM2) {
    calcComuna.addEventListener('change', updateEstimate);
    calcTipo.addEventListener('change', updateEstimate);
    calcM2.addEventListener('input', updateEstimate);
    updateEstimate();
  }
});
