const app = document.querySelector(".app");
const welcome = document.querySelector(".welcome");
const chatScreen = document.querySelector("#chat-screen");
const input = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-button");
const policyDialog = document.querySelector("#policy-dialog");
const policyTitle = document.querySelector("#dialog-title");
const policyCopy = document.querySelector("#dialog-copy");
const personalDataDialog = document.querySelector("#personal-data-dialog");
const personalDataCopy = document.querySelector("#personal-data-copy");
const personalDataAgree = document.querySelector("#personal-data-agree");
const scrollToAgree = document.querySelector("#scroll-to-agree");
const uploadDialog = document.querySelector("#upload-dialog");
const uploadTitle = document.querySelector("#upload-title");
const uploadFileInput = document.querySelector("#boarding-pass-input");
const uploadDropzone = document.querySelector("#upload-dropzone");
const uploadDropLabel = document.querySelector("#upload-drop-label");
const uploadFileList = document.querySelector("#upload-file-list");
const uploadError = document.querySelector("#upload-error");
const uploadConfirm = document.querySelector("#upload-confirm");
const uploadSourceMenu = document.querySelector("#upload-source-menu");
const uploadHelpWrap = document.querySelector("#upload-help-wrap");
const uploadHelpTrigger = document.querySelector("#upload-help-trigger");
const uploadHelpCopy = document.querySelector("#upload-help-copy");
const uploadNotes = document.querySelector("#upload-notes");
const uploadLoading = document.querySelector("#upload-loading");
const filePickerScreen = document.querySelector("#file-picker-screen");
const filePickerSearch = document.querySelector("#file-picker-search");
const filePickerList = document.querySelector("#file-picker-list");
const boardingInfoDialog = document.querySelector("#boarding-info-dialog");
const boardingInfoForm = document.querySelector("#boarding-info-form");
const confirmInfoButton = document.querySelector("#confirm-info");
const airportComboboxes = [...boardingInfoDialog.querySelectorAll("[data-airport]")];
const confirmDialog = document.querySelector("#confirm-dialog");
const confirmCopy = document.querySelector("#confirm-copy");
const confirmGo = document.querySelector("#confirm-go");
const officialClaimUrl = "https://www.cathay-ins.com.tw/cathayins/personal/claim/travel/";
const generalClaimUrl = "https://www.cathay-ins.com.tw/cathayins/personal/claim/";
let previousPolicyFocus = null;
let previousPersonalDataFocus = null;
let previousUploadFocus = null;
let selectedBoardingPass = null;
let selectedDelayProofFiles = [];
let uploadMode = "boarding-pass";
let networkErrorShown = false;
let uploadTimer = null;
let uploadFileSequence = 0;
const uploadLoadingDurationMs = 2800;

