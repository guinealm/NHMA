<script>

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.breadcrumb[data-bc]').forEach(nav => {
    const raw = nav.getAttribute('data-bc');
    if (!raw) return;
    try {
      // Asegura que no hay espacios raros
      const items = JSON.parse(raw.trim());
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'miga de pan');

      const html = items.map((it, i) => {
        const [label, href] = it;
        const isLast = i === items.length - 1;
        if (!isLast && href) return `<a href="${href}">${label}</a>`;
        return `<span aria-current="page">${label}</span>`;
      }).join('<span class="sep">›</span>');

      nav.innerHTML = html;
    } catch (e) {
      console.warn('Breadcrumb: data-bc inválido →', raw, e);
    }
  });
});

</script>
