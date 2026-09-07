(() => {
  function apply() {
    const screen = document.getElementById('selection-screen');
    if (!screen) return;
    screen.addEventListener('click', (event) => {
      const button = event.target.closest('.htmlized-screen [data-s6-policy]');
      if (!button) return;
      const index = Number(button.dataset.s6Policy || 0);
      const legacyCards = Array.from(screen.querySelectorAll('.policy-card')).filter((card) => !card.closest('.htmlized-screen'));
      if (legacyCards[index]) legacyCards[index].click();
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
})();
