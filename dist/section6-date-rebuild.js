(() => {
  const $ = (s, r = document) => r.querySelector(s);

  function formatDate(value) {
    const d = String(value || '').replace(/\D/g, '').slice(0, 8);
    if (d.length <= 4) return d;
    if (d.length <= 6) return `${d.slice(0,4)}/${d.slice(4)}`;
    return `${d.slice(0,4)}/${d.slice(4,6)}/${d.slice(6)}`;
  }

  function formatTime(value) {
    const d = String(value || '').replace(/\D/g, '').slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0,2)}:${d.slice(2)}`;
  }

  function validDate(value) {
    const m = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(String(value || ''));
    if (!m) return false;
    const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
    const dt = new Date(Date.UTC(y, mo - 1, d));
    return y >= 2000 && dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d;
  }

  function validTime(value) {
    return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(value || ''));
  }

  function dateGhost(value) {
    const d = String(value || '').replace(/\D/g, '');
    if (!d.length) return 'YYYY/MM/DD';
    if (d.length < 4) return `${d}${'Y'.repeat(4-d.length)}/MM/DD`;
    if (d.length === 4) return `${d}/MM/DD`;
    if (d.length < 6) return `${d.slice(0,4)}/${d.slice(4)}${'M'.repeat(6-d.length)}/DD`;
    if (d.length === 6) return `${d.slice(0,4)}/${d.slice(4,6)}/DD`;
    if (d.length < 8) return `${d.slice(0,4)}/${d.slice(4,6)}/${d.slice(6)}${'D'.repeat(8-d.length)}`;
    return formatDate(d);
  }

  function timeGhost(value) {
    const d = String(value || '').replace(/\D/g, '');
    if (!d.length) return 'HH:MM';
    if (d.length < 2) return `${d}${'H'.repeat(2-d.length)}:MM`;
    if (d.length === 2) return `${d}:MM`;
    if (d.length < 4) return `${d.slice(0,2)}:${d.slice(2)}${'M'.repeat(4-d.length)}`;
    return formatTime(d);
  }

  function mount() {
    const screen = document.getElementById('date-screen');
    if (!screen || screen.dataset.dateV2Mounted === 'true') return;
    screen.dataset.dateV2Mounted = 'true';

    const legacySheet = document.getElementById('date-sheet');
    const legacyDate = document.getElementById('departure-date');
    const legacyTime = document.getElementById('departure-time');
    const legacyConfirm = document.getElementById('date-confirm');
    const legacyClose = document.getElementById('date-close');

    const initialDate = legacyDate?.value || '';
    const initialTime = legacyTime?.value || '';

    legacySheet?.remove();
    legacyClose?.remove();

    const layer = document.createElement('div');
    layer.className = 'date-v2-layer';
    layer.innerHTML = `
      <section class="date-v2-sheet" aria-label="原定班機時間">
        <header class="date-v2-header">
          <h1 class="date-v2-title">原定班機時間</h1>
          <button class="date-v2-close" type="button" aria-label="關閉"></button>
        </header>
        <div class="date-v2-form">
          <label class="date-v2-field" data-date-v2-field="date">
            <span class="date-v2-label">原定起飛日期</span>
            <span class="date-v2-input-wrap">
              <input class="date-v2-input" data-date-v2-input="date" inputmode="numeric" autocomplete="off" maxlength="10" aria-label="原定起飛日期">
              <span class="date-v2-preview" data-date-v2-preview="date"></span>
            </span>
            <span class="date-v2-error">請輸入正確的日期</span>
          </label>
          <label class="date-v2-field" data-date-v2-field="time">
            <span class="date-v2-label">原定起飛時間(24hr)</span>
            <span class="date-v2-input-wrap">
              <input class="date-v2-input" data-date-v2-input="time" inputmode="numeric" autocomplete="off" maxlength="5" aria-label="原定起飛時間">
              <span class="date-v2-preview" data-date-v2-preview="time"></span>
            </span>
            <span class="date-v2-error">請輸入正確的時間</span>
          </label>
        </div>
        <footer class="date-v2-footer"><button class="date-v2-confirm" type="button" disabled>確認資訊</button></footer>
      </section>`;
    screen.appendChild(layer);

    const sheet = $('.date-v2-sheet', layer);
    const date = $('[data-date-v2-input="date"]', layer);
    const time = $('[data-date-v2-input="time"]', layer);
    const dateField = $('[data-date-v2-field="date"]', layer);
    const timeField = $('[data-date-v2-field="time"]', layer);
    const datePreview = $('[data-date-v2-preview="date"]', layer);
    const timePreview = $('[data-date-v2-preview="time"]', layer);
    const confirm = $('.date-v2-confirm', layer);
    const close = $('.date-v2-close', layer);

    date.value = initialDate;
    time.value = initialTime;
    date.dataset.touched = initialDate ? 'true' : 'false';
    time.dataset.touched = initialTime ? 'true' : 'false';

    function preview(node, value, kind, focused, invalid) {
      const raw = String(value || '');
      const empty = !raw;
      node.classList.toggle('is-placeholder', empty);
      if (empty) {
        node.textContent = kind === 'date' ? 'YYYY/MM/DD' : 'HH:MM';
        return;
      }
      if (invalid) {
        node.textContent = raw;
        return;
      }
      const full = kind === 'date' ? validDate(raw) : validTime(raw);
      const ghostText = kind === 'date' ? dateGhost(raw) : timeGhost(raw);
      if (full) {
        node.innerHTML = `${raw}${focused ? '<span class="date-v2-caret"></span>' : ''}`;
        return;
      }
      const formatted = kind === 'date' ? formatDate(raw) : formatTime(raw);
      let remainder = ghostText.slice(formatted.length);
      node.innerHTML = `${formatted}${focused ? '<span class="date-v2-caret"></span>' : ''}<span class="date-v2-ghost">${remainder}</span>`;
    }

    function syncLegacy() {
      if (legacyDate) {
        legacyDate.value = date.value;
        legacyDate.dataset.touched = date.dataset.touched || 'false';
        legacyDate.dispatchEvent(new Event('input', { bubbles:true }));
      }
      if (legacyTime) {
        legacyTime.value = time.value;
        legacyTime.dataset.touched = time.dataset.touched || 'false';
        legacyTime.dispatchEvent(new Event('input', { bubbles:true }));
      }
    }

    function render() {
      const dateOk = validDate(date.value);
      const timeOk = validTime(time.value);
      const dateBad = date.dataset.touched === 'true' && date.value !== '' && !dateOk && (date.value.length >= 10 || date.dataset.blurred === 'true');
      const timeBad = time.dataset.touched === 'true' && time.value !== '' && !timeOk && (time.value.length >= 5 || time.dataset.blurred === 'true');
      const hasError = dateBad || timeBad;

      sheet.classList.toggle('is-error', hasError);
      dateField.classList.toggle('has-error', dateBad);
      timeField.classList.toggle('has-error', timeBad);
      date.closest('.date-v2-input-wrap').classList.toggle('is-invalid', dateBad);
      time.closest('.date-v2-input-wrap').classList.toggle('is-invalid', timeBad);
      date.closest('.date-v2-input-wrap').classList.toggle('is-focused', document.activeElement === date && !dateBad);
      time.closest('.date-v2-input-wrap').classList.toggle('is-focused', document.activeElement === time && !timeBad);

      preview(datePreview, date.value, 'date', document.activeElement === date, dateBad);
      preview(timePreview, time.value, 'time', document.activeElement === time, timeBad);

      const enabled = dateOk && timeOk;
      confirm.disabled = !enabled;
      confirm.classList.toggle('is-enabled', enabled);
    }

    date.addEventListener('input', () => {
      date.value = formatDate(date.value);
      date.dataset.touched = 'true';
      date.dataset.blurred = 'false';
      render();
    });
    time.addEventListener('input', () => {
      time.value = formatTime(time.value);
      time.dataset.touched = 'true';
      time.dataset.blurred = 'false';
      render();
    });
    [date,time].forEach((input) => {
      input.addEventListener('focus', render);
      input.addEventListener('blur', () => {
        input.dataset.touched = 'true';
        input.dataset.blurred = 'true';
        render();
      });
    });

    confirm.addEventListener('click', () => {
      if (confirm.disabled) return;
      syncLegacy();
      if (legacyConfirm) {
        legacyConfirm.disabled = false;
        legacyConfirm.click();
      }
    });

    close.addEventListener('click', () => {
      syncLegacy();
      legacyClose?.click();
    });

    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(mount), { once:true });
  else requestAnimationFrame(mount);
})();
