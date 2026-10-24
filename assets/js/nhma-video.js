const albedoVideo = document.querySelector('#video-albedo');

if (albedoVideo && /^https?:$/.test(window.location.protocol)) {
  const frame = albedoVideo.querySelector('iframe[data-src]');
  const fallback = albedoVideo.querySelector('.graficos-video-fallback');
  frame.src = frame.dataset.src;
  frame.hidden = false;
  fallback.hidden = true;
}