// Common commercial airports. Search supports IATA code, Traditional Chinese city,
// and English city/airport aliases; the first entries stay familiar in the menu.
const airportDirectory = `
TPE|桃園|Taipei Taoyuan
DXB|杜拜|Dubai
NRT|成田|Tokyo Narita
LAX|洛杉磯|Los Angeles
HND|東京羽田|Tokyo Haneda
KIX|大阪關西|Osaka Kansai
ICN|首爾仁川|Seoul Incheon
HKG|香港|Hong Kong
SIN|新加坡|Singapore
BKK|曼谷素萬那普|Bangkok Suvarnabhumi
TSA|台北松山|Taipei Songshan
KHH|高雄|Kaohsiung
RMQ|台中|Taichung
HUN|花蓮|Hualien
TTT|台東|Taitung
MZG|澎湖馬公|Penghu Magong
KNH|金門|Kinmen
LZN|馬祖南竿|Matsu Nangan
MFK|馬祖北竿|Matsu Beigan
CYI|嘉義|Chiayi
PIF|屏東|Pingtung
FUK|福岡|Fukuoka
CTS|札幌新千歲|Sapporo Chitose
OKA|沖繩那霸|Okinawa Naha
NGO|名古屋中部|Nagoya Chubu
ITM|大阪伊丹|Osaka Itami
SDJ|仙台|Sendai
HIJ|廣島|Hiroshima
KOJ|鹿兒島|Kagoshima
KMJ|熊本|Kumamoto
KMQ|小松|Komatsu
TAK|高松|Takamatsu
MYJ|松山|Matsuyama
AOJ|青森|Aomori
AKJ|旭川|Asahikawa
OIT|大分|Oita
ASJ|奄美|Amami
GMP|首爾金浦|Seoul Gimpo
PUS|釜山|Busan
CJU|濟州|Jeju
TAE|大邱|Daegu
CJJ|清州|Cheongju
PEK|北京首都|Beijing Capital
PKX|北京大興|Beijing Daxing
PVG|上海浦東|Shanghai Pudong
SHA|上海虹橋|Shanghai Hongqiao
CAN|廣州|Guangzhou
SZX|深圳|Shenzhen
CTU|成都雙流|Chengdu Shuangliu
TFU|成都天府|Chengdu Tianfu
HGH|杭州|Hangzhou
XMN|廈門|Xiamen
FOC|福州|Fuzhou
WUH|武漢|Wuhan
XIY|西安|Xi'an
NKG|南京|Nanjing
CKG|重慶|Chongqing
KMG|昆明|Kunming
SHE|瀋陽|Shenyang
DLC|大連|Dalian
HRB|哈爾濱|Harbin
TAO|青島|Qingdao
CSX|長沙|Changsha
NGB|寧波|Ningbo
WUX|無錫|Wuxi
TNA|濟南|Jinan
CGO|鄭州|Zhengzhou
URC|烏魯木齊|Urumqi
LHW|蘭州|Lanzhou
KWE|貴陽|Guiyang
YNT|煙台|Yantai
YIH|宜昌|Yichang
MFM|澳門|Macau
MNL|馬尼拉|Manila
CEB|宿霧|Cebu
CRK|克拉克|Clark
DMK|曼谷廊曼|Bangkok Don Mueang
HKT|普吉島|Phuket
CNX|清邁|Chiang Mai
USM|蘇梅島|Koh Samui
KUL|吉隆坡|Kuala Lumpur
PEN|檳城|Penang
BKI|亞庇|Kota Kinabalu
KCH|古晉|Kuching
LGK|蘭卡威|Langkawi
CGK|雅加達|Jakarta
DPS|峇里島|Bali Denpasar
SUB|泗水|Surabaya
KNO|棉蘭|Medan
UPG|望加錫|Makassar
SGN|胡志明市|Ho Chi Minh City
HAN|河內|Hanoi
DAD|峴港|Da Nang
CXR|芽莊金蘭|Nha Trang Cam Ranh
PQC|富國島|Phu Quoc
PNH|金邊|Phnom Penh
REP|暹粒|Siem Reap
VTE|永珍|Vientiane
LPQ|龍坡邦|Luang Prabang
RGN|仰光|Yangon
MDL|曼德勒|Mandalay
DAC|達卡|Dhaka
CGP|吉大港|Chattogram
KTM|加德滿都|Kathmandu
DEL|德里|Delhi
BOM|孟買|Mumbai
BLR|班加羅爾|Bengaluru
MAA|清奈|Chennai
HYD|海德拉巴|Hyderabad
CCU|加爾各答|Kolkata
GOI|果阿|Goa
CMB|可倫坡|Colombo
MLE|馬列|Male
KHI|喀拉蚩|Karachi
LHE|拉合爾|Lahore
ISB|伊斯蘭馬巴德|Islamabad
AUH|阿布達比|Abu Dhabi
DOH|杜哈|Doha
BAH|巴林|Bahrain
RUH|利雅德|Riyadh
JED|吉達|Jeddah
KWI|科威特|Kuwait City
MCT|馬斯開特|Muscat
AMM|安曼|Amman
TLV|特拉維夫|Tel Aviv
BEY|貝魯特|Beirut
CAI|開羅|Cairo
LHR|倫敦希斯洛|London Heathrow
LGW|倫敦蓋威克|London Gatwick
MAN|曼徹斯特|Manchester
EDI|愛丁堡|Edinburgh
CDG|巴黎戴高樂|Paris Charles de Gaulle
ORY|巴黎奧利|Paris Orly
AMS|阿姆斯特丹|Amsterdam
FRA|法蘭克福|Frankfurt
MUC|慕尼黑|Munich
BER|柏林|Berlin
DUS|杜塞道夫|Dusseldorf
ZRH|蘇黎世|Zurich
GVA|日內瓦|Geneva
VIE|維也納|Vienna
FCO|羅馬|Rome Fiumicino
MXP|米蘭|Milan Malpensa
MAD|馬德里|Madrid
BCN|巴塞隆納|Barcelona
LIS|里斯本|Lisbon
OPO|波多|Porto
ATH|雅典|Athens
IST|伊斯坦堡|Istanbul
SAW|伊斯坦堡薩比哈|Istanbul Sabiha
CPH|哥本哈根|Copenhagen
ARN|斯德哥爾摩|Stockholm
OSL|奧斯陸|Oslo
HEL|赫爾辛基|Helsinki
BRU|布魯塞爾|Brussels
PRG|布拉格|Prague
WAW|華沙|Warsaw
BUD|布達佩斯|Budapest
DUB|都柏林|Dublin
KEF|雷克雅維克|Reykjavik
OTP|布加勒斯特|Bucharest
SOF|索菲亞|Sofia
ZAG|札格瑞布|Zagreb
LJU|盧布爾雅那|Ljubljana
RIX|里加|Riga
VNO|維爾紐斯|Vilnius
TLL|塔林|Tallinn
JFK|紐約甘迺迪|New York JFK
EWR|紐華克|Newark
LGA|紐約拉瓜地亞|New York LaGuardia
BOS|波士頓|Boston
IAD|華盛頓杜勒斯|Washington Dulles
DCA|華盛頓雷根|Washington Reagan
ORD|芝加哥|Chicago O'Hare
ATL|亞特蘭大|Atlanta
MIA|邁阿密|Miami
MCO|奧蘭多|Orlando
LAS|拉斯維加斯|Las Vegas
DEN|丹佛|Denver
PHX|鳳凰城|Phoenix
IAH|休士頓|Houston
DFW|達拉斯|Dallas Fort Worth
MSP|明尼阿波利斯|Minneapolis
DTW|底特律|Detroit
PDX|波特蘭|Portland
SAN|聖地牙哥|San Diego
SFO|舊金山|San Francisco
SJC|聖荷西|San Jose
SEA|西雅圖|Seattle
YVR|溫哥華|Vancouver
YYZ|多倫多|Toronto
YUL|蒙特婁|Montreal
YOW|渥太華|Ottawa
MEX|墨西哥城|Mexico City
CUN|坎昆|Cancun
GRU|聖保羅|Sao Paulo
GIG|里約熱內盧|Rio de Janeiro
EZE|布宜諾斯艾利斯|Buenos Aires
SCL|聖地牙哥|Santiago Chile
LIM|利馬|Lima
BOG|波哥大|Bogota
SJO|聖荷西|San Jose Costa Rica
PTY|巴拿馬市|Panama City
SYD|雪梨|Sydney
MEL|墨爾本|Melbourne
BNE|布里斯本|Brisbane
PER|伯斯|Perth
ADL|阿德雷德|Adelaide
AKL|奧克蘭|Auckland
CHC|基督城|Christchurch
NAN|楠迪|Nadi
CPT|開普敦|Cape Town
JNB|約翰尼斯堡|Johannesburg
DUR|德班|Durban
NBO|奈洛比|Nairobi
ADD|阿迪斯阿貝巴|Addis Ababa
CMN|卡薩布蘭卡|Casablanca
LOS|拉各斯|Lagos
ACC|阿克拉|Accra
DAR|三蘭港|Dar es Salaam
`.trim().split("\n").map((entry) => {
  const [code, city, englishName] = entry.split("|");
  return { code, city, englishName };
}).sort((a, b) => a.code.localeCompare(b.code));

const policyParagraphs = [
  "本服務透過生成式人工智慧（Gen AI）系統之協助，可幫助您自本公司官方網站之公開資訊或本公司預先準備之常見問答集中，快速查詢本公司各項服務與產品資訊，並產出相應的回覆。",
  "為提供更精準的搜尋結果，請使用完整且清晰的句子描述您的需求，若提問描述不夠明確，本服務可能無法精準回覆，您可以嘗試重新表達需求，或聯繫本公司客服尋求協助。",
  "本服務生成之內容有其內在限制及與現實情況所存在之潛在落差，可能存在不完整、不準確或非預期之結果，且本服務所參考的相關資料可能有更新之時間差，故本公司提供之服務與產品相關資訊，仍以本公司官方網站所揭露之資訊為準。",
  "為保障個人資料安全，請勿在對話中輸入任何屬於您或他人的敏感性資料或隱私資訊（如：身分證字號、聯絡方式、帳務資訊等）。",
  "因生成式 AI 系統特性，本公司對同一用戶每日（00:00–23:59）可使用本服務業務詢問之次數設有上限。若達上限時，您將會收到系統提醒，且當日無法再於本服務中傳送其他訊息。",
];

