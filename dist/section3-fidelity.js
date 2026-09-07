(() => {
  const title = '阿發｜班機延誤申請與諮詢';

  function nativeStatus() {
    return `<div class="wf-status">
      <div class="wf-time">9:41</div>
      <div class="wf-island"></div>
      <div class="wf-signal"><i></i><i></i><i></i><i></i></div>
      <div class="wf-wifi"><span class="wf-wifi-dot"></span></div>
      <div class="wf-battery"></div>
    </div>`;
  }

  function safari() {
    return `<div class="wf-safari-address">
      <div class="wf-address-pill">
        <div class="wf-site-settings"></div>
        <div class="wf-domain">alpha.com</div>
        <div class="wf-reload"></div>
      </div>
    </div>
    <div class="wf-safari-toolbar">
      <span class="wf-toolbar-item wf-chevron"></span>
      <span class="wf-toolbar-item wf-chevron forward"></span>
      <span class="wf-toolbar-item wf-share"></span>
      <span class="wf-toolbar-item wf-book"></span>
      <span class="wf-toolbar-item wf-tabs"></span>
    </div>
    <div class="wf-home"></div>`;
  }

  function header() {
    return `<div class="s3-header">
      <button class="s3-back" type="button" data-s3-action="back" aria-label="返回"><img src="./assets/ic-arrow-black-left-s.svg" alt=""></button>
      <div class="s3-title-group"><div class="s3-title">${title}</div><div class="s3-beta">Beta</div></div>
    </div>`;
  }

  function messageBar(paused = false) {
    return `<div class="s3-message-bar${paused ? ' is-paused' : ''}">
      <div class="s3-message-row">
        <div class="s3-message-input">${paused ? '請先點選上方項目再繼續操作' : '告訴我你想做什麼'}</div>
        <div class="s3-send"></div>
      </div>
      <p class="s3-message-note">當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，<br>內容僅供參考，實際資訊仍以國泰產險官網公告為準。</p>
    </div>`;
  }

  function shell(content, paused = false) {
    return `<div class="s3-device">${nativeStatus()}<div class="s3-glow"></div>${header()}${content}${messageBar(paused)}${safari()}</div>`;
  }

  function time() { return `<div class="s3-time">10:07 PM 送出</div>`; }

  function user(text) {
    return `<div class="s3-turn-user"><div class="s3-bubble-wrap"><div class="s3-bubble s3-user-bubble">${text}</div>${time()}</div></div>`;
  }

  function alpha(content, options = {}) {
    const { actions = '', withTime = true } = options;
    return `<div class="s3-turn-alpha"><div class="s3-avatar" aria-hidden="true"></div><div class="s3-alpha-body">
      <div class="s3-bubble-wrap"><div class="s3-bubble s3-alpha-bubble">${content}</div>${withTime ? time() : ''}</div>${actions}
    </div></div>`;
  }

  function reminderCard({ interactive = false } = {}) {
    return `<div class="s3-turn-alpha"><div class="s3-avatar" aria-hidden="true"></div><div class="s3-alpha-body">
      <div class="s3-card">
        <div class="s3-card-content">
          <p><strong>班機延誤理賠注意事項</strong></p>
          <p>本服務僅適用班機延誤後仍搭乘原航班。以下情況請改由產險官網或線下通路辦理：</p>
          <ul>
            <li>班機取消/改搭其他班機</li>
            <li>申請實支實付型</li>
            <li>錯過轉機航班</li>
            <li>同時申請其他理賠項目</li>
          </ul>
          <p>限個人件，且要保人與被保險人須為同一人</p>
          <p>須為國泰產險會員</p>
          <p class="s3-card-section">申請前請準備：</p>
          <ul>
            <li><span class="s3-highlight">登機證</span></li>
            <li><span class="s3-highlight">本人匯款帳戶</span></li>
            <li><span class="s3-highlight">班機延誤證明（視情況）</span></li>
          </ul>
        </div>
        <button class="s3-card-action" type="button" ${interactive ? 'data-s3-action="confirm"' : 'tabindex="-1"'}>確認申請</button>
        <button class="s3-card-action" type="button" ${interactive ? 'data-s3-action="join"' : 'tabindex="-1"'}>加入國泰產險會員</button>
        <button class="s3-card-action" type="button" ${interactive ? 'data-s3-action="official"' : 'tabindex="-1"'}>前往國泰產險官網</button>
      </div>${time()}
    </div></div>`;
  }

  function preApplicationBubble() {
    return alpha(`<p>阿發提醒你，申請班機延誤的理賠前請留意以下事項：</p>
      <ol>
        <li>請先準備以下文件</li>
        <ol type="a">
          <li><span class="s3-highlight">登機證</span></li>
          <li><span class="s3-highlight">班機延誤證明</span></li>
        </ol>
        <li>僅限個人件</li>
        <li>線上立案理賠申請之要保人與被保險人須為同一人</li>
        <li>需為國泰產險認證會員</li>
      </ol>`, {
        actions: `<div class="s3-inline-buttons"><button class="s3-pill" data-s3-action="confirm" type="button">確認申請</button><button class="s3-pill" data-s3-action="later" type="button">稍後再說</button></div>`
      });
  }

  function claimInput() {
    return shell(`<div class="s3-static"><div class="s3-thread">
      ${user('我想詢問班機延誤保險相關問題')}
      ${alpha(`<p>阿發為你整理常見問題：</p><ol><li>班機延誤4小時以上，可以提出理賠申請。</li><li>延誤時間會從「原訂起飛時間」開始計算，至實際搭乘的班機起飛為止。</li></ol>`)}
      ${alpha('你也可以直接描述你的班機延誤情況，阿發來為你解答~')}
    </div></div>`);
  }

  function documents() {
    return shell(`<div class="s3-scroll" data-s3-scroll="docs"><div class="s3-thread s3-thread-docs">
      ${user('你好 我想申請理賠')}
      ${alpha('好的，請問你想申請什麽理賠呢？')}
      ${user('我想申請班機延誤的理賠')}
      ${reminderCard({ interactive: true })}
    </div></div>`, true);
  }

  function later() {
    return shell(`<div class="s3-scroll" data-s3-scroll="later"><div class="s3-thread s3-thread-later">
      ${user('我要諮詢')}
      ${preApplicationBubble()}
      ${user('稍後再說')}
      ${alpha('若有其他需要阿發幫忙的地方請再跟我說。')}
    </div></div>`);
  }

  function login() {
    return shell(`<div class="s3-scroll" data-s3-scroll="login"><div class="s3-thread s3-thread-login">
      ${reminderCard()}
      ${user('確認申請')}
      ${alpha('請先登入才能繼續流程喔。')}
    </div></div>`);
  }

  const renderers = {
    's03-claim-input-screen': claimInput,
    's03-documents-screen': documents,
    's03-later-screen': later,
    's02-login-screen': login
  };

  function go(screen, goto, selector) {
    const target = selector ? screen.querySelector(selector) : null;
    if (target) {
      target.click();
      return;
    }
    history.pushState({ screen: goto }, '', `#${goto}`);
    window.dispatchEvent(new PopStateEvent('popstate', { state: { screen: goto } }));
  }

  function bind(screen) {
    screen.querySelectorAll('.htmlized-screen [data-s3-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.s3Action;
        if (action === 'back') return go(screen, 'welcome', ':scope > [data-goto="welcome"]');
        if (action === 'confirm') return go(screen, 's02-login', ':scope > [data-goto="s02-login"]');
        if (action === 'join') return go(screen, 's02-login', ':scope > [data-goto="s02-login"]');
        if (action === 'official') return go(screen, 's03-official-site', ':scope > [data-goto="s03-official-site"]');
        if (action === 'later') return go(screen, 's03-later', ':scope > [data-goto="s03-later"]');
      });
    });
  }

  function setInitialScroll(screen) {
    const scroller = screen.querySelector('[data-s3-scroll]');
    if (!scroller) return;
    const type = scroller.dataset.s3Scroll;
    const positions = { docs: 470, later: 260, login: 470 };
    scroller.scrollTop = positions[type] || 0;
  }

  function apply() {
    Object.entries(renderers).forEach(([id, renderer]) => {
      const screen = document.getElementById(id);
      const layer = screen?.querySelector('.htmlized-screen');
      if (!screen || !layer) return;
      layer.innerHTML = renderer();
      bind(screen);
      requestAnimationFrame(() => setInitialScroll(screen));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(apply), { once: true });
  } else {
    requestAnimationFrame(apply);
  }
})();
