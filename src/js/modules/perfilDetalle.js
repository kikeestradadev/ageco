const fillList = (root, key, value) => {
	const list = root.querySelector(`[data-list="${key}"]`);
	if (!list || !Array.isArray(value)) return;

	list.innerHTML = '';

	value.forEach((entry) => {
		const li = document.createElement('li');

		if (entry && typeof entry === 'object') {
			li.className = 'rounded-md border border-[var(--border-soft)] bg-[var(--ageco-gray)] p-3 text-sm';
			li.innerHTML = `
				<p class="m-0 font-semibold">${entry.persona || ''}</p>
				<p class="m-0 text-[var(--ageco-gray-dark)]">${entry.tema || ''}</p>
				<time class="text-xs text-[var(--ageco-gray-dark)]">${entry.fecha || ''}</time>
			`;
		} else {
			li.textContent = String(entry);
		}

		list.appendChild(li);
	});
};

const perfilDetalle = () => {
	document.querySelectorAll('.perfil-detalle').forEach((root) => {
		if (root.dataset.perfilDetalleReady === 'true') return;

		const dataNode = root.querySelector('#perfil-data');
		if (!dataNode) return;

		let items = [];
		try {
			items = JSON.parse(dataNode.textContent || '[]');
		} catch {
			return;
		}

		const params = new URLSearchParams(window.location.search);
		const id = Number(params.get('id'));
		const item = items.find((entry) => Number(entry.id) === id) || items[0];
		if (!item) return;

		const pageRoot = root.closest('main') || document;

		Object.entries(item).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				fillList(pageRoot, key, value);
				return;
			}

			pageRoot.querySelectorAll(`[data-field="${key}"]`).forEach((el) => {
				el.textContent = String(value);
			});
		});

		const progressBar = pageRoot.querySelector('[data-field="progresoBar"]');
		if (progressBar && item.progreso != null) {
			progressBar.style.width = `${item.progreso}%`;
		}

		const title = pageRoot.querySelector('h1');
		if (title && item.nombre) {
			title.textContent = item.nombre;
		}

		root.dataset.perfilDetalleReady = 'true';
	});
};

export default perfilDetalle;
