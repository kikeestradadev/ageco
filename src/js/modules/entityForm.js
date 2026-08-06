import fakeBucket from './fakeBucket';

const errorClass =
	'border-[var(--ageco-red)] ring-2 ring-[color-mix(in_srgb,var(--ageco-red)_25%,transparent)]';

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const phoneOk = (value) => /^[\d\s()+-]{7,20}$/.test(value);

const clearErrors = (form) => {
	form.querySelectorAll('[data-field-error]').forEach((node) => node.remove());
	form.querySelectorAll('[name]').forEach((field) => {
		errorClass.split(' ').forEach((cls) => field.classList.remove(cls));
	});
	const alert = form.querySelector('[data-form-alert]');
	if (alert) alert.hidden = true;
};

const showFieldError = (field, message) => {
	errorClass.split(' ').forEach((cls) => field.classList.add(cls));
	const error = document.createElement('p');
	error.className = 'm-0 text-xs font-semibold text-[var(--ageco-red)]';
	error.dataset.fieldError = 'true';
	error.textContent = message;
	field.insertAdjacentElement('afterend', error);
};

const showAlert = (form, message, tone = 'error') => {
	let alert = form.querySelector('[data-form-alert]');
	if (!alert) {
		alert = document.createElement('div');
		alert.dataset.formAlert = 'true';
		form.prepend(alert);
	}

	alert.hidden = false;
	alert.textContent = message;
	alert.className =
		tone === 'success'
			? 'rounded-md border-l-4 border-[var(--sigo-green)] bg-[color-mix(in_srgb,var(--sigo-green)_12%,white)] p-3 text-sm text-[var(--sigo-green-alt)]'
			: 'rounded-md border-l-4 border-[var(--ageco-red)] bg-[color-mix(in_srgb,var(--ageco-red)_12%,white)] p-3 text-sm text-[var(--ageco-red-alt)]';
};

const readForm = (form) => {
	const data = {};
	const formData = new FormData(form);

	formData.forEach((value, key) => {
		data[key] = String(value);
	});

	// Lectura directa por name (más fiable que solo FormData en algunos navegadores).
	form.querySelectorAll('[name]').forEach((field) => {
		if (field.type === 'checkbox') return;
		if (field.disabled) return;
		data[field.name] = String(field.value ?? '');
	});

	form.querySelectorAll('input[type="checkbox"][name]').forEach((input) => {
		data[input.name] = input.checked ? 'Sí' : 'No';
	});

	return data;
};

const validators = {
	desempleados: (data) => {
		const errors = {};
		if (!data.nombre?.trim()) errors.nombre = 'El nombre es obligatorio.';
		if (!data.email?.trim()) errors.email = 'El correo es obligatorio.';
		else if (!emailOk(data.email.trim())) errors.email = 'Ingrese un correo válido.';
		if (!data.telefono?.trim()) errors.telefono = 'El teléfono es obligatorio.';
		else if (!phoneOk(data.telefono.trim())) errors.telefono = 'Ingrese un teléfono válido.';
		if (!data.fechaIngreso) errors.fechaIngreso = 'La fecha de ingreso es obligatoria.';
		if (!data.estado) errors.estado = 'Seleccione un estado.';
		return errors;
	},
	emprendedores: (data) => {
		const errors = {};
		if (!data.nombre?.trim()) errors.nombre = 'El nombre es obligatorio.';
		if (!data.negocio?.trim()) errors.negocio = 'El nombre del negocio es obligatorio.';
		if (!data.email?.trim()) errors.email = 'El correo es obligatorio.';
		else if (!emailOk(data.email.trim())) errors.email = 'Ingrese un correo válido.';
		if (!data.telefono?.trim()) errors.telefono = 'El teléfono es obligatorio.';
		else if (!phoneOk(data.telefono.trim())) errors.telefono = 'Ingrese un teléfono válido.';
		if (!data.fechaIngreso) errors.fechaIngreso = 'La fecha de ingreso es obligatoria.';
		if (!data.etapa) errors.etapa = 'Seleccione una etapa.';
		return errors;
	},
	voluntarios: (data) => {
		const errors = {};
		if (!data.nombre?.trim()) errors.nombre = 'El nombre es obligatorio.';
		if (!data.email?.trim()) errors.email = 'El correo es obligatorio.';
		else if (!emailOk(data.email.trim())) errors.email = 'Ingrese un correo válido.';
		if (!data.telefono?.trim()) errors.telefono = 'El teléfono es obligatorio.';
		else if (!phoneOk(data.telefono.trim())) errors.telefono = 'Ingrese un teléfono válido.';
		if (!data.tipo) errors.tipo = 'Seleccione un tipo.';
		if (data.horasTotales === '' || Number.isNaN(Number(data.horasTotales))) {
			errors.horasTotales = 'Indique las horas registradas.';
		} else if (Number(data.horasTotales) < 0) {
			errors.horasTotales = 'Las horas no pueden ser negativas.';
		}
		return errors;
	},
};

