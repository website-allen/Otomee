/*===Apps page start===*/
document.querySelectorAll('.btn-seedetails').forEach(btn => {
    btn.onclick = () => {

        const details = btn.nextElementSibling;
        const isOpen = details.style.display === "block";

        // Close all panels
        document.querySelectorAll('.content-seedetails').forEach(panel => {
            panel.style.display = "none";
        });

        // If it wasn't already open, reopen it
        if (!isOpen) {
            details.style.display = "block";
        }
    };

});

document.querySelectorAll('.close-seedetails',).forEach(closePanel => { closePanel.onclick = () => closePanel.closest('.content-seedetails').style.display = 'none'; }); 
/*===Apps page end===*/ 

/*==Miniproject page start==*/
document.querySelectorAll('.btn-sourcecode').forEach(sourceBtn => {
    sourceBtn.onclick = () => {

        const content = sourceBtn.nextElementSibling;
        const viewOpen = content.style.display === "block";

        document.querySelectorAll('.content-sourcecode').forEach(codes => {
            codes.style.display = "none";
        });

        if (!viewOpen) {
            content.style.display = "block";
        }
    };
});

document.querySelectorAll('.close-sourcecode').forEach(closeCodes => { closeCodes.onclick = () => closeCodes.closest('.content-sourcecode').style.display = 'none'; }); 



          /*=====Switch code tab start===== */
document.addEventListener('click', (e) => {
    // Find the closest portfolio item container to what was clicked
    const card = e.target.closest('.portfolio-item');
    if (!card) return;

    const clickedBtn = e.target.closest('.html-code-btn, .css-code-btn, .js-code-btn');
    if (!clickedBtn) return;

    const htmlBtn = e.target.closest('.html-code-btn');
    const cssBtn = e.target.closest('.css-code-btn');
    const jsBtn = e.target.closest('.js-code-btn');

    if (!htmlBtn && !cssBtn && !jsBtn) return;

    const htmlContent = card.querySelector('.html-code-content');
    const cssContent = card.querySelector('.css-code-content');
    const jsContent = card.querySelector('.js-code-content');
    const copyBtn = card.querySelector('.copy-btn');

    // Helper to reset view inside this specific card
    function resetTabs() {
        if (htmlContent) htmlContent.style.display = 'none';
        if (cssContent) cssContent.style.display = 'none';
        if (jsContent) jsContent.style.display = 'none';
        if (copyBtn) copyBtn.textContent = 'copy';
    }


    if (htmlBtn) {
        resetTabs();
        if (htmlContent) htmlContent.style.display = 'block';
    } else if (cssBtn) {
        resetTabs();
        if (cssContent) cssContent.style.display = 'block';
    } else if (jsBtn) {
        resetTabs();
        if (jsContent) jsContent.style.display = 'block';
    }


});
           /*=====Switch code tab end===== */


function copyCode() {
    const activeCodeElement = document.querySelector('.tab-content:not([style*="display: none"]) code');
    const btn = document.getElementById('copy-btn');

    if (activeCodeElement) {
        navigator.clipboard.writeText(activeCodeElement.innerText).then(() => {
            btn.textContent = 'copied';
        });
    }
}
/*==Miniproject page end==*/





