(() => {
  const notice = '當您傳送訊息，即表示同意「AI告知聲明」。本服務由AI提供，內容僅供參考，實際資訊仍以國泰產險官網公告為準。';

  function normalizeMessageBars(root = document) {
    root.querySelectorAll('.wf-message-note,.s3-message-note').forEach((el) => {
      if (el.textContent !== notice) el.textContent = notice;
    });
  }

  function resetBankScroll(root = document) {
    root.querySelectorAll('[data-s8f-bank-scroll]').forEach((scroller) => {
      scroller.scrollTop = 0;
    });
    root.querySelectorAll('[data-s8f-bank-thumb]').forEach((thumb) => {
      thumb.style.transform = 'translateY(0px)';
    });
  }

  function normalize(root = document) {
    normalizeMessageBars(root);
  }

  function init() {
    normalize();
    resetBankScroll();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          normalize(node);
          if (node.matches('.s8f-bank-layer') || node.querySelector('.s8f-bank-layer')) {
            requestAnimationFrame(() => resetBankScroll(node));
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('click', (event) => {
      const route = event.target.closest('[data-route]')?.getAttribute('data-route') || '';
      const bankAction = event.target.closest('[data-s8f-bank-action]')?.getAttribute('data-s8f-bank-action') || '';
      if (route.startsWith('s8-bank') || bankAction === 'code' || bankAction === 'confirm') {
        requestAnimationFrame(() => requestAnimationFrame(resetBankScroll));
      }
    }, true);

    window.addEventListener('popstate', () => requestAnimationFrame(resetBankScroll));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
