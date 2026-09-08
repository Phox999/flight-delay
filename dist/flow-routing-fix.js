(() => {
  function navigate(hash) {
    history.pushState({ route: hash.replace(/^#/, '') }, '', hash);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  }

  function dedupeHomeIndicators(root = document) {
    root.querySelectorAll('.s3-device, .s5-device, .s6-device, .s6o-device, .s9f-root').forEach((device) => {
      const indicators = Array.from(device.querySelectorAll('.wf-home, .home-bar'));
      indicators.forEach((indicator, index) => {
        if (index > 0) indicator.remove();
      });
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, [data-goto], [data-s5-action], [data-s6-action]');
    if (!target) return;

    // Consent must go to policy selection first. The old route incorrectly jumped
    // directly into the date flow.
    if (
      target.matches('[data-s5-action="agree"]') ||
      target.matches('#s05-consent-screen > [data-goto="date-entry"]')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      navigate('#policy-selection');
      return;
    }

    // After a policy is selected, continue to the rebuilt date/time sheet.
    // The legacy handler used to skip this and jump straight to boarding-pass upload.
    if (
      target.matches('[data-s6-action="policy-confirm"]') ||
      target.matches('#selection-screen #confirm-button')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      navigate('#date-entry');
      return;
    }
  }, true);

  function start() {
    dedupeHomeIndicators();
    const observer = new MutationObserver(() => dedupeHomeIndicators());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
