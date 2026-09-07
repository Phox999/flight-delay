(() => {
  const title = '阿發｜班機延誤申請與諮詢';

  function nativeStatus() {
    return `<div class="wf-status" aria-hidden="true"><div class="wf-time">9:41</div><div class="wf-island"></div><div class="wf-signal"><i></i><i></i><i></i><i></i></div><div class="wf-wifi"><span class="wf-wifi-dot"></span></div><div class="wf-battery"></div></div>`;
  }

  function safari() {
    return `<div class="wf-safari-address" aria-hidden="true"><div class="wf-address-pill"><div class="wf-site-settings"></div><div class="wf-domain">alpha.com</div><div class="wf-reload"></div></div></div><div class="wf-safari-toolbar" aria-hidden="true"><span class="wf-toolbar-item wf-chevron"></span><span class="wf-toolbar-item wf-chevron forward"></span><span class="wf-toolbar-item wf-share"></span><span class="wf-toolbar-item wf-book"></span><span class="wf-toolbar-item wf-tabs"></span></div><div class="wf-home" aria-hidden="true"></div>`;
  }

  function header() {
    return `<div class="s3-header"><button class="s3-back" type="button" data-s9o-action="back" aria-label="返回"><img src="./assets/ic-arrow-black-left-s.svg" alt=""></button><div class="s3-title-group"><div class="s3-title">${title}</div><div class="s3-beta">Beta</div></div></div>`;
  }

  function messageBar() {
    return `<div class="s3-message-bar"><div class="s3-message-row"><div class="s3-message-input">告訴我你想做什麼</div><div class="s3-send"></div></div><p class="s3-message-note">當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，<br>內容僅供參考，實際資訊仍以國泰產險官網公告為準。</p></div>`;
  }

  function time() {
    return `<div class="s6o-time">10:07 PM 送出</div>`;
  }

  function user() {
    return `<div class="s6o-user api-error"><div class="s6o-user-bubble">確認送出</div>${time()}</div>`;
  }

  function alpha(copy) {
    return `<div class="s6o-alpha api-error"><div class="s6o-avatar" aria-hidden="true"></div><div class="s6o-alpha-body"><div class="s6o-alpha-stack"><div class="s6o-alpha-bubble"><div class="s9o-copy"><p>${copy}</p><div class="s9o-link-wrap"><button class="s6o-inline-link s6o-external" type="button" data-s9o-action="member-center">前往會員中心</button></div></div></div>${time()}</div></div></div>`;
  }

  function shell(copy) {
    return `<div class="s6o-device">${nativeStatus()}<div class="s3-glow"></div>${header()}<div class="s6o-canvas">${user()}${alpha(copy)}</div>${messageBar()}${safari()}</div>`;
  }

  function mount(id, label, copy) {
    const screen = document.getElementById(id);
    if (!screen) return;
    screen.classList.add('s9o-mounted');
    screen.setAttribute('aria-label', label);
    screen.innerHTML = shell(copy);
  }

  function showScreen(id) {
    const target = document.getElementById(id);
    if (!target) return;
    document.querySelectorAll('.screen, .s6o-screen').forEach((screen) => {
      screen.hidden = screen !== target;
    });
    try { history.pushState({ screen: id.replace(/-screen$/, '') }, '', `#${id.replace(/-screen$/, '')}`); } catch (_) {}
  }

  function init() {
    mount('s9-success-screen', '理賠申請完成', '已收到你的匯款資料，案件號碼 00910-HAC，可以隨時在會員中心查看理賠進度。');
    mount('s9-otp-api-error-screen', '系統異常', '系統出現異常，建議你可以到會員中心使用理賠申請服務。');

    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-s9o-action]');
      if (!button) return;
      if (button.dataset.s9oAction === 'back') {
        history.back();
        return;
      }
      if (button.dataset.s9oAction === 'member-center') {
        showScreen('s8-member-center-screen');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(init), { once: true });
  } else {
    requestAnimationFrame(init);
  }
})();
