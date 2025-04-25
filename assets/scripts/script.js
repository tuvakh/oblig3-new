// Script for waterdrop
const waterIcon = document.querySelector('.section-top__icon');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) { 
        waterIcon.classList.add('splash');
    } else {
        waterIcon.classList.remove('splash');
    }
});

// Script for the wave animation
const waveIcon = document.querySelector('.section-wave__icon');

function handleWaveScroll() {
    const scrollPosition = window.pageYOffset;
    const scrollSpeed = scrollPosition * 0.7;
    waveIcon.style.transform = `translateX(-${scrollSpeed}px)`;
}
window.addEventListener('scroll', handleWaveScroll);


// Script for horizontal-scroll
gsap.registerPlugin(ScrollTrigger);
const contents = gsap.utils.toArray(".horizontal-scroll .horizontal");

gsap.to(contents, {
    xPercent: -100 * (contents.length - 1),
    scrollTrigger: {
        trigger: ".horizontal-scroll",
        pin: true,
        scrub: 1,
    }
});