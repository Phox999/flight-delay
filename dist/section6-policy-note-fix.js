(() => {
  function mount() {
    const screen = document.getElementById('selection-screen');
    if (!screen || screen.dataset.policyNoteFixMounted === 'true') return;
    screen.dataset.policyNoteFixMounted = 'true';

    screen.addEventListener('click', (event) => {
      const note = event.target.closest('.htmlized-screen .s6-policy-note');
      if (note) {
        event.preventDefault();
        event.stopImmediatePropagation();
        let tooltip = screen.querySelector('.s6-policy-tooltip');
        if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.className = 's6-policy-tooltip';
          tooltip.setAttribute('role', 'status');
          tooltip.innerHTML = '<button type="button" class="s6-policy-tooltip-close" aria-label="關閉說明"></button><p>查詢不到保單，可能原因如下：</p><ol><li>會員註冊資料與保單資料不符</li><li>保單的要/被保險人為不同人</li><li>保單已過期超過兩年</li></ol><p>若有問題請洽客服或業務員。</p>';
          screen.querySelector('.htmlized-screen')?.appendChild(tooltip);
        }
        return;
      }

      const close = event.target.closest('.s6-policy-tooltip-close');
      if (close) {
        event.preventDefault();
        event.stopImmediatePropagation();
        close.closest('.s6-policy-tooltip')?.remove();
      }
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once:true });
  else mount();
})();
