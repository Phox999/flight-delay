(() => {
  const screenHash = {
    welcome: "welcome-screen",
    "s01-ai-notice": "s01-ai-notice-screen",
    "s01-ai-statement": "s01-ai-statement-screen",
    "s01-privacy": "s01-privacy-screen",
    "s01-terms": "s01-terms-screen",
    "s01-alert-terms": "s01-alert-terms-screen",
    "s01-alert-privacy": "s01-alert-privacy-screen",
    "s01-alert-service": "s01-alert-service-screen"
  };

  function go(route, replace = false) {
    const id = screenHash[route] || `${route}-screen`;
    const screen = document.getElementById(id);
    if (!screen) return;
    const state = { screen: route };
    if (replace) history.replaceState(state, "", `#${route}`);
    else history.pushState(state, "", `#${route}`);
    window.dispatchEvent(new PopStateEvent("popstate", { state }));
  }

  function welcomeBase() {
    const base = document.querySelector("#welcome-screen .welcome-fidelity");
    if (!base) return "";
    const clone = base.cloneNode(true);
    clone.classList.add("s1-base");
    return clone.outerHTML;
  }

  function alertMarkup({ title, copy, primary, target, tall = false }) {
    return `${welcomeBase()}
      <div class="s1-scrim"></div>
      <div class="s1-alert ${tall ? "is-tall" : "is-short"}">
        <div class="s1-alert-avatar" aria-hidden="true"></div>
        <div class="s1-alert-content">
          <h2 class="s1-alert-title">${title}</h2>
          <p class="s1-alert-copy">${copy}</p>
        </div>
        <div class="s1-alert-actions">
          <button class="s1-alert-button" type="button" data-s1-goto="welcome">取消</button>
          <button class="s1-alert-button primary" type="button" data-s1-goto="${target}">${primary}</button>
        </div>
      </div>`;
  }

  const noticeItems = [
    "本服務透過生成式人工智慧（Gen AI）系統之協助，可幫助您自本公司官方網站之公開資訊或本公司預先準備之常見問答集中，快速查詢本公司各項服務與產品資訊，並產出相應的回覆。",
    "為提供更精準的搜尋結果，請使用完整且清晰的句子描述您的需求，若提問描述不夠明確，本服務可能無法精準回覆，您可以嘗試重新表達需求，或聯繫本公司客服尋求協助。",
    "本服務生成之內容有其內在限制及與現實情況所存在之潛在落差，可能存在不完整、不準確或非預期之結果，且本服務所參考的相關資料可能有更新之時間差，故本公司提供之服務與產品相關資訊，仍以本公司官方網站所揭露之資訊為準。",
    "為保障個人資料安全，請勿在對話中輸入任何屬於您或他人的敏感性資料或隱私資訊（如：身分證字號、聯絡方式、帳務資訊等）。",
    "因生成式 AI 系統特性，本公司對同一用戶每日（00:00–23:59）可使用本服務業務詢問之次數設有上限。若達上限時，您將會收到系統提醒，且當日無法再於本服務中傳送其他訊息。"
  ];

  function noticeMarkup() {
    return `${welcomeBase()}
      <div class="s1-scrim"></div>
      <div class="s1-notice-sheet">
        <div class="s1-notice-head">注意事項
          <button class="s1-close" type="button" data-s1-goto="welcome" aria-label="關閉注意事項"></button>
        </div>
        <div class="s1-notice-body" tabindex="0" aria-label="注意事項，可上下捲動">
          <ol class="s1-notice-list">${noticeItems.map((item) => `<li>${item}</li>`).join("")}</ol>
        </div>
      </div>`;
  }

  function nativeStatus() {
    return `<div class="wf-status">
      <div class="wf-time">9:41</div>
      <div class="wf-island"></div>
      <div class="wf-signal"><i></i><i></i><i></i><i></i></div>
      <div class="wf-wifi"><span class="wf-wifi-dot"></span></div>
      <div class="wf-battery"></div>
    </div>`;
  }

  function safariChrome() {
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
      <button class="s1-browser-back" type="button" aria-label="返回上一頁"></button>
      <div class="wf-home"></div>`;
  }

  function browserPage(content, helper = "") {
    return `<div class="s1-device">
      ${nativeStatus()}
      <div class="s1-browser-scroll">${content}</div>
      ${helper}
      ${safariChrome()}
    </div>`;
  }

  function appsGrid() {
    return `<span class="s1-google-apps" aria-hidden="true">${new Array(9).fill("<i></i>").join("")}</span>`;
  }

  function googleHeader(title) {
    return `<div class="s1-google-header">
      <span class="s1-google-menu" aria-hidden="true"></span>
      <span class="s1-google-title">${title}</span>
      ${appsGrid()}
      <span class="s1-google-profile" aria-hidden="true"></span>
    </div>`;
  }

  function termsMarkup() {
    return browserPage(`<article class="s1-google-page">
      ${googleHeader("Terms of Service")}
      <div class="s1-google-hero"><div class="s1-google-hero-sprite terms" aria-hidden="true"></div></div>
      <div class="s1-google-copy">
        <p class="s1-google-meta">Effective July 30, 2026</p>
        <a class="s1-google-link">Archived versions</a>
        <a class="s1-google-link">Download PDF</a>
        <a class="s1-google-link">Country version: Taiwan</a>
        <h2 class="s1-google-heading">What’s covered in these terms</h2>
        <h3 class="s1-google-heading follow">We know it’s tempting to skip these Terms of Service, but it’s important to establish what you can expect from us as you use Google services, and what we expect from you.</h3>
        <p class="s1-google-body">These terms reflect the way Google’s business works, the laws that apply to our company, and certain things we’ve always believed to be true.</p>
      </div>
    </article>`);
  }

  function privacyMarkup() {
    return browserPage(`<article class="s1-google-page">
      ${googleHeader("Privacy Policy")}
      <div class="s1-google-hero"><div class="s1-google-hero-sprite privacy" aria-hidden="true"></div></div>
      <div class="s1-google-copy">
        <p class="s1-google-privacy-lead">When you use our services,<br>you’re trusting us with your<br>information. We understand<br>this is a big responsibility<br>and work hard to protect<br>your information and put<br>you in control.</p>
        <p class="s1-google-privacy-body">This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can update, manage, export, and delete your information.</p>
      </div>
    </article>`);
  }

  function cathayMarkup() {
    return browserPage(`<article class="s1-cathay-page">
      <div class="s1-cathay-hero">
        <span class="s1-cathay-menu" aria-hidden="true"></span>
        <span class="s1-cathay-logo" aria-label="國泰世華銀行"></span>
        <span class="s1-cathay-login">登入</span>
        <h1 class="s1-cathay-title">國泰世華銀行運用AI告知聲明</h1>
      </div>
      <div class="s1-cathay-content">
        <p class="s1-cathay-breadcrumb">國泰世華銀行 - Cathay United Bank　/　客戶須知</p>
        <p class="s1-cathay-breadcrumb">　/　國泰世華銀行運用AI告知聲明</p>
        <h2 class="s1-cathay-heading">國泰世華銀行運用AI告知聲明</h2>
        <p class="s1-cathay-paragraph">歡迎您蒞臨國泰世華銀行（下稱本行）官方網站/CUBE App，本行現已在前述平台推出諸多涉及運用人工智慧（AI）與生成式人工智慧（Gen AI）系統而提供之服務（下合稱AI服務），以利提升您的使用體驗。為了讓您能夠更安心使用本行所提供各項AI服務，特此向您說明官方網站與CUBE App之AI服務範圍、運作說明（包含其所使用的資料、AI服務決策方式與其可能對您帶來的影響），及您使用各AI服務時，應注意之事項如下：</p>
        <h3 class="s1-cathay-subheading">一、與AI服務相關之名詞定義</h3>
        <p class="s1-cathay-paragraph">（一）「AI系統」：係指透過大量資料與演算法進行分析、推論及產出結果之資訊系統。</p>
      </div>
    </article>`, `<div class="s1-cathay-helper">智能助理阿發<br>有任何問題隨時找我！</div>`);
  }

  function setLayer(id, markup, interactive = true) {
    const layer = document.querySelector(`#${id} .htmlized-screen`);
    if (!layer) return false;
    layer.innerHTML = markup;
    layer.classList.toggle("s1-interactive", interactive);
    return true;
  }

  function bindInteractions() {
    document.querySelectorAll("[data-s1-goto]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        go(button.dataset.s1Goto);
      });
    });
    document.querySelectorAll(".s1-browser-back").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        history.back();
      });
    });
  }

  function applySection1() {
    if (!document.querySelector("#welcome-screen .welcome-fidelity")) return false;

    setLayer("s01-ai-notice-screen", noticeMarkup());
    setLayer("s01-alert-terms-screen", alertMarkup({
      title: "即將前往國泰產險官網",
      copy: "你即將離開阿發，前往產險服務條款頁",
      primary: "前往官網",
      target: "s01-ai-statement"
    }));
    setLayer("s01-alert-privacy-screen", alertMarkup({
      title: "前往外部網站",
      copy: "你即將離開阿發，前往查看 Google 隱私權政策",
      primary: "繼續",
      target: "s01-privacy",
      tall: true
    }));
    setLayer("s01-alert-service-screen", alertMarkup({
      title: "前往外部網站",
      copy: "你即將離開阿發，前往查看 Google 服務條款",
      primary: "繼續",
      target: "s01-terms",
      tall: true
    }));
    setLayer("s01-terms-screen", termsMarkup());
    setLayer("s01-privacy-screen", privacyMarkup());
    setLayer("s01-ai-statement-screen", cathayMarkup());

    bindInteractions();
    return true;
  }

  function start() {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (applySection1()) return;
      setTimeout(applySection1, 80);
    }));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
