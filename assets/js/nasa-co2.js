const co2Video = document.getElementById('nasa-co2');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let startedByHover = false;

co2Video.addEventListener('pointerenter', (event) => {
  if (event.pointerType !== 'mouse' || reducedMotion.matches || !co2Video.paused) return;
  startedByHover = true;
  co2Video.play().catch(() => {
    // Native controls remain available when autoplay is blocked.
  });
});

function pauseHoverPlayback() {
  if (!startedByHover) return;
  startedByHover = false;
  co2Video.pause();
}

co2Video.addEventListener('pointerleave', pauseHoverPlayback);
reducedMotion.addEventListener('change', pauseHoverPlayback);
