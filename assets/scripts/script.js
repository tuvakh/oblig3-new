// Horizontal scroll setup
gsap.registerPlugin(ScrollTrigger);

let inHorizontal = false;
const mediaQuery = window.matchMedia("(max-width: 599px)");

function horizontalScroll() {
  if (mediaQuery.matches) {
    // 👇 Clear all styles applied by GSAP when on small screens
    gsap.set(".horizontal__background", { clearProps: "all" });
    gsap.set(".horizontal__character", { clearProps: "all" });
    
    // 👇 Remove all ScrollTriggers so nothing keeps running
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    inHorizontal = false;
    return;
  }

  // 👇 Start horizontal scroll behavior for larger screens
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

// Snap scroll logic
let timeoutId;

function snapScroll() {
    if (window.innerWidth < 768 || inHorizontal) return;

    const footerBuffer = 200; // Space before bottom to stop snapping
    const scrollPos = window.scrollY;
    const scrollBottom = scrollPos + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollBottom + footerBuffer >= docHeight) return;

    const sections = document.querySelectorAll('.history__part');
    let closest = null;
    let minDistance = Infinity;

    sections.forEach(section => {
        const offset = section.offsetTop;
        const distance = Math.abs(offset - scrollPos);
        if (distance < minDistance) {
        minDistance = distance;
        closest = section;
        }
    });

    if (closest) {
        window.scrollTo({
        top: closest.offsetTop,
        behavior: 'smooth'
        });
    }
}

// Debounced scroll event
window.addEventListener('scroll', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    snapScroll();
  }, 150);
});

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

