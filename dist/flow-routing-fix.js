(() => {
  function navigate(hash) {
    history.pushState({ route: hash.replace(/^#/, '') }, '', hash);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  }

  const HOME_SELECTOR = '.wf-home, .home-bar, .s6-files-home';

  function removeDuplicateHomeIndicators(root = document) {
    root.querySelectorAll('.screen').forEach((screen) => {
      const indicators = Array.from(screen.querySelectorAll(HOME_SELECTOR));
      if (indicators.length <= 1) return;

      // Keep the screen's intended native indicator. File picker uses its own home bar;
      // all chatbot screens use the shared wf-home. Legacy home-bar is fallback only.
      const keep = screen.querySelector('.s6-files-home') ||
        screen.querySelector('.htmlized-screen .wf-home') ||
        screen.querySelector('.wf-home') ||
        screen.querySelector('.home-bar') ||
        indicators[0];

      indicators.forEach((indicator) => {
        if (indicator !== keep) indicator.remove();
      });
    });

    // Clean up any legacy indicator mounted directly under the phone shell rather than
    // inside a screen. These are stale DOM nodes and are removed, not hidden.
    root.querySelectorAll('.phone > .wf-home, .phone > .home-bar, .phone > .s6-files-home').forEach((indicator) => {
      const visibleScreen = root.querySelector('.screen:not([hidden])');
      if (visibleScreen?.querySelector(HOME_SELECTOR)) indicator.remove();
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, [data-goto], [data-s5-action], [data-s6-action]');
    if (!target) return;

    if (
      target.matches('[data-s5-action="agree"]') ||
      target.matches('#s05-consent-screen > [data-goto="date-entry"]')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      navigate('#policy-selection');
      return;
    }

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
    removeDuplicateHomeIndicators();

    const observer = new MutationObserver(() => removeDuplicateHomeIndicators());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
