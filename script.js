document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.section-header, .about-content, .timeline-item, .project-card, .skill-category').forEach((el) => {
    el.classList.add('hidden-element');
    observer.observe(el);
});