const personalDataParagraphs = [
  "本公司蒐集您的個人資料後，依個人資料保護法之規定，您可以向本公司行使下列各項權利：",
  "(1) 查詢或請求閱覽您的個人資料",
  "(2) 請求製給您的個人資料複製本",
  "(3) 請求補充或更正您的個人資料",
  "(4) 請求停止蒐集、處理或利用您的個人資料",
  "(5) 請求刪除您的個人資料",
  "您可以至各服務中心或與本公司客服專線 (0800-212-880 ) 聯繫，本公司將儘速依相關法令規定，處理與回覆您的請求。",
  "個人資料保護法應告知事項",
  "親愛的客戶，您好：",
  "國泰世紀產物保險股份有限公司（以下稱本公司）依據個人資料保護法（以下稱個資法）第八條及第九條規定，向台端告知下列事項，請台端詳閱：",
  "一、 蒐集之目的：辦理財產保險(093)、人身保險(001)、行銷(040)及其他合於營業登記項目或組織章程所定之業務(181)。",
  "二、 蒐集之個人資料類別：包括但不限於姓名、身分證統一編號、聯絡方式、本網站瀏覽或查詢時伺服器自行產生的相關紀錄(包括但不限於您使用設備的 IP 位址、使用的瀏覽器、使用時間、瀏覽及點選資料紀錄等)等，詳如要保書或相關業務申請書內容。",
  "三、 個人資料之來源（個人資料非由當事人提供間接蒐集之情形適用）：",
  "(一) 要保人/被保險人/受益人",
  "(二) 司法警憲機關、委託協助處理理賠之公證人或機構",
  "(三) 當事人之法定代理人、輔助人",
  "(四) 各醫療院所",
  "(五) 與第三人共同行銷、交互運用客戶資料、合作推廣等關係、或於本公司各項業務內所委託往來之第三人。",
  "(六) 經當事人同意授權之同一金融控股公司所屬銀行子公司之網路銀行帳戶",
  "四、 個人資料利用之期間、對象、地區及方式：",
  "(一) 期間：因執行業務所必須及依法令規定應為保存之期間。",
  "(二) 對象：本(分)公司及本公司海外分支機構、中華民國產物保險商業同業公會、中華民國人壽保險商業同業公會、財團法人保險事業發展中心、財團法人保險安定基金、財團法人住宅地震保險基金、財團法人汽車交通事故特別補償基金、 財團法人保險犯罪防制中心、財團法人金融消費評議中心、財團法人金融聯合徵信中心、財團法人聯合信用卡中心、台灣票據交換所、財金資訊公司、關貿網路股份有限公司、中央健康保險局、業務委外機構、與本公司有再保業務往來之公司、 依法有調查權機關或金融監理機關。",
  "(三) 地區：上述對象所在之地區。",
  "(四) 方式：合於法令規定之利用方式。",
  "五、 依據個資法第三條規定，台端就本公司保有台端之個人資料得行使之權利及方式：",
  "(一) 得向本公司行使之權利：",
  "1. 向本公司查詢、請求閱覽或請求製給複製本。",
  "2. 向本公司請求補充或更正。",
  "3. 向本公司請求停止蒐集、處理或利用及請求刪除。",
  "(二) 行使權利之方式：書面或其他日後可供證明之方式。",
  "六、 台端不提供個人資料所致權益之影響：台端若未能提供相關個人資料時，本公司將可能延後或無法進行必要之審核及處理作業，因此可能婉謝承保、遲延或無法提供台端完善的保險服務(視業務性質)",
  "【註】",
  "1. 上開告知事項已公告於本公司官網，如有問題歡迎洽詢本公司 0800-212-880，免付費客服專線。",
  "2. 本告知事項內容若有更動，係以官網公告為準。",
];

function setScreen(showChat) {
  app.classList.toggle("is-chat", showChat);
  welcome.hidden = showChat;
  chatScreen.hidden = !showChat;
}

function keepChatHash() {
  if (window.location.hash !== "#chat") window.location.hash = "chat";
}

function makeAvatar() {
  const avatar = document.createElement("div");
  avatar.className = "assistant-avatar";
  avatar.setAttribute("role", "img");
  avatar.setAttribute("aria-label", "阿發");
  avatar.dataset.component = "img/Alpha/32x32";

  const face = document.createElement("img");
  face.className = "mascot-face";
  face.src = "assets/mascot-face.png";
  face.alt = "";
  avatar.append(face);

  const starPosition = document.createElement("span");
  starPosition.className = "avatar-star-position";
  starPosition.setAttribute("aria-hidden", "true");
  const starInset = document.createElement("span");
  starInset.className = "avatar-star-inset";
  const star = document.createElement("img");
  star.className = "mascot-star";
  star.src = "assets/mascot-star.svg";
  star.alt = "";
  starInset.append(star);
  starPosition.append(starInset);
  avatar.append(starPosition);
  return avatar;
}

function scrollChatToBottom() {
  requestAnimationFrame(() => { chatScreen.scrollTop = chatScreen.scrollHeight; });
}

function appendUserMessage(message) {
  const row = document.createElement("div");
  row.className = "chat-user-row";
  const bubble = document.createElement("div");
  bubble.className = "chat-user-bubble";
  bubble.textContent = message;
  const time = document.createElement("p");
  time.className = "chat-time";
  time.textContent = "10:07 PM 送出";
  row.append(bubble, time);
  chatScreen.append(row);
  scrollChatToBottom();
}

function appendAssistantSequence(items) {
  const row = document.createElement("div");
  row.className = "assistant-row";
  const column = document.createElement("div");
  column.className = "assistant-content";

  let lastBubble = null;
  items.forEach(({ content, card = false, className = "" }) => {
    const bubble = document.createElement("div");
    bubble.className = `${card ? "assistant-card" : "assistant-bubble"}${className ? ` ${className}` : ""}`;
    if (typeof content === "string") {
      const paragraph = document.createElement("p");
      paragraph.textContent = content;
      bubble.append(paragraph);
    } else {
      bubble.append(content);
    }
    column.append(bubble);
    lastBubble = bubble;
  });

  const meta = document.createElement("div");
  meta.className = "chat-meta";
  const time = document.createElement("p");
  time.className = "chat-time";
  time.textContent = "10:07 PM 送出";
  meta.append(time);
  column.append(meta);
  row.append(makeAvatar(), column);
  chatScreen.append(row);
  scrollChatToBottom();
  return { row, column, lastBubble };
}

function appendAssistantMessage(content, { card = false, className = "" } = {}) {
  return appendAssistantSequence([{ content, card, className }]);
}

function makeAction(label, action, { primary = false } = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `chat-action${primary ? " primary" : ""}`;
  button.textContent = label;
  button.dataset.chatAction = action;
  return button;
}

function appendDefaultConsultation() {
  appendUserMessage("我想詢問班機延誤相關問題");
  const answer = document.createElement("div");
  const intro = document.createElement("p");
  intro.textContent = "阿發為你整理常見問題：";
  const list = document.createElement("ol");
  [
    "班機延誤4小時以上，可以提出理賠申請。",
    "延誤時間會從「原訂起飛時間」開始計算，至實際搭乘的班機起飛為止。",
  ].forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  answer.append(intro, list);
  appendAssistantMessage(answer);
  appendAssistantMessage("你也可以直接描述你的班機延誤情況，阿發來為你解答～");
}

function startChat(prompt = "") {
  keepChatHash();
  setScreen(true);
  chatScreen.replaceChildren();
  if (!prompt) {
    appendDefaultConsultation();
    return;
  }
  appendUserMessage(prompt);
  replyTo(prompt);
}

function makeNumberedList(values, { lowerAlpha = false } = {}) {
  const list = document.createElement("ol");
  if (lowerAlpha) list.type = "a";
  values.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  return list;
}

