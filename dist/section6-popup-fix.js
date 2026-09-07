(() => {
  function formatDate(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return `${digits.slice(0,4)}/${digits.slice(4)}`;
    return `${digits.slice(0,4)}/${digits.slice(4,6)}/${digits.slice(6)}`;
  }

  function formatTime(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0,2)}:${digits.slice(2)}`;
  }

  function validDate(value) {
    const match = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(value);
    if (!match) return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const candidate = new Date(Date.UTC(year, month - 1, day));
    return year >= 2000 &&
      candidate.getUTCFullYear() === year &&
      candidate.getUTCMonth() === month - 1 &&
      candidate.getUTCDate() === day;
  }

  function validTime(value) {
    return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
  }

  function apply() {
    const screen = document.getElementById('date-screen');
    if (!screen || screen.querySelector(':scope > .s6-date-popup-layer')) return;

    const legacyDate = document.getElementById('departure-date');
    const legacyTime = document.getElementById('departure-time');
    const legacyConfirm = document.getElementById('date-confirm');
    const legacyClose = document.getElementById('date-close');
    if (!legacyDate || !legacyTime || !legacyConfirm || !legacyClose) return;

    const layer = document.createElement('div');
    layer.className = 's6-date-popup-layer';
    layer.innerHTML = `
      <section class="s6-date-popup" role="dialog" aria-modal="true" aria-label="原定班機時間">
        <header class="s6-date-popup-header">
          <h1 class="s6-date-popup-title">原定班機時間</h1>
          <button class="s6-date-popup-close" type="button" aria-label="關閉原定班機時間"><img src="./assets/close.png" alt=""></button>
        </header>
        <div class="s6-date-popup-form">
          <label class="s6-date-popup-field">
            <span class="s6-date-popup-label">原定起飛日期</span>
            <input class="s6-date-popup-input" data-popup-date type="text" inputmode="numeric" autocomplete="off" maxlength="10" placeholder="YYYY/MM/DD">
            <span class="s6-date-popup-error">請輸入正確的日期</span>
          </label>
          <label class="s6-date-popup-field">
            <span class="s6-date-popup-label">原定起飛時間(24hr)</span>
            <input class="s6-date-popup-input" data-popup-time type="text" inputmode="numeric" autocomplete="off" maxlength="5" placeholder="HH:MM">
            <span class="s6-date-popup-error">請輸入正確的時間</span>
          </label>
        </div>
        <footer class="s6-date-popup-footer">
          <button class="s6-date-popup-confirm" data-popup-confirm type="button" disabled>確認資訊</button>
        </footer>
      </section>`;

    screen.appendChild(layer);

    const popup = layer.querySelector('.s6-date-popup');
    const dateInput = layer.querySelector('[data-popup-date]');
    const timeInput = layer.querySelector('[data-popup-time]');
    const confirm = layer.querySelector('[data-popup-confirm]');
    const close = layer.querySelector('.s6-date-popup-close');

    dateInput.value = legacyDate.value || '';
    timeInput.value = legacyTime.value || '';

    function syncLegacy() {
      legacyDate.value = dateInput.value;
      legacyTime.value = timeInput.value;
      legacyDate.dispatchEvent(new Event('input', { bubbles: true }));
      legacyTime.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function render() {
      const dateOkay = validDate(dateInput.value);
      const timeOkay = validTime(timeInput.value);
      const dateBad = dateInput.dataset.touched === 'true' && dateInput.value !== '' && !dateOkay;
      const timeBad = timeInput.dataset.touched === 'true' && timeInput.value !== '' && !timeOkay;

      dateInput.classList.toggle('is-invalid', dateBad);
      timeInput.classList.toggle('is-invalid', timeBad);
      popup.classList.toggle('has-error', dateBad || timeBad);
      confirm.disabled = !(dateOkay && timeOkay);
    }

    dateInput.addEventListener('input', () => {
      dateInput.value = formatDate(dateInput.value);
      syncLegacy();
      render();
    });

    timeInput.addEventListener('input', () => {
      timeInput.value = formatTime(timeInput.value);
      syncLegacy();
      render();
    });

    dateInput.addEventListener('blur', () => {
      dateInput.dataset.touched = 'true';
      legacyDate.dataset.touched = 'true';
      syncLegacy();
      legacyDate.dispatchEvent(new Event('blur', { bubbles: true }));
      render();
    });

    timeInput.addEventListener('blur', () => {
      timeInput.dataset.touched = 'true';
      legacyTime.dataset.touched = 'true';
      syncLegacy();
      legacyTime.dispatchEvent(new Event('blur', { bubbles: true }));
      render();
    });

    confirm.addEventListener('click', () => {
      if (confirm.disabled) return;
      syncLegacy();
      legacyConfirm.click();
    });

    close.addEventListener('click', () => {
      syncLegacy();
      legacyClose.click();
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(apply), { once: true });
  } else {
    requestAnimationFrame(apply);
  }
})();
