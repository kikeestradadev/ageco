const normalize = (value) =>
	String(value || '')
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[\u200b-\u200d\ufeff\u00a0]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const cellText = (cell) => (cell ? cell.textContent.replace(/\s+/g, ' ').trim() : '');

const compareValues = (a, b) => {
	const dateA = Date.parse(a);
	const dateB = Date.parse(b);
	const bothDates = !Number.isNaN(dateA) && !Number.isNaN(dateB) && /\d{4}-\d{2}-\d{2}/.test(a);

	if (bothDates) return dateA - dateB;

	const numA = Number(String(a).replace(/[^\d.-]/g, ''));
	const numB = Number(String(b).replace(/[^\d.-]/g, ''));
	const bothNums =
		String(a).trim() !== '' &&
		String(b).trim() !== '' &&
		!Number.isNaN(numA) &&
		!Number.isNaN(numB) &&
		/^-?\d+(\.\d+)?$/.test(String(a).trim()) &&
		/^-?\d+(\.\d+)?$/.test(String(b).trim());

	if (bothNums) return numA - numB;

	return normalize(a).localeCompare(normalize(b), 'es', { sensitivity: 'base' });
};

const matchedRows = (tbody) =>
	[...tbody.querySelectorAll('tr')].filter((row) => row.dataset.filteredOut !== 'true');

const rowSearchText = (row) => {
	const fromData = row.getAttribute('data-search') || '';
	return `${fromData} ${row.textContent || ''}`;
};