function appendClaimDetails() {
  const details = document.createElement("div");
  const heading = document.createElement("p");
  heading.className = "claim-card-heading";
  heading.textContent = "班機延誤理賠注意事項";
  const list = document.createElement("ol");
  const applicability = document.createElement("li");
  applicability.append("本服務僅適用班機延誤後仍搭乘原航班。以下情況請改由產險官網或線下通路辦理：");
  applicability.append(makeNumberedList([
    "班機取消/改搭其他班機",
    "申請實支實付型",
    "錯過轉機航班",
    "同時申請其他理賠項目",
  ], { lowerAlpha: true }));
  list.append(applicability);
  [
    "限個人件，且要保人與被保險人須為同一人",
    "須為班機延誤發生後二年內提出",
    "須為國泰產險會員",
  ].forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  details.append(heading, list);

  const prep = document.createElement("div");
  const prepTitle = document.createElement("p");
  prepTitle.className = "prep-title";
  prepTitle.textContent = "申請前請準備：";
  const prepList = makeNumberedList(["登機證", "本人匯款帳戶", "班機延誤證明（視情況）"], { lowerAlpha: true });
  prepList.className = "prep-list";
  const actions = document.createElement("div");
  actions.className = "info-confirm-actions";
  actions.append(
    makeAction("確認申請", "claim-confirm"),
    makeAction("加入國泰產險會員", "claim-member"),
    makeAction("前往國泰產險官網", "claim-website"),
  );
  prep.append(prepTitle, prepList, actions);

  appendAssistantSequence([
    { content: details, className: "claim-details-bubble" },
    { content: prep, card: true, className: "info-confirm-card" },
  ]);
}

function appendApplicationPrep() {
  const content = document.createElement("div");
  const intro = document.createElement("p");
  intro.textContent = "阿發提醒你，申請理賠前請留意以下事項：";
  const list = document.createElement("ul");
  [
    "請先準備登機證；班機延誤證明視情況提供。",
    "僅限個人件，線上立案理賠申請之要保人與被保險人須為同一人。",
    "請於班機延誤發生後二年內提出申請。",
    "需為國泰產險認證會員。",
  ].forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  content.append(intro, list);
  const { column } = appendAssistantMessage(content);
  const actions = document.createElement("div");
  actions.className = "single-button-row";
  actions.append(
    makeAction("確認申請", "application-confirm"),
    makeAction("稍後再說", "application-later"),
  );
  column.insertBefore(actions, column.querySelector(".chat-meta"));
  scrollChatToBottom();
}

function beginPersonalDataConsent() {
  appendUserMessage("確認申請");
  appendAssistantMessage("請先同意個資聲明才能繼續流程喔。");
  showPersonalDataNotice();
}

function appendOtherClaimReply() {
  const reply = document.createElement("div");
  const paragraph = document.createElement("p");
  paragraph.textContent = "阿發目前可以幫你辦理班機延誤理賠！如需處理其他項目，可以前往網頁操作。";
  const link = document.createElement("a");
  link.className = "chat-link";
  link.textContent = "前往產險理賠頁 ↗";
  link.href = generalClaimUrl;
  link.target = "_blank";
  link.rel = "noopener";
  reply.append(paragraph, link);
  appendAssistantMessage(reply);
}

function appendAskClaimType() {
  appendAssistantMessage("好的，請問你想申請什麼理賠呢？");
}

function appendOutOfScopeReply() {
  const content = document.createElement("div");
  const first = document.createElement("p");
  first.textContent = "哇！你是想問怎麼樣才能寫出完美的使用手冊嗎？還是你想找什麼產品的使用手冊呀？🤔";
  const second = document.createElement("p");
  second.textContent = "阿發我主要是處理國泰產險班機延誤相關的問題啦，這個可能不在我的服務範圍喔～";
  content.append(first, second);
  appendAssistantMessage(content);
}

function appendConsultationReply() {
  const content = document.createElement("div");
  const p1 = document.createElement("p");
  p1.textContent = "班機延誤 4 小時以上，就有機會申請理賠喔！✈️";
  const p2 = document.createElement("p");
  p2.textContent = "延誤時間會從「原訂起飛時間」開始計算，到實際搭乘的班機起飛為止。";
  const p3 = document.createElement("p");
  p3.textContent = "例如：原訂 10:00 起飛，實際 14:00 起飛 → 延誤滿 4 小時，可能符合班機延誤保障。";
  content.append(p1, p2, p3);
  appendAssistantMessage(content);
}

function appendTimeoutReply() {
  const content = document.createElement("div");
  const p1 = document.createElement("p");
  p1.textContent = "不好意思，久未得到你的回覆，本次服務已結束。";
  const p2 = document.createElement("p");
  p2.textContent = "如還有班機延誤理賠申請相關問題，請點選下方連結，我就會再次出現！";
  const restart = document.createElement("button");
  restart.type = "button";
  restart.className = "chat-inline-action";
  restart.textContent = "重啟對話";
  restart.dataset.chatAction = "restart-chat";
  content.append(p1, p2, restart);
  appendAssistantMessage(content);
}

function replyTo(message) {
  const text = message.trim();
  if (/模擬逾時|久未回覆|服務已結束/.test(text)) {
    appendTimeoutReply();
    return;
  }
  if (/使用手冊|服務範圍|非服務|天氣|股價/.test(text)) {
    appendOutOfScopeReply();
    return;
  }
  if (/旅遊平(?:安)?險|其他理賠|其他項目/.test(text)) {
    appendOtherClaimReply();
    return;
  }
  if (/^我想申請[！!。.]?$/.test(text)) {
    appendApplicationPrep();
    return;
  }
  if (/申請/.test(text) && /理賠/.test(text) && !/班機|航班|延誤|旅遊平/.test(text)) {
    appendAskClaimType();
    return;
  }
  if (/申請|理賠/.test(text) && /班機|航班|延誤/.test(text)) {
    appendClaimDetails();
    return;
  }
  if (/班機|航班|延誤|理賠/.test(text)) {
    appendConsultationReply();
    return;
  }
  appendAssistantMessage("我目前是班機延誤服務的互動預覽。可以問我延誤理賠，或輸入「我想申請班機延誤的理賠」體驗申請說明。");
}

function showPolicy(title) {
  previousPolicyFocus = document.activeElement;
  policyTitle.textContent = title;
  policyCopy.replaceChildren();
  const list = document.createElement("ol");
  list.className = "policy-list";
  policyParagraphs.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  policyCopy.append(list);
  policyDialog.hidden = false;
  policyDialog.querySelector(".dialog-x").focus();
}

function closePolicy() {
  if (policyDialog.hidden) return;
  policyDialog.hidden = true;
  previousPolicyFocus?.focus();
}

function updatePersonalDataScrollState() {
  const reachedBottom = personalDataCopy.scrollTop + personalDataCopy.clientHeight >= personalDataCopy.scrollHeight - 4;
  personalDataAgree.disabled = !reachedBottom;
  scrollToAgree.hidden = reachedBottom;
}

function showPersonalDataNotice() {
  previousPersonalDataFocus = document.activeElement;
  personalDataCopy.replaceChildren();
  personalDataParagraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    personalDataCopy.append(paragraph);
  });
  personalDataCopy.scrollTop = 0;
  personalDataAgree.disabled = true;
  scrollToAgree.hidden = false;
  personalDataDialog.hidden = false;
  personalDataDialog.querySelector(".dialog-x").focus();
  requestAnimationFrame(updatePersonalDataScrollState);
}

function appendConsentDeclinedMessage() {
  const content = document.createElement("div");
  const message = document.createElement("p");
  message.textContent = "沒有點擊同意個資聲明，不能申請班機延誤理賠喔。";
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "chat-inline-action";
  retry.textContent = "返回查看個資聲明";
  retry.dataset.chatAction = "return-personal-data";
  content.append(message, retry);
  appendAssistantMessage(content);
  retry.focus({ preventScroll: true });
}

