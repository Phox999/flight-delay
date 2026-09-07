(() => {
  const airports = [
    ['DXB', '迪拜市'],
    ['AAE', '安納巴'],
    ['AAL', '奧爾堡'],
    ['AAN', '艾因'],
    ['AAQ', '阿納帕'],
    ['AAR', '奧胡斯'],
    ['AAT', '阿勒泰']
  ];

  const presets = {
    filled: {
      flight: 'EK-366', origin: 'DXB', destination: 'TPE',
      scheduledDate: '2026/03/30', scheduledTime: '0345',
      actualDate: '2026/03/31', actualTime: '0345'
    },
    partial: {
      flight: 'EK-366', origin: 'DXB', destination: 'TPE',
      scheduledDate: '2026/03/30', scheduledTime: '0345',
      actualDate: '2026/03/3', actualTime: ''
    },
    alternate: {
      flight: 'EK-366', origin: 'DXB', destination: 'TPE',
      scheduledDate: '2026/04/25', scheduledTime: '1200',
      actualDate: '2026/04/29', actualTime: '1200'
    },
    invalid: {
      flight: 'EK-366', origin: 'DXB', destination: 'TPE',
      scheduledDate: '2026/03/40', scheduledTime: '03456',
      actualDate: '2026/03/31', actualTime: '25:00'
    }
  };

  function validDate(value) {
    const match = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(String(value || ''));
    if (!match) return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    return year >= 2000 && date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  function validTime(value) {
    const digits = String(value || '').replace(/\D/g, '');
    if (digits.length !== 4) return false;
    const hour = Number(digits.slice(0, 2));
    const minute = Number(digits.slice(2));
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  }

  function formatDateTyping(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 4)}/${digits.slice(4)}`;
    return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6)}`;
  }

  function routeTo(route) {
    const legacyButton = Array.from(document.querySelectorAll(`[data-route="${route}"]`)).find((el) => !el.closest('.s7-sheet-layer') && !el.closest('.s7-convo-layer'));
    if (legacyButton) {
      legacyButton.click();
      return true;
    }
    const target = document.getElementById(`${route}-screen`);
    if (!target) return false;
    document.querySelectorAll('.screen, .s6o-screen').forEach((screen) => { screen.hidden = screen !== target; });
    history.pushState({ screen: route }, '', `#${route}`);
    return true;
  }

  function field(name, label, value, options = {}) {
    const { half = false, kind = 'text', invalid = false, placeholder = '' } = options;
    const error = kind === 'date' ? '請輸入正確的日期' : kind === 'time' ? '請輸入正確的時間' : '';
    return `<label class="s7-field${half ? ' is-half' : ''}${invalid ? ' has-error' : ''}" data-s7-field="${name}">
      <span class="s7-field-label">${label}</span>
      <input class="s7-input${invalid ? ' is-invalid' : ''}" data-s7-input="${name}" data-kind="${kind}" type="text" inputmode="${kind === 'text' ? 'text' : 'numeric'}" autocomplete="off" value="${value}" placeholder="${placeholder}">
      ${error ? `<p class="s7-field-error">${error}</p>` : ''}
    </label>`;
  }

  function dropdown(name, label, value, open = false) {
    return `<div class="s7-field" data-s7-field="${name}">
      <span class="s7-field-label">${label}</span>
      <button class="s7-dropdown${open ? ' is-open' : ''}" type="button" data-s7-dropdown="${name}">${value}</button>
    </div>`;
  }

  function formMarkup(data, mode) {
    const invalid = mode === 'error';
    return `<div class="s7-form" data-s7-form>
      ${field('flight', '航班編號', data.flight)}
      ${dropdown('origin', '出發地', data.origin, mode === 'airports')}
      ${dropdown('destination', '目的地', data.destination)}
      <div class="s7-pair">
        ${field('scheduledDate', '原定起飛日期', data.scheduledDate, { half:true, kind:'date', invalid:invalid && !validDate(data.scheduledDate) })}
        ${field('scheduledTime', '原定起飛時間(24hr)', data.scheduledTime, { half:true, kind:'time', invalid:invalid && !validTime(data.scheduledTime) })}
      </div>
      <div class="s7-pair">
        ${field('actualDate', '實際起飛日期', data.actualDate, { half:true, kind:'date', invalid:invalid && !validDate(data.actualDate), placeholder:'YYYY/MM/DD' })}
        ${field('actualTime', '實際起飛時間(24hr)', data.actualTime, { half:true, kind:'time', invalid:invalid && !validTime(data.actualTime), placeholder:'HHMM' })}
      </div>
    </div>`;
  }

  function airportMenu() {
    return `<div class="s7-airport-menu" role="listbox" aria-label="出發地搜尋結果">
      ${airports.map(([code, city], index) => `<button class="s7-airport-option${index === 0 ? ' is-selected' : ''}" type="button" role="option" aria-selected="${index === 0}" data-s7-airport="${code}">${code} ${city}</button>`).join('')}
    </div>`;
  }

  function sheetMarkup(mode) {
    const isError = mode === 'error';
    const data = mode === 'alternate' ? presets.alternate : mode === 'partial' ? presets.partial : isError ? presets.invalid : presets.filled;
    const initiallyValid = mode === 'filled' || mode === 'alternate';
    return `<div class="s7-sheet-layer">
      <section class="s7-sheet ${isError ? 'is-error' : 'is-standard'}" data-s7-mode="${mode}" aria-label="登記證資訊確認">
        <header class="s7-sheet-header"><h1 class="s7-sheet-title">登記證資訊確認</h1><button class="s7-sheet-close" type="button" data-s7-action="close" aria-label="關閉"><img src="./assets/close.png" alt=""></button></header>
        <div class="s7-sheet-body" data-s7-scroll>${formMarkup(data, mode)}</div>
        ${mode === 'airports' ? airportMenu() : ''}
        <footer class="s7-sheet-footer"><button class="s7-confirm" type="button" data-s7-action="confirm"${initiallyValid ? '' : ' disabled'}>確認資訊</button></footer>
        <div class="s7-faux-scrollbar" data-s7-thumb aria-hidden="true"></div>
      </section>
    </div>`;
  }

  function refreshValidation(sheet) {
    const values = {};
    sheet.querySelectorAll('[data-s7-input]').forEach((input) => { values[input.dataset.s7Input] = input.value; });
    values.origin = sheet.querySelector('[data-s7-dropdown="origin"]')?.textContent.trim() || '';
    values.destination = sheet.querySelector('[data-s7-dropdown="destination"]')?.textContent.trim() || '';

    let okay = Boolean(values.flight && values.origin && values.destination);
    sheet.querySelectorAll('[data-s7-input]').forEach((input) => {
      const fieldNode = input.closest('[data-s7-field]');
      const kind = input.dataset.kind;
      let good = Boolean(input.value.trim());
      if (kind === 'date') good = validDate(input.value);
      if (kind === 'time') good = validTime(input.value);
      if (sheet.dataset.s7Mode === 'error' || input.dataset.touched === 'true') {
        fieldNode?.classList.toggle('has-error', !good && (kind === 'date' || kind === 'time'));
        input.classList.toggle('is-invalid', !good && (kind === 'date' || kind === 'time'));
      }
      okay = okay && good;
    });
    const confirm = sheet.querySelector('[data-s7-action="confirm"]');
    if (confirm) confirm.disabled = !okay;
  }

  function updateThumb(sheet) {
    const scroller = sheet.querySelector('[data-s7-scroll]');
    const thumb = sheet.querySelector('[data-s7-thumb]');
    if (!scroller || !thumb) return;
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const progress = max ? scroller.scrollTop / max : 0;
    const track = Math.max(0, scroller.clientHeight - 170);
    thumb.style.transform = `translateY(${Math.round(progress * track)}px)`;
  }

  function bindSheet(screen) {
    const sheet = screen.querySelector('.s7-sheet');
    if (!sheet) return;

    sheet.querySelector('[data-s7-action="close"]')?.addEventListener('click', () => routeTo('s7-close-result'));

    sheet.querySelectorAll('[data-s7-input]').forEach((input) => {
      input.addEventListener('input', () => {
        if (input.dataset.kind === 'date') input.value = formatDateTyping(input.value);
        input.dataset.touched = 'true';
        refreshValidation(sheet);
      });
      input.addEventListener('blur', () => { input.dataset.touched = 'true'; refreshValidation(sheet); });
    });

    sheet.querySelector('[data-s7-dropdown="origin"]')?.addEventListener('click', () => {
      if (sheet.dataset.s7Mode !== 'airports') routeTo('s7-airport-results');
    });
    sheet.querySelector('[data-s7-dropdown="destination"]')?.addEventListener('click', () => {
      if (sheet.dataset.s7Mode !== 'airports') routeTo('s7-destination-input');
    });

    sheet.querySelectorAll('[data-s7-airport]').forEach((button) => {
      button.addEventListener('click', () => routeTo('s7-destination-input'));
    });

    sheet.querySelector('[data-s7-action="confirm"]')?.addEventListener('click', (event) => {
      if (event.currentTarget.disabled) return;
      const mode = sheet.dataset.s7Mode;
      if (mode === 'filled') return routeTo('s7-validation-error');
      if (mode === 'error' || mode === 'partial') return routeTo('s7-flight-alternate');
      if (mode === 'alternate') return routeTo('ocr-confirm');
    });

    const scroller = sheet.querySelector('[data-s7-scroll]');
    scroller?.addEventListener('scroll', () => updateThumb(sheet), { passive:true });
    requestAnimationFrame(() => { updateThumb(sheet); refreshValidation(sheet); });
  }

  function installSheet(screenId, mode) {
    const screen = document.getElementById(screenId);
    if (!screen || screen.querySelector(':scope > .s7-sheet-layer')) return;
    screen.insertAdjacentHTML('beforeend', sheetMarkup(mode));
    bindSheet(screen);
  }

  function nativeStatus() {
    return `<div class="wf-status" aria-hidden="true"><div class="wf-time">9:41</div><div class="wf-island"></div><div class="wf-signal"><i></i><i></i><i></i><i></i></div><div class="wf-wifi"><span class="wf-wifi-dot"></span></div><div class="wf-battery"></div></div>`;
  }

  function header() {
    return `<div class="s3-header"><button class="s3-back" type="button" data-s7-action="history-back" aria-label="返回"><img src="./assets/ic-arrow-black-left-s.svg" alt=""></button><div class="s3-title-group"><div class="s3-title">阿發｜班機延誤申請與諮詢</div><div class="s3-beta">Beta</div></div></div>`;
  }

  function messageBar() {
    return `<div class="s3-message-bar"><div class="s3-message-row"><div class="s3-message-input">告訴我你想做什麼</div><div class="s3-send"></div></div><p class="s3-message-note">當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，<br>內容僅供參考，實際資訊仍以國泰產險官網公告為準。</p></div>`;
  }

  function safari() {
    return `<div class="wf-safari-address" aria-hidden="true"><div class="wf-address-pill"><div class="wf-site-settings"></div><div class="wf-domain">alpha.com</div><div class="wf-reload"></div></div></div><div class="wf-safari-toolbar" aria-hidden="true"><span class="wf-toolbar-item wf-chevron"></span><span class="wf-toolbar-item wf-chevron forward"></span><span class="wf-toolbar-item wf-share"></span><span class="wf-toolbar-item wf-book"></span><span class="wf-toolbar-item wf-tabs"></span></div><div class="wf-home" aria-hidden="true"></div>`;
  }

  function dataErrorLayer() {
    return `<div class="s7-convo-layer">${nativeStatus()}<div class="s3-glow"></div>${header()}<div class="s7-convo-canvas">
      <div class="s7-summary-card">
        <div class="s7-summary-row"><p class="s7-summary-label">出發地 / 目的地</p><div class="s7-summary-route"><span>DXB</span><span class="arrow">→</span><span>TPE</span></div></div>
        <div class="s7-summary-row"><p class="s7-summary-label">起飛時間</p><p class="s7-summary-value">預計 2026/03/30 03:45</p><p class="s7-summary-value">實際 2026/03/31 03:45</p></div>
        <div class="s7-summary-actions"><button type="button" data-s7-action="summary-confirm">確認送出</button><button type="button" data-s7-action="summary-edit">資料有誤</button></div>
      </div>
      <div class="s7-data-user"><div class="bubble">資料有誤</div><div class="s7-data-time">10:07 PM 送出</div></div>
      <div class="s7-data-alpha"><div class="s7-data-avatar"></div><div class="s7-data-alpha-body"><div class="bubble">好的，請修改資訊。</div><div class="s7-data-time" style="margin-top:8px">10:07 PM 送出</div></div></div>
    </div>${messageBar()}${safari()}</div>`;
  }

  function installDataErrorLayer() {
    const screen = document.getElementById('s7-data-error-screen');
    if (!screen || screen.querySelector(':scope > .s7-convo-layer')) return;
    screen.insertAdjacentHTML('beforeend', dataErrorLayer());
    screen.querySelector('[data-s7-action="history-back"]')?.addEventListener('click', () => history.back());
    screen.querySelector('[data-s7-action="summary-confirm"]')?.addEventListener('click', () => routeTo('s7-bank-prompt'));
    screen.querySelector('[data-s7-action="summary-edit"]')?.addEventListener('click', () => routeTo('s7-flight-filled'));
  }

  function rewireOcrActions() {
    const screen = document.getElementById('ocr-confirm-screen');
    if (!screen || screen.dataset.s7Rewired === 'true') return;
    screen.dataset.s7Rewired = 'true';
    const actions = screen.querySelectorAll('.ocr-card-action');
    if (actions[0]) {
      actions[0].addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        routeTo('s7-bank-prompt');
      }, true);
    }
    if (actions[1]) {
      actions[1].addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        routeTo('s7-data-error');
      }, true);
    }
  }

  function init() {
    installSheet('s7-flight-filled-screen', 'filled');
    installSheet('s7-airport-results-screen', 'airports');
    installSheet('s7-destination-input-screen', 'partial');
    installSheet('s7-flight-alternate-screen', 'alternate');
    installSheet('s7-validation-error-screen', 'error');
    installDataErrorLayer();
    rewireOcrActions();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(init), { once:true });
  else requestAnimationFrame(init);
})();
