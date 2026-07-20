const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        document.querySelector('.nav-links')?.classList.remove('open');
        document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    navLinks?.classList.toggle('open', !isOpen);
});

const typedName = document.querySelector('.typed-name');
if (typedName && !reduceMotion) {
    const text = typedName.dataset.text || typedName.textContent;
    typedName.textContent = '';
    let index = 0;
    const typeNextCharacter = () => {
        typedName.textContent = text.slice(0, ++index);
        if (index < text.length) window.setTimeout(typeNextCharacter, 105);
    };
    window.setTimeout(typeNextCharacter, 450);
}

if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -45px' });

    document.querySelectorAll('.section-header, .about-content, .timeline-item, .project-card, .skill-category').forEach((element) => {
        element.classList.add('hidden-element');
        observer.observe(element);
    });
}
