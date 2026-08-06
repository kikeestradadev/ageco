const normalize = (value) =>
	String(value || '')
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
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
	link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
	link.click();
	URL.revokeObjectURL(url);
};

const shareWhatsApp = (tbody, table, title) => {
	const headers = [...table.querySelectorAll('thead th')].map((th) => cellText(th));
	const rows = matchedRows(tbody);
	const preview = rows.slice(0, 12);

	const lines = [
		title || 'Listado AGECO · Sigo Vigente',
		'',
		...preview.map((row, index) => {
			const cells = [...row.children].map((cell) => cellText(cell));
			const summary = headers
				.map((header, i) => `${header}: ${cells[i] || ''}`)
				.join(' | ');
			return `${index + 1}. ${summary}`;
		}),
	];

	if (rows.length > 12) {
		lines.push('', '…(listado truncado para WhatsApp)');
	}

	const url = `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
	window.open(url, '_blank', 'noopener,noreferrer');
};

const updateSortIndicators = (root, activeIndex, direction) => {
	root.querySelectorAll('[data-data-table-sort]').forEach((button) => {
		const col = Number(button.dataset.dataTableSort);
		const indicator = button.querySelector('[data-sort-indicator]');
		if (!indicator) return;

		if (col === activeIndex) {
			indicator.textContent = direction === 'asc' ? ' ↑' : ' ↓';
			button.setAttribute('aria-sort', direction === 'asc' ? 'ascending' : 'descending');
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
	pager.className =
		'data-table__pagination mt-4 flex flex-col gap-3 m:flex-row m:items-center m:justify-between';
	pager.setAttribute('data-data-table-pagination', 'true');
	pager.innerHTML = `
		<div class="flex flex-wrap items-center gap-2 text-sm text-[var(--ageco-gray-dark)]">
			<label class="inline-flex items-center gap-2">
				<span>Filas por página</span>
				<select
					class="rounded-md border border-[var(--border-soft)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--ageco-red)]"
					data-data-table-page-size
				>
					<option value="5">5</option>
					<option value="10">10</option>
				</select>
			</label>
			<span data-data-table-page-info>—</span>
		</div>
		<div class="flex flex-wrap items-center gap-2">
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
		const tbody = table?.querySelector('tbody');
		const searchInput = root.querySelector('[data-data-table-search]');
		const countEl = root.querySelector('[data-data-table-count]');
		const printBtn = root.querySelector('[data-data-table-print]');
		const excelBtn = root.querySelector('[data-data-table-excel]');
		const whatsappBtn = root.querySelector('[data-data-table-whatsapp]');

		if (!table || !tbody) return;

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
			const matched = matchedRows(tbody);
			const total = tbody.querySelectorAll('tr').length;
			const matchedCount = matched.length;
			const totalPages = Math.max(1, Math.ceil(matchedCount / pageSize) || 1);

			if (currentPage > totalPages) currentPage = totalPages;
			if (currentPage < 1) currentPage = 1;

			const start = (currentPage - 1) * pageSize;
			const end = start + pageSize;

			tbody.querySelectorAll('tr').forEach((row) => {
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
			const query = normalize(searchInput?.value || '');
			tbody.querySelectorAll('tr').forEach((row) => {
				const match = !query || normalize(row.textContent).includes(query);
				row.dataset.filteredOut = match ? 'false' : 'true';
			});
			currentPage = 1;
			render();
		};

		const applySort = (colIndex) => {
			if (sortCol === colIndex) {
				sortDir = sortDir === 'asc' ? 'desc' : 'asc';
			} else {
				sortCol = colIndex;
				sortDir = 'asc';
			}

			const rows = [...tbody.querySelectorAll('tr')];
			rows.sort((rowA, rowB) => {
				const a = cellText(rowA.children[colIndex]);
				const b = cellText(rowB.children[colIndex]);
				const result = compareValues(a, b);
				return sortDir === 'asc' ? result : -result;
			});

			rows.forEach((row) => tbody.appendChild(row));
			updateSortIndicators(root, sortCol, sortDir);
			render();
		};

		searchInput?.addEventListener('input', applyFilter);

		root.querySelectorAll('[data-data-table-sort]').forEach((button) => {
			button.addEventListener('click', () => {
				const colIndex = Number(button.dataset.dataTableSort);
				if (Number.isNaN(colIndex)) return;
				applySort(colIndex);
			});
		});

		prevBtn?.addEventListener('click', () => {
			currentPage -= 1;
			render();
		});

		nextBtn?.addEventListener('click', () => {
			currentPage += 1;
			render();
		});

		pageSizeSelect?.addEventListener('change', () => {
			pageSize = Math.min(maxPageSize, Number(pageSizeSelect.value) || maxPageSize);
			currentPage = 1;
			render();
		});

		printBtn?.addEventListener('click', () => {
			const matched = matchedRows(tbody);
			tbody.querySelectorAll('tr').forEach((row) => {
				row.style.display = row.dataset.filteredOut === 'true' ? 'none' : '';
			});
			root.classList.add('is-printing');
			window.print();
			window.setTimeout(() => {
				root.classList.remove('is-printing');
				render();
			}, 300);
			void matched;
		});

		excelBtn?.addEventListener('click', () => exportCsv(table, tbody, filename));
		whatsappBtn?.addEventListener('click', () => shareWhatsApp(tbody, table, title));

		applyFilter();
		root.dataset.dataTableReady = 'true';
	});
};

export default dataTable;