function closePersonalDataNotice({ agreed = false } = {}) {
  if (personalDataDialog.hidden) return;
  personalDataDialog.hidden = true;
  if (agreed) {
    previousPersonalDataFocus?.focus?.({ preventScroll: true });
    showUploadDialog();
    return;
  }
  appendConsentDeclinedMessage();
}

function setUploadNotes(lines) {
  uploadNotes.replaceChildren(...lines.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
}

function renderUploadFileItems() {
  uploadFileList.replaceChildren();
  const files = uploadMode === "delay-proof"
    ? selectedDelayProofFiles
    : selectedBoardingPass ? [{ id: "boarding-pass", name: selectedBoardingPass.name }] : [];

  files.forEach((file) => {
    const row = document.createElement("div");
    row.className = `upload-file-item${file.error ? " has-error" : ""}`;
    row.dataset.uploadFileId = file.id;
    const main = document.createElement("div");
    main.className = "upload-file-main";
    const name = document.createElement("span");
    name.className = "upload-file-name";
    name.textContent = file.name;
    const remove = document.createElement("button");
    remove.className = "upload-file-remove";
    remove.type = "button";
    remove.dataset.removeUploadFile = file.id;
    remove.setAttribute("aria-label", `移除 ${file.name}`);
    const icon = document.createElement("img");
    icon.src = "assets/file-delete.svg";
    icon.alt = "";
    remove.append(icon);
    main.append(name, remove);
    row.append(main);
    if (file.error) {
      const helper = document.createElement("p");
      helper.className = "upload-file-helper";
      helper.textContent = file.error;
      row.append(helper);
    }
    uploadFileList.append(row);
  });
}

function updateDelayProofControls() {
  const isUploading = selectedDelayProofFiles.some((file) => file.status === "uploading");
  uploadDropzone.hidden = selectedDelayProofFiles.length >= 3;
  uploadConfirm.disabled = !selectedDelayProofFiles.length
    || isUploading
    || selectedDelayProofFiles.some((file) => file.error);
  uploadConfirm.textContent = isUploading ? "上傳中，請稍後" : "確認上傳";
}

function showUploadDialog(mode = "boarding-pass", returnFocus = document.activeElement) {
  uploadMode = mode;
  previousUploadFocus = returnFocus;
  uploadSourceMenu.hidden = true;
  filePickerScreen.hidden = true;
  uploadLoading.hidden = true;
  window.clearTimeout(uploadTimer);
  selectedBoardingPass = null;
  selectedDelayProofFiles = [];
  networkErrorShown = false;
  uploadFileInput.value = "";
  uploadFileInput.multiple = mode === "delay-proof";
  uploadFileInput.accept = mode === "delay-proof"
    ? ".jpg,.jpeg,.png,.heic,.pdf,image/jpeg,image/png,image/heic,application/pdf"
    : ".jpg,.jpeg,.png,.heic,image/jpeg,image/png,image/heic";
  uploadFileInput.setAttribute("aria-label", mode === "delay-proof" ? "選擇班機延誤證明檔案" : "選擇登機證檔案");
  uploadFileInput.removeAttribute("capture");
  uploadTitle.textContent = mode === "delay-proof" ? "班機延誤證明上傳" : "登機證上傳";
  uploadDialog.querySelector(".upload-scrim").setAttribute("aria-label", mode === "delay-proof" ? "關閉班機延誤證明上傳" : "關閉登機證上傳");
  uploadDropLabel.textContent = mode === "delay-proof" ? "點擊上傳班機延誤證明" : "點擊上傳登機證";
  uploadHelpWrap.hidden = mode !== "delay-proof";
  uploadHelpCopy.hidden = true;
  uploadHelpTrigger.setAttribute("aria-expanded", "false");
  setUploadNotes(mode === "delay-proof"
    ? ["支援 JPG、JPEG、PNG、HEIC、PDF，單檔上限 10 MB", "最多上傳 3 張班機延誤證明"]
    : ["支援 JPG、JPEG、PNG、HEIC，單檔上限 10 MB", "如有 2 張（含）以上登機證或多段航班皆延誤，請由其他通路提出申請"]);
  uploadSourceMenu.querySelector("[role='dialog']").setAttribute("aria-label", mode === "delay-proof" ? "選擇班機延誤證明來源" : "選擇登機證來源");
  uploadDropzone.hidden = false;
  uploadFileList.replaceChildren();
  uploadError.hidden = true;
  uploadError.textContent = "";
  uploadConfirm.textContent = "確認上傳";
  uploadConfirm.disabled = true;
  uploadDialog.hidden = false;
  uploadDialog.querySelector(".dialog-x").focus();
}

function closeUploadDialog({ restoreFocus = true, showNoProof = true } = {}) {
  if (uploadDialog.hidden) return;
  const hasReadyProof = selectedDelayProofFiles.some((file) => !file.error && file.status === "ready");
  const shouldShowNoProof = showNoProof && uploadMode === "delay-proof" && !hasReadyProof;
  window.clearTimeout(uploadTimer);
  uploadLoading.hidden = true;
  uploadSourceMenu.hidden = true;
  filePickerScreen.hidden = true;
  uploadDialog.hidden = true;
  if (restoreFocus) {
    if (previousUploadFocus?.isConnected && !previousUploadFocus.closest("[hidden]")) previousUploadFocus.focus?.({ preventScroll: true });
    else input.focus({ preventScroll: true });
  }
  if (shouldShowNoProof) appendNoDelayProofMessage();
}

function showUploadSourceMenu() {
  uploadSourceMenu.hidden = false;
  uploadSourceMenu.querySelector('[data-upload-source="photos"]').focus();
}

function hideUploadSourceMenu() {
  uploadSourceMenu.hidden = true;
  uploadDropzone.focus({ preventScroll: true });
}

function showFilePicker() {
  uploadSourceMenu.hidden = true;
  filePickerSearch.value = "";
  filePickerList.querySelectorAll(".file-picker-row").forEach((row) => { row.hidden = false; });
  filePickerScreen.hidden = false;
  filePickerScreen.querySelector("[data-close-picker]").focus();
}

function hideFilePicker() {
  filePickerScreen.hidden = true;
  uploadDropzone.focus({ preventScroll: true });
}

function showUploadHelp() {
  const willOpen = uploadHelpCopy.hidden;
  uploadHelpCopy.hidden = !willOpen;
  uploadHelpTrigger.setAttribute("aria-expanded", String(willOpen));
}

function updateBoardingPass(file) {
  window.clearTimeout(uploadTimer);
  uploadLoading.hidden = true;
  selectedBoardingPass = null;
  uploadDropzone.hidden = false;
  uploadFileList.replaceChildren();
  uploadError.textContent = "";
  uploadError.hidden = true;
  uploadConfirm.disabled = true;
  uploadConfirm.textContent = "確認上傳";
  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();
  if (file.size > 10 * 1024 * 1024) {
    uploadFileInput.value = "";
    uploadDropLabel.textContent = "上傳登機證";
    uploadError.textContent = "檔案大小超過 10 MB，請重新上傳。";
    uploadError.hidden = false;
    return;
  }
  if (!["jpg", "jpeg", "png", "heic"].includes(extension)) {
    uploadFileInput.value = "";
    uploadDropLabel.textContent = "上傳登機證";
    uploadError.textContent = "檔案格式錯誤，請重新上傳。";
    uploadError.hidden = false;
    return;
  }

  selectedBoardingPass = file;
  renderUploadFileItems();
  uploadDropzone.hidden = true;
  uploadConfirm.disabled = true;
  uploadConfirm.textContent = "上傳中，請稍後";
  uploadLoading.hidden = false;
  uploadTimer = window.setTimeout(() => {
    uploadLoading.hidden = true;
    uploadConfirm.textContent = "確認上傳";
    uploadConfirm.disabled = false;
  }, uploadLoadingDurationMs);
}

function finishBoardingPassUpload() {
  if (!selectedBoardingPass || uploadConfirm.disabled) return;
  closeUploadDialog({ restoreFocus: false });
  boardingInfoDialog.hidden = false;
  boardingInfoForm.elements.passenger.focus({ preventScroll: true });
}

function addDelayProofFiles(files) {
  const incoming = [...files];
  if (!incoming.length) return;
  const availableSlots = Math.max(0, 3 - selectedDelayProofFiles.length);
  const acceptedFiles = incoming.slice(0, availableSlots);
  uploadError.hidden = true;
  uploadError.textContent = "";

  const addedUploadingIds = [];
  acceptedFiles.forEach((file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    const entry = {
      id: `proof-${++uploadFileSequence}`,
      file,
      name: file.name,
      size: file.size,
      outcome: file.outcome ?? null,
      status: "ready",
      error: "",
    };
    if (file.size > 10 * 1024 * 1024) {
      entry.error = "檔案大小超過 10 MB，請刪除後重新上傳。";
    } else if (!["jpg", "jpeg", "png", "heic", "pdf"].includes(extension)) {
      entry.error = "此檔案格式不支援，請刪除後重新上傳。";
    } else {
      entry.status = "uploading";
      addedUploadingIds.push(entry.id);
    }
    selectedDelayProofFiles.push(entry);
  });

  if (incoming.length > acceptedFiles.length) {
    uploadError.textContent = "最多上傳 3 張班機延誤證明。";
    uploadError.hidden = false;
  }
  renderUploadFileItems();
  updateDelayProofControls();
  uploadFileInput.value = "";

  if (addedUploadingIds.length) {
    uploadLoading.hidden = false;
    uploadTimer = window.setTimeout(() => {
      selectedDelayProofFiles.forEach((file) => {
        if (addedUploadingIds.includes(file.id) && file.status === "uploading") file.status = "ready";
      });
      uploadLoading.hidden = true;
      renderUploadFileItems();
      updateDelayProofControls();
    }, uploadLoadingDurationMs);
  }
}

function appendNoDelayProofMessage() {
  const content = document.createElement("div");
  const message = document.createElement("p");
  message.textContent = "沒有上傳班機延誤證明，不能申請班機延誤理賠喔。";
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "chat-inline-action";
  retry.textContent = "返回上傳班機延誤證明";
  retry.dataset.chatAction = "retry-delay-proof";
  content.append(message, retry);
  appendAssistantMessage(content);
  retry.focus({ preventScroll: true });
}

function appendDelayProofOutcome(outcome) {
  const content = document.createElement("div");
  const message = document.createElement("p");
  if (outcome === "recognition-error") {
    message.textContent = "你上傳的文件經辨識非航班班機延誤證明，請重新確認再上傳。";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "chat-inline-action";
    retry.textContent = "重新上傳";
    retry.dataset.chatAction = "retry-delay-proof";
    content.append(message, retry);
  } else if (outcome === "system-error") {
    message.textContent = "系統出現異常，建議你可以到會員中心使用理賠申請服務。";
    content.append(message, makeAction("前往會員中心", "claim-member"));
  } else {
    message.textContent = "班機延誤證明已上傳完成，謝謝你。";
    content.append(message);
  }
  appendAssistantMessage(content);
}

function finishDelayProofUpload() {
  if (uploadConfirm.disabled || !selectedDelayProofFiles.length) return;
  uploadError.hidden = true;
  const outcomes = selectedDelayProofFiles.map((file) => file.outcome);
  const outcome = outcomes.includes("system-error")
    ? "system-error"
    : outcomes.includes("recognition-error")
      ? "recognition-error"
      : outcomes.includes("network-error") ? "network-error" : "success";

  if (outcome === "network-error" && !networkErrorShown) {
    networkErrorShown = true;
    uploadError.textContent = "網路連線異常，請重新上傳。";
    uploadError.hidden = false;
    return;
  }

  uploadConfirm.disabled = true;
  uploadConfirm.textContent = "上傳中，請稍後";
  uploadLoading.hidden = false;
  uploadTimer = window.setTimeout(() => {
    uploadLoading.hidden = true;
    closeUploadDialog({ restoreFocus: false, showNoProof: false });
    appendUserMessage("上傳班機延誤證明");
    appendDelayProofOutcome(outcome === "network-error" ? "success" : outcome);
  }, uploadLoadingDurationMs);
}

function closeAirportCombobox(field, { restoreSelection = true } = {}) {
  if (!field?.classList.contains("is-open")) return;
  const input = field.querySelector(".airport-input");
  const results = field.querySelector(".airport-results");
  const icon = field.querySelector(".airport-state-icon img");
  if (restoreSelection) input.value = input.dataset.selectedValue ?? "";
  input.setCustomValidity("");
  input.placeholder = "";
  input.setAttribute("aria-expanded", "false");
  input.removeAttribute("aria-activedescendant");
  results.hidden = true;
  field.classList.remove("is-open");
  icon.src = "assets/Direction=down.svg";
}

function filterAirportOptions(field) {
  const input = field.querySelector(".airport-input");
  const options = [...field.querySelectorAll("[data-airport-option]")];
  const query = input.value.trim().toLocaleLowerCase("zh-Hant");
  const matches = options.filter((option) => {
    const searchableText = `${option.dataset.value} ${option.dataset.search} ${option.textContent}`.toLocaleLowerCase("zh-Hant");
    const isMatch = searchableText.includes(query);
    option.hidden = !isMatch;
    option.classList.remove("is-active");
    option.setAttribute("aria-selected", "false");
    return isMatch;
  });
  field.querySelector(".airport-empty").hidden = matches.length > 0;
  field.dataset.activeIndex = matches.length ? "0" : "-1";
  if (matches[0]) {
    matches[0].classList.add("is-active");
    input.setAttribute("aria-activedescendant", matches[0].id);
  } else {
    input.removeAttribute("aria-activedescendant");
  }
}

function openAirportCombobox(field) {
  if (!field || field.classList.contains("is-open")) return;
  airportComboboxes.forEach((other) => closeAirportCombobox(other));
  const input = field.querySelector(".airport-input");
  const results = field.querySelector(".airport-results");
  const icon = field.querySelector(".airport-state-icon img");
  input.dataset.selectedValue ??= input.value;
  input.value = "";
  input.placeholder = "搜尋機場";
  input.setCustomValidity("請從搜尋結果中選擇機場。");
  input.setAttribute("aria-expanded", "true");
  icon.src = "assets/airport-search.svg";
  field.classList.add("is-open");
  results.hidden = false;
  filterAirportOptions(field);

  requestAnimationFrame(() => {
    const scrollArea = field.closest(".boarding-info-fields");
    const overflow = results.getBoundingClientRect().bottom - scrollArea.getBoundingClientRect().bottom + 8;
    if (overflow > 0) scrollArea.scrollBy({ top: overflow, behavior: "smooth" });
  });
}

function chooseAirport(field, option) {
  if (!option) return;
  const input = field.querySelector(".airport-input");
  const shouldRestoreFocus = document.activeElement !== input;
  input.value = option.dataset.value;
  input.dataset.selectedValue = option.dataset.value;
  input.setCustomValidity("");
  closeAirportCombobox(field, { restoreSelection: false });
  if (shouldRestoreFocus) {
    input.dataset.keepSelectionOnFocus = "true";
    input.focus({ preventScroll: true });
  }
}

function moveAirportActiveOption(field, direction) {
  const input = field.querySelector(".airport-input");
  const visibleOptions = [...field.querySelectorAll("[data-airport-option]")].filter((option) => !option.hidden);
  if (!visibleOptions.length) return;
  const currentIndex = Number(field.dataset.activeIndex ?? -1);
  const nextIndex = (currentIndex + direction + visibleOptions.length) % visibleOptions.length;
  visibleOptions.forEach((option, index) => {
    const active = index === nextIndex;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-selected", String(active));
  });
  field.dataset.activeIndex = String(nextIndex);
  input.setAttribute("aria-activedescendant", visibleOptions[nextIndex].id);
  visibleOptions[nextIndex].scrollIntoView({ block: "nearest" });
}

function closeBoardingInfoDialog() {
  if (boardingInfoDialog.hidden) return;
  airportComboboxes.forEach((field) => closeAirportCombobox(field));
  boardingInfoDialog.hidden = true;
  appendUserMessage("確認申請");
  const content = document.createElement("div");
  const message = document.createElement("p");
  message.textContent = "沒有填寫原航班的資訊，不能申請班機延誤理賠喔。";
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "chat-inline-action";
  retry.textContent = "返回填寫航班資訊";
  retry.dataset.chatAction = "return-boarding-info";
  content.append(message, retry);
  appendAssistantMessage(content);
}

function selectSampleBoardingPass(type) {
  const samples = {
    pdf: { name: "登機證_大檔案.pdf", size: 12.4 * 1024 * 1024, type: "application/pdf" },
    zip: { name: "登機資料.zip", size: 684 * 1024, type: "application/zip" },
    png: { name: "登機證.png", size: 1.88 * 1024 * 1024, type: "image/png" },
    "proof-jpg": { name: "航班延誤證明.jpg", size: 2.16 * 1024 * 1024, type: "image/jpeg" },
    "proof-pdf": { name: "航空公司證明.pdf", size: 1.24 * 1024 * 1024, type: "application/pdf" },
    "network-error": { name: "連線異常測試.png", size: 1.42 * 1024 * 1024, type: "image/png", outcome: "network-error" },
    "recognition-error": { name: "辨識失敗測試.jpg", size: 1.36 * 1024 * 1024, type: "image/jpeg", outcome: "recognition-error" },
    "system-error": { name: "系統異常測試.png", size: 1.51 * 1024 * 1024, type: "image/png", outcome: "system-error" },
  };
  hideFilePicker();
  if (uploadMode === "delay-proof") addDelayProofFiles([samples[type]]);
  else updateBoardingPass(samples[type]);
}

function showOfficialConfirm(description = "您即將離開阿發，前往產險服務條款頁。", url = officialClaimUrl) {
  confirmCopy.textContent = description;
  confirmGo.href = url;
  confirmDialog.showModal();
}

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => startChat(button.dataset.prompt));
});

