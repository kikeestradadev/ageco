import fakeBucket from './fakeBucket';
import dataTable from './dataTable';

const badge = (label, tone) => {
	const tones = {
		success:
			'inline-flex items-center rounded-full bg-[var(--sigo-green)] px-3 py-1 text-xs font-semibold text-white',
		danger:
			'inline-flex items-center rounded-full bg-[var(--ageco-red)] px-3 py-1 text-xs font-semibold text-white',
		neutral:
			'inline-flex items-center rounded-full bg-[var(--ageco-gray-dark)] px-3 py-1 text-xs font-semibold text-white',
		outline:
			'inline-flex items-center rounded-full border border-[var(--sigo-green)] bg-white px-3 py-1 text-xs font-semibold text-[var(--sigo-green)]',
		warning:
			'inline-flex items-center rounded-full bg-[var(--ageco-amber)] px-3 py-1 text-xs font-semibold text-white',
		info: 'inline-flex items-center rounded-full bg-[var(--ageco-info)] px-3 py-1 text-xs font-semibold text-white',
	};
	return `<span class="${tones[tone] || tones.neutral}">${label}</span>`;
};

const escapeHtml = (value) =>
	String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');

const escapeAttr = (value) =>
	String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');

const searchBlob = (item) =>
	[
		item.id,
		item.nombre,
		item.email,
		item.telefono,
		item.estado,
		item.etapa,
		item.tipo,
		item.negocio,
		item.ultimaCapacitacion,
		item.proximaAsesoria,
		item.fechaIngreso,
		item.horasTotales,
		...(item.capacitaciones || []),
		...(item.asesorados || []),
	]
		.filter((value) => value !== undefined && value !== null && value !== '')
		.join(' ');

const rowClass = (item) => {
	const base =
		'border-t border-[var(--border-soft)] bg-white transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--ageco-gray)]';
	return item.esNuevo
		? `${base} border-l-4 border-l-[var(--sigo-green)] bg-[color-mix(in_srgb,var(--sigo-green)_8%,white)]`
		: base;
};

const renderers = {
	desempleados: (item) => {
		const estadoTone =
			item.estado === 'En seguimiento'
				? 'success'
				: item.estado === 'Con empleo'
					? 'info'
					: 'danger';
		return `
			<tr class="${rowClass(item)}" data-row-id="${item.id}" data-search="${escapeAttr(searchBlob(item))}">
				<td class="px-4 py-3 whitespace-nowrap">
					<a class="font-semibold text-[var(--ageco-red)] no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline" href="./desempleado-perfil.html?id=${item.id}">${escapeHtml(item.nombre)}</a>
					${item.esNuevo ? '<span class="ml-2 text-[10px] font-bold uppercase tracking-wide text-[var(--sigo-green)]">Nuevo</span>' : ''}
				</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.fechaIngreso)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${badge(item.estado, estadoTone)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.ultimaCapacitacion)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.proximaAsesoria)}</td>
			</tr>
		`;
	},
	emprendedores: (item) => `
		<tr class="${rowClass(item)}" data-row-id="${item.id}" data-search="${escapeAttr(searchBlob(item))}">
			<td class="px-4 py-3 whitespace-nowrap">
				<a class="font-semibold text-[var(--ageco-red)] no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline" href="./emprendedor-perfil.html?id=${item.id}">${escapeHtml(item.nombre)}</a>
				${item.esNuevo ? '<span class="ml-2 text-[10px] font-bold uppercase tracking-wide text-[var(--sigo-green)]">Nuevo</span>' : ''}
			</td>
			<td class="px-4 py-3">${escapeHtml(item.negocio)}</td>
			<td class="px-4 py-3 whitespace-nowrap">${badge(item.etapa, 'warning')}</td>
			<td class="px-4 py-3 whitespace-nowrap">${badge(item.estado, 'success')}</td>
			<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.proximaAsesoria)}</td>
		</tr>
	`,
	voluntarios: (item) => {
		const estadoTone = item.estado === 'Activo' ? 'success' : 'danger';
		return `
			<tr class="${rowClass(item)}" data-row-id="${item.id}" data-search="${escapeAttr(searchBlob(item))}">
				<td class="px-4 py-3 whitespace-nowrap">
					<a class="font-semibold text-[var(--ageco-red)] no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline" href="./voluntario-perfil.html?id=${item.id}">${escapeHtml(item.nombre)}</a>
					${item.esNuevo ? '<span class="ml-2 text-[10px] font-bold uppercase tracking-wide text-[var(--sigo-green)]">Nuevo</span>' : ''}
				</td>
				<td class="px-4 py-3 whitespace-nowrap">${badge(item.tipo, 'outline')}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml(item.horasTotales)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${escapeHtml((item.asesorados || []).length)}</td>
				<td class="px-4 py-3 whitespace-nowrap">${badge(item.estado, estadoTone)}</td>
			</tr>
		`;
	},
};

const reinitDataTable = (root) => {
	root.dataset.dataTableReady = 'false';
	root.querySelector('[data-data-table-pagination]')?.remove();
	dataTable();
};

