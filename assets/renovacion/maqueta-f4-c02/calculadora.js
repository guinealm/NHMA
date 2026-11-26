/* Conserva el modelo de la calculadora original; valida el gasto antes de calcular. */
(() => {
  const delta = document.getElementById('delta');
  const factura = document.getElementById('factura');
  const formato = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const error = document.getElementById('calc-error');
  factura.setAttribute('aria-describedby', 'calc-error');
  function calcular() {
    const d = Number(delta.value);
    const gasto = factura.valueAsNumber;
    const valido = factura.value.trim() !== '' && Number.isFinite(gasto) && gasto >= 0;
    document.getElementById('deltaVal').textContent = formato.format(d);
    factura.setAttribute('aria-invalid', String(!valido));
    error.textContent = valido ? '' : 'Introduce un gasto anual válido, igual o mayor que cero.';
    const porcentaje = Math.abs(d) * 7;
    const etiqueta = d > 0 ? 'Aumento estimado' : d < 0 ? 'Ahorro estimado' : 'Sin cambio';
    document.getElementById('variacion').textContent = valido ? etiqueta : 'Variación estimada';
    document.getElementById('ahorroPct').textContent = valido ? formato.format(porcentaje) : '—';
    document.getElementById('ahorro€').textContent = valido ? (gasto * porcentaje / 100).toFixed(0) : '—';
  }
  for (const control of [delta, factura]) {
    control.addEventListener('input', calcular);
    control.addEventListener('change', calcular);
  }
  calcular();
})();