input.addEventListener("input", () => {
  sendButton.disabled = input.value.trim().length === 0;
});

document.querySelector("#composer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  if (/模擬逾時|久未回覆|服務已結束/.test(message)) {
    if (chatScreen.hidden) startChat();
    else appendTimeoutReply();
  } else if (chatScreen.hidden) startChat(message);
  else {
    appendUserMessage(message);
    replyTo(message);
  }
  input.value = "";
  sendButton.disabled = true;
  input.focus();
});

document.querySelectorAll("[data-policy]").forEach((button) => {
  button.addEventListener("click", () => showPolicy(button.dataset.policy));
});
policyDialog.querySelectorAll("[data-close-policy]").forEach((button) => button.addEventListener("click", closePolicy));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!filePickerScreen.hidden) hideFilePicker();
  else if (!uploadSourceMenu.hidden) hideUploadSourceMenu();
  else if (!uploadDialog.hidden) closeUploadDialog();
  else if (!boardingInfoDialog.hidden) closeBoardingInfoDialog();
  else if (!personalDataDialog.hidden) closePersonalDataNotice();
  else if (!policyDialog.hidden) closePolicy();
});
document.querySelector("#confirm-cancel").addEventListener("click", () => confirmDialog.close());

personalDataCopy.addEventListener("scroll", updatePersonalDataScrollState, { passive: true });
scrollToAgree.addEventListener("click", () => {
  personalDataCopy.scrollTo({ top: personalDataCopy.scrollHeight, behavior: "smooth" });
});
personalDataAgree.addEventListener("click", () => {
  if (personalDataAgree.disabled) return;
  closePersonalDataNotice({ agreed: true });
});
personalDataDialog.querySelectorAll("[data-close-personal-data]").forEach((button) => {
  button.addEventListener("click", () => closePersonalDataNotice());
});

