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