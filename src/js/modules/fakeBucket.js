const COLLECTIONS = {
	desempleados: {
		seedUrl: './data/desempleados-data.json',
		apiUrl: './api/bucket/desempleados',
	},
	emprendedores: {
		seedUrl: './data/emprendedores-data.json',
		apiUrl: './api/bucket/emprendedores',
	},
	voluntarios: {
		seedUrl: './data/voluntarios-data.json',
		apiUrl: './api/bucket/voluntarios',
	},
};

const STORAGE_PREFIX = 'ageco:bucket:';

const memory = {
	desempleados: null,
	emprendedores: null,
	voluntarios: null,
};

let apiMode = null;

const clone = (value) => JSON.parse(JSON.stringify(value));

const clearLocalBucket = (name) => {
	try {
		localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
		localStorage.removeItem('ageco:pendingFilter');
	} catch {
		/* ignore */
	}
};

const setPendingFilter = (entity, record) => {
	try {
		localStorage.setItem(
			'ageco:pendingFilter',
			JSON.stringify({
				entity,
				id: record.id,
				nombre: record.nombre,
				at: Date.now(),
			})
		);
		sessionStorage.setItem(
			'ageco:lastAdded',
			JSON.stringify({
				entity,
				id: record.id,
				nombre: record.nombre,
				at: Date.now(),
			})
		);
	} catch {
		/* ignore */
	}
};

const detectApi = async () => {
	if (apiMode !== null) return apiMode;
	try {
		const response = await fetch('./api/health', { cache: 'no-store' });
		if (!response.ok) {
			apiMode = false;
			return false;
		}
		const data = await response.json();
		apiMode = Boolean(data?.bucketApi);
		return apiMode;
	} catch {
		apiMode = false;
		return false;
	}
};

const fetchJsonFile = async (name) => {
	const config = COLLECTIONS[name];
	const response = await fetch(config.seedUrl, { cache: 'no-store' });
	if (!response.ok) {
		throw new Error(`No se pudo cargar ${config.seedUrl}`);
	}
	const data = await response.json();
	return {
		title: data.title || name,
		lead: data.lead || '',
		items: Array.isArray(data.items) ? clone(data.items) : [],
		source: 'json-file',
		mode: 'file-readonly',
	};
};

const fetchFromApi = async (name) => {
	const config = COLLECTIONS[name];
	const response = await fetch(config.apiUrl, { cache: 'no-store' });
	if (!response.ok) {
		throw new Error(`API bucket no disponible (${response.status})`);
	}
	const data = await response.json();
	return {
		title: data.title || name,
		lead: data.lead || '',
		items: Array.isArray(data.items) ? clone(data.items) : [],
		source: 'api-file',
		mode: 'file',
	};
};

const ensureCollection = async (name) => {
	const config = COLLECTIONS[name];
	if (!config) throw new Error(`Colección desconocida: ${name}`);

	const hasApi = await detectApi();

	if (hasApi) {
		// En localhost con npm run dev: JSON real en disco. Ignora localStorage viejo.
		clearLocalBucket(name);
		const fresh = await fetchFromApi(name);
		memory[name] = fresh;
		return memory[name];
	}

	// Fallback (GitHub Pages / sin API): JSON estático + localStorage.
	try {
		const raw = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed?.items)) {
				memory[name] = parsed;
				return memory[name];
			}
		}
	} catch {
		/* ignore */
	}

	const fromFile = await fetchJsonFile(name);
	try {
		localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(fromFile));
	} catch {
		/* ignore */
	}
	memory[name] = fromFile;
	return memory[name];
};

const getItems = async (name) => {
	const collection = await ensureCollection(name);
	return clone(collection.items);
};

const getItemById = async (name, id) => {
	const items = await getItems(name);
	return items.find((item) => Number(item.id) === Number(id)) || null;
};

const getMode = async () => ((await detectApi()) ? 'file' : 'localStorage');

const addItem = async (name, item) => {
	const config = COLLECTIONS[name];
	if (!config) throw new Error(`Colección desconocida: ${name}`);

	const hasApi = await detectApi();

	if (hasApi) {
		const response = await fetch(config.apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ item }),
			cache: 'no-store',
		});
		const payload = await response.json().catch(() => ({}));
		if (!response.ok || !payload?.item) {
			throw new Error(payload?.error || 'No se pudo guardar en el JSON del servidor local.');
		}
		memory[name] = null;
		setPendingFilter(name, payload.item);
		return clone(payload.item);
	}

	// Fallback localStorage (hosting estático sin API).
	const collection = await ensureCollection(name);
	const maxId = collection.items.reduce((acc, row) => Math.max(acc, Number(row.id) || 0), 0);
	const record = {
		...item,
		id: maxId + 1,
		creadoEn: new Date().toISOString(),
		esNuevo: true,
	};
	collection.items.unshift(record);
	collection.source = 'localStorage';
	collection.mode = 'localStorage';
	collection.updatedAt = new Date().toISOString();
	try {
		localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(collection));
	} catch (error) {
		throw new Error('No se pudo guardar en localStorage.');
	}
	memory[name] = collection;
	setPendingFilter(name, record);
	return clone(record);
};

const resetCollection = async (name) => {
	const config = COLLECTIONS[name];
	if (!config) throw new Error(`Colección desconocida: ${name}`);

	const hasApi = await detectApi();
	clearLocalBucket(name);
	memory[name] = null;

	if (hasApi) {
		const response = await fetch(`${config.apiUrl}/reset`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: '{}',
			cache: 'no-store',
		});
		const payload = await response.json().catch(() => ({}));
		if (!response.ok) {
			throw new Error(payload?.error || 'No se pudo restaurar el JSON seed.');
		}
		memory[name] = {
			title: name,
			lead: '',
			items: clone(payload.items || []),
			source: 'api-file',
			mode: 'file',
		};
		return clone(memory[name].items);
	}

	const fromFile = await fetchJsonFile(name);
	try {
		localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(fromFile));
	} catch {
		/* ignore */
	}
	memory[name] = fromFile;
	return clone(fromFile.items);
};

const resetAll = async () => {
	await Promise.all(Object.keys(COLLECTIONS).map((name) => resetCollection(name)));
};

const fakeBucket = {
	collections: Object.keys(COLLECTIONS),
	ensureCollection,
	getItems,
	getItemById,
	getMode,
	addItem,
	resetCollection,
	resetAll,
};

export default fakeBucket;
