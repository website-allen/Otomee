
	/* ============================================================
	   THEME SWITCHER
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
	   TYPED.JS
	   ============================================================ */
	document.addEventListener('DOMContentLoaded', function () {
		if (window.Typed) {
			new Typed('.typed', {
				strings: ['Full-Stack Developer', 'React Specialist', 'Cloud Architect', 'UI Engineer', 'Problem Solver'],
				typeSpeed: 55,
				backSpeed: 32,
				backDelay: 1600,
				loop: true,
				smartBackspace: true,
				showCursor: false
			});

		/* ---------- Hero slideshow (3 images, 2s per slide) ---------- */
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
		}

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
			new PureCounter({
				selector: '.purecounter',
				duration: 1.6,
				once: true
			});
		}

		/* ---------- Isotope ---------- */
		const isoContainer = document.querySelector('.isotope-container');
		if (isoContainer && window.Isotope) {
			const iso = new Isotope(isoContainer, {
    itemSelector: '.isotope-item',
    layoutMode: 'masonry',
    masonry: {
        columnWidth: '.portfolio-item',
        gutter: 30
    },
    transitionDuration: '0.4s'
});

			document.querySelectorAll('.portfolio-filters li').forEach(li => {
				li.addEventListener('click', function () {
					document.querySelectorAll('.portfolio-filters li').forEach(x => x.classList.remove('filter-active'));
					this.classList.add('filter-active');
					iso.arrange({ filter: this.dataset.filter });
				});
			});
		}

		/* ---------- Swiper ---------- */
		if (window.Swiper && document.querySelector('.init-swiper')) {
			new Swiper('.init-swiper', {
				loop: true,
				speed: 700,
				autoplay: { delay: 5200, disableOnInteraction: false },
				pagination: { el: '.swiper-pagination', clickable: true },
				breakpoints: {
					0:   { slidesPerView: 1, spaceBetween: 16 },
					768: { slidesPerView: 2, spaceBetween: 24 },
					1200:{ slidesPerView: 3, spaceBetween: 28 }
				}
			});
		}

		/* ---------- Skill bars animate on view ---------- */
		const bars = document.querySelectorAll('.progress-bar');
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

		/* ---------- Scroll to top show/hide ---------- */
		const scrollTopBtn = document.getElementById('scroll-top');
		window.addEventListener('scroll', () => {
			if (window.scrollY > 500) scrollTopBtn.classList.add('show');
			else scrollTopBtn.classList.remove('show');
		});

	
		/*====Auto-close header when any non-dropdown link is clicked start===*/
const toggle = document.getElementById('toggle');

toggle.addEventListener('change', function () {
  if (!toggle.checked) return;   // only run while the header is open

  const links = document.querySelectorAll('#header a');

  links.forEach(link => {
    if (link.closest('.dropdown')) return;   // skip dropdown parents & children

    link.addEventListener('click', () => {
      toggle.checked = false;
    });
  });
});
/*====Auto-close header when any non-dropdown link is clicked end===*/



		/* ---------- Contact form (Web3Forms AJAX) ---------- */
		const form = document.querySelector('.php-email-form');
		if (form) {
			form.addEventListener('submit', async function (e) {
				e.preventDefault();
				const loading = form.querySelector('.loading');
				const errorMsg = form.querySelector('.error-message');
				const sentMsg = form.querySelector('.sent-message');

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
	});
	
const pToggle = document.getElementById('toggle-2');
const mToggle = document.getElementById('toggle-3');

document.querySelectorAll('#navmenu li.dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    const toggle = link.querySelector('input[type="checkbox"]');
    if (!toggle) return;
    
    e.preventDefault();
    e.stopPropagation();

    // If projects is closed, close mini-projects
    if (!pToggle.checked) mToggle.checked = false;

    if (toggle.id === 'toggle-3' && !pToggle.checked) pToggle.checked = true;
    toggle.checked = !toggle.checked;
  });
});


/*====Highlight the nav link of the section currently in view start===*/
const toggle = document.getElementById('toggle');
const links = document.querySelectorAll('#navmenu ul li > a[href^="#"]');

links.forEach(link => link.addEventListener('click', () => links.forEach(l => l.classList.toggle('active', l === link))));

toggle.addEventListener('change', () => {
  if (!toggle.checked) return;
  const h = window.innerHeight * 0.4;
  links.forEach(link => {
    const section = document.getElementById(link.getAttribute('href').slice(1));
    if (section) {
      const { top, bottom } = section.getBoundingClientRect();
      if (top <= h && bottom >= h) links.forEach(l => l.classList.toggle('active', l === link));
    }
  });
});
/*====Highlight the nav link of the section currently in view end===*/