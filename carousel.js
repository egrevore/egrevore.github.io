document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.character-slider');
    const sections = Array.from(document.querySelectorAll('.character-section'));
    const swipeIndicator = document.getElementById('swipe-indicator');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isMobile = window.innerWidth <= 600;
    let isAnimating = false;

    // Initial setup
    function initializeSlider() {
        if (isMobile) {
            swipeIndicator.style.display = 'block';
            sections.forEach((section, index) => {
                section.style.display = 'flex';
                if (index === 0) {
                    section.classList.add('active');
                } else {
                    section.classList.add('next');
                }
            });
        } else {
            // Reset for desktop view
            swipeIndicator.style.display = 'none';
            sections.forEach(section => {
                section.style.display = '';
                section.classList.remove('active', 'previous', 'next');
            });
        }
    }

    // Handle touch events
    slider.addEventListener('touchstart', e => {
        if (!isMobile) return;
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', e => {
        if (!isMobile) return;
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        if (!isMobile) return;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                slideNext();
            } else {
                // Swipe right
                slidePrevious();
            }
        }
    }

    function slideNext() {
        if (isAnimating) return;
        isAnimating = true;

        let nextIndex = currentIndex + 1;
        if (nextIndex >= sections.length) {
            nextIndex = 0;
        }

        // Always slide left (next)
        sections[currentIndex].classList.remove('active');
        sections[nextIndex].classList.remove('next', 'previous');

        sections[currentIndex].classList.add('previous');
        sections[nextIndex].classList.add('active');

        currentIndex = nextIndex;

        // Update classes for other sections
        sections.forEach((section, index) => {
            if (index !== currentIndex) {
                section.classList.remove('active');
                if (index === (currentIndex + 1) % sections.length) {
                    section.classList.remove('previous');
                    section.classList.add('next');
                } else {
                    section.classList.remove('next');
                    section.classList.add('previous');
                }
            }
        });

        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function slidePrevious() {
        if (isAnimating) return;
        isAnimating = true;

        let nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
            nextIndex = sections.length - 1;
        }

        // Still slide left for consistency
        sections[currentIndex].classList.remove('active');
        sections[nextIndex].classList.remove('next', 'previous');

        sections[currentIndex].classList.add('previous');
        sections[nextIndex].classList.add('active');

        currentIndex = nextIndex;

        // Update classes for other sections
        sections.forEach((section, index) => {
            if (index !== currentIndex) {
                section.classList.remove('active');
                if (index === (currentIndex + 1) % sections.length) {
                    section.classList.remove('previous');
                    section.classList.add('next');
                } else {
                    section.classList.remove('next');
                    section.classList.add('previous');
                }
            }
        });

        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 600;
        initializeSlider();
    });

    // Initialize the slider
    initializeSlider();
});