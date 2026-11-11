document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.gallery-wrapper');
    wrappers.forEach(wrapper => {
        const scrollContainer = wrapper.querySelector('.gallery-scroll');
        const btnLeft = wrapper.querySelector('.scroll-left');
        const btnRight = wrapper.querySelector('.scroll-right');

        if (!scrollContainer || !btnLeft || !btnRight) return;


        btnLeft.addEventListener('click', () => {
            const scroll = scrollContainer.clientWidth * 0.8; 
            scrollContainer.scrollBy({ left: -scroll, behavior: 'smooth' });
        });

        btnRight.addEventListener('click', () => {
            const scroll = scrollContainer.clientWidth * 0.8; 
            scrollContainer.scrollBy({ left: scroll, behavior: 'smooth' });
        });

        const updateArrows = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const scrollWidth = scrollContainer.scrollWidth;
            const clientWidth = scrollContainer.clientWidth;

            if (scrollLeft <= 10) {
                btnLeft.classList.add('hidden');
            } else {
                btnLeft.classList.remove('hidden');
            }
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                btnRight.classList.add('hidden');
            } else {
                btnRight.classList.remove('hidden');
            }
        };

        scrollContainer.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);

        updateArrows();
    });
});