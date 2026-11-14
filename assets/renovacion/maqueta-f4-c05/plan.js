
(function(){
  const chips = document.querySelectorAll('.chip');
  const motivoMsg = document.getElementById('motivo-msg');
  const accionesEl = document.getElementById('acciones');
  const puntosEl = document.getElementById('puntos');
  const nivelEl = document.getElementById('nivel');
  const pills = document.getElementById('pills');
  const btnDescargar = document.getElementById('btnDescargar');
  const btnReset = document.getElementById('btnReset');

  const LS_KEY = 'pagina5_plan_v1';

  const status = document.getElementById('storage-status');
  const cards = [...accionesEl.querySelectorAll('.card')];
  function emptyState(){
    return {motivo:null, checks:Object.fromEntries(cards.map(c=>[c.dataset.id,[...c.querySelectorAll('input.ck')].map(()=>false)]))};
  }
  let state = emptyState();
  try {
    const raw = localStorage.getItem(LS_KEY);
    if(raw !== null){
      const saved = JSON.parse(raw);
      if(!saved || typeof saved !== 'object' || Array.isArray(saved) || !saved.checks || typeof saved.checks !== 'object' || Array.isArray(saved.checks)) throw Error('Formato no válido');
      const motives = [...chips].map(c=>c.dataset.motivo);
      state.motivo = motives.includes(saved.motivo) ? saved.motivo : null;
      for(const card of cards){
        const id=card.dataset.id;
        const arr=Array.isArray(saved.checks[id])?saved.checks[id]:[];
        state.checks[id]=state.checks[id].map((_,i)=>arr[i]===true);
      }
      const adjusted = JSON.stringify(saved)!==JSON.stringify(state);
      status.textContent = adjusted ? 'Datos guardados incompletos o no válidos: se muestran solo selecciones reconocidas. No se sobrescriben hasta que edites el plan.' : 'Plan recuperado de este navegador. Revisa los textos actualizados antes de descargarlo.';
    }else status.textContent='Guardado automático local disponible; todavía no hay selecciones guardadas.';
  }catch(e){
    status.textContent='No se pudo leer un plan válido. Puedes usar y descargar el plan de esta sesión; al editar se intentará guardar.';
  }

  // Motivos
  chips.forEach(ch => {
    const m = ch.dataset.motivo;
    if(state.motivo===m) ch.setAttribute('aria-pressed','true');
    ch.addEventListener('click', () => {
      chips.forEach(x=>x.setAttribute('aria-pressed','false'));
      ch.setAttribute('aria-pressed','true');
      state.motivo = m;
      motivoMsg.textContent = mensajesMotivo(m);
      persist();
      renderPlan();
    });
  });
  if(state.motivo){ motivoMsg.textContent = mensajesMotivo(state.motivo); }

  function mensajesMotivo(m){
    const map = {
      familia: 'Objetivo familia: casas más frescas, aire limpio y tiempo juntos.',
      salud: 'Motivo salud: elegir opciones compatibles con tus necesidades y reducir exposición a riesgos.',
      ahorro: 'Motivo ahorro: valorar costes y alternativas disponibles; no se garantiza ahorro económico.',
      naturaleza: 'Objetivo naturaleza: protege ríos, árboles y la fauna cercana.',
      futuro: 'Objetivo futuro: dejar un lugar habitable para quien viene detrás.'
    };
    return map[m] || '(Opcional) Toca un motivo: lo usaremos para personalizar tu plan.';
  }

  // Acciones y checkboxes
  accionesEl.querySelectorAll('.card').forEach(card =>{
    const id = card.dataset.id;
    const peso = parseInt(card.dataset.peso || '1',10);
    const cks = card.querySelectorAll('input.ck');
    if(!state.checks[id]) state.checks[id] = Array.from({length:cks.length},()=>false);
    // hidratar
    cks.forEach((ck,i)=>{ ck.checked = !!state.checks[id][i]; });
    // eventos
    cks.forEach((ck,i)=>{
      ck.addEventListener('change',()=>{
        state.checks[id][i] = ck.checked;
        persist();
        computeImpact();
        renderPlan();
      });
    });
    // guarda peso para cómputo
    card.dataset.pesoval = peso;
  });

  function computeImpact(){
    let puntos = 0;
    accionesEl.querySelectorAll('.card').forEach(card =>{
      const id = card.dataset.id;
      const peso = parseInt(card.dataset.pesoval,10);
      const anyChecked = (state.checks[id]||[]).some(Boolean);
      if(anyChecked) puntos += peso;
    });
    puntosEl.textContent = String(puntos);
    let nivel = '—';
    let cls = '';
    if(puntos >= 6){ nivel = 'Alto'; cls='tag high'; }
    else if(puntos >= 3){ nivel = 'Medio'; cls='tag med'; }
    else if(puntos > 0){ nivel = 'Bajo'; cls='tag low'; }
    else { cls='tag'; }
    nivelEl.textContent = 'Tramo del marcador: ' + nivel;
    nivelEl.className = cls;
  }

  function renderPlan(){
    pills.innerHTML = '';
    const frag = document.createDocumentFragment();
    const entries = Object.entries(state.checks);
    entries.forEach(([id,arr])=>{
      const card = document.querySelector(`.card[data-id="${id}"]`);
      const titulo = card ? card.querySelector('h3').textContent : id;
      arr.forEach((v,idx)=>{
        if(v){
          const labelEl = card.querySelectorAll('label')[idx];
          const text = labelEl ? labelEl.textContent.trim() : 'Acción';
          const pill = document.createElement('div');
          pill.className = 'pill';
          pill.textContent = text;
          frag.appendChild(pill);
        }
      });
    });
    if(!frag.childNodes.length){
      const p = document.createElement('p');
      p.className='muted';
      p.textContent = 'Aún no has marcado ninguna acción.';
      pills.appendChild(p);
    }else{
      pills.appendChild(frag);
    }
    computeImpact();
  }

  function persist(){
    try{ localStorage.setItem(LS_KEY, JSON.stringify(state)); status.textContent='Plan guardado en este navegador.'; }catch(e){ status.textContent='No se pudo guardar. Tus selecciones siguen en esta sesión: descarga el plan antes de cerrar o recargar.'; }
  }

  function descargar(){
    // compone texto del plan
    const fecha = new Date().toLocaleString();
    let txt = '# Mi plan personal (borrador)\n\n';
    txt += `Fecha: ${fecha}\n`;
    if(state.motivo) txt += `Motivo principal: ${state.motivo}\n`;
    txt += '\nAcciones seleccionadas:\n';
    let count=0;
    Object.entries(state.checks).forEach(([id,arr])=>{
      const card = document.querySelector(`.card[data-id="${id}"]`);
      const section = card ? card.querySelector('h3').textContent : id;
      arr.forEach((v,idx)=>{
        if(v){
          const labelEl = card.querySelectorAll('label')[idx];
          const text = labelEl ? labelEl.textContent.trim() : 'Acción';
          count++;
          txt += ` - [ ] ${section}: ${text}\n`;
        }
      });
    });
    if(!count) txt += ' (ninguna todavía)\n';
    txt += `\nMarcador del prototipo (no mide emisiones ni ahorro): ${puntosEl.textContent}\n`;
    txt += '\nPropuesta C05 v0.1, revisión 13/11/2026. Selecciones como intenciones, no acciones acreditadas. Pesos por grupo 3/3/2/2/1; no se suman ahorros ni CO2.\n';
    txt += '\nRecordatorio personal (escribe aquí): __________________________\n';
    const blob = new Blob([txt],{type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'mi-plan-clima.txt';
    a.click(); setTimeout(()=>URL.revokeObjectURL(url),5000);
  }

  btnDescargar.addEventListener('click', descargar);
  btnReset.addEventListener('click', ()=>{
    try{ localStorage.removeItem(LS_KEY); status.textContent='Plan reiniciado y copia local eliminada.'; }catch(e){ status.textContent='Plan reiniciado en esta sesión. No se pudo borrar la copia guardada; podría reaparecer al recargar.'; }
    state=emptyState();
    // desmarcar UI
    document.querySelectorAll('input.ck').forEach(ck=>ck.checked=false);
    chips.forEach(x=>x.setAttribute('aria-pressed','false'));
    motivoMsg.textContent = '(Opcional) Toca un motivo: lo usaremos para personalizar tu plan.';
    renderPlan();
  });

  // Primera renderización
  renderPlan();
})();
