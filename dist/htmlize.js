(() => {
  const q = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  function statusBar() {
    return `
      <div class="native-status">
        <span class="native-time">9:41</span>
        <span class="native-island"></span>
        <span class="native-signals">
          <span class="native-signal-bars"><i></i><i></i><i></i><i></i></span>
          <span class="native-wifi">⌁</span>
          <span class="native-battery"></span>
        </span>
      </div>`;
  }

  function appHeader({ back = true, title = "阿發｜班機延誤事故理賠", badge = "BETA" } = {}) {
    return `
      <div class="app-header">
        <span class="${back ? "app-back" : "app-spacer"}">${back ? "‹" : ""}</span>
        <span class="app-title">${q(title)}</span>
        ${badge ? `<span class="app-badge">${q(badge)}</span>` : `<span class="app-spacer"></span>`}
      </div>`;
  }

  function chatCanvas({ dim = false } = {}) {
    return `<div class="chat-canvas${dim ? " is-dimmed" : ""}"></div>`;
  }

  function messageBar() {
    return `
      <div class="message-bar">
        <div class="message-input">輸入訊息...</div>
        <div class="message-tools"><span>＋</span><span>⌁</span><span style="margin-left:auto">➤</span></div>
      </div>`;
  }

  function safari() {
    return `
      <div class="safari-address"><span class="safari-tabs"></span><div class="safari-pill">alpha.com</div><span class="safari-refresh">↻</span></div>
      <div class="safari-toolbar"><span>‹</span><span style="opacity:.25">›</span><span>⇧</span><span>⌑</span><span>▢</span></div>
      <div class="home-bar"></div>`;
  }

  function chrome(content = "", options = {}) {
    const { dim = false, header = true, back = true, title, badge, safariChrome = true, message = true } = options;
    return `
      ${statusBar()}
      ${header ? appHeader({ back, title, badge }) : ""}
      ${header ? chatCanvas({ dim }) : ""}
      ${content}
      ${header && message ? messageBar() : ""}
      ${safariChrome ? safari() : ""}`;
  }

  function chatRow(text, user = false, time = "10:07 PM") {
    return `<div class="chat-row${user ? " user" : ""}">
      ${user ? "" : `<div class="chat-avatar">發</div>`}
      <div><div class="chat-bubble">${text}</div><div class="chat-time">${time}</div></div>
    </div>`;
  }

  function chatScreen(rows, actions = []) {
    return chrome(`<div class="chat-stack">${rows.join("")}${actions.length ? `<div class="quick-actions">${actions.map((a) => `<div class="quick-chip">${q(a)}</div>`).join("")}</div>` : ""}</div>`);
  }

  function dimSheet(title, body, footer = "", top = 330) {
    const height = 716 - top;
    return chrome(`
      <div class="html-scrim"></div>
      <div class="sheet-surface" style="top:${top}px;height:${height}px">
        <div class="sheet-head"><span>${q(title)}</span><span class="sheet-x">×</span></div>
        <div class="sheet-body">${body}</div>
        ${footer ? `<div class="sheet-foot" style="position:absolute;left:0;bottom:0;width:393px">${footer}</div>` : ""}
      </div>`, { dim: true });
  }

  function dialog(title, copy, actions = ["返回"]) {
    return chrome(`<div class="html-scrim"></div><div class="center-dialog"><div class="dialog-body"><div class="dialog-icon">!</div><h2 class="dialog-title">${q(title)}</h2><p class="dialog-copy">${copy}</p></div><div class="dialog-actions">${actions.map((a) => `<div class="dialog-action">${q(a)}</div>`).join("")}</div></div>`, { dim: true });
  }

  function uploadSheet({ title, hint = "支援 JPG、PNG、PDF，單一檔案上限 20 MB", state = "empty", file = "boarding_pass.jpg", error = "" } = {}) {
    let body = "";
    if (state === "empty") {
      body = `<div class="upload-box"><div class="upload-icon">↑</div><div class="upload-title">點擊上傳檔案</div><div class="upload-hint">${q(hint)}</div></div>${error ? `<div class="error-text">${q(error)}</div>` : ""}`;
    } else if (state === "loading") {
      body = `<div class="upload-box"><div><div class="spinner"></div><div class="loading-label">檔案上傳中...</div></div></div>`;
    } else {
      body = `<div class="file-chip"><div class="file-icon">FILE</div><div class="file-meta"><div class="file-name">${q(file)}</div><div class="file-size">2.1 MB</div></div><div class="file-trash">⌫</div></div>${error ? `<div class="error-text">${q(error)}</div>` : ""}`;
    }
    return dimSheet(title, body, `<div class="primary-cta">確認上傳</div>`, 352);
  }

  function actionSheet() {
    return chrome(`<div class="html-scrim"></div><div class="action-sheet"><div class="action-item">照片圖庫</div><div class="action-item">拍照</div><div class="action-item">選擇檔案</div><div class="action-item">取消</div></div>`, { dim: true });
  }

  function filesApp(delay = false) {
    const normalName = delay ? "delay-certificate.jpg" : "IMG_8241.JPG";
    const bigName = delay ? "flight-delay-certificate.pdf" : "boarding-pass.pdf";
    return `
      ${statusBar()}
      <div class="files-app">
        <div class="files-nav"><span class="files-back">‹ 瀏覽</span><span class="files-title">最近項目</span><span class="files-cancel">取消</span></div>
        <div class="files-search">搜尋</div>
        <div class="files-list">
          <div class="files-row"><div class="files-thumb">PDF</div><div class="files-info"><div class="files-name">${q(bigName)}</div><div class="files-sub">今天 · 24.8 MB</div></div></div>
          <div class="files-row"><div class="files-thumb">JPG</div><div class="files-info"><div class="files-name">${q(normalName)}</div><div class="files-sub">今天 · 2.1 MB</div></div></div>
          <div class="files-row"><div class="files-thumb">PDF</div><div class="files-info"><div class="files-name">travel_policy.pdf</div><div class="files-sub">昨天 · 1.4 MB</div></div></div>
          <div class="files-row"><div class="files-thumb">XYZ</div><div class="files-info"><div class="files-name">mystery_file.xyz</div><div class="files-sub">昨天 · 842 KB</div></div></div>
        </div>
      </div>
      ${safari()}`;
  }

  function flightForm(mode = "filled") {
    const invalid = mode === "error";
    const search = mode === "search";
    const destination = mode === "destination";
    const alternate = mode === "alternate";
    return chrome(`
      <div class="html-scrim"></div>
      <div class="form-sheet">
        <div class="form-head">航班資訊<span class="sheet-x">×</span></div>
        <div class="form-body">
          <div class="field-row"><div class="field"><label>原定起飛日期</label><div class="fake-input${invalid ? " invalid" : ""}">${invalid ? "2026/03/40" : "2026/03/30"}</div></div><div class="field"><label>原定起飛時間</label><div class="fake-input${invalid ? " invalid" : ""}">${invalid ? "25:00" : "03:45"}</div></div></div>
          <div class="field"><label>出發地</label><div class="fake-input">杜拜國際機場 (DXB)</div></div>
          <div class="field"><label>目的地</label><div class="fake-input${destination ? "" : " muted"}">${alternate ? "高雄國際機場 (KHH)" : destination ? "台北" : "台灣桃園國際機場 (TPE)"}</div>${search ? `<div class="search-panel"><div class="search-row">台灣桃園國際機場<div class="search-code">TPE · 桃園</div></div><div class="search-row">臺北松山機場<div class="search-code">TSA · 台北</div></div><div class="search-row">高雄國際機場<div class="search-code">KHH · 高雄</div></div></div>` : ""}</div>
          <div class="field"><label>航班編號</label><div class="fake-input">EK-366</div></div>
          ${invalid ? `<div class="error-text">部分資料格式有誤，請確認後再送出。</div>` : ""}
        </div>
        <div class="form-footer"><div class="primary-cta">確認資訊</div></div>
      </div>`, { dim: true });
  }

  function reminder(copy, title = "阿發提醒你") {
    return chatScreen([
      chatRow(`<strong>${q(title)}</strong><br>${copy}`)
    ], ["返回繼續填寫"]);
  }

  function otpLike(state = "filled") {
    const isError = state === "error";
    const expired = state === "expired";
    const tooMany = state === "too-many";
    const code = state === "corrected" ? "123123" : state === "filled" || state === "complete" ? "123123" : "";
    if (expired) return dialog("動態密碼已失效", "這組動態密碼已超過有效時間，請重新發送後再試一次。", ["重新發送"]);
    if (tooMany) return dialog("嘗試次數已達上限", "為保障帳戶安全，請稍後再重新取得動態密碼。", ["我知道了"]);
    return dimSheet("動態密碼驗證", `
      <p style="margin:0 0 12px">動態密碼已發送至：<br>0963-****30<br>Cathay***@***il.com</p>
      <p class="info-text" style="margin:0 0 18px">動態密碼將在 5 分鐘後失效</p>
      <div style="font-size:14px;margin-bottom:7px">請輸入動態密碼</div>
      <div class="fake-input${isError ? " invalid" : ""}">${code || "請輸入動態密碼"}</div>
      ${isError ? `<div class="error-text">動態密碼錯誤，請重新輸入</div>` : ""}
      <div style="margin-top:16px;color:#555;font-size:14px"><span class="info-text">2:56</span> 後可以重新發送</div>
      <div style="margin-top:22px;color:#4f44c3;font-size:14px">ⓘ 收不到動態密碼簡訊？</div>
    `, `<div class="primary-cta">下一步</div>`, isError ? 218 : 248);
  }

  function successScreen() {
    return chrome(`<div class="success-card"><div class="success-icon">✓</div><h2>班機延誤理賠申請已送出</h2><p>案件編號：00910-HAC<br>目前狀態：等待審核<br>如需補件，我們將另行通知你。</p><div class="link-cta">查看理賠進度</div></div>`);
  }

  function memberCenter() {
    return `${statusBar()}<div class="member-page"><div class="member-top">‹ <span>會員中心</span></div><div class="member-content"><div class="member-card"><div class="member-title">班機延誤理賠</div><div class="member-status">等待審核</div><p style="font-size:14px;line-height:1.6;color:#666">案件編號 00910-HAC<br>你可以在這裡查看案件進度與補件通知。</p></div></div></div>${safari()}`;
  }

  function genericScreen(screen) {
    const label = screen.getAttribute("aria-label") || "Prototype 畫面";
    const actionLabels = Array.from(screen.querySelectorAll("button[aria-label]"))
      .map((button) => button.getAttribute("aria-label"))
      .filter(Boolean)
      .slice(0, 4);
    return chrome(`<div class="notice-panel"><h2>${q(label)}</h2><p>此畫面已改為 HTML/CSS 結構，不再使用整頁截圖。</p>${actionLabels.length ? `<div class="quick-actions">${actionLabels.map((a) => `<div class="quick-chip">${q(a)}</div>`).join("")}</div>` : ""}</div>`);
  }

  function render(screen) {
    const id = screen.id;

    if (id === "date-screen" || id === "selection-screen") return chrome(`<div class="html-scrim"></div>`, { dim: true });
    if (id === "ocr-confirm-screen") return chrome("");
    if (id === "s8-bank-initial-screen") return chrome(`<div class="html-scrim"></div><div class="sheet-surface" style="top:176px;height:540px"><div class="sheet-head">填寫匯款資料<span class="sheet-x">×</span></div></div>`, { dim: true });
    if (id === "s9-otp-initial-screen") return chrome(`<div class="html-scrim"></div>`, { dim: true });
    if (id === "s05-credit-notice-screen") return chrome(`<div class="html-scrim"></div><div class="sheet-surface" style="top:104px;height:612px"><div class="sheet-head">個資法告知事項<span class="sheet-x">×</span></div></div>`, { dim: true });

    if (id === "welcome-screen") {
      return chrome(`
        <div class="html-note-strip">ⓘ 本服務由生成式 AI 提供，請勿直接在聊天輸入框輸入敏感個資；流程中需要的資料請於指定表單填寫。</div>
        <div class="chat-stack" style="top:235px">
          ${chatRow("嗨！我是阿發 👋<br>可以協助你處理班機延誤相關服務。")}
          <div class="quick-actions"><div class="quick-chip">我想申請班機延誤理賠</div><div class="quick-chip">我想詢問班機延誤保險相關問題</div></div>
        </div>`, { back: false });
    }

    if (/^s01-(ai-notice|ai-statement|privacy|terms)-screen$/.test(id)) {
      const map = {
        "s01-ai-notice-screen": ["生成式 AI 服務告知", "阿發使用生成式 AI 協助整理資訊與引導流程。請依畫面指示操作，重要保險權益仍以正式保單與審核結果為準。"],
        "s01-ai-statement-screen": ["AI 使用聲明", "AI 回覆可能存在誤差，若涉及承保範圍、理賠資格或金額，仍以國泰產險正式審核結果為準。"],
        "s01-privacy-screen": ["隱私權聲明", "系統會依服務需求處理必要資料。請勿在一般聊天欄位輸入身分證字號、帳號等敏感資訊。"],
        "s01-terms-screen": ["服務條款", "使用本服務即表示你同意依服務流程提供必要資訊，並理解本 Prototype 僅用於測試。"]
      };
      const [title, copy] = map[id];
      return dimSheet(title, `<p style="margin:0">${q(copy)}</p>`, `<div class="primary-cta">我知道了</div>`, 156);
    }

    if (/^s01-alert-/.test(id)) return dialog("即將離開阿發", "你將前往外部頁面查看完整內容。", ["返回", "繼續"]);

    if (id === "s03-documents-screen") return chatScreen([
      chatRow("阿發提醒你～進行理賠申請前，請先準備以下資料：<br>• 登機證<br>• 本人匯款帳戶<br>• 延誤證明（視情況通知上傳）<br><br>一次僅能申請一個班機延誤案件。")
    ], ["開始申請", "加入國泰產險會員", "稍後再說"]);
    if (id === "s03-later-screen") return chatScreen([chatRow("沒問題，等你準備好資料後再回來申請就可以囉！")]);
    if (id === "s03-claim-input-screen") return chatScreen([chatRow("想詢問班機延誤的哪一個問題呢？你可以直接告訴我你的情況。")], ["班機延誤可以理賠嗎？", "我要申請理賠"]);
    if (id === "s03-intent-question-screen") return chatScreen([chatRow("請問你是想了解班機延誤的理賠資格，還是要直接開始申請呢？")], ["了解資格", "開始申請"]);
    if (id === "s03-other-claim-screen") return chatScreen([chatRow("你的情況可能需要使用其他理賠方式辦理。你可以前往國泰產險理賠頁面查看適合的申請管道。")], ["前往我要理賠"]);
    if (id === "s03-out-of-scope-screen") return chatScreen([chatRow("這個問題不在目前班機延誤理賠服務範圍內，我可以協助你回到班機延誤申請流程。")]);
    if (id === "s03-official-site-screen") return `${statusBar()}<div class="member-page"><div class="member-top">‹ <span>國泰產險｜我要理賠</span></div><div class="member-content"><div class="member-card"><div class="member-title">選擇理賠項目</div><p style="font-size:14px;color:#666;line-height:1.6">請依你的事故類型與保單內容選擇合適的理賠申請方式。</p><div class="primary-cta" style="width:100%;margin-top:14px">旅遊保險理賠</div></div></div></div>${safari()}`;
    if (id === "s02-login-screen") return chrome(`<div class="loading-state"><div><div class="spinner"></div><div class="loading-label">正在確認會員登入狀態...</div></div></div>`);

    if (id === "s05-consent-screen") return dimSheet("個資聲明", `<p style="margin:0 0 12px">為提供線上理賠服務，我們需要蒐集並使用本次申請所需的個人資料。</p><p style="margin:0;color:#666;font-size:13px">請詳閱個人資料保護法告知事項。完成閱讀後，點選「同意」繼續。</p>`, `<div class="primary-cta">同意</div>`, 384);
    if (id === "s05-not-consented-screen") return reminder("尚未同意個資聲明，因此無法繼續線上理賠申請。你可以返回閱讀並決定是否同意。", "尚未完成個資同意");

    if (id === "policy-reminder-screen") return reminder("你尚未選擇要申請的保單，因此無法繼續。請返回選擇一張保單。", "尚未選擇保單");

    if (id === "upload-screen") return uploadSheet({ title: "請上傳你的登機證" });
    if (id === "upload-source-screen") return actionSheet();
    if (id === "file-picker-screen") return filesApp(false);
    if (id === "upload-loading-screen") return uploadSheet({ title: "請上傳你的登機證", state: "loading" });
    if (id === "upload-valid-screen") return uploadSheet({ title: "請上傳你的登機證", state: "selected", file: "boarding_pass.jpg" });
    if (id === "upload-size-error-screen") return uploadSheet({ title: "請上傳你的登機證", state: "empty", error: "檔案大小超過 20 MB，請重新選擇檔案。" });
    if (id === "upload-format-error-screen") return uploadSheet({ title: "請上傳你的登機證", state: "empty", error: "不支援此檔案格式，請上傳 JPG、PNG 或 PDF。" });

    if (["date-missing-upload-screen","date-missing-valid-screen","upload-close-initial-screen","upload-close-selected-screen","date-close-empty-screen","date-close-partial-screen","date-close-complete-screen"].includes(id)) {
      return reminder("原航班的日期與時間尚未完成確認。請返回填寫後再繼續申請。", "航班資訊尚未完成");
    }

    if (id === "s7-data-error-screen") return chatScreen([chatRow("你提供的航班資訊有些地方需要再確認，我會帶你回到表單修正。")]);
    if (id === "s7-flight-filled-screen") return flightForm("filled");
    if (id === "s7-airport-results-screen") return flightForm("search");
    if (id === "s7-destination-input-screen") return flightForm("destination");
    if (id === "s7-flight-alternate-screen") return flightForm("alternate");
    if (id === "s7-validation-error-screen") return flightForm("error");
    if (id === "s7-close-result-screen") return reminder("航班資訊還沒有完成送出。你可以返回確認資訊，或繼續填寫航班資料。", "尚未完成航班資訊");
    if (id === "s7-compact-confirm-screen") return chatScreen([chatRow("航班資訊已確認，我們接著檢查是否需要補上傳班機延誤證明。")]);
    if (id === "s7-bank-prompt-screen") return chatScreen([chatRow("航班資訊已確認。接下來請填寫理賠匯款資料。")]);

    if (id === "s8-upload-initial-screen") return uploadSheet({ title: "請上傳班機延誤證明" });
    if (id === "s8-upload-loading-screen") return uploadSheet({ title: "請上傳班機延誤證明", state: "loading" });
    if (id === "s8-upload-selected-screen") return uploadSheet({ title: "請上傳班機延誤證明", state: "selected", file: "delay-certificate.jpg" });
    if (id === "s8-method-tip-screen") return uploadSheet({ title: "請上傳班機延誤證明", hint: "可向航空公司取得延誤證明後再回來上傳" });
    if (id === "s8-source-options-screen") return actionSheet();
    if (id === "s8-file-picker-screen") return filesApp(true);
    if (id === "s8-upload-size-screen") return uploadSheet({ title: "請上傳班機延誤證明", error: "檔案大小超過 20 MB，請重新上傳。" });
    if (id === "s8-upload-format-screen") return uploadSheet({ title: "請上傳班機延誤證明", error: "不支援此檔案格式，請重新上傳。" });
    if (id === "s8-upload-api-error-screen") return dialog("目前無法完成上傳", "系統暫時無法處理你的延誤證明。你可以稍後再試，或前往會員中心查看案件。", ["前往會員中心"]);
    if (id === "s8-recognition-error-a-screen") return dialog("無法辨識延誤證明", "目前上傳的文件可能不是班機延誤證明，請重新確認文件內容。", ["重新辨識"]);
    if (id === "s8-recognition-error-b-screen") return chrome(`<div class="loading-state"><div><div class="spinner"></div><div class="loading-label">重新辨識文件中...</div></div></div>`);
    if (id === "s8-confirm-compact-screen" || id === "s8-confirm-compact-selected-screen") return chatScreen([chatRow("已收到班機延誤證明，資料確認完成。接下來請填寫匯款資料。")]);

    if (id === "s8-account-picker-screen") return dimSheet("選擇匯款帳戶", `<div class="file-chip"><div class="file-icon">013</div><div class="file-meta"><div class="file-name">國泰世華銀行</div><div class="file-size">**** 1234</div></div></div><div class="file-chip" style="margin-top:10px"><div class="file-icon">812</div><div class="file-meta"><div class="file-name">台新銀行</div><div class="file-size">**** 5678</div></div></div>`, "", 420);
    if (id === "s8-bank-partial-screen") return dimSheet("填寫匯款資料", `<div class="field"><label>銀行代碼</label><div class="fake-input">013 國泰世華銀行</div></div><div class="field" style="margin-top:14px"><label>匯款帳號</label><div class="fake-input">****1234</div></div><div class="field" style="margin-top:14px"><label>再次確認匯款帳號</label><div class="fake-input muted">請再次輸入匯款帳號</div></div>`, `<div class="primary-cta">確認資訊</div>`, 146);
    if (id === "s8-bank-incomplete-screen") return reminder("匯款資料尚未填寫完整，請返回完成必要欄位。", "匯款資料未完成");
    if (id === "s8-bank-close-result-screen" || id === "s8-bank-close-result-partial-screen") return reminder("目前匯款資料尚未完成送出。你可以返回繼續填寫。", "尚未完成匯款資料");
    if (id === "s8-member-center-screen") return memberCenter();

    if (id === "s9-otp-filled-screen" || id === "s9-otp-complete-screen") return otpLike("filled");
    if (id === "s9-otp-error-screen") return otpLike("error");
    if (id === "s9-otp-corrected-screen") return otpLike("corrected");
    if (id === "s9-otp-too-many-screen") return otpLike("too-many");
    if (id === "s9-otp-expired-screen") return otpLike("expired");
    if (id === "s9-otp-resend-ready-screen") return otpLike("filled");
    if (id === "s9-otp-api-error-screen") return dialog("驗證服務暫時無法使用", "目前無法完成動態密碼驗證，請稍後再試或前往會員中心。", ["前往會員中心"]);
    if (["s9-close-result-a-screen","s9-close-result-b-screen","s9-close-result-c-screen"].includes(id)) return reminder("動態密碼驗證尚未完成。你可以返回繼續輸入驗證碼。", "驗證尚未完成");
    if (id === "s9-success-screen") return successScreen();

    if (/loading-screen$/.test(id)) return chrome(`<div class="loading-state"><div><div class="spinner"></div><div class="loading-label">處理中...</div></div></div>`);
    return genericScreen(screen);
  }

  function htmlize() {
    document.querySelectorAll(".screen").forEach((screen) => {
      const references = screen.querySelectorAll(":scope > .screen-reference");
      if (!references.length) return;
      const layer = document.createElement("div");
      layer.className = "htmlized-screen";
      layer.setAttribute("aria-hidden", "true");
      layer.innerHTML = render(screen);
      references[0].before(layer);
      references.forEach((reference) => reference.remove());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", htmlize, { once: true });
  } else {
    htmlize();
  }
})();
