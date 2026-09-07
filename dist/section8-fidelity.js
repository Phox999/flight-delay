(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function routeTo(route) {
    const legacyButton = $$(`[data-route="${route}"]`).find((el) => !el.closest('.s8f-layer') && !el.closest('.s8f-bank-layer'));
    if (legacyButton) {
      legacyButton.click();
      return true;
    }
    const target = document.getElementById(`${route}-screen`);
    if (!target) return false;
    $$('.screen, .s6o-screen').forEach((screen) => { screen.hidden = screen !== target; });
    try { history.pushState({ screen: route }, '', `#${route}`); } catch (_) {}
    return true;
  }

  function closeButton(action) {
    return `<button class="s8f-close" type="button" data-s8f-action="${action}" aria-label="關閉">×</button>`;
  }

  function noteMarkup() {
    return `<button class="s8f-note" type="button" data-s8f-action="method-tip"><span class="s8f-info">i</span><span>什麼是班機延誤證明？</span></button>`;
  }

  function footer(enabled, label) {
    return `<div class="s8f-sheet-footer"><button class="${enabled ? 's8f-primary' : 's8f-disabled'}${label === '上傳中，請稍後' ? ' s8f-loading-button' : ''}" type="button" ${enabled ? 'data-s8f-action="upload-confirm"' : 'disabled'}>${label}</button></div>`;
  }

  function uploadSheetMarkup(mode) {
    const errorMessage = mode === 'format'
      ? '檔案格式錯誤，請重新上傳。'
      : mode === 'size' ? '檔案大小超過 20 MB，請重新上傳。' : '';
    let body = '';
    let closeAction = 'upload-close';
    let foot = footer(false, '確認上傳');

    if (mode === 'initial' || mode === 'format' || mode === 'size') {
      body = `${noteMarkup()}<button class="s8f-upload-empty" type="button" data-s8f-action="upload-source"><span class="s8f-upload-icon" aria-hidden="true"></span><span class="s8f-upload-label">點擊上傳班機延誤證明</span></button>
        <ol class="s8f-helper"><li>支援 JPG、JPEG、PNG、HEIC，單檔上限 20 MB</li><li>支援檔案上傳及相機拍攝</li></ol>${errorMessage ? `<p class="s8f-error-message">${errorMessage}</p>` : ''}`;
    } else if (mode === 'loading') {
      body = `${noteMarkup()}<div class="s8f-file-row is-loading"><span class="s8f-file-name">AAAA.jpg</span></div>`;
      foot = footer(false, '上傳中，請稍後');
    } else if (mode === 'selected') {
      closeAction = 'selected-close';
      body = `${noteMarkup()}<div class="s8f-file-row"><span class="s8f-file-name">AAAA.jpg</span><button class="s8f-file-delete" type="button" data-s8f-action="file-delete" aria-label="刪除檔案">⌫</button></div>`;
      foot = footer(true, '確認上傳');
    }

    const klass = mode === 'format' || mode === 'size' ? 'is-error' : `is-${mode}`;
    return `<div class="s8f-scrim" aria-hidden="true"></div><section class="s8f-sheet s8f-upload-sheet ${klass}" aria-label="班機延誤證明上傳">
      <header class="s8f-sheet-header"><h1 class="s8f-sheet-title">班機延誤證明上傳</h1>${closeButton(closeAction)}</header>
      <div class="s8f-sheet-body">${body}</div>${foot}</section>
      ${mode === 'loading' ? '<div class="s8f-loading-overlay" role="status"><div class="s8f-loading-card"><span class="s8f-loading-star">✦</span><span>檔案上傳中</span></div></div>' : ''}`;
  }

  function bindUploadLayer(screen, mode) {
    $('[data-s8f-action="method-tip"]', screen)?.addEventListener('click', () => routeTo('s8-method-tip'));
    $('[data-s8f-action="upload-close"]', screen)?.addEventListener('click', () => routeTo('s8-confirm-compact'));
    $('[data-s8f-action="selected-close"]', screen)?.addEventListener('click', () => routeTo('s8-confirm-compact-selected'));
    $('[data-s8f-action="upload-source"]', screen)?.addEventListener('click', () => routeTo('s8-source-options'));
    $('[data-s8f-action="file-delete"]', screen)?.addEventListener('click', () => routeTo('s8-upload-initial'));
    $('[data-s8f-action="upload-confirm"]', screen)?.addEventListener('click', () => routeTo('s8-confirm-compact'));
  }

  function installUpload(screenId, mode) {
    const screen = document.getElementById(screenId);
    if (!screen || $(':scope > .s8f-layer', screen)) return;
    const layer = document.createElement('div');
    layer.className = 's8f-layer';
    layer.innerHTML = uploadSheetMarkup(mode);
    screen.appendChild(layer);
    bindUploadLayer(screen, mode);
  }

  function installSourceOptions() {
    const screen = document.getElementById('s8-source-options-screen');
    if (!screen || $(':scope > .s8f-layer', screen)) return;
    const layer = document.createElement('div');
    layer.className = 's8f-layer';
    layer.innerHTML = `<div class="s8f-scrim" aria-hidden="true"></div><div class="s8f-source-actions" role="dialog" aria-label="選擇上傳來源">
      <button class="s8f-source-btn s8f-source-photo" type="button" data-s8f-source="photo">照片圖庫</button>
      <button class="s8f-source-btn s8f-source-camera" type="button" data-s8f-source="camera">拍照</button>
      <button class="s8f-source-btn s8f-source-files" type="button" data-s8f-source="files">選擇檔案</button>
      <button class="s8f-source-btn s8f-source-cancel" type="button" data-s8f-source="cancel">取消</button>
    </div>`;
    screen.appendChild(layer);
    $('[data-s8f-source="photo"]', layer).addEventListener('click', () => routeTo('s8-upload-loading'));
    $('[data-s8f-source="camera"]', layer).addEventListener('click', () => routeTo('s8-upload-loading'));
    $('[data-s8f-source="files"]', layer).addEventListener('click', () => routeTo('s8-file-picker'));
    $('[data-s8f-source="cancel"]', layer).addEventListener('click', () => routeTo('s8-upload-initial'));
  }

  function fileRow(kind, name, meta, action) {
    return `<button class="s8f-files-row" type="button" data-s8f-file="${action}"><span class="s8f-files-icon ${kind.toLowerCase()}">${kind}</span><span class="s8f-files-copy"><span class="s8f-files-name">${name}</span><span class="s8f-files-meta">${meta}</span></span><span class="s8f-files-more">•••</span></button>`;
  }

  function installFilePicker() {
    const screen = document.getElementById('s8-file-picker-screen');
    if (!screen || $(':scope > .s8f-layer', screen)) return;
    const layer = document.createElement('div');
    layer.className = 's8f-layer';
    layer.innerHTML = `<div class="s8f-files-device">
      <div class="s8f-files-status"><div class="s8f-files-time">9:41</div><div class="s8f-files-island"></div><div class="s8f-files-signal"></div></div>
      <nav class="s8f-files-nav"><button class="s8f-files-back" type="button" data-s8f-files-nav="back">‹ 瀏覽</button><div class="s8f-files-nav-title">最近項目</div><button class="s8f-files-cancel" type="button" data-s8f-files-nav="cancel">取消</button></nav>
      <div class="s8f-files-search">搜尋</div><h1 class="s8f-files-heading">最近項目</h1>
      <div class="s8f-files-list">${fileRow('PDF','flight-delay-certificate.pdf','今天 14:32 · 24.8 MB','size')}${fileRow('JPG','delay-certificate.jpg','今天 14:28 · 2.1 MB','valid')}${fileRow('XYZ','mystery_file.xyz','昨天 · 842 KB','format')}</div>
      <div class="s8f-files-home" aria-hidden="true"></div>
    </div>`;
    screen.appendChild(layer);
    $$('[data-s8f-files-nav]', layer).forEach((button) => button.addEventListener('click', () => routeTo('s8-source-options')));
    $('[data-s8f-file="size"]', layer).addEventListener('click', () => routeTo('s8-upload-size'));
    $('[data-s8f-file="valid"]', layer).addEventListener('click', () => routeTo('s8-upload-loading'));
    $('[data-s8f-file="format"]', layer).addEventListener('click', () => routeTo('s8-upload-format'));
  }

  const bankState = {
    code: '822 國泰世華銀行',
    branch: '新竹分行',
    account: '000190',
    confirm: '000190'
  };

  function bankField(label, value, options = {}) {
    const { readonly = false, name = '', placeholder = '' } = options;
    return `<label class="s8f-bank-field"><span class="s8f-bank-label">${label}</span><input class="s8f-bank-input${readonly ? ' is-readonly' : ''}" ${name ? `data-s8f-bank-input="${name}"` : ''} type="${name ? 'tel' : 'text'}" inputmode="${name ? 'numeric' : 'text'}" value="${value}" placeholder="${placeholder}" ${readonly ? 'readonly aria-readonly="true"' : ''}></label>`;
  }

  function bankSelect(label, value, action, open = false) {
    return `<div class="s8f-bank-field"><span class="s8f-bank-label">${label}</span><button class="s8f-bank-select${!value ? ' is-placeholder' : ''}${open ? ' is-open' : ''}" type="button" data-s8f-bank-action="${action}">${value || '請選擇'}</button></div>`;
  }

  function bankMarkup(mode) {
    const initial = mode === 'initial';
    const picker = mode === 'picker';
    const code = initial ? '' : bankState.code;
    const branch = initial || picker ? '' : bankState.branch;
    const account = picker ? '1234' : initial ? '' : bankState.account;
    const confirm = initial ? '' : bankState.confirm;
    const enabled = mode === 'partial';
    const topClass = initial ? 'is-initial' : 'is-tall';
    return `<div class="s8f-bank-scrim" aria-hidden="true"></div><section class="s8f-bank-sheet ${topClass}" data-s8f-bank-mode="${mode}" aria-label="填寫匯款資料">
      <header class="s8f-bank-header">填寫匯款資料${closeButton('bank-close')}</header>
      <div class="s8f-bank-body" data-s8f-bank-scroll><form class="s8f-bank-form" onsubmit="return false">
        ${bankField('身分證字號','A403917978',{readonly:true})}
        ${bankField('會員姓名','星見雅',{readonly:true})}
        ${bankSelect('銀行代碼',code,'code',picker)}
        ${bankSelect('分行別',branch,'branch')}
        ${bankField('匯款帳號',account,{name:'account',placeholder:'請輸入匯款帳號'})}
        ${bankField('再次確認匯款帳號',confirm,{name:'confirm',placeholder:'請再次輸入匯款帳號'})}
      </form></div>
      <div class="s8f-bank-thumb" data-s8f-bank-thumb aria-hidden="true"></div>
      <footer class="s8f-bank-footer"><button class="${enabled ? 's8f-primary' : 's8f-disabled'}" type="button" data-s8f-bank-action="confirm" ${enabled ? '' : 'disabled'}>確認資訊</button></footer>
    </section>${picker ? '<div class="s8f-bank-menu" role="listbox"><button class="s8f-bank-option is-selected" type="button" data-s8f-bank-option="822">822 國泰世華銀行</button><button class="s8f-bank-option" type="button" data-s8f-bank-option="700">700 中華郵政</button></div>' : ''}`;
  }

  function updateBankThumb(layer) {
    const scroller = $('[data-s8f-bank-scroll]', layer);
    const thumb = $('[data-s8f-bank-thumb]', layer);
    if (!scroller || !thumb) return;
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const progress = max ? scroller.scrollTop / max : 0;
    const travel = Math.max(0, scroller.clientHeight - 175);
    thumb.style.transform = `translateY(${Math.round(progress * travel)}px)`;
  }

  function renderBank(screenId, mode) {
    const screen = document.getElementById(screenId);
    if (!screen) return;
    screen.classList.add('s8f-bank-mounted');
    $(':scope > .s8f-bank-layer', screen)?.remove();
    const layer = document.createElement('div');
    layer.className = 's8f-bank-layer';
    layer.innerHTML = bankMarkup(mode);
    screen.appendChild(layer);

    $('[data-s8f-action="bank-close"]', layer)?.addEventListener('click', () => routeTo(mode === 'partial' ? 's8-bank-close-result-partial' : 's8-bank-close-result'));
    $('[data-s8f-bank-action="code"]', layer)?.addEventListener('click', () => {
      renderBank('s8-account-picker-screen', 'picker');
      routeTo('s8-account-picker');
    });
    $('[data-s8f-bank-action="branch"]', layer)?.addEventListener('click', (event) => {
      if (mode === 'initial' || mode === 'picker') return;
      bankState.branch = bankState.branch === '新竹分行' ? '信義分行' : '新竹分行';
      event.currentTarget.textContent = bankState.branch;
      event.currentTarget.classList.remove('is-placeholder');
    });
    $$('[data-s8f-bank-input]', layer).forEach((input) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 16);
        bankState[input.dataset.s8fBankInput] = input.value;
      });
    });
    $('[data-s8f-bank-action="confirm"]', layer)?.addEventListener('click', (event) => {
      if (event.currentTarget.disabled) return;
      routeTo('s9-otp-initial');
    });
    $$('[data-s8f-bank-option]', layer).forEach((button) => button.addEventListener('click', () => {
      if (button.dataset.s8fBankOption === '700') {
        bankState.code = '700 中華郵政';
        bankState.branch = '臺北郵局';
      } else {
        bankState.code = '822 國泰世華銀行';
        bankState.branch = '新竹分行';
      }
      renderBank('s8-bank-partial-screen', 'partial');
      routeTo('s8-bank-partial');
    }));
    const scroller = $('[data-s8f-bank-scroll]', layer);
    scroller?.addEventListener('scroll', () => updateBankThumb(layer), { passive:true });
    requestAnimationFrame(() => updateBankThumb(layer));
  }

  function init() {
    installUpload('s8-upload-initial-screen', 'initial');
    installUpload('s8-upload-loading-screen', 'loading');
    installUpload('s8-upload-selected-screen', 'selected');
    installUpload('s8-upload-size-screen', 'size');
    installUpload('s8-upload-format-screen', 'format');
    installSourceOptions();
    installFilePicker();

    renderBank('s8-bank-initial-screen', 'initial');
    renderBank('s8-account-picker-screen', 'picker');
    renderBank('s8-bank-partial-screen', 'partial');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(init), { once:true });
  else requestAnimationFrame(init);
})();
