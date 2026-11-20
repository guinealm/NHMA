const pasos = document.querySelectorAll('#ciclo li');
const control = document.querySelector('#paso');
let actual = -1;
control.hidden = false;
control.addEventListener('click', () => {
  actual = (actual + 1) % pasos.length;
  pasos.forEach((paso, indice) => paso.classList.toggle('seleccionado', indice === actual));
  document.querySelector('#estado-ciclo').textContent = 'Paso ' + (actual + 1) + ' de 4. ' + pasos[actual].textContent;
  control.textContent = actual === 3 ? 'Volver al primer paso' : 'Siguiente paso';
});