uploadDialog.querySelectorAll("[data-close-upload]").forEach((button) => {
  button.addEventListener("click", () => closeUploadDialog());
});
uploadHelpTrigger.addEventListener("click", showUploadHelp);
uploadDropzone.addEventListener("click", showUploadSourceMenu);
uploadSourceMenu.querySelectorAll("[data-close-source]").forEach((button) => button.addEventListener("click", hideUploadSourceMenu));
uploadSourceMenu.querySelectorAll("[data-upload-source]").forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.dataset.uploadSource;
    if (source === "cancel") {
      hideUploadSourceMenu();
      return;
    }
    if (source === "files") {
      showFilePicker();
      return;
    }
    uploadSourceMenu.hidden = true;
    uploadFileInput.multiple = uploadMode === "delay-proof" && source !== "camera";
    uploadFileInput.accept = source === "photos"
      ? "image/*"
      : uploadMode === "delay-proof"
        ? ".jpg,.jpeg,.png,.heic,.pdf,image/*,application/pdf"
        : "image/*";
    if (source === "camera") uploadFileInput.setAttribute("capture", "environment");
    else uploadFileInput.removeAttribute("capture");
    uploadFileInput.click();
  });
});
filePickerScreen.querySelector("[data-close-picker]").addEventListener("click", hideFilePicker);
filePickerList.querySelectorAll("[data-sample-file]").forEach((button) => {
  button.addEventListener("click", () => selectSampleBoardingPass(button.dataset.sampleFile));
});
filePickerSearch.addEventListener("input", () => {
  const query = filePickerSearch.value.trim().toLowerCase();
  filePickerList.querySelectorAll(".file-picker-row").forEach((row) => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
});
document.querySelector("#file-picker-sort").addEventListener("click", (event) => {
  const rows = [...filePickerList.querySelectorAll(".file-picker-row")];
  const sortByName = event.currentTarget.dataset.sort === "recent";
  rows.forEach((row, index) => {
    if (row.dataset.recentOrder === undefined) row.dataset.recentOrder = String(index);
  });
  rows.sort((a, b) => sortByName
    ? a.querySelector(".file-picker-name").textContent.localeCompare(b.querySelector(".file-picker-name").textContent, "zh-Hant")
    : Number(a.dataset.recentOrder) - Number(b.dataset.recentOrder));
  rows.forEach((row) => filePickerList.append(row));
  event.currentTarget.dataset.sort = sortByName ? "name" : "recent";
  event.currentTarget.textContent = sortByName ? "日期" : "名稱";
});
uploadFileInput.addEventListener("change", () => {
  const files = [...(uploadFileInput.files ?? [])];
  if (uploadMode === "delay-proof") addDelayProofFiles(files);
  else updateBoardingPass(files[0] ?? null);
});
uploadFileList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-upload-file]");
  if (!button) return;
  if (uploadMode === "delay-proof") {
    selectedDelayProofFiles = selectedDelayProofFiles.filter((file) => file.id !== button.dataset.removeUploadFile);
    uploadError.hidden = true;
    uploadError.textContent = "";
    renderUploadFileItems();
    updateDelayProofControls();
  } else {
    uploadFileInput.value = "";
    updateBoardingPass(null);
  }
});
uploadConfirm.addEventListener("click", () => {
  if (uploadMode === "delay-proof") finishDelayProofUpload();
  else finishBoardingPassUpload();
});
uploadDropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadDropzone.classList.add("is-dragging");
});
uploadDropzone.addEventListener("dragleave", () => uploadDropzone.classList.remove("is-dragging"));
uploadDropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadDropzone.classList.remove("is-dragging");
  const files = [...(event.dataTransfer?.files ?? [])];
  if (!files.length) return;
  if (uploadMode === "delay-proof") addDelayProofFiles(files);
  else updateBoardingPass(files[0]);
});

