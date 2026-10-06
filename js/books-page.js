
	/*====Modal open/close for book details start===*/
	document.addEventListener('DOMContentLoaded', function () {

		// Open modal on "See Details" button click
		document.querySelectorAll('.see-details').forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const id = btn.dataset.modal;
				const modal = document.getElementById(id);
				if (modal) modal.classList.add('open');
			});
		});

		// Close on ✕ or [data-close]
		document.querySelectorAll('.app-modal').forEach(modal => {
			modal.querySelectorAll('[data-close]').forEach(el => {
				el.addEventListener('click', () => modal.classList.remove('open'));
			});
			// Backdrop click
			modal.addEventListener('click', (e) => {
				if (e.target === modal) modal.classList.remove('open');
			});
		});

		// Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				document.querySelectorAll('.app-modal.open').forEach(m => m.classList.remove('open'));
			}
		});

		// Lock body scroll while modal is open
		const observer = new MutationObserver(() => {
			const anyOpen = document.querySelector('.app-modal.open');
			document.body.style.overflow = anyOpen ? 'hidden' : '';
		});
		document.querySelectorAll('.app-modal').forEach(m => {
			observer.observe(m, { attributes: true, attributeFilter: ['class'] });
		});

		// AOS init
		if (window.AOS) AOS.init({ once: true, duration: 750, easing: 'ease-out-cubic', offset: 60 });
	});
	/*====Modal open/close for book details end===*/
	