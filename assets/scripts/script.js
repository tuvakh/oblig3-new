// Horizontal scroll setup
gsap.registerPlugin(ScrollTrigger);

let inHorizontal = false;
const mediaQuery = window.matchMedia("(max-width: 599px)");

function horizontalScroll() {
  if (mediaQuery.matches) {
    // Clear all styles applied by GSAP when on small screens
    gsap.set(".horizontal__background", { clearProps: "all" });
    gsap.set(".horizontal__character", { clearProps: "all" });
    
    // Remove all ScrollTriggers so nothing keeps running
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    inHorizontal = false;
    return;
  }

  // Start horizontal scroll behavior for larger screens
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.set(".horizontal", { clearProps: "all" });

  const horizontalSections = document.querySelectorAll(".horizontal");

  horizontalSections.forEach(section => {
    const background = section.querySelector(".horizontal__background");
    const girl = section.querySelector(".horizontal__character");
    const scrollDistance = background.scrollWidth - window.innerWidth;
    const scrollDuration = scrollDistance * 2;

    // Background animation
    gsap.to(background, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: `+=${scrollDuration}`,
        anticipatePin: 1,
        onEnter: () => inHorizontal = true,
        onLeave: () => inHorizontal = false,
        onEnterBack: () => inHorizontal = true,
        onLeaveBack: () => inHorizontal = false,
      }
    });

    // Character animation
    gsap.to(girl, {
      x: scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        scrub: 1,
        end: `+=${scrollDuration}`,
      }
    });
  });
}

window.addEventListener("load", horizontalScroll);
window.addEventListener("resize", horizontalScroll);

// Back to top button
// Scrolls the page to the top with a gradual animation using behavior: 'smooth' when clicked, avoiding an instant jump.
const backToTopButtons = document.querySelectorAll('.message__btn-top');

backToTopButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