airportComboboxes.forEach((field) => {
  const input = field.querySelector(".airport-input");
  input.dataset.selectedValue = input.value;
  input.addEventListener("focus", () => {
    if (input.dataset.keepSelectionOnFocus === "true") {
      delete input.dataset.keepSelectionOnFocus;
      return;
    }
    openAirportCombobox(field);
  });
  input.addEventListener("input", () => {
    if (field.classList.contains("is-open")) filterAirportOptions(field);
  });
  field.addEventListener("mousedown", (event) => {
    if (event.target.closest("[data-airport-option]")) event.preventDefault();
  });
  field.addEventListener("click", (event) => {
    const option = event.target.closest("[data-airport-option]");
    if (option) chooseAirport(field, option);
  });
  field.addEventListener("keydown", (event) => {
    if (event.target.closest("[data-airport-option]")) return;
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && field.classList.contains("is-open")) {
      event.preventDefault();
      moveAirportActiveOption(field, event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && field.classList.contains("is-open")) {
      const activeIndex = Number(field.dataset.activeIndex ?? -1);
      const options = [...field.querySelectorAll("[data-airport-option]")].filter((option) => !option.hidden);
      if (options.length === 1 || activeIndex >= 0) {
        event.preventDefault();
        chooseAirport(field, options[activeIndex >= 0 ? activeIndex : 0]);
      }
    } else if (event.key === "Escape" && field.classList.contains("is-open")) {
      event.preventDefault();
      event.stopPropagation();
      closeAirportCombobox(field);
      input.focus({ preventScroll: true });
    }
  });
  field.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!field.contains(document.activeElement)) closeAirportCombobox(field);
    }, 0);
  });
});

document.addEventListener("pointerdown", (event) => {
  airportComboboxes.forEach((field) => {
    if (!field.contains(event.target)) closeAirportCombobox(field);
  });
});

boardingInfoDialog.querySelectorAll("[data-close-info]").forEach((button) => button.addEventListener("click", closeBoardingInfoDialog));
boardingInfoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!boardingInfoForm.reportValidity()) return;
  confirmInfoButton.disabled = true;
  confirmInfoButton.textContent = "已確認資訊";
  airportComboboxes.forEach((field) => closeAirportCombobox(field));
  boardingInfoDialog.hidden = true;
  showUploadDialog("delay-proof", input);
});
boardingInfoForm.addEventListener("input", () => {
  if (!confirmInfoButton.disabled) return;
  confirmInfoButton.disabled = false;
  confirmInfoButton.textContent = "確認資訊";
});
boardingInfoForm.addEventListener("change", () => {
  if (!confirmInfoButton.disabled) return;
  confirmInfoButton.disabled = false;
  confirmInfoButton.textContent = "確認資訊";
});

chatScreen.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chat-action]");
  if (!button) return;
  switch (button.dataset.chatAction) {
    case "claim-confirm":
      beginPersonalDataConsent();
      break;
    case "application-confirm":
      beginPersonalDataConsent();
      break;
    case "application-later":
      appendUserMessage("稍後再說");
      appendAssistantMessage("好的，等你準備好再告訴我，我會接著協助你。");
      break;
    case "return-personal-data":
      showPersonalDataNotice();
      break;
    case "open-upload":
      showUploadDialog();
      break;
    case "retry-delay-proof":
      showUploadDialog("delay-proof");
      break;
    case "return-boarding-info":
      boardingInfoDialog.hidden = false;
      boardingInfoForm.elements.passenger.focus({ preventScroll: true });
      break;
    case "claim-member":
      showOfficialConfirm("你即將離開阿發，前往國泰產險官網。", "https://www.cathay-ins.com.tw/");
      break;
    case "claim-website":
      showOfficialConfirm("你即將離開阿發，前往產險服務條款頁。", officialClaimUrl);
      break;
    case "restart-chat":
      startChat();
      break;
  }
});

confirmDialog.addEventListener("click", (event) => {
  if (event.target === confirmDialog) confirmDialog.close();
});

window.addEventListener("hashchange", () => {
  const showChat = window.location.hash === "#chat";
  setScreen(showChat);
  if (showChat && chatScreen.childElementCount === 0) appendDefaultConsultation();
});

if (window.location.hash === "#chat") {
  try {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  } catch {
    window.location.hash = "";
  }
}
setScreen(false);

airportComboboxes.forEach((field) => {
  const input = field.querySelector(".airport-input");
  const results = field.querySelector(".airport-results");
  const options = document.createDocumentFragment();
  airportDirectory.forEach(({ code, city, englishName }, index) => {
    const option = document.createElement("button");
    option.className = "airport-option";
    option.type = "button";
    option.id = `${input.id}-option-${index}`;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.dataset.airportOption = "";
    option.dataset.value = code;
    option.dataset.search = `${code} ${city} ${englishName}`;
    option.textContent = `${code} ${city}`;
    options.append(option);
  });
  const otherOption = document.createElement("button");
  otherOption.className = "airport-option";
  otherOption.type = "button";
  otherOption.id = `${input.id}-option-other`;
  otherOption.setAttribute("role", "option");
  otherOption.setAttribute("aria-selected", "false");
  otherOption.dataset.airportOption = "";
  otherOption.dataset.value = "其他";
  otherOption.dataset.search = "其他 other";
  otherOption.textContent = "其他";
  options.append(otherOption);
  results.prepend(options);
});
