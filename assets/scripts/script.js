// Script for waterdrop
const waterIcon = document.querySelector('.section-top__icon');
window.addEventListener('scroll', () => {
  waterIcon.classList.toggle('splash', window.scrollY > 500);
});

// Script for wave-animation
const waveIcon = document.querySelector('.section-wave__icon');
function handleWaveScroll() {
  const scrollPosition = window.pageYOffset;
  const scrollSpeed = scrollPosition * 0.7;
  waveIcon.style.backgroundPosition = `-${scrollSpeed}px 0`;
}
window.addEventListener('scroll', handleWaveScroll);

// Script for horizontal-scroll
gsap.registerPlugin(ScrollTrigger);
const contents = gsap.utils.toArray(".horizontal .horizontal__container");
// Horizontal scroll section
gsap.registerPlugin(ScrollTrigger);

function setupHorizontalScroll() {
  // Clean up any previous ScrollTriggers and transforms
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.set(".horizontal .horizontal__container", { clearProps: "all" });

  if (window.innerWidth >= 1000) {
    const contents = gsap.utils.toArray(".horizontal .horizontal__container");
    gsap.to(contents, {
      xPercent: -80 * (contents.length - 1),
      scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 1,
        snap: 1 / (contents.length - 1),
        end: () => "+=" + document.querySelector('.horizontal').offsetWidth,
        invalidateOnRefresh: true
      }
    });
  } else {
    // On small screens, make sure everything is reset
    gsap.set(".horizontal .horizontal__container", { x: 0 });
    // No ScrollTrigger animation
  }
}

// Run once on load
setupHorizontalScroll();

// Re-run on resize to adapt to screen changes
window.addEventListener("resize", setupHorizontalScroll);
