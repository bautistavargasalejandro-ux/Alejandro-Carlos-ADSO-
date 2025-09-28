// ===== Configuración: true = abrir en nueva pestaña; false = en la misma página
const OPEN_IN_NEW_TAB = false;

// Referencia al contenedor
const main = document.getElementById('content');

// Lee ?section=... de la URL
function getSectionFromURL() {
  const params = new URLSearchParams(location.search);
  return params.get('section'); // ingreso | pacientes | citas | reportes
}

// Snippet de enlace para volver a la página principal
function backLinkHTML() {
  return `
    <p class="back-wrap text-center mt-3">
      <a class="back-link" href="index.html">← Volver al menú</a>
    </p>
  `;
}

// Toast helper
function showToast(message, type = 'success') {
  const id = 't' + Date.now();
  const icon = type === 'success' ? 'bi-check-circle' : (type === 'warning' ? 'bi-exclamation-triangle' : 'bi-info-circle');
  const bg = type === 'success' ? 'bg-success' : (type === 'warning' ? 'bg-warning text-dark' : 'bg-info');
  const html = `
    <div id="${id}" class="toast align-items-center text-white ${bg} border-0 mb-2" role="status" aria-live="polite" aria-atomic="true" data-bs-delay="2500">
      <div class="d-flex">
        <div class="toast-body"><i class="bi ${icon} me-2"></i>${message}</div>
        <button type="button" class="btn-close ${type==='warning' ? '' : 'btn-close-white'} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;
  const area = document.getElementById('toastArea');
  area.insertAdjacentHTML('beforeend', html);
  const toastEl = document.getElementById(id);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

document.addEventListener('DOMContentLoaded', () => {
  // Botones del menú en index
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      if (OPEN_IN_NEW_TAB) {
        window.open(`index.html?section=${encodeURIComponent(section)}`, '_blank');
      } else {
        mostrarSeccion(section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Render directo si llegamos con ?section=...
  const initial = getSectionFromURL();
  if (initial) mostrarSeccion(initial);
});

// Render de secciones
function mostrarSeccion(seccion) {
  if (!main) return;

  const titles = {
    ingreso: 'Ingreso',
    pacientes: 'Registro de Pacientes',
    citas: 'Gestión de Citas',
    reportes: 'Generación de Reportes'
  };
  if (titles[seccion]) document.title = `${titles[seccion]} — Hospital San Andrés`;

  let html = '';
  switch (seccion) {
    case 'ingreso':
      html = `
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-0 pb-0">
          <h2 class="h4 mb-0"><i class="bi bi-shield-lock me-2"></i>Ingreso</h2>
        </div>
        <div class="card-body pt-3">
          <form id="formIngreso" class="needs-validation" autocomplete="on" novalidate>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Usuario" required>
              <div class="invalid-feedback">Ingresa tu usuario.</div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input type="password" class="form-control" id="password" name="password" placeholder="Contraseña" required>
              <div class="invalid-feedback">Ingresa tu contraseña.</div>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary"><i class="bi bi-box-arrow-in-right me-1"></i>Ingresar</button>
            </div>
          </form>
          ${backLinkHTML()}
        </div>
      </div>
      `;
      break;

    case 'pacientes':
      html = `
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-0 pb-0">
          <h2 class="h4 mb-0"><i class="bi bi-person-vcard me-2"></i>Registro de Pacientes</h2>
        </div>
        <div class="card-body pt-3">
          <div class="p-3 rounded bg-brand-soft mb-3">
            Completa todos los campos obligatorios para guardar el paciente.
          </div>
          <form id="formPacientes" class="row g-3 needs-validation" autocomplete="on" novalidate>
            <div class="col-md-6 form-floating">
              <input type="text" class="form-control" id="nombrePaciente" name="nombre" placeholder="Nombre" required>
              <label for="nombrePaciente">Nombre</label>
              <div class="invalid-feedback">Ingresa el nombre.</div>
            </div>
            <div class="col-md-6 form-floating">
              <input type="text" class="form-control" id="documentoPaciente" name="documento" placeholder="Documento" required>
              <label for="documentoPaciente">Documento de Identidad</label>
              <div class="invalid-feedback">Ingresa el documento.</div>
            </div>
            <div class="col-md-6 form-floating">
              <input type="tel" class="form-control" id="telefonoPaciente" name="telefono" placeholder="Teléfono" required>
              <label for="telefonoPaciente">Teléfono</label>
              <div class="invalid-feedback">Ingresa el teléfono.</div>
            </div>
            <div class="col-md-6 form-floating">
              <input type="date" class="form-control" id="fechaNacimientoPaciente" name="fechaNacimiento" placeholder="aaaa-mm-dd" required>
              <label for="fechaNacimientoPaciente">Fecha de nacimiento</label>
              <div class="invalid-feedback">Selecciona la fecha de nacimiento.</div>
            </div>
            <div class="col-12 form-floating">
              <input type="email" class="form-control" id="correoPaciente" name="correo" placeholder="correo@ejemplo.com" required>
              <label for="correoPaciente">Correo electrónico</label>
              <div class="invalid-feedback">Ingresa un correo válido.</div>
            </div>
            <div class="col-12 d-grid">
              <button type="submit" class="btn btn-info"><i class="bi bi-person-check me-1"></i>Guardar Paciente</button>
            </div>
          </form>
          ${backLinkHTML()}
        </div>
      </div>
      `;
      break;

    case 'citas':
      html = `
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-0 pb-0">
          <h2 class="h4 mb-0"><i class="bi bi-calendar2-check me-2"></i>Gestión de Citas</h2>
        </div>
        <div class="card-body pt-3">
          <form id="formCitas" class="row g-3 needs-validation" autocomplete="on" novalidate>
            <div class="col-12 form-floating">
              <input type="text" class="form-control" id="nombreCita" name="nombreCita" placeholder="Nombre" required>
              <label for="nombreCita">Nombre del paciente</label>
              <div class="invalid-feedback">Ingresa el nombre.</div>
            </div>
            <div class="col-md-6 form-floating">
              <input type="date" class="form-control" id="fechaCita" name="fechaCita" placeholder="aaaa-mm-dd" required>
              <label for="fechaCita">Fecha</label>
              <div class="invalid-feedback">Selecciona una fecha válida.</div>
            </div>
            <div class="col-md-6 form-floating">
              <input type="time" class="form-control" id="horaCita" name="horaCita" placeholder="hh:mm" required>
              <label for="horaCita">Hora</label>
              <div class="invalid-feedback">Selecciona una hora válida.</div>
            </div>
            <div class="col-12 d-grid">
              <button type="submit" class="btn btn-success"><i class="bi bi-plus-circle me-1"></i>Generar Cita</button>
            </div>
          </form>
          ${backLinkHTML()}
        </div>
      </div>
      `;
      break;

    case 'reportes':
      html = `
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white border-0 pb-0">
          <h2 class="h4 mb-0"><i class="bi bi-bar-chart me-2"></i>Generación de Reportes</h2>
        </div>
        <div class="card-body pt-3">
          <form id="formReportes" class="row g-3 needs-validation" autocomplete="on" novalidate>
            <div class="col-md-6">
              <label for="tipoReporte" class="form-label">
                Tipo de Reporte
                <i class="bi bi-question-circle ms-1" data-bs-toggle="tooltip" title="Selecciona el reporte que deseas generar"></i>
              </label>
              <select id="tipoReporte" name="tipoReporte" class="form-select" required>
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="examenes">Exámenes de laboratorio</option>
                <option value="citas">Citas agendadas</option>
                <option value="ingresos">Ingresos hospitalarios</option>
              </select>
              <div class="invalid-feedback">Selecciona un tipo de reporte.</div>
            </div>
            <div class="col-md-3 form-floating">
              <input type="date" class="form-control" id="fechaInicio" name="fechaInicio" placeholder="aaaa-mm-dd" required>
              <label for="fechaInicio">Fecha inicio</label>
              <div class="invalid-feedback">Selecciona una fecha.</div>
            </div>
            <div class="col-md-3 form-floating">
              <input type="date" class="form-control" id="fechaFin" name="fechaFin" placeholder="aaaa-mm-dd" required>
              <label for="fechaFin">Fecha fin</label>
              <div class="invalid-feedback">Selecciona una fecha.</div>
            </div>
            <div class="col-12 d-grid">
              <button type="submit" class="btn btn-warning"><i class="bi bi-graph-up-arrow me-1"></i>Generar Reporte</button>
            </div>
          </form>
          ${backLinkHTML()}
        </div>
      </div>
      `;
      break;

    default:
      html = `
        <div class="text-center py-4 text-muted">
          <i class="bi bi-grid-3x3-gap display-6 d-block mb-2"></i>
          <p class="mb-0">Selecciona una opción del menú para comenzar.</p>
        </div>
      `;
  }

  main.innerHTML = html;
  attachHandlers(seccion);
}

// Spinners helper
function withButtonSpinner(btn, fn) {
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Procesando...';
  Promise.resolve(fn()).finally(() => {
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = original;
    }, 400);
  });
}

// Handlers de formularios (demo)
function attachHandlers(seccion) {
  if (seccion === 'ingreso') {
    const form = document.getElementById('formIngreso');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      withButtonSpinner(e.submitter, () => {
        showToast('Ingreso OK', 'success');
      });
    });
  }

  if (seccion === 'pacientes') {
    const form = document.getElementById('formPacientes');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      withButtonSpinner(e.submitter, () => {
        showToast('Paciente guardado', 'success');
        form.reset();
        form.classList.remove('was-validated');
      });
    });
  }

  if (seccion === 'citas') {
    const form = document.getElementById('formCitas');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      withButtonSpinner(e.submitter, () => {
        showToast('Cita generada', 'success');
        form.reset();
        form.classList.remove('was-validated');
      });
    });
  }

  if (seccion === 'reportes') {
    const form = document.getElementById('formReportes');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      const ini = form.fechaInicio.value, fin = form.fechaFin.value;
      if (ini && fin && ini > fin) {
        showToast('La fecha inicio no puede ser mayor a la fecha fin', 'warning');
        return;
      }
      withButtonSpinner(e.submitter, () => {
        showToast('Generando reporte…', 'info');
      });
    });
  }
}
