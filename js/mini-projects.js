
	document.addEventListener('DOMContentLoaded', function () {

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

				// Highlight on first reveal
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
				const activePanel = modal.querySelector('.tab-content.active code');
				if (!activePanel) return;
				navigator.clipboard.writeText(activePanel.innerText).then(() => {
					const original = btn.textContent;
					btn.textContent = 'Copied!';
					setTimeout(() => { btn.textContent = original; }, 1400);
				});
			});
		});

		/* ---------- AOS ---------- */
		if (window.AOS) AOS.init({ once: true, duration: 750, easing: 'ease-out-cubic', offset: 60 });
	});


    

    /**
 * Automatically finds all <code> elements with a `data-src` attribute,
 * fetches their file contents, and applies syntax highlighting.
 */
function loadAllCodeBlocks() {
  // Query every code element that contains a data-src attribute
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
        // Remove Live Server injected script if present locally
        const cleanData = data.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/gi, '');

        // Safe text assignment (escapes HTML tags automatically)
        codeBlock.textContent = cleanData;

        // Re-trigger syntax highlighting libraries
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

// Execute as soon as the DOM page finishes loading
document.addEventListener('DOMContentLoaded', loadAllCodeBlocks);