/* ============================================================
   THEME SWITCHER  (runs immediately — before DOM ready)
   ============================================================ */
(function () {
	const root = document.documentElement;
	const buttons = document.querySelectorAll('.theme-switcher button');
	const saved = localStorage.getItem('portfolio-theme') || 'night';

	function applyTheme(theme) {
		root.setAttribute('data-theme', theme);
		buttons.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
		localStorage.setItem('portfolio-theme', theme);
	}
	applyTheme(saved);
	buttons.forEach(btn => btn.addEventListener('click', () => applyTheme(btn.dataset.theme)));
})();

/* ============================================================
   LOAD SOURCE CODE FROM data-src
   ============================================================ */
function loadAllCodeBlocks() {
	const codeBlocks = document.querySelectorAll('code[data-src]');

	codeBlocks.forEach(codeBlock => {
		const filePath = codeBlock.getAttribute('data-src');
		if (!filePath) return;

		fetch(filePath)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP ${response.status} - File not found: ${filePath}`);
				}
				return response.text();
			})
			.then(data => {
				const cleanData = data.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/gi, '');
				codeBlock.textContent = cleanData;

				if (typeof hljs !== 'undefined') {
					hljs.highlightElement(codeBlock);
				}
				if (typeof Prism !== 'undefined') {
					Prism.highlightElement(codeBlock);
				}
			})
			.catch(error => {
				console.error('Error fetching file:', error);
				codeBlock.textContent = `Error loading code file: ${filePath}`;
			});
	});
}

/* ============================================================
   DOM-READY BLOCK — runs on every page
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

	/* ---------- Load source-code blocks ---------- */
	loadAllCodeBlocks();

	/* ---------- Typed.js (hero) ---------- */
	if (window.Typed && document.querySelector('.typed')) {
		new Typed('.typed', {
			strings: ['Full-Stack Developer', 'Writer', 'Graphic designer', 'UI Engineer', 'Problem Solver'],
			typeSpeed: 55,
			backSpeed: 32,
			backDelay: 1600,
			loop: true,
			smartBackspace: true,
			showCursor: false
		});
	}

	/* ---------- Hero slideshow ---------- */
	(function heroSlideshow() {
		const slides = document.querySelectorAll('.hero-slideshow .slide');
		if (slides.length < 2) return;
		let i = 0;
		setInterval(() => {
			slides[i].classList.remove('active');
			i = (i + 1) % slides.length;
			slides[i].classList.add('active');
		}, 3500);
	})();

	/* ---------- AOS ---------- */
	if (window.AOS) {
		AOS.init({ once: true, duration: 750, easing: 'ease-out-cubic', offset: 60 });
	}

	/* ---------- Preloader ---------- */
	window.addEventListener('load', function () {
		const pre = document.getElementById('preloader');
		if (pre) setTimeout(() => pre.classList.add('hidden'), 350);
	});

	/* ---------- PureCounter ---------- */
	if (window.PureCounter) {
		new PureCounter({ selector: '.purecounter', duration: 1.6, once: true });
	}

	/* ---------- Isotope ---------- */
	(function initIsotope() {
		const isoContainer = document.querySelector('.isotope-container');
		if (!isoContainer || !window.Isotope) return;

		function assignWeights() {
			isoContainer.querySelectorAll('.isotope-item').forEach(el => {
				el.dataset.weight = el.classList.contains('see-all-card')
					? '999999'
					: String(Math.random());
			});
		}

		assignWeights();

		const iso = new Isotope(isoContainer, {
			itemSelector: '.isotope-item',
			layoutMode: 'masonry',
			masonry: { columnWidth: '.portfolio-item', gutter: 30 },
			transitionDuration: '0.4s',
			getSortData: { weight: '[data-weight]' },
			sortBy: 'weight',
			sortAscending: true
		});

		window.addEventListener('load', () => iso.layout());

		document.querySelectorAll('.portfolio-filters li').forEach(li => {
			li.addEventListener('click', function () {
				document.querySelectorAll('.portfolio-filters li')
					.forEach(x => x.classList.remove('filter-active'));
				this.classList.add('filter-active');

				assignWeights();
				iso.updateSortData();

				iso.arrange({
					filter: this.dataset.filter,
					sortBy: 'weight'
				});
			});
		});
	})();

	/* ---------- Swiper ---------- */
	if (window.Swiper && document.querySelector('.init-swiper')) {
		new Swiper('.init-swiper', {
			loop: true,
			speed: 700,
			autoplay: { delay: 5200, disableOnInteraction: false },
			pagination: { el: '.swiper-pagination', clickable: true },
			breakpoints: {
				0:    { slidesPerView: 1, spaceBetween: 16 },
				768:  { slidesPerView: 2, spaceBetween: 24 },
				1200: { slidesPerView: 3, spaceBetween: 28 }
			}
		});
	}

	/* ---------- Skill bars ---------- */
	const bars = document.querySelectorAll('.progress-bar');
	if (bars.length) {
		const skillObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const bar = entry.target;
					const val = bar.getAttribute('aria-valuenow');
					setTimeout(() => { bar.style.width = val + '%'; }, 120);
					skillObserver.unobserve(bar);
				}
			});
		}, { threshold: 0.25 });
		bars.forEach(b => skillObserver.observe(b));
	}

	/* ---------- Scroll to top ---------- */
	const scrollTopBtn = document.getElementById('scroll-top');
	if (scrollTopBtn) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 500) scrollTopBtn.classList.add('show');
			else scrollTopBtn.classList.remove('show');
		});
	}

	/* ---------- Auto-close header on non-dropdown link click ---------- */
	const headerToggle = document.getElementById('toggle');
	if (headerToggle) {
		headerToggle.addEventListener('change', function () {
			if (!headerToggle.checked) return;
			document.querySelectorAll('#header a').forEach(link => {
				if (link.closest('.dropdown')) return;
				link.addEventListener('click', () => { headerToggle.checked = false; });
			});
		});
	}

	/* ---------- Contact form (Web3Forms) ---------- */
	const form = document.querySelector('.php-email-form');
	if (form) {
		form.addEventListener('submit', async function (e) {
			e.preventDefault();
			const loading  = form.querySelector('.loading');
			const errorMsg = form.querySelector('.error-message');
			const sentMsg  = form.querySelector('.sent-message');

			loading.style.display = 'block';
			errorMsg.style.display = 'none';
			sentMsg.style.display = 'none';

			try {
				const fd = new FormData(form);
				const res = await fetch(form.action, { method: 'POST', body: fd });
				const data = await res.json();
				loading.style.display = 'none';
				if (data.success) {
					sentMsg.style.display = 'block';
					form.reset();
				} else {
					errorMsg.textContent = data.message || 'Something went wrong.';
					errorMsg.style.display = 'block';
				}
			} catch (err) {
				loading.style.display = 'none';
				errorMsg.textContent = 'Network error. Please try again.';
				errorMsg.style.display = 'block';
			}
		});
	}

	/* ---------- Nav dropdown toggles ---------- */
	const pToggle = document.getElementById('toggle-2');
	const mToggle = document.getElementById('toggle-3');

	if (pToggle && mToggle) {
		document.querySelectorAll('#navmenu li.dropdown > a').forEach(link => {
			link.addEventListener('click', e => {
				const toggle = link.querySelector('input[type="checkbox"]');
				if (!toggle) return;
				e.preventDefault();
				e.stopPropagation();

				if (!pToggle.checked) mToggle.checked = false;
				if (toggle.id === 'toggle-3' && !pToggle.checked) pToggle.checked = true;
				toggle.checked = !toggle.checked;
			});
		});
	}

	/* ---------- Active nav link ---------- */
	const navToggle = document.getElementById('toggle');
	if (navToggle) {
		const navLinks = document.querySelectorAll('#navmenu ul li > a[href^="#"]');

		navLinks.forEach(link => link.addEventListener('click', () => {
			navLinks.forEach(l => l.classList.toggle('active', l === link));
		}));

		navToggle.addEventListener('change', () => {
			if (!navToggle.checked) return;
			const h = window.innerHeight * 0.4;
			navLinks.forEach(link => {
				const section = document.getElementById(link.getAttribute('href').slice(1));
				if (section) {
					const { top, bottom } = section.getBoundingClientRect();
					if (top <= h && bottom >= h) {
						navLinks.forEach(l => l.classList.toggle('active', l === link));
					}
				}
			});
		});
	}

	/* ---------- Modal open ---------- */
	document.querySelectorAll('.see-details').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const modal = document.getElementById(btn.dataset.modal);
			if (modal) modal.classList.add('open');
		});
	});

	/* ---------- Modal close (X, backdrop, Escape) ---------- */
	document.querySelectorAll('.app-modal').forEach(modal => {
		modal.querySelectorAll('[data-close]').forEach(el => {
			el.addEventListener('click', () => modal.classList.remove('open'));
		});
		modal.addEventListener('click', (e) => {
			if (e.target === modal) modal.classList.remove('open');
		});
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			document.querySelectorAll('.app-modal.open').forEach(m => m.classList.remove('open'));
		}
	});

	/* ---------- Lock body scroll while modal is open ---------- */
	const observer = new MutationObserver(() => {
		const anyOpen = document.querySelector('.app-modal.open');
		document.body.style.overflow = anyOpen ? 'hidden' : '';
	});
	document.querySelectorAll('.app-modal').forEach(m => {
		observer.observe(m, { attributes: true, attributeFilter: ['class'] });
	});

	/* ---------- Collapsible "Show source code" ---------- */
	document.querySelectorAll('.toggle-source').forEach(btn => {
		btn.addEventListener('click', () => {
			const dropdown = btn.nextElementSibling;
			const isOpen = btn.getAttribute('aria-expanded') === 'true';
			btn.setAttribute('aria-expanded', String(!isOpen));
			dropdown.classList.toggle('open', !isOpen);

			const label = btn.querySelector('.toggle-label');
			if (label) label.textContent = isOpen ? 'Show source code' : 'Hide source code';

			if (!isOpen && window.hljs) {
				dropdown.querySelectorAll('pre code').forEach(block => {
					if (!block.dataset.highlighted) {
						hljs.highlightElement(block);
						block.dataset.highlighted = 'yes';
					}
				});
			}
		});
	});

	/* ---------- Source-code tabs ---------- */
	document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
		const buttons = tabGroup.querySelectorAll('.codes-tab-tabs button');
		const panels  = tabGroup.querySelectorAll('.tab-content');
		buttons.forEach(btn => {
			btn.addEventListener('click', () => {
				buttons.forEach(b => b.classList.remove('active'));
				panels.forEach(p => p.classList.remove('active'));
				btn.classList.add('active');
				const target = tabGroup.querySelector(`[data-tab-content="${btn.dataset.tab}"]`);
				if (target) target.classList.add('active');
			});
		});
	});

	/* ---------- Copy code ---------- */
	document.querySelectorAll('#copy-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const modal = btn.closest('.app-modal');
			if (!modal) return;
			const activePanel = modal.querySelector('.tab-content.active code');
			if (!activePanel) return;
			navigator.clipboard.writeText(activePanel.innerText).then(() => {
				const original = btn.textContent;
				btn.textContent = 'Copied!';
				setTimeout(() => { btn.textContent = original; }, 1400);
			});
		});
	});

});   // ← DOMContentLoaded closes here

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();