const builders = {
	desempleados: (data) => ({
		nombre: data.nombre.trim(),
		email: data.email.trim(),
		telefono: data.telefono.trim(),
		fechaIngreso: data.fechaIngreso,
		estado: data.estado || 'En seguimiento',
		progreso: data.estado === 'Con empleo' ? 100 : 10,
		experienciaLimpieza: data.experienciaLimpieza || 'No',
		manipulacionArmas: data.manipulacionArmas || 'No',
		servicioCliente: data.servicioCliente || 'No',
		nivelIngles: data.nivelIngles || 'Ninguno',
		licencia: data.licencia || 'No',
		capacitaciones: data.capacitacion ? [data.capacitacion] : ['Inducción Sigo Vigente'],
		asesorias: [],
		resultadosIntermedios: [],
		ultimaCapacitacion: data.capacitacion || 'Inducción Sigo Vigente',
		proximaAsesoria: data.proximaAsesoria || '—',
		voluntarioAsignado: data.voluntarioAsignado?.trim() || 'Sin asignar',
	}),
	emprendedores: (data) => ({
		nombre: data.nombre.trim(),
		email: data.email.trim(),
		telefono: data.telefono.trim(),
		fechaIngreso: data.fechaIngreso,
		estado: 'En seguimiento',
		etapa: data.etapa,
		negocio: data.negocio.trim(),
		progreso: 15,
		seguimientoAnios: 6,
		capacitaciones: data.capacitacion ? [data.capacitacion] : ['Inducción Emprendimiento'],
		asesorias: [],
		resultadosIntermedios: [],
		ultimaCapacitacion: data.capacitacion || 'Inducción Emprendimiento',
		proximaAsesoria: data.proximaAsesoria || '—',
		voluntarioAsignado: data.voluntarioAsignado?.trim() || 'Sin asignar',
	}),
	voluntarios: (data) => ({
		nombre: data.nombre.trim(),
		email: data.email.trim(),
		telefono: data.telefono.trim(),
		tipo: data.tipo,
		horasTotales: Number(data.horasTotales) || 0,
		estado: data.estado || 'Activo',
		asesorados: data.asesorados
			? data.asesorados
					.split(',')
					.map((value) => value.trim())
					.filter(Boolean)
			: [],
		historialAsesorias: [],
		capacitacionesImpartidas: data.capacitacion ? [data.capacitacion] : [],
	}),
};

const redirects = {
	desempleados: './desempleados.html',
	emprendedores: './emprendedores.html',
	voluntarios: './voluntarios.html',
};

const saveForm = async (form) => {
	const entity = form.dataset.entityForm;
	clearErrors(form);

	const raw = readForm(form);
	const errors = validators[entity](raw);
	const entries = Object.entries(errors);

	if (entries.length) {
		entries.forEach(([name, message]) => {
			const field = form.querySelector(`[name="${name}"]`);
			if (field) showFieldError(field, message);
		});
		showAlert(form, 'Revise los campos marcados antes de guardar.');
		return false;
	}

	const submitBtn = form.querySelector('[data-entity-save]');
	if (submitBtn) submitBtn.disabled = true;

	try {
		const record = builders[entity](raw);
		const saved = await fakeBucket.addItem(entity, record);

		sessionStorage.setItem(
			'ageco:lastAdded',
			JSON.stringify({
				entity,
				id: saved.id,
				nombre: saved.nombre,
				at: Date.now(),
			})
		);

		const mode = await fakeBucket.getMode();
		const where =
			mode === 'file' ? 'JSON en disco (src/data)' : 'bucket localStorage';
		showAlert(form, `Guardado en ${where}: ${saved.nombre}. Redirigiendo…`, 'success');

		window.setTimeout(() => {
			const url = new URL(redirects[entity], window.location.href);
			url.searchParams.set('nuevo', String(saved.id));
			url.searchParams.set('q', saved.nombre);
			window.location.replace(url.pathname + url.search);
		}, 250);

		return true;
	} catch (error) {
		if (submitBtn) submitBtn.disabled = false;
		showAlert(form, error.message || 'No se pudo guardar el registro en el bucket local.');
		return false;
	}
};

const entityForm = () => {
	document.querySelectorAll('[data-entity-form]').forEach((form) => {
		if (form.dataset.entityFormReady === 'true') return;

		const entity = form.dataset.entityForm;
		if (!validators[entity] || !builders[entity]) return;

		form.setAttribute('novalidate', 'true');
		// Evita POST nativo que pierde el guardado en el bucket.
		form.setAttribute('action', '#');
		form.setAttribute('method', 'get');

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			event.stopPropagation();
			saveForm(form);
		});

		const saveBtn = form.querySelector('[data-entity-save]');
		saveBtn?.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			saveForm(form);
		});

		form.dataset.entityFormReady = 'true';
	});
};

export default entityForm;
