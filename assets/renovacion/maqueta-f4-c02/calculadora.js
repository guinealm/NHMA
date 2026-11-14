/* Conserva el modelo de la calculadora original; valida el gasto antes de calcular. */
(() => {
  const delta = document.getElementById('delta');
  const factura = document.getElementById('factura');
  const modo = document.getElementById('modo');
  const error = document.getElementById('calc-error');
  factura.setAttribute('aria-describedby', 'calc-error');
  function calcular() {
    const d = Number(delta.value);
    const gasto = factura.valueAsNumber;
    const valido = factura.value.trim() !== '' && Number.isFinite(gasto) && gasto >= 0;
    document.getElementById('deltaVal').textContent = d.toFixed(1);
    factura.setAttribute('aria-invalid', String(!valido));
    error.textContent = valido ? '' : 'Introduce un gasto anual válido, igual o mayor que cero.';
    const porcentaje = Math.max(0, (modo.value === 'invierno' ? -d : d) * 7);
    document.getElementById('ahorroPct').textContent = valido ? porcentaje.toFixed(1) : '—';
    document.getElementById('ahorro€').textContent = valido ? (gasto * porcentaje / 100).toFixed(0) : '—';
  }
  for (const control of [delta, factura, modo]) {
    control.addEventListener('input', calcular);
    control.addEventListener('change', calcular);
  }
  calcular();
})();
