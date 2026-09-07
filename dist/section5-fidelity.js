(() => {
  const title = '阿發｜班機延誤申請與諮詢';

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
    <div class="wf-home" aria-hidden="true"></div>`;
  }

  function header() {
    return `<div class="s3-header">
      <button class="s3-back" type="button" data-s5-action="history-back" aria-label="返回"><img src="./assets/ic-arrow-black-left-s.svg" alt=""></button>
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

  function baseConversation({ notConsented = false } = {}) {
    return `<div class="s5-conversation">
      <div class="s5-peek-card" aria-hidden="true"></div>
      <div class="s5-abs-user"><div class="s3-bubble s3-user-bubble">確認申請</div>${time()}</div>
      <div class="s5-abs-alpha"><div class="s3-avatar" aria-hidden="true"></div><div class="s3-alpha-body"><div class="s3-bubble-wrap"><div class="s3-bubble s3-alpha-bubble">請先同意個資聲明才能繼續流程喔。</div>${time()}</div></div></div>
      ${notConsented ? `<div class="s5-abs-alpha second"><div class="s3-avatar" aria-hidden="true"></div><div class="s3-alpha-body"><div class="s3-bubble-wrap"><div class="s3-bubble s3-alpha-bubble">沒有點擊同意個資聲明，不能申請班機延誤理賠喔。<br><br><button type="button" class="s5-inline-link" data-s5-action="open-consent">返回查看個資聲明</button></div>${time()}</div></div></div>` : ''}
    </div>`;
  }

  function shell(content, options = {}) {
    const { notConsented = false } = options;
    return `<div class="s3-device s5-device">${nativeStatus()}<div class="s3-glow"></div>${header()}${baseConversation({ notConsented })}${content}${messageBar()}${safari()}</div>`;
  }

  function compactConsentSheet() {
    return `<div class="s5-scrim" aria-hidden="true"></div>
      <section class="s5-sheet compact" aria-label="個資聲明">
        <div class="s5-sheet-header">
          <p class="s5-sheet-title">個資聲明</p>
          <button type="button" class="s5-sheet-close" data-s5-action="close-consent" aria-label="關閉個資聲明"><img src="./assets/close.png" alt=""></button>
        </div>
        <div class="s5-consent-body">
          <p>為保護你的權益，請詳細閱讀相關<button type="button" class="s5-inline-link" data-s5-action="open-credit">「個人資料運用告知事項」</button>。當你開始填寫資料時，視同你已充分了解並同意國泰產險將開始蒐集與處理你的個人資料。請勿傳遞與本公司業務無關或違法訊息，本公司有權終止非服務範圍內之訊息傳遞。為避免有心人士追蹤、竊取資料，若你使用公用電腦，請勿輸入私人機密資料（如：身分證字號等）。</p>
        </div>
        <div class="s5-sheet-footer"><button type="button" class="s5-primary" data-s5-action="agree">同意</button></div>
      </section>`;
  }

  const creditCopy = `
    <p>本公司蒐集您的個人資料後，依個人資料保護法之規定，您可以向本公司行使下列各項權利：</p>
    <p>(1) 查詢或請求閱覽您的個人資料</p>
    <p>(2) 請求製給您的個人資料複製本</p>
    <p>(3) 請求補充或更正您的個人資料</p>
    <p>(4) 請求停止蒐集、處理或利用您的個人資料</p>
    <p>(5) 請求刪除您的個人資料</p>
    <p>您可以至各服務中心或與本公司客服專線 (0800-212-880 ) 聯繫，本公司將儘速依相關法令規定，處理與回覆您的請求。</p>
    <p>個人資料保護法應告知事項</p>
    <p>親愛的客戶，您好：<br>國泰世紀產物保險股份有限公司（以下稱本公司）依據個人資料保護法（以下稱個資法）第八條及第九條規定，向台端告知下列事項，請台端詳閱：</p>
    <p>一、 蒐集之目的：辦理財產保險(093)、人身保險(001)、行銷(040)及其他合於營業登記項目或組織章程所定之業務(181)。</p>
    <p>二、 蒐集之個人資料類別：包括但不限於姓名、身分證統一編號、聯絡方式、本網站瀏覽或查詢時伺服器自行產生的相關紀錄(包括但不限於您使用設備的 IP 位址、使用的瀏覽器、使用時間、瀏覽及點選資料紀錄等)等，詳如要保書或相關業務申請書內容。</p>
    <p>三、 個人資料之來源（個人資料非由當事人提供間接蒐集之情形適用）：</p>
    <p>(一) 要保人/被保險人/受益人</p>
    <p>(二) 司法警憲機關、委託協助處理理賠之公證人或機構</p>
    <p>(三) 當事人之法定代理人、輔助人</p>
    <p>(四) 各醫療院所</p>
    <p>(五) 與第三人共同行銷、交互運用客戶資料、合作推廣等關係、或於本公司各項業務內所委託往來之第三人。</p>
    <p>(六) 經當事人同意授權之同一金融控股公司所屬銀行子公司之網路銀行帳戶</p>
    <p>四、 個人資料利用之期間、對象、地區及方式：</p>
    <p>(一) 期間：因執行業務所必須及依法令規定應為保存之期間。</p>
    <p>(二) 對象：本(分)公司及本公司海外分支機構、中華民國產物保險商業同業公會、中華民國人壽保險商業同業公會、財團法人保險事業發展中心、財團法人保險安定基金、財團法人住宅地震保險基金、財團法人汽車交通事故特別補償基金、財團法人保險犯罪防制中心、財團法人金融消費評議中心、財團法人金融聯合徵信中心、財團法人聯合信用卡中心、台灣票據交換所、財金資訊公司、關貿網路股份有限公司、中央健康保險局、業務委外機構、與本公司有再保業務往來之公司、依法有調查權機關或金融監理機關。</p>
    <p>(三) 地區：上述對象所在之地區。</p>
    <p>(四) 方式：合於法令規定之利用方式。</p>
    <p>五、 依據個資法第三條規定，台端就本公司保有台端之個人資料得行使之權利及方式：</p>
    <p>(一) 得向本公司行使之權利：</p>
    <p>1. 向本公司查詢、請求閱覽或請求製給複製本。</p>
    <p>2. 向本公司請求補充或更正。</p>
    <p>3. 向本公司請求停止蒐集、處理或利用及請求刪除。</p>
    <p>(二) 行使權利之方式：書面或其他日後可供證明之方式。</p>
    <p>六、 台端不提供個人資料所致權益之影響：台端若未能提供相關個人資料時，本公司將可能延後或無法進行必要之審核及處理作業，因此可能婉謝承保、遲延或無法提供台端完善的保險服務(視業務性質)</p>
    <p>【註】<br>1. 上開告知事項已公告於本公司官網，如有問題歡迎洽詢本公司 0800-212-880，免付費客服專線。<br>2. 本告知事項內容若有更動，係以官網公告為準。</p>`;

  function creditSheet() {
    return `<div class="s5-scrim" aria-hidden="true"></div>
      <section class="s5-sheet long" aria-label="個資法告知事項">
        <div class="s5-sheet-header">
          <p class="s5-sheet-title">個資法告知事項</p>
          <button type="button" class="s5-sheet-close" data-s5-action="close-credit" aria-label="關閉個資法告知事項"><img src="./assets/close.png" alt=""></button>
        </div>
        <div class="s5-credit-body" data-s5-credit-scroll tabindex="0" aria-label="個資法告知事項，可上下捲動"><div class="s5-credit-copy">${creditCopy}</div></div>
        <div class="s5-credit-thumb" aria-hidden="true"></div>
        <div class="s5-sheet-footer"><button type="button" class="s5-primary" data-s5-action="credit-return">返回上一頁</button></div>
      </section>`;
  }

  function consentScreen() { return shell(compactConsentSheet()); }
  function notConsentedScreen() { return shell('', { notConsented: true }); }
  function creditNoticeScreen() { return shell(creditSheet()); }

  const renderers = {
    's05-consent-screen': consentScreen,
    's05-not-consented-screen': notConsentedScreen,
    's05-credit-notice-screen': creditNoticeScreen
  };

  const hashByGoto = {
    's05-consent': '#personal-consent',
    's05-not-consented': '#personal-not-consented',
    's05-credit-notice': '#credit-notice',
    'date-entry': '#date-entry'
  };

  function go(screen, goto) {
    const legacy = screen.querySelector(`:scope > [data-goto="${goto}"]`);
    if (legacy) {
      legacy.click();
      return;
    }
    const hash = hashByGoto[goto];
    if (!hash) return;
    history.pushState({ screen: goto }, '', hash);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  function bind(screen) {
    screen.querySelectorAll('.htmlized-screen [data-s5-action]').forEach((control) => {
      control.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const action = control.dataset.s5Action;
        if (action === 'history-back') return history.back();
        if (action === 'close-consent') return go(screen, 's05-not-consented');
        if (action === 'open-consent') return go(screen, 's05-consent');
        if (action === 'open-credit') return go(screen, 's05-credit-notice');
        if (action === 'agree') return go(screen, 'date-entry');
        if (action === 'close-credit') return go(screen, 's05-not-consented');
        if (action === 'credit-return') return go(screen, 's05-consent');
      });
    });

    const scroller = screen.querySelector('[data-s5-credit-scroll]');
    const thumb = screen.querySelector('.s5-credit-thumb');
    if (scroller && thumb) {
      const updateThumb = () => {
        const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
        const maxTravel = Math.max(0, scroller.clientHeight - 151 - 14);
        thumb.style.transform = `translateY(${(scroller.scrollTop / maxScroll) * maxTravel}px)`;
      };
      scroller.addEventListener('scroll', updateThumb, { passive: true });
      scroller.scrollTop = 0;
      updateThumb();
    }
  }

  function apply() {
    Object.entries(renderers).forEach(([id, renderer]) => {
      const screen = document.getElementById(id);
      const layer = screen?.querySelector('.htmlized-screen');
      if (!screen || !layer) return;
      layer.innerHTML = renderer();
      bind(screen);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(apply), { once: true });
  } else {
    requestAnimationFrame(apply);
  }
})();
