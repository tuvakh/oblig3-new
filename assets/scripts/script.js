const waterIcon = document.querySelector('.history__icon');
const target = document.querySelector('.history__part--intro');


const observer = new IntersectionObserver(
  ([entry]) => {
    waterIcon.classList.toggle('splash', entry.isIntersecting);
  },
  {
    threshold: 0.1, 
  }
);

observer.observe(target);

// Horizontal
gsap.registerPlugin(ScrollTrigger);

function horizontalScroll() {
    // Remove all existing ScrollTriggers (important to reset on resize or re-init)
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
    // Clear any inline GSAP styles on .horizontal elements
    gsap.set(".horizontal", { clearProps: "all" });
  
    // Select all horizontal scroll sections
    const horizontalSections = document.querySelectorAll(".horizontal");
  
    horizontalSections.forEach(section => {
      const background = section.querySelector(".horizontal__background, .horizontal__background2");
      
      const girl = section.querySelector(".horizontal__character");
  
      // Calculate how far the background should scroll horizontally
      // scrollWidth of background minus the viewport width
      const scrollDistance = background.scrollWidth - window.innerWidth;
  
      // You can adjust scrollDuration multiplier for scroll length
      const scrollDuration = scrollDistance * 2;
  
      // Animate background moving left
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
      
      // Animate girl moving right (opposite direction)
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
  let timeoutId;
  let inHorizontal = false;

function isInHorizontalSection() {
  const horizontals = document.querySelectorAll('.horizontal');
  const scrollPos = window.scrollY;
  const viewportHeight = window.innerHeight;
  const middle = scrollPos + viewportHeight / 2;

  return Array.from(horizontals).some(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    return middle >= top && middle < bottom;
  });
}

function snapScroll() {
    if (inHorizontal) return;
  
    const sections = document.querySelectorAll('.history__part');
    const scrollPos = window.scrollY;
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
  

window.addEventListener('scroll', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    snapScroll();
  }, 150);
});

  
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

 
