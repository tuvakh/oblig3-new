// Script for waterdrop
const waterIcon = document.querySelector('.section-top__icon');
window.addEventListener('scroll', () => {
  waterIcon.classList.toggle('splash', window.scrollY > 100);
});

// Script for section 2 -  Wave text
const waveSectionText = document.querySelector(".section-wave__text");
const originalFontSize = window.getComputedStyle(waveSectionText).fontSize;
const observerWaveText = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      waveSectionText.style.fontSize = entry.isIntersecting ? originalFontSize : "0";
    });
  },
  { rootMargin: "-30% 0%" }
);
observerWaveText.observe(document.querySelector(".section-wave"));


// Script for wave-animation
const waveIcon = document.querySelector('.section-wave__icon');
function handleWaveScroll() {
  const scrollPosition = window.pageYOffset;
  const scrollSpeed = scrollPosition * 0.7;
  waveIcon.style.backgroundPosition = `-${scrollSpeed}px 0`;
}
window.addEventListener('scroll', handleWaveScroll);


// Script for horizontal-scroll
gsap.registerPlugin(ScrollTrigger); // Tells gsap to use scrolltrigger
function horizontalScroll() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Prevents conflicts when resize the screen. Kills any animations running when window gets resized. 
  gsap.set(".horizontal", { clearProps: "all" }); // 
  if (window.innerWidth >= 1000) { // This gsap will only work if the screensize is 1000px or more.
    const content = document.querySelectorAll(".horizontal .horizontal__container"); // Finds elements inside .horizontal and .horizontal__container and puts them inside a variable
    gsap.to(content, {
      xPercent: -79 * (content.length - 1), // Scrolls content to the left. 
      scrollTrigger: {
        trigger: ".horizontal", // When content hits .horizontal section, it triggers the scrolling
        pin: true, // Content stays stuck on screen
        scrub: 1,// Make the scrolling to feel more smooth!
        end: "+=4000" // So the scrolling isn't so snappy!
      },
      ease: "power1.inOut",
    });
  } else {
    gsap.set(".horizontal", { x: 0 }); /// If the screensize is less than 1000px this code runs instead. Resets the positions. 
  }
}

horizontalScroll(); // Calls when the site is loaded

window.addEventListener("resize", horizontalScroll); // If the window gets resized, run the hroizontalScrool function again.
// This is for if you are first on desktop and moves to phone, the function needs to be called again, or else the scrolling will be on phone size. 

//gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
    trigger: ".history-wrapper",
    start: "top top",
    end: () => "+=" + document.querySelector(".history").offsetHeight,
    pin: true,
    scrub: true,
  });

  