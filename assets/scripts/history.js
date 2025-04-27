//gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: ".history-wrapper",
  start: "top top",
  end: () => "+=" + document.querySelector(".history").offsetHeight,
  pin: true,
  scrub: true,
});

const sectionEls = document.querySelectorAll(".hidden-font");

// Options for the IntersectionObserver
const options = {
    rootMargin: "-10% 0%"  // Adjust margin as needed
};

// Callback function for the IntersectionObserver
function intersectionCb(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the section is visible, remove the 'hidden' class
            entry.target.classList.remove(entry.target.dataset.hidden);
        } else {
            // When the section is invisible, add the 'hidden' class
            entry.target.classList.add(entry.target.dataset.hidden);
        }
    });
}

// Create the IntersectionObserver instance
const observer = new IntersectionObserver(intersectionCb, options);

// Observe each target element
sectionEls.forEach(el => {
    observer.observe(el);
});