const exportCsv = (table, tbody, filename) => {
	const headerRow = table.querySelector('thead tr');
	const rows = [headerRow, ...matchedRows(tbody)].filter(Boolean);

	const csv = rows
		.map((row) =>
			[...row.children]
				.map((cell) => {
					const text = cellText(cell).replace(/"/g, '""');
					return `"${text}"`;
				})
				.join(',')
		)
		.join('\n');

	const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `${filename}.csv`;
	link.click();
	URL.revokeObjectURL(url);
};

const shareWhatsApp = (tbody, table, title) => {
	const headers = [...table.querySelectorAll('thead th')].map((th) => cellText(th));
	const lines = matchedRows(tbody).map((row) =>
		[...row.children]
			.map((cell, index) => `${headers[index] || `Col ${index + 1}`}: ${cellText(cell)}`)
			.join(' · ')
	);
	const text = [`*${title}*`, ...lines].join('\n');
	window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
};

const updateSortIndicators = (root, sortCol, sortDir) => {
	root.querySelectorAll('[data-data-table-sort]').forEach((button) => {
		const col = Number(button.dataset.dataTableSort);
		const indicator = button.querySelector('[data-sort-indicator]');
		if (!indicator) return;
		if (col === sortCol) {
			indicator.textContent = sortDir === 'asc' ? '▲' : '▼';
			button.setAttribute('aria-sort', sortDir === 'asc' ? 'ascending' : 'descending');
		} else {
			indicator.textContent = '';
			button.setAttribute('aria-sort', 'none');
		}
	});
};

const ensurePagination = (root) => {
	let pager = root.querySelector('[data-data-table-pagination]');
	if (pager) return pager;

	pager = document.createElement('div');
	pager.dataset.dataTablePagination = 'true';
	pager.className =
		'data-table__pagination mt-4 flex flex-col gap-3 m:flex-row m:items-center m:justify-between';
	pager.innerHTML = `
		<label class="inline-flex items-center gap-2 text-sm text-[var(--ageco-gray-dark)]">
			<span>Filas por página</span>
			<select
				class="rounded-md border border-[var(--border-soft)] bg-white px-2 py-1.5 text-sm"
				data-data-table-page-size
			>
				<option value="5">5</option>
				<option value="10" selected>10</option>
			</select>
		</label>
		<div class="flex flex-wrap items-center gap-2">
			<p class="m-0 text-sm text-[var(--ageco-gray-dark)]" data-data-table-page-info>—</p>
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-[var(--border-soft)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ageco-black)] disabled:cursor-not-allowed disabled:opacity-40"
				data-data-table-prev
			>Anterior</button>
			<div class="flex flex-wrap gap-1" data-data-table-pages></div>
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-[var(--border-soft)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ageco-black)] disabled:cursor-not-allowed disabled:opacity-40"
				data-data-table-next
			>Siguiente</button>
		</div>
	`;
	root.appendChild(pager);
	return pager;
};

const dataTable = () => {
	document.querySelectorAll('.data-table').forEach((root) => {
		if (root.dataset.dataTableReady === 'true') return;

		const table = root.querySelector('table');
		const getTbody = () => table?.querySelector('tbody');
		const searchInput = root.querySelector('[data-data-table-search]');
		const countEl = root.querySelector('[data-data-table-count]');
		const printBtn = root.querySelector('[data-data-table-print]');
		const excelBtn = root.querySelector('[data-data-table-excel]');
		const whatsappBtn = root.querySelector('[data-data-table-whatsapp]');

		const tbody = getTbody();
		if (!table || !tbody) return;

		if (root._dataTableAbort) root._dataTableAbort.abort();
		const abortController = new AbortController();
		root._dataTableAbort = abortController;
		const { signal } = abortController;

		const filename = root.dataset.filename || 'listado-ageco';
		const title = root.dataset.title || 'Listado AGECO';
		const pager = ensurePagination(root);
		const pageSizeSelect = pager.querySelector('[data-data-table-page-size]');
		const pageInfo = pager.querySelector('[data-data-table-page-info]');
		const pagesEl = pager.querySelector('[data-data-table-pages]');
		const prevBtn = pager.querySelector('[data-data-table-prev]');
		const nextBtn = pager.querySelector('[data-data-table-next]');

		let sortCol = null;
		let sortDir = 'asc';
		let currentPage = 1;
		const maxPageSize = 10;
		let pageSize = Math.min(
			maxPageSize,
			Number(root.dataset.pageSize) || Number(pageSizeSelect?.value) || maxPageSize
		);

		if (pageSizeSelect) {
			pageSizeSelect.value = String(pageSize);
		}

		const render = () => {
			const body = getTbody();
			if (!body) return;

			const matched = matchedRows(body);
			const total = body.querySelectorAll('tr').length;
			const matchedCount = matched.length;
			const totalPages = Math.max(1, Math.ceil(matchedCount / pageSize) || 1);

			if (currentPage > totalPages) currentPage = totalPages;
			if (currentPage < 1) currentPage = 1;

			const start = (currentPage - 1) * pageSize;
			const end = start + pageSize;

			body.querySelectorAll('tr').forEach((row) => {
				if (row.dataset.filteredOut === 'true') {
					row.style.display = 'none';
					return;
				}
				const index = matched.indexOf(row);
				row.style.display = index >= start && index < end ? '' : 'none';
			});

			if (countEl) {
				countEl.textContent =
					matchedCount === total
						? `${total} registros`
						: `${matchedCount} de ${total} registros`;
			}

			if (pageInfo) {
				if (matchedCount === 0) {
					pageInfo.textContent = 'Sin resultados';
				} else {
					const from = start + 1;
					const to = Math.min(end, matchedCount);
					pageInfo.textContent = `Mostrando ${from}–${to} de ${matchedCount}`;
				}
			}

			if (prevBtn) prevBtn.disabled = currentPage <= 1 || matchedCount === 0;
			if (nextBtn) nextBtn.disabled = currentPage >= totalPages || matchedCount === 0;

			if (pagesEl) {
				pagesEl.innerHTML = '';
				for (let page = 1; page <= totalPages; page += 1) {
					const button = document.createElement('button');
					button.type = 'button';
					button.textContent = String(page);
					button.className =
						page === currentPage
							? 'inline-flex size-8 items-center justify-center rounded-md border border-[var(--ageco-red)] bg-[var(--ageco-red)] text-xs font-semibold text-white'
							: 'inline-flex size-8 items-center justify-center rounded-md border border-[var(--border-soft)] bg-white text-xs font-semibold text-[var(--ageco-black)]';
					button.addEventListener('click', () => {
						currentPage = page;
						render();
					});
					pagesEl.appendChild(button);
				}
			}
		};

		const applyFilter = () => {
			const body = getTbody();
			if (!body) return;

			const query = normalize(searchInput?.value || '');
			body.querySelectorAll('tr').forEach((row) => {
				const haystack = normalize(rowSearchText(row));
				const match = !query || haystack.includes(query);
				row.dataset.filteredOut = match ? 'false' : 'true';
			});
			currentPage = 1;
			render();
		};

		const applySort = (colIndex) => {
			const body = getTbody();
			if (!body) return;

			if (sortCol === colIndex) {
				sortDir = sortDir === 'asc' ? 'desc' : 'asc';
			} else {
				sortCol = colIndex;
				sortDir = 'asc';
			}

			const rows = [...body.querySelectorAll('tr')];
			rows.sort((rowA, rowB) => {
				const a = cellText(rowA.children[colIndex]);
				const b = cellText(rowB.children[colIndex]);
				const result = compareValues(a, b);
				return sortDir === 'asc' ? result : -result;
			});

			rows.forEach((row) => body.appendChild(row));
			updateSortIndicators(root, sortCol, sortDir);
			render();
		};

		searchInput?.addEventListener('input', applyFilter, { signal });
		searchInput?.addEventListener('search', applyFilter, { signal });
		searchInput?.addEventListener('keyup', applyFilter, { signal });

		root.querySelectorAll('[data-data-table-sort]').forEach((button) => {
			button.addEventListener(
				'click',
				() => {
					const colIndex = Number(button.dataset.dataTableSort);
					if (Number.isNaN(colIndex)) return;
					applySort(colIndex);
				},
				{ signal }
			);
		});

		prevBtn?.addEventListener(
			'click',
			() => {
				currentPage -= 1;
				render();
			},
			{ signal }
		);

		nextBtn?.addEventListener(
			'click',
			() => {
				currentPage += 1;
				render();
			},
			{ signal }
		);

		pageSizeSelect?.addEventListener(
			'change',
			() => {
				pageSize = Math.min(maxPageSize, Number(pageSizeSelect.value) || maxPageSize);
				currentPage = 1;
				render();
			},
			{ signal }
		);

		printBtn?.addEventListener(
			'click',
			() => {
				const body = getTbody();
				body?.querySelectorAll('tr').forEach((row) => {
					row.style.display = row.dataset.filteredOut === 'true' ? 'none' : '';
				});
				root.classList.add('is-printing');
				window.print();
				window.setTimeout(() => {
					root.classList.remove('is-printing');
					render();
				}, 300);
			},
			{ signal }
		);

		excelBtn?.addEventListener(
			'click',
			() => exportCsv(table, getTbody(), filename),
			{ signal }
		);
		whatsappBtn?.addEventListener(
			'click',
			() => shareWhatsApp(getTbody(), table, title),
			{ signal }
		);

		root._dataTableApplyFilter = applyFilter;
		root._dataTableRender = render;

		applyFilter();
		root.dataset.dataTableReady = 'true';
	});
};

export default dataTable;
