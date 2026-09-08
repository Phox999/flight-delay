(() => {
  const title = '阿發｜班機延誤申請與諮詢';
  let selectedPolicy = 0;

  function nativeStatus() {
    return `<div class="wf-status" aria-hidden="true">
      <div class="wf-time">9:41</div>
      <div class="wf-island"></div>
      <div class="wf-signal"><i></i><i></i><i></i><i></i></div>
      <div class="wf-wifi"><span class="wf-wifi-dot"></span></div>
      <div class="wf-battery"></div>
    </div>`;
  }

  function safari() {
    return `<div class="wf-safari-address" aria-hidden="true">
      <div class="wf-address-pill"><div class="wf-site-settings"></div><div class="wf-domain">alpha.com</div><div class="wf-reload"></div></div>
    </div>
    <div class="wf-safari-toolbar" aria-hidden="true">
      <span class="wf-toolbar-item wf-chevron"></span><span class="wf-toolbar-item wf-chevron forward"></span><span class="wf-toolbar-item wf-share"></span><span class="wf-toolbar-item wf-book"></span><span class="wf-toolbar-item wf-tabs"></span>
    </div>
    <div class="wf-home" aria-hidden="true"></div>`;
  }

  function header() {
    return `<div class="s3-header">
      <button class="s3-back" type="button" data-s6-action="history-back" aria-label="返回"><img src="./assets/ic-arrow-black-left-s.svg" alt=""></button>
      <div class="s3-title-group"><div class="s3-title">${title}</div><div class="s3-beta">Beta</div></div>
    </div>`;
  }

  function messageBar() {
    return `<div class="s3-message-bar">
      <div class="s3-message-row"><div class="s3-message-input">告訴我你想做什麼</div><div class="s3-send"></div></div>
      <p class="s3-message-note">當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，<br>內容僅供參考，實際資訊仍以國泰產險官網公告為準。</p>
    </div>`;
  }

  function time() { return `<div class="s3-time">10:07 PM 送出</div>`; }

  function user(text) {
    return `<div class="s3-turn-user"><div class="s3-bubble-wrap"><div class="s3-bubble s3-user-bubble">${text}</div>${time()}</div></div>`;
  }

  function alpha(text) {
    return `<div class="s3-turn-alpha"><div class="s3-avatar" aria-hidden="true"></div><div class="s3-alpha-body"><div class="s3-bubble-wrap"><div class="s3-bubble s3-alpha-bubble">${text}</div>${time()}</div></div></div>`;
  }

  function baseChat() {
    return `<div class="s6-chat-bg"><div class="s6-chat-thread">
      ${user('同意個資聲明')}
      ${alpha('好的，請選擇要申請的保單。')}
      ${user('已選擇保單')}
      ${alpha('好的，請填寫原定航班的日期與時間。')}
    </div></div>`;
  }

  function shell(content) {
    return `<div class="s6-device">${nativeStatus()}<div class="s3-glow"></div>${header()}${baseChat()}${messageBar()}${content}${safari()}</div>`;
  }

  const policies = [
    {
      name: '奧地利、波赫、德國、西班牙、法國、德國、波多黎各之旅',
      type: '旅遊綜合保險(國外)',
      period: '2026/09/11 - 2026/09/15',
      person: '星O雅',
      tall: true
    },
    {
      name: '日本(九州、四國)、日本(北海道)、日本(本州)、之旅',
      type: '旅遊綜合保險(國外)',
      period: '2026/07/21 - 2026/07/31',
      person: '星O雅',
      tall: true
    },
    {
      name: '台東、花蓮之旅',
      type: '旅遊綜合保險(國內)',
      period: '2025/02/21 - 2025/03/01',
      person: '星O雅',
      tall: false
    }
  ];

  function policyCard(policy, index) {
    const checked = index === selectedPolicy;
    return `<button type="button" class="s6-policy-card ${policy.tall ? 'tall' : 'short'}${checked ? ' is-selected' : ''}" data-s6-policy="${index}" aria-pressed="${checked}">
      <div class="s6-policy-card-head">
        <span class="s6-policy-radio"><img src="./assets/${checked ? 'radio-selected.png' : 'radio-unselected.png'}" alt=""></span>
        <span class="s6-policy-heading"><span class="s6-policy-name">${policy.name}</span><span class="s6-policy-type">${policy.type}</span></span>
      </div>
      <div class="s6-policy-meta"><span class="s6-policy-meta-label">保險期間</span><span>${policy.period}</span></div>
      <div class="s6-policy-meta"><span class="s6-policy-meta-label">要/被保險人</span><span>${policy.person}</span></div>
    </button>`;
  }

  function policyScreen() {
    return shell(`<div class="s6-scrim" aria-hidden="true"></div>
      <section class="s6-policy-sheet" aria-label="請選擇想查看的保單">
        <div class="s6-sheet-header"><p class="s6-sheet-title">請選擇想查看的保單</p><button class="s6-close" type="button" data-s6-action="policy-close" aria-label="關閉"><img src="./assets/close.png" alt=""></button></div>
        <div class="s6-policy-scroll" data-s6-policy-scroll tabindex="0" aria-label="保單清單，可上下捲動">
          <div class="s6-policy-content">
            <div class="s6-policy-note"><img src="./assets/info.png" alt=""><span>明明有保單，為什麼查不到保單？</span></div>
            <div data-s6-policy-list>${policies.map(policyCard).join('')}</div>
          </div>
        </div>
        <div class="s6-policy-thumb" data-s6-policy-thumb aria-hidden="true"></div>
        <div class="s6-policy-footer"><button class="s6-primary" type="button" data-s6-action="policy-confirm">選擇保單</button></div>
      </section>`);
  }

  function uploadTrigger(errorMessage = '') {
    return `${errorMessage ? `<div class="s6-error-banner">${errorMessage}</div>` : ''}
      <button class="s6-upload-trigger" type="button" data-s6-action="upload-open-source">
        <span class="s6-upload-glyph" aria-hidden="true">⇧</span><span class="s6-upload-label">點擊上傳登機證</span>
      </button>
      <ol class="s6-upload-helper"><li>支援 JPG、JPEG、PNG、HEIC，單檔上限 20 MB</li><li>支援檔案上傳及相機拍攝</li></ol>`;
  }

  function uploadSheet({ state = 'initial', errorMessage = '' } = {}) {
    let body = '';
    let footer = '';
    if (state === 'initial' || state === 'error') {
      body = uploadTrigger(errorMessage);
      footer = `<button class="s6-disabled" type="button" disabled>確認上傳</button>`;
    } else if (state === 'selected') {
      body = `<div class="s6-file-row-selected"><span class="s6-file-name">boarding_pass.jpg</span><button class="s6-file-delete" type="button" data-s6-action="upload-delete" aria-label="刪除檔案">⌫</button></div>`;
      footer = `<button class="s6-primary" type="button" data-s6-action="upload-confirm">確認上傳</button>`;
    } else if (state === 'loading') {
      body = `<div class="s6-file-row-selected is-uploading"><span class="s6-file-name">boarding_pass.jpg</span></div>`;
      footer = `<button class="s6-disabled s6-loading-cta" type="button" disabled>上傳中，請稍後</button>`;
    }
    const klass = state === 'error' ? 'error' : state;
    return `<section class="s6-upload-sheet ${klass}" aria-label="登機證上傳">
      <div class="s6-sheet-header"><p class="s6-sheet-title">登機證上傳</p><button class="s6-close" type="button" data-s6-action="upload-close" aria-label="關閉"><img src="./assets/close.png" alt=""></button></div>
      <div class="s6-upload-body">${body}</div><div class="s6-upload-footer">${footer}</div>
    </section>`;
  }

  function uploadScene(options = {}) {
    const { state = 'initial', errorMessage = '', actionSheet = false, loadingOverlay = false } = options;
    return shell(`<div class="s6-scrim" aria-hidden="true"></div>${uploadSheet({ state, errorMessage })}
      ${actionSheet ? actionSheetMarkup() : ''}${loadingOverlay ? loadingMarkup() : ''}`);
  }

  function actionSheetMarkup() {
    return `<div class="s6-action-scrim" aria-hidden="true"></div><div class="s6-action-sheet" role="dialog" aria-label="選擇登機證來源">
      <button class="s6-action-button" type="button" data-s6-action="source-photo">照片圖庫</button>
      <button class="s6-action-button" type="button" data-s6-action="source-camera">拍照</button>
      <button class="s6-action-button" type="button" data-s6-action="source-files">選擇檔案</button>
      <button class="s6-action-button" type="button" data-s6-action="source-cancel">取消</button>
    </div>`;
  }

  function loadingMarkup() {
    return `<div class="s6-loading-scrim" aria-hidden="true"></div><div class="s6-loading-card" role="status"><span class="s6-loading-star">✦</span><span>檔案上傳中</span></div>`;
  }

  function filePicker() {
    const row = (kind, name, meta, action) => `<button type="button" class="s6-files-row" data-s6-action="${action}">
      <span class="s6-file-iconbox"><span class="s6-file-paper ${kind.toLowerCase()}">${kind}</span></span>
      <span class="s6-files-info"><span class="s6-files-name">${name}</span><span class="s6-files-sub">${meta}</span></span><span class="s6-files-more">•••</span></button>`;
    return `<div class="s6-files-device">${nativeStatus()}
      <nav class="s6-files-nav"><button class="s6-files-back" type="button" data-s6-action="files-back">‹ 瀏覽</button><div class="s6-files-nav-title">最近項目</div><button class="s6-files-cancel" type="button" data-s6-action="files-cancel">取消</button></nav>
      <div class="s6-files-search"><span class="s6-files-search-icon" aria-hidden="true"></span><span>搜尋</span></div>
      <h1 class="s6-files-heading">最近項目</h1>
      <div class="s6-files-list">${row('PDF','boarding-pass.pdf','今天 14:32 · 24.8 MB','file-size')}${row('JPG','IMG_8241.JPG','今天 14:28 · 2.1 MB','file-valid')}${row('XYZ','mystery_file.xyz','昨天 · 842 KB','file-format')}</div>
      <div class="s6-files-home" aria-hidden="true"></div>
    </div>`;
  }

  const renderers = {
    'selection-screen': policyScreen,
    'upload-screen': () => uploadScene({ state: 'initial' }),
    'upload-source-screen': () => uploadScene({ state: 'initial', actionSheet: true }),
    'file-picker-screen': filePicker,
    'upload-loading-screen': () => uploadScene({ state: 'loading', loadingOverlay: true }),
    'upload-valid-screen': () => uploadScene({ state: 'selected' }),
    'upload-size-error-screen': () => uploadScene({ state: 'error', errorMessage: '檔案大小超過 20 MB，請重新上傳。' }),
    'upload-format-error-screen': () => uploadScene({ state: 'error', errorMessage: '檔案格式錯誤，請重新上傳。' })
  };

  function ensureLayer(screen) {
    let layer = screen.querySelector(':scope > .htmlized-screen');
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'htmlized-screen';
      screen.appendChild(layer);
    }
    return layer;
  }

  function legacyClick(screen, selector, index = 0) {
    const targets = Array.from(screen.querySelectorAll(selector)).filter((el) => !el.closest('.htmlized-screen'));
    const target = targets[index];
    if (target) {
      target.click();
      return true;
    }
    return false;
  }

  function refreshPolicyUI(screen) {
    const list = screen.querySelector('[data-s6-policy-list]');
    if (!list) return;
    list.innerHTML = policies.map(policyCard).join('');
    bindPolicyCards(screen);
  }

  function bindPolicyCards(screen) {
    screen.querySelectorAll('.htmlized-screen [data-s6-policy]').forEach((button) => {
      button.addEventListener('click', () => {
        selectedPolicy = Number(button.dataset.s6Policy || 0);
        const legacyCards = Array.from(screen.querySelectorAll(':scope > .sheet .policy-card, :scope > .policy-card')).filter((el) => !el.closest('.htmlized-screen'));
        if (legacyCards[selectedPolicy]) legacyCards[selectedPolicy].click();
        refreshPolicyUI(screen);
      });
    });
  }

  function updatePolicyThumb(screen) {
    const scroll = screen.querySelector('[data-s6-policy-scroll]');
    const thumb = screen.querySelector('[data-s6-policy-thumb]');
    if (!scroll || !thumb) return;
    const max = Math.max(0, scroll.scrollHeight - scroll.clientHeight);
    const progress = max ? scroll.scrollTop / max : 0;
    thumb.style.transform = `translateY(${Math.round(progress * 276)}px)`;
  }

  function bind(screen) {
    bindPolicyCards(screen);
    const policyScroll = screen.querySelector('[data-s6-policy-scroll]');
    if (policyScroll) {
      policyScroll.addEventListener('scroll', () => updatePolicyThumb(screen), { passive: true });
      requestAnimationFrame(() => { policyScroll.scrollTop = 0; updatePolicyThumb(screen); });
    }

    screen.querySelectorAll('.htmlized-screen [data-s6-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.s6Action;
        if (action === 'history-back') return history.back();
        if (action === 'policy-close') return legacyClick(screen, '#policy-close');
        if (action === 'policy-confirm') return legacyClick(screen, '#confirm-button');
        if (action === 'upload-open-source') {
          if (screen.id === 'upload-screen') return legacyClick(screen, '#upload-trigger');
          if (screen.id === 'upload-size-error-screen' || screen.id === 'upload-format-error-screen') return legacyClick(screen, '[data-retry-upload]');
        }
        if (action === 'upload-close') {
          if (screen.id === 'upload-screen') return legacyClick(screen, '#upload-close');
          if (screen.id === 'upload-valid-screen') return legacyClick(screen, '#upload-valid-close');
          if (screen.id === 'upload-source-screen') return legacyClick(screen, '#source-cancel');
          return history.back();
        }
        if (action === 'source-photo') return legacyClick(screen, '[data-upload-source="photo"]');
        if (action === 'source-camera') return legacyClick(screen, '[data-upload-source="camera"]');
        if (action === 'source-files') return legacyClick(screen, '[data-upload-source="files"]');
        if (action === 'source-cancel') return legacyClick(screen, '#source-cancel');
        if (action === 'files-back') return legacyClick(screen, '[data-return-to-source]', 0);
        if (action === 'files-cancel') return legacyClick(screen, '[data-return-to-source]', 1);
        if (action === 'file-size') return legacyClick(screen, '#file-size-error');
        if (action === 'file-valid') return legacyClick(screen, '#file-valid');
        if (action === 'file-format') return legacyClick(screen, '#file-unsupported');
        if (action === 'upload-delete') return legacyClick(screen, '#upload-valid-delete');
        if (action === 'upload-confirm') return legacyClick(screen, '#upload-valid-confirm');
      });
    });
  }

  function observePolicyOpen(screen) {
    if (screen.id !== 'selection-screen') return;
    const observer = new MutationObserver(() => {
      if (!screen.hidden) {
        const scroll = screen.querySelector('[data-s6-policy-scroll]');
        if (scroll) { scroll.scrollTop = 0; requestAnimationFrame(() => updatePolicyThumb(screen)); }
      }
    });
    observer.observe(screen, { attributes: true, attributeFilter: ['hidden'] });
  }

  function apply() {
    Object.entries(renderers).forEach(([id, renderer]) => {
      const screen = document.getElementById(id);
      if (!screen) return;
      const layer = ensureLayer(screen);
      layer.innerHTML = renderer();
      bind(screen);
      observePolicyOpen(screen);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(apply), { once:true });
  else requestAnimationFrame(apply);
})();
