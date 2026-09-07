(() => {
  const title = '阿發｜班機延誤申請與諮詢';
  const ranges = [
    { start: '2026/09/11', end: '2026/09/15' },
    { start: '2026/07/21', end: '2026/07/31' },
    { start: '2025/02/21', end: '2025/03/01' }
  ];
  const customHashes = new Set(['#s6-no-policy', '#s6-not-eligible', '#s6-ocr-failure', '#s6-api-error']);

  function nativeStatus() {
    return `<div class="wf-status" aria-hidden="true"><div class="wf-time">9:41</div><div class="wf-island"></div><div class="wf-signal"><i></i><i></i><i></i><i></i></div><div class="wf-wifi"><span class="wf-wifi-dot"></span></div><div class="wf-battery"></div></div>`;
  }

  function safari() {
    return `<div class="wf-safari-address" aria-hidden="true"><div class="wf-address-pill"><div class="wf-site-settings"></div><div class="wf-domain">alpha.com</div><div class="wf-reload"></div></div></div><div class="wf-safari-toolbar" aria-hidden="true"><span class="wf-toolbar-item wf-chevron"></span><span class="wf-toolbar-item wf-chevron forward"></span><span class="wf-toolbar-item wf-share"></span><span class="wf-toolbar-item wf-book"></span><span class="wf-toolbar-item wf-tabs"></span></div><div class="wf-home" aria-hidden="true"></div>`;
  }

  function header() {
    return `<div class="s3-header"><button class="s3-back" type="button" data-s6o-action="back" aria-label="返回"><img src="./assets/ic-arrow-black-left-s.svg" alt=""></button><div class="s3-title-group"><div class="s3-title">${title}</div><div class="s3-beta">Beta</div></div></div>`;
  }

  function messageBar() {
    return `<div class="s3-message-bar"><div class="s3-message-row"><div class="s3-message-input">告訴我你想做什麼</div><div class="s3-send"></div></div><p class="s3-message-note">當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，<br>內容僅供參考，實際資訊仍以國泰產險官網公告為準。</p></div>`;
  }

  function time() { return `<div class="s6o-time">10:07 PM 送出</div>`; }

  function user(kind) {
    return `<div class="s6o-user ${kind}"><div class="s6o-user-bubble">確認申請</div>${time()}</div>`;
  }

  function alpha(kind, content, button = '') {
    return `<div class="s6o-alpha ${kind}"><div class="s6o-avatar" aria-hidden="true"></div><div class="s6o-alpha-body"><div class="s6o-alpha-stack"><div class="s6o-alpha-bubble">${content}</div>${time()}${button}</div></div></div>`;
  }

  function shell(canvas) {
    return `<div class="s6o-device">${nativeStatus()}<div class="s3-glow"></div>${header()}<div class="s6o-canvas">${canvas}</div>${messageBar()}${safari()}</div>`;
  }

  function noPolicyView() {
    const copy = `<div class="s6o-no-policy-copy"><p>阿發查不到可以申請理賠的旅遊綜合保險保單喔！</p><p>提醒你須符合：</p><ol><li><span class="s6o-highlight">限個人件</span></li><li><span class="s6o-highlight">要保險人及被保險人為同一人</span></li><li><span class="s6o-highlight">需為國泰產險會員</span></li></ol><div class="s6o-spacer"></div><p>若無法線上申請：</p><ol><li>臨櫃辦理</li><li>郵寄(<button class="s6o-inline-link s6o-external" type="button" data-s6o-action="mail-form">郵寄文件下載</button>)</li></ol></div>`;
    return shell(`${user('no-policy')}${alpha('no-policy', copy)}`);
  }

  function notEligibleView() {
    const copy = `<div class="s6o-noteligible-copy"><p>你欲申請的 XXX 未在保期內，不符合理賠資格，如有問題，請聯繫你的業務員或電話客服中心。</p><div class="s6o-contact">客服電話：<button class="s6o-phone-link s6o-external" type="button" data-s6o-action="phone">02-2755-1299</button><br>市話請撥：0800-212-880</div></div>`;
    return shell(`${user('not-eligible')}${alpha('not-eligible', copy)}`);
  }

  function apiErrorView() {
    const copy = `<div class="s6o-api-copy"><p>系統出現異常，建議你可以到會員中心使用理賠申請服務。</p><div class="s6o-api-link-wrap"><button class="s6o-inline-link s6o-external" type="button" data-s6o-action="member-center">前往會員中心</button></div></div>`;
    return shell(`${user('api-error')}${alpha('api-error', copy)}`);
  }

  function ocrFailureView() {
    const first = `<div class="s6o-ocr-copy"><p>請上傳你的登機證。</p><p>如果有 2 筆（含）以上的班機延誤需要申請理賠，記得要分開申請喔！</p></div>`;
    const second = `<div class="s6o-ocr-copy"><p>你上傳的文件經辨識非登機證，請重新確認再上傳。</p></div>`;
    const button = `<button class="s6o-reupload" type="button" data-s6o-action="reupload">重新上傳</button>`;
    return shell(`${alpha('ocr-first', first)}${alpha('ocr-second', second, button)}`);
  }

  function createCustom(id, label, html) {
    const phone = document.querySelector('.phone');
    if (!phone || document.getElementById(id)) return null;
    const section = document.createElement('section');
    section.id = id;
    section.className = 's6o-screen';
    section.setAttribute('aria-label', label);
    section.hidden = true;
    section.innerHTML = html;
    phone.appendChild(section);
    return section;
  }

  function customScreenFor(hash) {
    if (hash === '#s6-no-policy') return document.getElementById('s6-no-policy-screen');
    if (hash === '#s6-not-eligible') return document.getElementById('s6-not-eligible-screen');
    if (hash === '#s6-ocr-failure') return document.getElementById('s6-ocr-failure-screen');
    if (hash === '#s6-api-error') return document.getElementById('s6-api-error-screen');
    return null;
  }

  function showCustom(hash, push = true) {
    const target = customScreenFor(hash);
    if (!target) return false;
    document.querySelectorAll('.screen, .s6o-screen').forEach((screen) => { screen.hidden = screen !== target; });
    if (push) history.pushState({ screen: hash.slice(1) }, '', hash);
    return true;
  }

  function hideCustoms() {
    document.querySelectorAll('.s6o-screen').forEach((screen) => { screen.hidden = true; });
  }

  function dateKey(value) { return String(value || '').replace(/\D/g, '').slice(0, 8); }
  function isWithin(value, range) {
    const key = dateKey(value);
    return key.length === 8 && key >= dateKey(range.start) && key <= dateKey(range.end);
  }
  function isBefore2025(value) {
    const key = dateKey(value);
    return key.length === 8 && key < '20250101';
  }

  function selectedPolicyIndex() {
    const selected = document.querySelector('#selection-screen .htmlized-screen [data-s6-policy][aria-pressed="true"]');
    if (selected) return Number(selected.dataset.s6Policy || 0);
    const legacy = Array.from(document.querySelectorAll('#selection-screen .policy-card')).findIndex((card) => card.classList.contains('is-selected'));
    return legacy >= 0 ? legacy : 0;
  }

  function legacyRoute(route) {
    hideCustoms();
    const target = document.getElementById(`${route}-screen`);
    if (!target) return false;
    document.querySelectorAll('.screen, .s6o-screen').forEach((screen) => { screen.hidden = screen !== target; });
    history.pushState({ screen: route }, '', `#${route}`);
    return true;
  }

  function bindCustomActions() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-s6o-action]');
      if (!button) return;
      const action = button.dataset.s6oAction;
      if (action === 'back') return history.back();
      if (action === 'reupload') return legacyRoute('boarding-pass-upload');
      if (action === 'member-center') return legacyRoute('s8-member-center');
      if (action === 'phone') {
        window.location.href = 'tel:0227551299';
        return;
      }
      if (action === 'mail-form') {
        const candidates = ['s05-form-example-screen', 's05-form-screen', 'form-example-screen'];
        const match = candidates.map((id) => document.getElementById(id)).find(Boolean);
        if (match) {
          hideCustoms();
          document.querySelectorAll('.screen, .s6o-screen').forEach((screen) => { screen.hidden = screen !== match; });
        }
      }
    });
  }

  function bindOutcomeRouting() {
    /* Only dates before 2025 trigger the no-policy branch. Dates from 2025 onward always continue through the normal policy flow. */
    document.addEventListener('click', (event) => {
      const dateConfirm = event.target.closest('.s6-date-popup-confirm');
      if (dateConfirm && !dateConfirm.disabled) {
        const value = document.querySelector('[data-popup-date]')?.value || document.getElementById('departure-date')?.value || '';
        if (value && isBefore2025(value)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          showCustom('#s6-no-policy');
        }
      }
    }, true);
  }

  function handleHistory() {
    if (customHashes.has(location.hash)) {
      showCustom(location.hash, false);
    } else {
      hideCustoms();
    }
  }

  function init() {
    createCustom('s6-no-policy-screen', '查無可申請保單', noPolicyView());
    createCustom('s6-not-eligible-screen', '不符合理賠資格', notEligibleView());
    createCustom('s6-ocr-failure-screen', '登機證辨識失敗', ocrFailureView());
    createCustom('s6-api-error-screen', '登機證上傳系統異常', apiErrorView());
    bindCustomActions();
    bindOutcomeRouting();
    window.addEventListener('popstate', () => requestAnimationFrame(handleHistory));
    handleHistory();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(init), { once: true });
  else requestAnimationFrame(init);
})();