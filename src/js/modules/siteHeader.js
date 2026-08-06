const siteHeader = () => {
	document.querySelectorAll('.site-header').forEach((root) => {
		if (root.dataset.siteHeaderReady === 'true') return;

		const button = root.querySelector('.site-header__menu-btn');
		const mobileNav = root.querySelector('.site-header__mobile');

		if (!button || !mobileNav) return;

		const closeMenu = () => {
			mobileNav.classList.add('hidden');
			button.setAttribute('aria-expanded', 'false');
			button.setAttribute('aria-label', 'Abrir menú');
		};

		const openMenu = () => {
			mobileNav.classList.remove('hidden');
			button.setAttribute('aria-expanded', 'true');
			button.setAttribute('aria-label', 'Cerrar menú');
		};

		button.addEventListener('click', () => {
			const isOpen = button.getAttribute('aria-expanded') === 'true';
			if (isOpen) closeMenu();
			else openMenu();
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') closeMenu();
		});

		root.dataset.siteHeaderReady = 'true';
	});
};

export default siteHeader;
