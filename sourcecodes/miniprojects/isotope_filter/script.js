const iso = new Isotope('.grid', {
    itemSelector: '.item',
    layoutMode: 'fitRows'
});

const buttons = document.querySelectorAll('.filters button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        iso.arrange({
            filter: filterValue
        });
    });
});