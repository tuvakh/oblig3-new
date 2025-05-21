// Script for waterdrop (scroll-activated)
// Makes the water drop icon to add/remove the "splash" effect, when you scroll down past 100 pixels.
const waterIcon = document.querySelector('.section-top__icon');
window.addEventListener('scroll', () => {
  waterIcon.classList.toggle('splash', window.scrollY > 100);
});


// Script for section 2 -  Wave text
/* Uses Intersection Observer to make text appear/disappear by adjusting font size as the section enters/exits the viewport 
(with a 20% scroll buffer)*/
const waveSectionText = document.querySelector(".section-wave__text");
const originalFontSize = window.getComputedStyle(waveSectionText).fontSize;
const observerWaveText = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      waveSectionText.style.fontSize = entry.isIntersecting ? originalFontSize : "0";
    });
  },
  { rootMargin: "-20% 0%" }
);
observerWaveText.observe(document.querySelector(".section-wave"));

gsap.registerPlugin(ScrollTrigger);

function horizontalScroll() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.set(".horizontal", { clearProps: "all" });

  const horizontalSections = document.querySelectorAll(".horizontal");

  horizontalSections.forEach(section => {
    const container = section.querySelector(".horizontal__container");

    const scrollWidth = container.scrollWidth - window.innerWidth;
    const scrollDuration = scrollWidth * 2; // Adjust scroll "speed"

    gsap.to(container, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: `+=${scrollDuration}`,
      }
    });
  });
}



window.addEventListener("load", horizontalScroll);
window.addEventListener("resize", horizontalScroll);

// Button (Back to Top)
// Scrolls the page to the top with a gradual animation using behavior: 'smooth' when clicked, avoiding an instant jump.
const backToTop = document.querySelector('.message__btn');
backToTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

 
