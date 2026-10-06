/*====Modal open/close for app details start===*/
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

	// Close on ✕ button (or anything with [data-close])
	document.querySelectorAll('.app-modal').forEach(modal => {
		modal.querySelectorAll('[data-close]').forEach(el => {
			el.addEventListener('click', () => modal.classList.remove('open'));
		});

		// Close on backdrop click (clicking outside the inner card)
		modal.addEventListener('click', (e) => {
			if (e.target === modal) modal.classList.remove('open');
		});
	});

	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			document.querySelectorAll('.app-modal.open').forEach(m => m.classList.remove('open'));
		}
	});

	// Lock body scroll while any modal is open
	const observer = new MutationObserver(() => {
		const anyOpen = document.querySelector('.app-modal.open');
		document.body.style.overflow = anyOpen ? 'hidden' : '';
	});
	document.querySelectorAll('.app-modal').forEach(m => {
		observer.observe(m, { attributes: true, attributeFilter: ['class'] });
	});

	// AOS init for this page
	if (window.AOS) {
		AOS.init({ once: true, duration: 750, easing: 'ease-out-cubic', offset: 60 });
	}
});
/*====Modal open/close for app details end===*/