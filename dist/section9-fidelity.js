(() => {
  const title = '阿發｜班機延誤申請與諮詢';
  const $ = (selector, root = document) => root.querySelector(selector);
  const screens = [
    ['s9-otp-initial-screen','initial'],
    ['s9-otp-filled-screen','filled'],
    ['s9-otp-complete-screen','complete'],
    ['s9-otp-corrected-screen','corrected'],
    ['s9-otp-validating-screen','validating'],
    ['s9-otp-error-screen','error'],
    ['s9-otp-too-many-screen','too-many'],
    ['s9-otp-resend-screen','resend'],
    ['s9-otp-expired-screen','expired'],
    ['s9-otp-resend-ready-screen','resend-ready']
  ];
  let validatingTimer = 0;

  function nativeStatus() {
    return '<div class="wf-status" aria-hidden="true"><div class="wf-time">9:41</div><div class="wf-island"></div><div class="wf-signal"><i></i><i></i><i></i><i></i></div><div class="wf-wifi"><span class="wf-wifi-dot"></span></div><div class="wf-battery"></div></div>';
  }
  function safari() {
    return '<div class="wf-safari-address" aria-hidden="true"><div class="wf-address-pill"><div class="wf-site-settings"></div><div class="wf-domain">alpha.com</div><div class="wf-reload"></div></div></div><div class="wf-safari-toolbar" aria-hidden="true"><span class="wf-toolbar-item wf-chevron"></span><span class="wf-toolbar-item wf-chevron forward"></span><span class="wf-toolbar-item wf-share"></span><span class="wf-toolbar-item wf-book"></span><span class="wf-toolbar-item wf-tabs"></span></div><div class="wf-home" aria-hidden="true"></div>';
  }
  function header() {
    return '<div class="s3-header"><button class="s3-back" type="button" data-s9f-action="back" aria-label="返回"><img src="./assets/ic-arrow-black-left-s.svg" alt=""></button><div class="s3-title-group"><div class="s3-title">'+title+'</div><div class="s3-beta">Beta</div></div></div>';
  }
  function messageBar() {
    return '<div class="s3-message-bar"><div class="s3-message-row"><div class="s3-message-input">告訴我你想做什麼</div><div class="s3-send"></div></div><p class="s3-message-note">當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，<br>內容僅供參考，實際資訊仍以國泰產險官網公告為準。</p></div>';
  }
  function time() { return '<div class="s9f-time">10:07 PM 送出</div>'; }
  function alpha(kind, text) {
    return '<div class="s9f-chat-alpha '+kind+'"><div class="s9f-avatar" aria-hidden="true"></div><div class="s9f-chat-body"><div class="s9f-chat-stack"><div class="s9f-chat-bubble">'+text+'</div>'+time()+'</div></div></div>';
  }
  function baseConversation() {
    return '<div class="s9f-canvas"><div class="s9f-chat-user"><div class="s9f-chat-user-bubble">確認送出</div>'+time()+'</div>'+alpha('a1','好的，請填寫匯款資料。')+'<div class="s9f-chat-user u2"><div class="s9f-chat-user-bubble">已填寫匯款資料</div>'+time()+'</div>'+alpha('a2','好的，請使用動態密碼完成身分驗證。')+'</div>';
  }
  function shell(content, extraClass = '') {
    return '<div class="s9f-root '+extraClass+'">'+nativeStatus()+'<div class="s3-glow"></div>'+header()+baseConversation()+messageBar()+safari()+content+'</div>';
  }

  function modeConfig(mode) {
    if (mode === 'filled') return { value:'123', focus:true };
    if (mode === 'complete' || mode === 'corrected') return { value:'123123', enabled:true };
    if (mode === 'validating') return { value:'123123', validating:true };
    if (mode === 'error') return { error:'動態密碼輸入錯誤', className:'is-error', countdown:true };
    if (mode === 'too-many') return { error:'動態密碼輸入錯誤超過 5 次，請點選重新發送', className:'is-too-many', resend:true };
    if (mode === 'resend') return { resend:true, readonly:true };
    if (mode === 'expired') return { error:'動態密碼已失效，請重新發送', className:'is-expired', resend:true };
    return { countdown:true };
  }

  function sheetMarkup(mode) {
    const c = modeConfig(mode);
    const value = c.value || '';
    const error = c.error ? '<p class="s9f-error-text">'+c.error+'</p>' : '';
    const resend = c.resend
      ? '<button class="s9f-resend-link" type="button" data-s9f-action="resend">重新發送</button>'
      : '<p class="s9f-resend-line"><span class="s9f-resend-time">2:56</span> 後可以重新發送</p>';
    const buttonClass = c.validating ? 's9f-submit is-validating' : c.enabled ? 's9f-submit is-enabled' : 's9f-submit';
    const buttonText = c.validating ? '驗證中…' : '下一步';
    const disabled = c.enabled ? '' : ' disabled';
    const readonly = c.readonly ? ' readonly aria-readonly="true"' : '';
    const autofocus = c.focus ? ' data-s9f-focus="true"' : '';
    return '<div class="s9f-scrim" aria-hidden="true"></div><section class="s9f-sheet '+(c.className||'')+'" aria-label="動態密碼驗證"><header class="s9f-header"><h1 class="s9f-title">動態密碼驗證</h1><button class="s9f-close" type="button" data-s9f-action="close" aria-label="關閉">×</button></header><div class="s9f-body"><p class="s9f-message">動態密碼已發送至：<br><strong>0963-****30</strong><br><strong>Cathay***@***il.com</strong><span class="s9f-expiry">動態密碼將在 5 分鐘後失效</span></p><label class="s9f-field"><span class="s9f-label">請輸入動態密碼</span><input class="s9f-input" data-s9f-input type="tel" inputmode="numeric" autocomplete="one-time-code" maxlength="6" value="'+value+'" placeholder="請輸入動態密碼"'+readonly+autofocus+'></label>'+error+resend+'<button class="s9f-help" type="button" data-s9f-action="help"><span class="s9f-help-icon">i</span><span>收不到動態密碼簡訊？</span></button></div><footer class="s9f-footer"><button class="'+buttonClass+'" type="button" data-s9f-action="submit"'+disabled+'>'+buttonText+'</button></footer></section>';
  }

  function closeRoute(mode) {
    if (mode === 'filled' || mode === 'complete' || mode === 'corrected') return 's9-close-result-b-screen';
    if (mode === 'resend-ready') return 's9-close-result-a-screen';
    return 's9-close-result-a-screen';
  }

  function show(id, push = true) {
    const target = document.getElementById(id);
    if (!target) return false;
    document.querySelectorAll('.screen, .s6o-screen').forEach((screen) => { screen.hidden = screen !== target; });
    if (push) {
      try { history.pushState({screen:id.replace(/-screen$/,'')},'', '#'+id.replace(/-screen$/,'')); } catch (_) {}
    }
    clearTimeout(validatingTimer);
    if (id === 's9-otp-validating-screen') validatingTimer = window.setTimeout(() => show('s9-success-screen'), 800);
    return true;
  }

  function showTooltip(root) {
    if ($('.s9f-tooltip', root)) return;
    const tip = document.createElement('div');
    tip.className = 's9f-tooltip';
    tip.innerHTML = '簡訊可能稍有延遲，請稍候並確認手機號碼是否正確。<button class="s9f-tooltip-close" type="button" aria-label="關閉提示">×</button>';
    root.appendChild(tip);
    $('.s9f-tooltip-close', tip).addEventListener('click', () => tip.remove());
  }

  function bind(screen, mode) {
    const root = $('.s9f-root', screen);
    const input = $('[data-s9f-input]', root);
    const submit = $('[data-s9f-action="submit"]', root);
    $('[data-s9f-action="back"]', root)?.addEventListener('click', () => history.back());
    $('[data-s9f-action="close"]', root)?.addEventListener('click', () => show(closeRoute(mode)));
    $('[data-s9f-action="help"]', root)?.addEventListener('click', () => showTooltip(root));
    $('[data-s9f-action="resend"]', root)?.addEventListener('click', () => {
      if (mode === 'too-many') return show('s9-otp-resend-screen');
      if (mode === 'expired') return show('s9-otp-resend-ready-screen');
      if (mode === 'resend') return show('s9-otp-api-error-screen');
      show('s9-otp-resend-ready-screen');
    });
    if (mode === 'resend' && input) {
      input.addEventListener('click', () => show('s9-otp-expired-screen'));
      return;
    }
    if (input && !input.readOnly && mode !== 'validating') {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g,'').slice(0,6);
        const ready = input.value.length === 6;
        submit.disabled = !ready;
        submit.classList.toggle('is-enabled', ready);
      });
    }
    if (submit && mode !== 'validating') submit.addEventListener('click', () => {
      if (submit.disabled) return;
      const code = input ? input.value : '';
      if (mode === 'error') return show(code === '123123' ? 's9-otp-validating-screen' : 's9-otp-too-many-screen');
      if (mode === 'complete' || mode === 'corrected' || code === '123123') return show('s9-otp-validating-screen');
      show('s9-otp-error-screen');
    });
    if (input?.dataset.s9fFocus) requestAnimationFrame(() => input.focus());
  }

  function mountOtp(id, mode) {
    const screen = document.getElementById(id);
    if (!screen) return;
    screen.classList.add('s9f-mounted');
    screen.innerHTML = shell(sheetMarkup(mode));
    bind(screen, mode);
  }

  function resultShell(returnTarget) {
    const canvas = '<div class="s9f-canvas"><div class="s9f-result-user"><div class="s9f-chat-user-bubble">確認送出</div>'+time()+'</div><div class="s9f-result-alpha"><div class="s9f-avatar" aria-hidden="true"></div><div class="s9f-chat-body"><div class="s9f-chat-stack"><div class="s9f-chat-bubble">沒有完成動態密碼驗證，不能申請班機延誤理賠喔。<button class="s9f-result-link" type="button" data-s9f-return="'+returnTarget+'">返回填寫動態密碼</button></div>'+time()+'</div></div></div></div>';
    return '<div class="s9f-root s9f-result">'+nativeStatus()+'<div class="s3-glow"></div>'+header()+canvas+messageBar()+safari()+'</div>';
  }
  function mountResult(id, target) {
    const screen = document.getElementById(id);
    if (!screen) return;
    screen.classList.add('s9f-mounted');
    screen.innerHTML = resultShell(target);
    $('[data-s9f-action="back"]', screen)?.addEventListener('click', () => history.back());
    $('[data-s9f-return]', screen)?.addEventListener('click', (event) => show(event.currentTarget.dataset.s9fReturn));
  }

  function init() {
    screens.forEach(([id,mode]) => mountOtp(id,mode));
    mountResult('s9-close-result-a-screen','s9-otp-resend-ready-screen');
    mountResult('s9-close-result-b-screen','s9-otp-initial-screen');
    mountResult('s9-close-result-c-screen','s9-otp-initial-screen');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(init), {once:true});
  else requestAnimationFrame(init);
})();
