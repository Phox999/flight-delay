(() => {
  function welcomeMarkup() {
    return `
      <div class="welcome-fidelity">
        <div class="wf-status" aria-hidden="true">
          <div class="wf-time">9:41</div>
          <div class="wf-island"></div>
          <div class="wf-signal"><i></i><i></i><i></i><i></i></div>
          <div class="wf-wifi"><span class="wf-wifi-dot"></span></div>
          <div class="wf-battery"></div>
        </div>

        <div class="wf-header" aria-hidden="true">
          <div class="wf-back"></div>
          <div class="wf-header-group">
            <div class="wf-header-title">阿發｜班機延誤申請與諮詢</div>
            <div class="wf-beta">Beta</div>
          </div>
        </div>

        <p class="wf-notice" style="left:36px;width:345px">
          本服務由生成式AI提供，請勿輸入個人資料（如身分證號碼），<br>
          使用前請詳閱<button type="button" class="wf-inline-link" data-forward-goto="s01-alert-terms">AI告知聲明</button>與<button type="button" class="wf-inline-link" data-forward-goto="s01-ai-notice">注意事項</button>。本站受reCAPTCHA保護，<br>
          詳參<button type="button" class="wf-inline-link" data-forward-goto="s01-alert-privacy">Google隱私權政策</button>與<button type="button" class="wf-inline-link" data-forward-goto="s01-alert-service">服務條款</button>。
        </p>

        <div class="wf-glow" aria-hidden="true"></div>
        <div class="wf-avatar" aria-hidden="true"></div>
        <p class="wf-welcome-title">歡迎體驗全新阿發</p>
        <p class="wf-welcome-subtitle">我能怎麼協助你呢？</p>

        <button type="button" class="wf-tag wf-tag-one" data-forward-goto="s03-documents">
          <span>我想申請班機延誤理賠</span><span class="wf-tag-arrow" aria-hidden="true"></span>
        </button>
        <button type="button" class="wf-tag wf-tag-two" data-forward-goto="s03-claim-input">
          <span>我想詢問班機延誤保險相關問題</span><span class="wf-tag-arrow" aria-hidden="true"></span>
        </button>

        <div class="wf-message-bar" aria-hidden="true">
          <div class="wf-message-row">
            <div class="wf-message-input">告訴我你想做什麼</div>
            <div class="wf-send"></div>
          </div>
          <p class="wf-message-note">當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，<br>內容僅供參考，實際資訊仍以國泰產險官網公告為準。</p>
        </div>

        <div class="wf-safari-address" aria-hidden="true">
          <div class="wf-address-pill">
            <div class="wf-site-settings"></div>
            <div class="wf-domain">alpha.com</div>
            <div class="wf-reload"></div>
          </div>
        </div>
        <div class="wf-safari-toolbar" aria-hidden="true">
          <span class="wf-toolbar-item wf-chevron"></span>
          <span class="wf-toolbar-item wf-chevron forward"></span>
          <span class="wf-toolbar-item wf-share"></span>
          <span class="wf-toolbar-item wf-book"></span>
          <span class="wf-toolbar-item wf-tabs"></span>
        </div>
      </div>`;
  }

  function forwardToLegacyRoute(goto) {
    const legacyTrigger = document.querySelector(`#welcome-screen [data-goto="${goto}"]`);
    if (legacyTrigger) {
      legacyTrigger.click();
      return;
    }

    history.pushState({ screen: goto }, "", `#${goto}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  function applyFidelity() {
    const layer = document.querySelector('#welcome-screen .htmlized-screen');
    if (!layer) return;

    layer.innerHTML = welcomeMarkup();

    layer.querySelectorAll('[data-forward-goto]').forEach((control) => {
      control.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        forwardToLegacyRoute(control.dataset.forwardGoto);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(applyFidelity), { once: true });
  } else {
    requestAnimationFrame(applyFidelity);
  }
})();