const readPendingFilter = (entity) => {
	const params = new URLSearchParams(window.location.search);
	const queryParam = params.get('q') || '';
	const nuevoId = params.get('nuevo');

	let pending = null;
	try {
		pending = JSON.parse(localStorage.getItem('ageco:pendingFilter') || 'null');
	} catch {
		pending = null;
	}

	let session = null;
	try {
		session = JSON.parse(sessionStorage.getItem('ageco:lastAdded') || 'null');
	} catch {
		session = null;
	}

	const fromPending = pending?.entity === entity ? pending : null;
	const fromSession = session?.entity === entity ? session : null;
	const payload = fromPending || fromSession;

	if (fromPending) {
		try {
			localStorage.removeItem('ageco:pendingFilter');
		} catch {
			/* ignore */
		}
	}
	if (fromSession) {
		sessionStorage.removeItem('ageco:lastAdded');
	}

	if (payload) {
		return {
			id: payload.id,
			nombre: payload.nombre,
			query: queryParam || payload.nombre || '',
		};
	}

	if (nuevoId || queryParam) {
		return {
			id: nuevoId,
			nombre: queryParam,
			query: queryParam,
		};
	}

	return null;
};

const showBucketBanner = async (entity, items, focus) => {
	const host =
		document.querySelector('[data-entity-banner-host]') ||
		document.querySelector('[data-entity-count]')?.parentElement;
	if (!host) return;

	host.querySelector('[data-entity-banner]')?.remove();

	const mode = await fakeBucket.getMode();
	const newest = items.find((item) => item.esNuevo) || items[0];
	const focusName = focus?.nombre || newest?.nombre;
	const focusId = focus?.id || newest?.id;

	const modeLabel =
		mode === 'file'
			? 'Modo archivo: los registros se escriben en <code class="rounded bg-white/70 px-1">src/data/*-data.json</code>.'
			: 'Modo localStorage (sin API): típico en GitHub Pages.';

	const banner = document.createElement('div');
	banner.dataset.entityBanner = 'true';
	banner.className =
		'mb-4 rounded-md border-l-4 border-[var(--sigo-green)] bg-[color-mix(in_srgb,var(--sigo-green)_12%,white)] p-3 text-sm text-[var(--sigo-green-alt)]';
	banner.innerHTML = `
		<strong>Bucket listo.</strong> ${modeLabel}
		${
			focusName
				? ` Último registro: <strong>${escapeHtml(focusName)}</strong> (id ${escapeHtml(focusId)}). Aparece primero con etiqueta <em>Nuevo</em>.`
				: ''
		}
	`;
	host.prepend(banner);
};

const applySearchQuery = (root, query) => {
	const search = root.querySelector('[data-data-table-search]');
	if (!search || !query) return;

	search.value = query;
	if (typeof root._dataTableApplyFilter === 'function') {
		root._dataTableApplyFilter();
		return;
	}
	search.dispatchEvent(new Event('input', { bubbles: true }));
	search.dispatchEvent(new Event('keyup', { bubbles: true }));
};

const hydrateList = async (root) => {
	const entity = root.dataset.entityList;
	const renderer = renderers[entity];
	const tbody = root.querySelector('tbody');
	if (!renderer || !tbody) return;

	const items = await fakeBucket.getItems(entity);
	// Nuevos primero (id alto / esNuevo), luego el resto por id descendente.
	items.sort((a, b) => {
		const newDelta = Number(Boolean(b.esNuevo)) - Number(Boolean(a.esNuevo));
		if (newDelta !== 0) return newDelta;
		return Number(b.id) - Number(a.id);
	});

	tbody.innerHTML = items.map((item) => renderer(item)).join('');

	const mode = await fakeBucket.getMode();
	const countHint = document.querySelector('[data-entity-count]');
	if (countHint) {
		countHint.textContent =
			mode === 'file'
				? `${items.length} registros (JSON en disco)`
				: `${items.length} registros (bucket local)`;
	}

	const focus = readPendingFilter(entity);
	await showBucketBanner(entity, items, focus);
	reinitDataTable(root);

	const query = focus?.query || focus?.nombre || '';
	// Doble pase: el filtro a veces se aplica antes de que el input tenga valor en algunos navegadores.
	applySearchQuery(root, query);
	window.requestAnimationFrame(() => applySearchQuery(root, query));
};

const bindReset = () => {
	document.querySelectorAll('[data-entity-reset]').forEach((button) => {
		if (button.dataset.entityResetReady === 'true') return;

		button.addEventListener('click', async () => {
			const entity = button.dataset.entityReset;
			const confirmed = window.confirm(
				'¿Restaurar los datos de demostración? Se perderán los registros agregados en este navegador.'
			);
			if (!confirmed) return;

			await fakeBucket.resetCollection(entity);
			const list = document.querySelector(`[data-entity-list="${entity}"]`);
			if (list) {
				list.dataset.entityListReady = 'false';
				await hydrateList(list);
				list.dataset.entityListReady = 'true';
			} else {
				window.location.reload();
			}
		});

		button.dataset.entityResetReady = 'true';
	});
};

const entityList = async () => {
	bindReset();

	const lists = [...document.querySelectorAll('[data-entity-list]')];
	if (!lists.length) return;

	await Promise.all(
		lists.map(async (root) => {
			if (root.dataset.entityListReady === 'true') return;
			try {
				await hydrateList(root);
				root.dataset.entityListReady = 'true';
			} catch (error) {
				console.error(error);
				const host = document.querySelector('[data-entity-banner-host]');
				if (host) {
					host.insertAdjacentHTML(
						'afterbegin',
						`<div class="mb-4 rounded-md border-l-4 border-[var(--ageco-red)] bg-[color-mix(in_srgb,var(--ageco-red)_12%,white)] p-3 text-sm text-[var(--ageco-red-alt)]">No se pudo cargar el bucket local: ${escapeHtml(error.message)}</div>`
					);
				}
			}
		})
	);
};

export default entityList;
